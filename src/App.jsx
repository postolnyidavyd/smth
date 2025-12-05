import { Routes, Route } from 'react-router-dom';

import './App.css'

import MainPage from '../frontend/pages/MainPage'
import AboutMePage from '../frontend/pages/AboutMePage'
import BookingPage from '../frontend/pages/BookingPage'
import PortfolioPage from '../frontend/pages/PortfolioPage'
import LogInPage from '../frontend/pages/LogInPage'
import SignUpPage from '../frontend/pages/SignUpPage'
import ErrorPage from '../frontend/pages/ErrorPage'

import UserPage
 from '../frontend/pages/UserPage';
function App() {
    return (

        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutMePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} /> 
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/login" element={<LogInPage />} /> 
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<ErrorPage />}/>
            
        </Routes>

    )
}

export default App
