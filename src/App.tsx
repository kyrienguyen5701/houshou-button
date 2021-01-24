import './App.scss';
import React, {useEffect, useState} from 'react';
import MarineLoadingScreen from "./components/MarineLoadingScreen";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import './App.scss';

function App() {
    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 4000);
    }, [])
    
    return (loading
        ? <MarineLoadingScreen />
        : <div id="app">
            <NavBar />
            <Footer />
        </div>
    )
}

export default App;
