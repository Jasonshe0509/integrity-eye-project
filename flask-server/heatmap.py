import pandas as pd
import geopandas as gpd
import folium
import branca
import requests

# Load your dataset with project data
data = pd.read_csv(r"output_with_location.csv")

# GeoJSON file for Malaysian regions
geojson_url = "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MYS/ADM1/geoBoundaries-MYS-ADM1_simplified.geojson"
geo_data = requests.get(geojson_url).json()

# Convert the GeoJSON data to a GeoDataFrame
malaysia_states = gpd.GeoDataFrame.from_features(geo_data['features'], crs="EPSG:4326")

# Create a mapping dictionary to convert BM names to state names in GeoJSON
location_to_state = {
    "melaka": "Melaka",
    "kuala lumpur": "Kuala Lumpur",
    "sabah": "Sabah",
    "pahang": "Pahang",
    "ipoh": "Perak",  # Ipoh is a city in the state of Perak
    "johor": "Johor",
    "terengganu": "Terengganu",
    "pulau pinang": "Penang",  # Alternative name for Penang in BM
    "kelantan": "Kelantan",
    "kedah": "Kedah",
    "perak": "Perak",
    "kuching": "Sarawak",  # Kuching is a city in the state of Sarawak
    "sarawak": "Sarawak",
    "petaling jaya": "Selangor",  # Petaling Jaya is a city in the state of Selangor
    "selangor": "Selangor",
    "shah alam": "Selangor",  # Shah Alam is the capital city of Selangor
    "perlis": "Perlis",
    "negeri sembilan": "Negeri Sembilan",
    "kota kinabalu": "Sabah",  # Kota Kinabalu is the capital city of Sabah
    "penang": "Penang",  # English name for Pulau Pinang
    "putrajaya": "Putrajaya",  # Federal administrative centre
    "labuan": "Labuan",  # Federal Territory
    # Add more mappings as needed
}

# Map the 'Location' column to the corresponding state names
data['state'] = data['Location'].str.lower().map(location_to_state)

# Check for any unmapped locations
unmapped_locations = data[data['state'].isnull()]['Location'].unique()
if len(unmapped_locations) > 0:
    print("Unmapped Locations: ", unmapped_locations)

# Aggregate project counts by state
state_project_counts = data.groupby('state')['BIL.'].count().reset_index(name='project_count')

# Merge the state project counts with the GeoDataFrame
malaysia_states = malaysia_states.merge(state_project_counts, left_on='shapeName', right_on='state', how='left')

# Fill missing project counts with 0
malaysia_states['project_count'] = malaysia_states['project_count'].fillna(0)

# Create a colormap for the project counts
colormap = branca.colormap.LinearColormap(
    vmin=malaysia_states['project_count'].min(),
    vmax=malaysia_states['project_count'].max(),
    colors=["#ffeda0", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"],
    caption="Number of Projects by State",
)

# Create a Folium map centered on Malaysia
m = folium.Map(location=(4.2105, 101.9758), zoom_start=6, tiles="cartodbpositron")

# Add the choropleth layer to the map
folium.GeoJson(
    malaysia_states,
    name="States",
    style_function=lambda feature: {
        'fillColor': colormap(feature['properties']['project_count']),
        'color': 'black',
        'weight': 1,
        'fillOpacity': 0.6,
    },
    highlight_function=lambda feature: {
        'fillColor': '#ffffcc',
        'color': 'black',
        'weight': 2,
        'fillOpacity': 0.9,
    },
    tooltip=folium.GeoJsonTooltip(
        fields=['shapeName', 'project_count'],
        aliases=['State', 'Number of Projects'],
        localize=True
    )
).add_to(m)

# Add the colormap legend to the map
colormap.add_to(m)

# Add layer control to the map
folium.LayerControl().add_to(m)

# Display the map
# m

# Save the map to a specific directory
m.save(r'heatmap.html')
