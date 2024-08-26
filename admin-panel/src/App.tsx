import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddAnimalForm from './pages/AddAnimalForm';
import AnimalPage from './pages/AnimalPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AddAnimalForm />} />
        <Route path="/pets" element={<AnimalPage />} />
      </Routes>
    </Router>
  );
}

export default App;