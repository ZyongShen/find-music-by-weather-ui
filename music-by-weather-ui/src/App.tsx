import { useSelector } from 'react-redux';
import type { RootState } from './features/store';
import UserLocation from './features/location/UserLocation';
import MusicResults from './features/music-results/MusicResults';

function App() {
  const { data, loading, error } = useSelector((state: RootState) => state.music);

  return (
    <div className="app">
      <h1>Music By Weather</h1>
      <UserLocation />
      {!loading && data && error && <MusicResults />}
    </div>
  )
}

export default App
