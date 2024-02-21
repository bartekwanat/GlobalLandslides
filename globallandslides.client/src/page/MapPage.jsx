import React, { useState } from 'react';
import DynamicMarkersMap from "@/components/DynamicMarkersMap.jsx";
import styles from '../styles/pages/mapPageStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MapPage = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

    return(
        <div style={styles.mapPageWrapper}>
            <div style={{
                ...styles.mapWrapper,
                width: isSearchVisible ? '60vw' : '70vw',
            }}>
                <h1 style={styles.mapHeader}>Landslides map</h1>
                <DynamicMarkersMap />
            </div>
            <button onClick={toggleSearch} style={styles.searchButton}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
            {isSearchVisible && (
                <div style={{
                    ...styles.searchWrapper,
                    transform: 'translateX(0)',
                    transition: 'transform 0.3s ease-in-out',
                }}>
                    <h2>Filter results</h2>
                </div>
            )}
        </div>
    );
}

export default MapPage;
