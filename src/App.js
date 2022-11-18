import './App.css';
import CarList from './components/CarList';
import React, { useState, useRef } from 'react';

import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
/*
Created app using----------
npx create-react-app carapp

To run----------
cd "C:\Users\krist\Desktop\Haaga-Helia\Front End Programming\a13_carapp"
npm start

Installs----------
cd "C:\Users\krist\Desktop\Haaga-Helia\Front End Programming\a13_carapp"
npm install @mui/material @emotion/react @emotion/styled
npm install ag-grid-community ag-grid-react
npm install @mui/material @emotion/react @emotion/styled

This program GETS API data and returns it to screen. THe user can add, edit and delete items. But,
none of these actions are permanent.
*/

function App() {

  return (
    <div className="App">
 
      {/* Creates a menu box across top of screen */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            CarShop
          </Typography>
        </Toolbar>
      </AppBar>

     <CarList />

    </div>
  );
}

export default App;
