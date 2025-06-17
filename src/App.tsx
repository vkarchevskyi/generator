import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PasswordGenerator from './pages/PasswordGenerator';
import ULIDGenerator from './pages/ULIDGenerator';
import UUIDGenerator from './pages/UUIDGenerator';
import './App.css';

function App() {
  return (
    <Router basename="/generator">
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PasswordGenerator />} />
            <Route path="/ulid" element={<ULIDGenerator />} />
            <Route path="/uuid" element={<UUIDGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
