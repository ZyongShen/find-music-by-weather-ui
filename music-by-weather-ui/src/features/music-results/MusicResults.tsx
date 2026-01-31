import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { MusicResultsData, ResultItem } from './types';
import './MusicResults.css';

function MusicResults() {
    const { data, loading, error } = useSelector((state: RootState) => state.music);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No Data Available</div>;

    const recEntries = Object.entries(data) as Array<[keyof MusicResultsData, ResultItem]>

    return (
        <div className="music-results">
            <h2>Music Recommendations</h2>
            <div className="music-cards">
                {recEntries.map(([k, item]) => (
                <div key={k} className="music-card">
                    <div className="image-container">
                        <img
                            src={item.image}
                            alt={`Cover for ${item.name}`}
                            className="card-image"
                            loading='lazy' 
                        />
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">
                            <a 
                            href={item.external_link}
                            className="card-link"
                            >
                                {item.name}
                            </a>
                        </h3>
                    </div>
                </div>
                ))}
            </div>
            
        </div>
    )
}

export default MusicResults;