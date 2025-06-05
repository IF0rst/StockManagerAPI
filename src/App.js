import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Contacts from './pages/Contacts';
import Produits from './pages/Produits';
import Ventes from './pages/Ventes';
import Inventaire from './pages/Inventaire';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path='/contacts' exact element={<Contacts />}></Route>
          <Route path='/produits' exact element={<Produits />}></Route>
          <Route path='/settings' exact element={<Settings />}></Route>
          <Route path='/ventes' exact element={<Ventes />}></Route>
          <Route path='/inventaire' exact element={<Inventaire />}></Route>
          <Route path='/login' exact element={<Login />}></Route>
          <Route path='/register' exact element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;