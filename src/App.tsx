import './App.scss';
import React, {useEffect, useState} from 'react';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import './App.scss';
import MarineLoadingScreen from './components/MarineLoadingScreen';

function App() {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 3600);
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
