import { useState } from 'react';
import DynamicMarkersMap from "@/components/DynamicMarkersMap.jsx";
import '@/styles/pages/mapPageStyles.scss';
import LandslideFilterForm from "@/components/LandslideForm.jsx";

const MapPage = () => {
const [filters, setFilters] = useState({
        categories: [],
        triggers: [],
        fatalityComparisonType: "equal",
        fatalityValue: {
            minOrSingleValue: '',
            max: ''
        },
        injuryComparisonType: "equal",
        injuryValue: {
            minOrSingleValue: '',
            max: ''
        },
        hasPhoto: false,
});

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="mapPageWrapper">
            <h2 className={'appHeader'}>Global landslide analysis application</h2>
            <div className={`mapWrapper`}>
                <DynamicMarkersMap filters = {filters}/>
            </div>
                <div className={`searchWrapper`}>
                    <LandslideFilterForm onFiltersChange={handleFilterChange}/>
                </div>
        </div>
    );
}

export default MapPage;
