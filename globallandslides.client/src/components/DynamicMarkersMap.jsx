import React, { useEffect, useState, useRef } from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapContainerStyle } from '../styles/components/dynamicMakersMapStyles.js';
import { fetchLandslideCoordinates } from '../services/mapService';

const MapEvents = ({ onBoundsChange }) => {
    const map = useMap();
    useEffect(() => {
        onBoundsChange(map.getBounds(), map.getZoom());
    }, []);

    useMapEvents({
        moveend: () => onBoundsChange(map.getBounds(), map.getZoom()),
        zoomend: () => onBoundsChange(map.getBounds(), map.getZoom()),
    });

    return null;
};

const DynamicMarkersMap = () => {
    const [positions, setPositions] = useState([]);

    const handleBoundsChange = async (bounds, zoom) => {
        const data = await fetchLandslideCoordinates(bounds, zoom);
        setPositions(data);
    };

    return (
        <MapContainer
            center={[40, 0]}
            zoom={2}
            style={mapContainerStyle}
            minZoom={2}
            maxBounds={[
                [-90, -180],
                [90, 180]
            ]}
            maxBoundsViscosity={1.0}
            whenCreated={map => {
                handleBoundsChange(map.getBounds(), map.getZoom());
            }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents onBoundsChange={handleBoundsChange} />
            {positions.map((position, idx) => (
                <Marker key={idx} position={[position.latitude, position.longitude]}>
                    <Popup>
                        Latitude: {position.latitude}, Longitude: {position.longitude}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default DynamicMarkersMap;
