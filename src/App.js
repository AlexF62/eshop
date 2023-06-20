import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Components
import { Footer, Header } from './components';
//Pages
import { Home, Contact } from './pages';

import './App.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/contact' element={<Contact />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
