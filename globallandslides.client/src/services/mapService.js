export const fetchLandslideCoordinates = async (bounds, zoom) => {
    if (!bounds || !bounds._northEast || !bounds._southWest) {
        console.error('Bounds are undefined or incomplete');
        return [];
    }

    const {_northEast, _southWest} = bounds;
    try {
        const response = await fetch(`https://localhost:7099/api/landslides/coordinates?north=${_northEast.lat}&south=${_southWest.lat}&east=${_northEast.lng}&west=${_southWest.lng}&zoomLevel=${zoom}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch landslide coordinates: ", error);
        return [];
    }
};