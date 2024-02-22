import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapContainerStyle} from '../styles/components/dynamicMakersMapStyles.js';
import { fetchLandslideCoordinates, fetchLandslideDetails } from '../services/mapService';
import {createCustomIcon} from "@/helpers/Marker.js";

const MapEvents = ({ onBoundsChange, mapRef }) => {
    const map = useMap();
    mapRef.current = map;

    useEffect(() => {
        onBoundsChange(map.getBounds(), map.getZoom());
    }, [onBoundsChange, map]);

    useMapEvents({
        moveend: () => onBoundsChange(map.getBounds(), map.getZoom()),
        zoomend: () => onBoundsChange(map.getBounds(), map.getZoom()),
    });

    return null;
};

const DynamicMarkersMap = () => {
    const [positions, setPositions] = useState([]);
    const [lastBounds, setLastBounds] = useState(null);
    const [selectedLandslideDetails, setSelectedLandslideDetails] = useState(null);
    const [selectedLandslideId, setSelectedLandslideId] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(true);
    const mapRef = useRef(null);
    const popupRef = useRef(null);

    const handleMarkerClick = async (landslideId, latlng) => {
        const details = await fetchLandslideDetails(landslideId);
        setSelectedLandslideDetails(details);
        setSelectedLandslideId(landslideId);

        mapRef.current.flyTo(latlng, 10);

        mapRef.current.once('zoomend', () => {
            if (popupRef.current && landslideId === selectedLandslideId) {
                popupRef.current.openOn(mapRef.current);
            }
        });
    };

    const handleBoundsChange = async (bounds, zoom) => {
        const currentBounds = {
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
            zoom: zoom
        };


        if (!lastBounds ||
            Math.abs(currentBounds.north - lastBounds.north) > 0.01 ||
            Math.abs(currentBounds.south - lastBounds.south) > 0.01 ||
            Math.abs(currentBounds.east - lastBounds.east) > 0.01 ||
            Math.abs(currentBounds.west - lastBounds.west) > 0.01 ||
            Math.abs(currentBounds.zoom - lastBounds.zoom) > 1) {
            setLastBounds(currentBounds);
            const data = await fetchLandslideCoordinates(bounds, zoom);
            setPositions(data);
        }
    };

    const handleImageError = () => {
        setImageLoaded(false);
    };

    return (
        <MapContainer
            center={[40, 0]}
            zoom={2}
            style={mapContainerStyle}
            minZoom={2}
            maxBounds={[
                [-90, -200],
                [90, 200]
            ]}
            maxBoundsViscosity={1.0}
            whenCreated={(map) => {
                mapRef.current = map;
                handleBoundsChange(map.getBounds(), map.getZoom());
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents onBoundsChange={handleBoundsChange} mapRef={mapRef} />
            {positions.map((position) => (
                <Marker
                    key={position.id}
                    position={[position.latitude, position.longitude]}
                    icon={createCustomIcon(position.landslideSize)}
                    eventHandlers={{
                        click: () => handleMarkerClick(position.id, [position.latitude, position.longitude]),
                    }}
                >
                    {selectedLandslideId === position.id && (
                        <Popup
                            ref={popupRef}
                            autoPan={false}
                        keepInView={true}>
                            <div>
                                <h2>Details</h2>
                                <p>Date: {selectedLandslideDetails?.date}</p>
                                <p>Description: {selectedLandslideDetails?.eventDescription}</p>
                                <p>Fatality Count: {selectedLandslideDetails?.fatalityCount}</p>
                                <p>Injury Count: {selectedLandslideDetails?.injuryCount}</p>
                                <p>Size: {selectedLandslideDetails?.landslideSize}</p>
                                <p>Trigger: {selectedLandslideDetails?.landslideTrigger}</p>
                                {imageLoaded && (
                                    <img
                                        src={selectedLandslideDetails?.photoLink}
                                        alt="Landslide"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                        onError={handleImageError}
                                    />
                                )}
                            </div>
                        </Popup>
                    )}
                </Marker>
            ))}
        </MapContainer>
    );
};

export default DynamicMarkersMap;
