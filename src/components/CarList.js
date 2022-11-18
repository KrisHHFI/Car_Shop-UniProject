import React, { useState, useEffect, useRef } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import { PropertyKeys } from 'ag-grid-community';

/*
Called via  <CarList />
The succcess of the api request can be checked in browser console > network > and if "cars" is visible
*/
export default function CarList(props) {
    // Car array created
    const [cars, setCars] = useState([]);
    // Car object used for adding individual cars
    const [car, setCar] = useState({brand: ''});

    //API data fetched
    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    // Used when deleting cars and returning car list to screen 
    const gridRef = useRef();
    // Adgrid columns
    const columns = [  
        { field: "brand", sortable: true, filter: true, floatingFilter: true },
        { field: "model", sortable: true, filter: true, floatingFilter: true },
        { field: "color", sortable: true, filter: true, floatingFilter: true },
        { field: "fuel", sortable: true, filter: true, floatingFilter: true },
        { field: "year", sortable: true, filter: true, floatingFilter: true },
        { field: "price", sortable: true, filter: true, floatingFilter: true }
    ]

    // inputChanged and addCar both used to create new cars
    const inputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }
      
    // Add cars
    const addCar = (event) => {
        // Saves car to cars array
        setCars([...cars, car]);
        //  Calls the save car function to POST to API
       // saveCar(car);
    }

    // POST's car's. The cars are saved until the program is stopped. 
    // Currently never called on. It works, but the edit and delete functions currently don't use POST.
    const saveCar = (car) => { 
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(car)
        })
    .then(res => fetchData())
    .catch(err => console.err(err))
    
    }

    // Edit car. Actually adds and filters out old one 
    const editCar = () => {  
        if (gridRef.current.getSelectedNodes().length > 0) { 
            // Filter selected row and add new one
            setCars([...cars, car].filter((car, index) =>      
            index !== gridRef.current.getSelectedNodes()[0].childIndex))  
            console.log('delete reached');
            // If a row isn't selected
        } else {   
            alert('Select row first'); 
        }
    }

    // Delete car 
    const deleteCar = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {    
        setCars(cars.filter((car, index) =>      
        index !== gridRef.current.getSelectedNodes()[0].childIndex))  
        // If a row isn't selected
    } else {   
        alert('Select row first'); 
    }}

    // Effect is executed after the first render
    useEffect(() => fetchData, []);

    return (
    <div>
        {/* The input boxes for the car values */}
        <input type="text" onChange={inputChanged} placeholder="Brand" name="brand" value={car.brand}/>
        <input type="text" onChange={inputChanged} placeholder="Model" name="model" value={car.model}/>
        <input type="text" onChange={inputChanged} placeholder="Colour" name="color" value={car.color}/>
        <input type="text" onChange={inputChanged} placeholder="Fuel" name="fuel" value={car.fuel}/>
        <input type="text" onChange={inputChanged} placeholder="Year" name="year" value={car.year}/>
        <input type="text" onChange={inputChanged} placeholder="Price" name="price" value={car.price}/>

        {/* Delete button at top of screen */}
        <button onClick={addCar}>Add</button>
        <button onClick={editCar}>Edit</button>
        <button onClick={deleteCar}>Delete</button>

        {/* The table is returned to screen */}
        <div className="ag-theme-material"
            style={{height: '700px', width: '70%', margin: 'auto'}} >
            <AgGridReact 
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                columnDefs={columns}
                animateRows={true}
                rowData={cars}>
            </AgGridReact>
        </div>
    </div>
    );
}