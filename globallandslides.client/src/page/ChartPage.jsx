import {useEffect, useState} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, ArcElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie  } from 'react-chartjs-2';
import { Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import {fetchChartData} from "@/services/chartService.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, PointElement, ArcElement, LineElement, Tooltip, Legend);

const ChartPage = () => {
    const [axisChoice, setAxisChoice] = useState("categories");
    const [metricChoice, setMetricChoice] = useState("fatalityCount");
    const [chartType, setChartType] = useState('bar');
    const [chartData, setChartData] = useState({ datasets: [] });

    function getRandomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.3)`;
    }

    useEffect(() => {
        const loadData = async () => {

            try {
                const data = await fetchChartData(axisChoice, metricChoice);
                const backgroundColors = Object.keys(data).map(() => getRandomColor());


                setChartData({
                    labels: Object.keys(data),
                    datasets: [
                        {
                            label: `${metricChoice === "fatalityCount" ? "Liczba ofiar śmiertelnych" : "Liczba kontuzji"} dla ${axisChoice}`,
                            data: Object.values(data),
                            backgroundColor: backgroundColors,
                            borderColor: backgroundColors,
                            borderWidth: 1,
                        }
                    ],
                });
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        loadData();
    }, [axisChoice, metricChoice, chartType]);

    const renderChart = () => {
        const chartProps = { data: chartData };
        switch (chartType) {
            case 'bar': return <Bar {...chartProps} style={{width: '50vw'}}/>;
            case 'line': return <Line {...chartProps} style={{width: '50vw'}}/>;
            case 'pie': return <Pie {...chartProps} style={{width: '50vh'}}/>;
            default: return <Bar {...chartProps} />;
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '70vw', height: '80vh', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Stwórz Wykres
            </Typography>
            <Box sx={{ width: '100%', maxWidth: '400px' }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel style={{backgroundColor: '#242424'}}>Chart type</InputLabel>
                    <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                        <MenuItem value="bar">Bar</MenuItem>
                        <MenuItem value="line">Line</MenuItem>
                        <MenuItem value="pie">Pie</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel style={{backgroundColor: '#242424'}}>X-axis</InputLabel>
                    <Select value={axisChoice} onChange={(e) => setAxisChoice(e.target.value)}>
                        <MenuItem value="categories">Categories</MenuItem>
                        <MenuItem value="triggers">Triggers</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel style={{backgroundColor: '#242424'}}>Y-axis</InputLabel>
                    <Select value={metricChoice} onChange={(e) => setMetricChoice(e.target.value)}>
                        <MenuItem value="fatalityCount">FatalityCount</MenuItem>
                        <MenuItem value="injuryCount">Injury Count</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ width: '100%', maxWidth: '60vw', height: 'auto', marginTop: 4 }}>
                {renderChart()}
            </Box>
        </Box>
    );
};

export default ChartPage;
