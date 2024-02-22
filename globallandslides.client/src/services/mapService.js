export async function fetchLandslideCoordinates(bounds, zoomLevel) {
    const url = new URL('https://localhost:7099/api/landslides/coordinates');
    const params = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
        zoomLevel: zoomLevel
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch landslide coordinates:", error);
        throw error;
    }
}

export const fetchLandslideDetails = async(landslideId) => {
    try {
        const response = await fetch(`https://localhost:7099/api/landslides/${landslideId}`);
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