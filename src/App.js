import React from 'react';
import {useState} from 'react'
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {DisplayDefaultStocks, StockSearch} from "./api";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { LoginPage } from './components/LoginPage';
import {CustomNavbar} from './components/CustomNavbar';
import {Form,FormControl,Button} from 'react-bootstrap/';
import { QuoteSearch } from './components/Quote';






export default function App() {


  //is there an email address logged in
  const [email,setEmail] = useState("loggedout");
  const [token,setToken] = useState(null);


  const updateEmail = (e) =>{
    setEmail(e);

  };


  return (

    <div className="App">


    <Router>
      <div>
      <Link to="/">Home</Link>
      <Link to="/stocks">Stocks</Link>
      <Link to="/search">Search</Link>
      <Link to="/quotes">Quotes</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
  <h2>{email}</h2>

      <Switch>
        <Route exact path ="/Stocks"> <DisplayDefaultStocks/></Route>
        <Route exact path ="/login"> <LoginPage emailSet={updateEmail}/></Route>
        <Route exact path ="/search"><StockSearch/></Route>
        <Route exact path ="/quotes"><QuoteSearch/></Route>
      </Switch>

      </div>
    </Router>

    

















{/* 
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
    crossOrigin="anonymous"></link>


    <CustomNavbar email={email}/>
    <h1>Home</h1>
    <button onClick={()=>{setEmail("ayylmao")}}></button>
    <StockSearch/>
    <DisplayDefaultStocks/> */}


    </div>
  );
}


