import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Adm from './adm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adm" element={<Adm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
