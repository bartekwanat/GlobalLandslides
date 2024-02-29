import {useEffect, useState, useRef, useCallback} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/styles/components/popupStyle.css'
import { mapContainerStyle} from '../styles/components/dynamicMakersMapStyles.js';
import { fetchLandslideCoordinates, fetchLandslideDetails } from '../services/mapService';
import {createCustomIcon} from "@/helpers/Marker.js";
import {useDispatch, useSelector} from "react-redux";
import {setBounds} from "@/store/boundsSlice.js";
import {debounce} from "@mui/material";
import {setResultCount} from "@/store/resultCountSlice.js";

const MapEvents = ({ onBoundsChange, onPopupClose, mapRef }) => {
    const map = useMap();
    mapRef.current = map;

    useEffect(() => {
        onBoundsChange(map.getBounds(), map.getZoom());
        const handlePopupClose = () => onPopupClose();
        map.on('popupclose', handlePopupClose);
        return () => map.off('popupclose', handlePopupClose);
    }, [onBoundsChange, map, onPopupClose]);

    useMapEvents({
        moveend: () => onBoundsChange(map.getBounds(), map.getZoom()),
        zoomend: () => onBoundsChange(map.getBounds(), map.getZoom()),
    });

    return null;
};

const DynamicMarkersMap = ({ filters }) => {
    const dispatch = useDispatch();
    const landslidesCacheRef = useRef({});
    const [positions, setPositions] = useState([]);
    const [selectedLandslideDetails, setSelectedLandslideDetails] = useState(null);
    const [selectedLandslideId, setSelectedLandslideId] = useState(null);
    const mapRef = useRef(null);
    const popupRef = useRef(null);
    const lastFiltersRef = useRef();

    const onPopupClose = () => setSelectedLandslideId(null);

    const setMarkers = useCallback((data) => setPositions(data), []);

    const handleMarkerClick = async (landslideId, latlng) => {
        if (mapRef.current && mapRef.current.getZoom() < 4) {
            mapRef.current.flyTo(latlng, 4);
        }
        const details = await fetchLandslideDetails(landslideId);
        setSelectedLandslideDetails(details);
        setSelectedLandslideId(landslideId);
        if (popupRef.current) {
            popupRef.current.openOn(mapRef.current);
        }
    };

    const handleBoundsChange = useCallback(debounce(async (bounds, zoom) => {
        const boundsKey = `${bounds.getNorth()}${bounds.getSouth()}${bounds.getEast()}${bounds.getWest()}`;
        const filtersString = JSON.stringify(filters);
        if (!landslidesCacheRef.current[boundsKey] || lastFiltersRef.current !== filtersString) {
            const currentBounds = {
                north: bounds.getNorth(),
                south: bounds.getSouth(),
                east: bounds.getEast(),
                west: bounds.getWest(),
            };

            try {
                const data = await fetchLandslideCoordinates(currentBounds, zoom, filters);
                landslidesCacheRef.current[boundsKey] = data;
                setMarkers(data);
                dispatch(setBounds(currentBounds));
                dispatch(setResultCount(data.length));
                lastFiltersRef.current = filtersString;
            } catch (error) {
                console.error("Error fetching landslide coordinates:", error);
            }
        }
    }, 250), [dispatch, filters]);

    useEffect(() => {
        const currentBounds = mapRef.current ? mapRef.current.getBounds() : null;
        const currentZoom = mapRef.current ? mapRef.current.getZoom() : null;
        if (currentBounds && currentZoom) {
            handleBoundsChange(currentBounds, currentZoom);
        }
    }, [filters, handleBoundsChange]);

    useEffect(() => {
        if (mapRef.current) {
            handleBoundsChange(mapRef.current.getBounds(), mapRef.current.getZoom());
        }
    }, [filters, handleBoundsChange]);

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
                map.on('popupclose', () => {
                    console.log('Popup closed');
                    setSelectedLandslideId(null);
                });
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents
                onBoundsChange={handleBoundsChange}
                mapRef={mapRef}
                onPopupClose={onPopupClose}
            />
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
                            autoClose={false}
                            className={'details-popup'}
                            onOpen={() => console.log('open')}
                            onClose={() => console.log('close')}
                                >
                            <div>
                                <h2>Details</h2>
                                <p>Date: {selectedLandslideDetails?.date}</p>
                                <p>Location: {selectedLandslideDetails?.locationDescription}</p>
                                <p>Description: {selectedLandslideDetails?.eventDescription}</p>
                                <p>Fatality Count: {selectedLandslideDetails?.fatalityCount}</p>
                                <p>Injury Count: {selectedLandslideDetails?.injuryCount}</p>
                                <p>Size: {selectedLandslideDetails?.landslideSize}</p>
                                <p>Category: {selectedLandslideDetails?.landslideCategory}</p>
                                <p>Trigger: {selectedLandslideDetails?.landslideTrigger}</p>
                                <img
                                        src={selectedLandslideDetails?.photoLink}
                                        alt="Landslide"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </div>
                        </Popup>
                    )}
                </Marker>
            ))}
        </MapContainer>
    );
};

export default DynamicMarkersMap;
