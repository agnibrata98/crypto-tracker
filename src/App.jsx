import './App.css'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'
import Homepage from './pages/Homepage'
import Coinpage from './pages/Coinpage'
import Header from './components/Header';



function App() {


  return (
    <>
    <Router>
      <div style={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>} exact />
          <Route path="/coins/:id" element={<Coinpage/>} exact />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
