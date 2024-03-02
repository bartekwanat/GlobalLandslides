import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import './App.css';
import MapPage from "@/page/MapPage.jsx";
import NavigationMenu from "@/components/NavigationMenu.jsx";
import ChartPage from "@/page/ChartPage.jsx";
import Footer from "@/components/Footer.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <NavigationMenu />
                <Routes>
                    <Route path="/" element={<MapPage />} />
                    <Route path="/create-chart" element={<ChartPage />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;