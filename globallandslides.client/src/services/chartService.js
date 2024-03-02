export async function fetchChartData(x, y) {
    const url = new URL(`https://localhost:7099/api/landslides/chart`);
    url.searchParams.append('X', x);
    url.searchParams.append('Y', y);

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Could not fetch data:", error);
        throw error;
    }
}