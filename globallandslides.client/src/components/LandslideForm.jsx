import {useState, useEffect} from 'react';
import { Button, Grid } from '@mui/material';
import CategoryFilter from "@/components/form/CategoryFilter.jsx";
import TriggerFilter from "@/components/form/TriggerFilter.jsx";
import FatalityCountFilter from "@/components/form/FatalityCountFilter.jsx";
import InjuryCountFilter from "@/components/form/InjuryCountFilter.jsx";
import ImageFilter from "@/components/form/ImageFilter.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setFilters} from "@/store/filtersSlice.js";
import {fetchLandslideCoordinates} from "@/services/mapService.js";

const LandslideForm = ({ onFiltersChange }) => {
    const dispatch = useDispatch();
    const bounds = useSelector(state => state.bounds);
    const zoomLevel = useSelector(state => state.zoomLevel.value);
    const resultCount = useSelector(state => state.resultCount.value);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTriggers, setSelectedTriggers] = useState([]);
    const [fatalityComparisonType, setFatalityComparisonType] = useState('equal');
    const [fatalityValue, setFatalityValue] = useState({ minOrSingleValue: '', max: '' });
    const [injuryComparisonType, setInjuryComparisonType] = useState('equal');
    const [injuryValue, setInjuryValue] = useState({ minOrSingleValue: '', max: ''});
    const [hasPhoto, setHasPhoto] = useState(false);

    const areFiltersDefault = () => {
        return (
            selectedCategories.length === 0 && selectedTriggers.length === 0 &&
            fatalityComparisonType === 'equal' && fatalityValue.minOrSingleValue === '' && fatalityValue.max === '' &&
            injuryComparisonType === 'equal' && injuryValue.minOrSingleValue === '' && injuryValue.max === '' &&
            !hasPhoto
        );
    };

    useEffect(() => {
        const formParams = {
            categories: selectedCategories,
            triggers: selectedTriggers,
            fatalityComparisonType,
            fatalityValue,
            injuryComparisonType,
            injuryValue,
            hasPhoto,
        };

        onFiltersChange(formParams);
    }, [selectedCategories, selectedTriggers, fatalityComparisonType, fatalityValue, injuryComparisonType, injuryValue, hasPhoto, onFiltersChange]);



    return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CategoryFilter
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}/>
                </Grid>
                <Grid item xs={12}>
                    <TriggerFilter
                        selectedTriggers={selectedTriggers}
                        setSelectedTriggers={setSelectedTriggers}/>
                </Grid>
                <Grid item xs={12}>
                    <FatalityCountFilter
                        fatalityComparisonType={fatalityComparisonType}
                        setFatalityComparisonType={setFatalityComparisonType}
                        fatalityValue={fatalityValue}
                        setFatalityValue={setFatalityValue}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InjuryCountFilter
                        injuryComparisonType={injuryComparisonType}
                        setInjuryComparisonType={setInjuryComparisonType}
                        injuryValue={injuryValue}
                        setInjuryValue={setInjuryValue}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ImageFilter
                        hasPhoto={hasPhoto}
                        setHasPhoto={setHasPhoto}/>
                </Grid>
                {resultCount > 0 && (
                    <Grid item xs={12}
                    style={{color: '#242424'}}>
                        <p>{areFiltersDefault() ? 'Actually rendered results:' : 'Filtering returned: '} {resultCount} results</p>
                        {resultCount > 1000 && <p style={{fontSize: '0.8rem'}}>Large number of markers can slow down the application</p>}
                    </Grid>
                )}
            </Grid>
    );
}

export default LandslideForm;
