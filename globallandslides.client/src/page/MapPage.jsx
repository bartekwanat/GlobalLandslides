import { useState } from 'react';
import DynamicMarkersMap from "@/components/DynamicMarkersMap.jsx";
import '@/styles/pages/mapPageStyles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LandslideFilterForm from "@/components/LandslideFilterForm.jsx";

const MapPage = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

    return (
        <div className="mapPageWrapper">
            <div className={`mapWrapper ${isSearchVisible ? 'searchVisible' : ''}`}>
                <h1 className="mapHeader">Landslides map</h1>
                <DynamicMarkersMap />
            </div>
            <button onClick={toggleSearch} className="searchButton">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            {isSearchVisible && (
                <div className={`searchWrapper ${isSearchVisible ? 'active' : ''}`}>
                    <LandslideFilterForm />
                </div>
            )}
        </div>
    );
}

export default MapPage;
