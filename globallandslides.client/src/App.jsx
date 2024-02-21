import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DynamicMarkersMap from './components/DynamicMarkersMap.jsx';
import './App.css';
import MapPage from "@/page/MapPage.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MapPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;