import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Reservation from './pages/Reservation'
import Tracking from './pages/Tracking'
import ClientSpace from './pages/ClientSpace'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/client-space" element={<ClientSpace />} />
          <Route path="/login" element={<ClientSpace />} />
          <Route path="/espace-client" element={<ClientSpace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
