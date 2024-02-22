import { useState } from 'react';
import '@/styles/components/LandslideFilterFormStyles.scss';

const LandslideFilterForm = ({ onFilterChange }) => {
    const [formValues, setFormValues] = useState({
        eventDescription: '',
        landslideCategory: '',
        landslideTrigger: '',
        landslideSetting: '',
        fatalityCount: '',
        injuryCount: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(formValues);
    };

    return (
        <form className={'formWrapper'} onSubmit={handleSubmit}>
            <h2>Filter results</h2>
            <input
                type="text"
                name="landslideCategory"
                value={formValues.landslideCategory}
                onChange={handleChange}
                placeholder="Landslide Category"
            />
            <input
                type="text"
                name="landslideTrigger"
                value={formValues.landslideTrigger}
                onChange={handleChange}
                placeholder="Landslide Trigger"
            />
            <input
                type="text"
                name="landslideSetting"
                value={formValues.landslideSetting}
                onChange={handleChange}
                placeholder="Landslide Setting"
            />
            <input
                type="number"
                name="fatalityCount"
                value={formValues.fatalityCount}
                onChange={handleChange}
                placeholder="Fatality Count"
            />
            <input
                type="number"
                name="injuryCount"
                value={formValues.injuryCount}
                onChange={handleChange}
                placeholder="Injury Count"
            />
            <input
                type="date"
                name="date"
                value={formValues.date}
                onChange={handleChange}
            />
            <button type="submit">Filter Results</button>
        </form>
    );
};

export default LandslideFilterForm;
