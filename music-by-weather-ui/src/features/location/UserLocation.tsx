/*
Form with field and a button to submit the form
Form data is going to modify the state once it's submitted
*/

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { getMusicByLocation } from '../music-results/musicSlice';
import { useState } from 'react';
import './UserLocation.css';

function UserLocation() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.music);
    const [zipcode, setZipCode ] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (zipcode) {
            dispatch(getMusicByLocation(zipcode));
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="location-form">
            <input
                type="text"
                value={zipcode}
                onChange={(event) => setZipCode(event.target.value)}
                placeholder="Enter ZIP Code"
                className="location-input"
                disabled={loading}
            />
            <button 
                type="submit"
                className="submit-button" 
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Get Music Recommendations'}
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default UserLocation;