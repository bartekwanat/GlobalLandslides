export async function fetchLandslideCoordinates(bounds, zoomLevel, filters ={}) {

    const url = new URL('https://localhost:7099/api/landslides/coordinates');
    const params = {
        north: bounds.north,
        south: bounds.south,
        east: bounds.east,
        west: bounds.west,
        zoomLevel: zoomLevel,
        filters: filters
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(params)
        });

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