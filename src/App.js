import './App.css';
import PlayerApp from "./PlayerApp";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/player/:id" element={<PlayerApp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
