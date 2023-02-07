import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginAccessCode from './pages/LoginAccessCode';
import GithubUser from './pages/GithubUser';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginAccessCode />} />
        <Route path='/github-user' element={<GithubUser />} />
      </Routes>
    </div>
  );
}

export default App;
