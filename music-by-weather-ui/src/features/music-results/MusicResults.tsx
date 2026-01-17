import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { MusicResultsData, ResultItem } from './types';

function MusicResults() {
    const { data, loading, error } = useSelector((state: RootState) => state.music);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No Data Available</div>;

    const recEntries = Object.entries(data) as Array<[keyof MusicResultsData, ResultItem]>

    return (
        <div>
            <h2>Music Recommendations</h2>
            {recEntries.map(([k, item]) => (
                <div key={k} className={`${k}-rec`}>
                    <img
                        src={item.image}
                        alt={`Cover for ${item.name}`}
                        className={`${k}-cover`}
                        loading='lazy' 
                    />
                    <h3>
                        <a href={item.external_link}>{item.name}</a>
                    </h3>
                </div>
            ))}
        </div>
    )
}

export default MusicResults;