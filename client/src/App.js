import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<AddEmployee/>} />
        <Route path="/edit/:id" element={<EditEmployee/>} />
        </Routes>
      
      </Router>
    </div>
  )
}

export default App
