import streamlit as st
import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter, zoom
import cartopy.crs as ccrs
import cartopy.feature as cfeature
from datetime import date
from sklearn.linear_model import LinearRegression
import pandas as pd
import io
from PIL import Image
import rasterio

# Streamlit page config
st.set_page_config(page_title="NO2 Data Downscaling", page_icon="🌍", layout="wide")

st.title("🌍 Sentinel-5P NO₂ Data Downscaling")
st.markdown("Upload NO₂ satellite images or use default simulated data to perform spatial downscaling.")

# Sidebar controls
with st.sidebar:
    st.header("Controls")
    sigma = st.slider("Smoothing factor (sigma)", 0.1, 5.0, 1.0, 0.1)
    vmin = st.number_input("Minimum value", 0.0, 1.0, 0.0, 0.01)
    vmax = st.number_input("Maximum value", 0.0, 1.0, 1.0, 0.01)
    cmap = st.selectbox("Color map", ["viridis", "plasma", "inferno", "magma", "cividis"])

    st.subheader("Advanced Options")
    downscale_factor = st.slider("Downscaling factor", 2, 10, 4, 1)
    downscale_method = st.selectbox("Downscaling method", 
        ["Gaussian Smoothing", "Bilinear Interpolation", "Cubic Spline", "Regression-Based"], index=1)
    
    zoom_start = st.slider("Zoom region % (for preview)", 10, 100, 100, 10)
    add_noise = st.checkbox("Add random noise to image")
    export_format = st.selectbox("Export format", ["PNG", "PDF", "CSV"])

    uploaded_file = st.file_uploader("Upload Satellite Image (GeoTIFF, PNG, JPG)", type=["tif", "tiff", "png", "jpg", "jpeg"])

# Default dataset generator
def generate_sample_data():
    lat = np.linspace(-90, 90, 180)
    lon = np.linspace(-180, 180, 360)
    lon_grid, lat_grid = np.meshgrid(lon, lat)
    sin_term = np.sin(np.radians(lat_grid*2))**2
    cos_term = np.cos(np.radians(lon_grid))/2
    data = sin_term * cos_term
    data[60:80, 100:120] += 0.5
    data[30:50, 200:220] += 0.4
    data[20:40, 70:90] += 0.6
    data += np.random.normal(0, 0.1, data.shape)
    return data, lat, lon

# Image reader
def read_uploaded_image(uploaded_file):
    if uploaded_file.name.endswith((".tif", ".tiff")):
        with rasterio.open(uploaded_file) as src:
            image = src.read(1).astype(float)
            return image, src.bounds
    else:
        image = Image.open(uploaded_file).convert("L")
        image = np.array(image) / 255.0
        h, w = image.shape
        return image, (-180, -90, 180, 90)

# Downscaling function
def downscale_data(data, factor, method):
    try:
        if method == "Gaussian Smoothing":
            smoothed = gaussian_filter(data, sigma=1)
            return zoom(smoothed, factor, order=0)
        elif method == "Bilinear Interpolation":
            return zoom(data, factor, order=1)
        elif method == "Cubic Spline":
            return zoom(data, factor, order=3)
        elif method == "Regression-Based":
            rows, cols = data.shape
            x = np.linspace(0, 1, cols)
            y = np.linspace(0, 1, rows)
            xx, yy = np.meshgrid(x, y)
            model = LinearRegression()
            X = np.column_stack([xx.ravel(), yy.ravel()])
            model.fit(X, data.ravel())
            new_x = np.linspace(0, 1, cols*factor)
            new_y = np.linspace(0, 1, rows*factor)
            new_xx, new_yy = np.meshgrid(new_x, new_y)
            X_new = np.column_stack([new_xx.ravel(), new_yy.ravel()])
            return model.predict(X_new).reshape(rows*factor, cols*factor)
    except Exception as e:
        st.error(f"Downscaling failed: {e}")
        return data

# Plotting function
def plot_no2_data(data, lat, lon, title):
    fig = plt.figure(figsize=(10, 5))
    ax = plt.axes(projection=ccrs.PlateCarree())
    mesh = ax.pcolormesh(lon, lat, data, cmap=cmap, vmin=vmin, vmax=vmax, transform=ccrs.PlateCarree())
    ax.add_feature(cfeature.COASTLINE, linewidth=0.5)
    ax.add_feature(cfeature.BORDERS, linestyle=':', linewidth=0.2)
    ax.gridlines(draw_labels=True, x_inline=False, y_inline=False)
    plt.title(title)
    cbar = plt.colorbar(mesh, orientation='vertical', label='NO₂ Concentration')
    return fig

# Data handling
if uploaded_file:
    raw_data, bounds = read_uploaded_image(uploaded_file)
    lat = np.linspace(bounds[1], bounds[3], raw_data.shape[0])
    lon = np.linspace(bounds[0], bounds[2], raw_data.shape[1])
else:
    raw_data, lat, lon = generate_sample_data()

if add_noise:
    raw_data += np.random.normal(0, 0.05, raw_data.shape)

processed_data = gaussian_filter(np.where(np.isnan(raw_data), 0, raw_data), sigma=sigma)
downscaled_data = downscale_data(processed_data, downscale_factor, downscale_method)

new_lat = np.linspace(lat.min(), lat.max(), downscaled_data.shape[0])
new_lon = np.linspace(lon.min(), lon.max(), downscaled_data.shape[1])

# Tabs
tab1, tab2, tab3 = st.tabs(["Original Data", "Processed Data", "Downscaled Data"])

with tab1:
    st.pyplot(plot_no2_data(raw_data, lat, lon, "Original NO₂ Data"))
    plt.close()

with tab2:
    st.pyplot(plot_no2_data(processed_data, lat, lon, "Processed NO₂ Data"))
    plt.close()

with tab3:
    st.pyplot(plot_no2_data(downscaled_data, new_lat, new_lon, f"Downscaled NO₂ Data ({downscale_factor}x)"))
    plt.close()

    fig_diff = plt.figure(figsize=(10, 5))
    ax = plt.axes(projection=ccrs.PlateCarree())
    baseline = zoom(processed_data, downscale_factor, order=0)
    diff = downscaled_data - baseline
    mesh = ax.pcolormesh(new_lon, new_lat, diff, cmap='coolwarm', vmin=-0.2, vmax=0.2, transform=ccrs.PlateCarree())
    ax.add_feature(cfeature.COASTLINE, linewidth=0.5)
    ax.gridlines(draw_labels=True, x_inline=False, y_inline=False)
    plt.title("Difference: Downscaled - Upsampled Processed")
    plt.colorbar(mesh, orientation='vertical')
    st.pyplot(fig_diff)
    plt.close()

# Histogram
st.subheader("📊 Value Distribution")
fig_hist, ax_hist = plt.subplots()
ax_hist.hist(downscaled_data.ravel(), bins=50, color='skyblue', edgecolor='black')
ax_hist.set_title("Histogram of Downscaled NO₂ Values")
st.pyplot(fig_hist)
plt.close()

# Stats
st.subheader("📈 Data Statistics")
cols = st.columns(3)
with cols[0]:
    st.metric("Original Mean", f"{np.nanmean(raw_data):.4f}")
with cols[1]:
    st.metric("Processed Mean", f"{np.mean(processed_data):.4f}")
with cols[2]:
    st.metric("Downscaled Mean", f"{np.mean(downscaled_data):.4f}")

# Export
st.subheader("📥 Export")
if st.button("Export Current View"):
    buf = io.BytesIO()
    if export_format in ["PNG", "PDF"]:
        fig = plt.figure(figsize=(10, 5))
        ax = plt.axes()
        img = ax.imshow(downscaled_data, cmap=cmap, vmin=vmin, vmax=vmax)
        plt.axis('off')
        plt.title("Downscaled NO₂ Image")
        plt.colorbar(img, orientation='vertical')
        plt.tight_layout()
        plt.savefig(buf, format=export_format.lower(), dpi=300)
        plt.close()
        mime = "image/png" if export_format == "PNG" else "application/pdf"
        st.download_button("Download Image", data=buf.getvalue(), file_name=f"no2_downscaled.{export_format.lower()}", mime=mime)
    elif export_format == "CSV":
        df = pd.DataFrame(downscaled_data)
        st.download_button("Download CSV", data=df.to_csv(index=False), file_name="no2_downscaled.csv", mime="text/csv")
