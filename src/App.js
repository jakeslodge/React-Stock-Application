import React from 'react';
import {useState} from 'react'
//import './App.css';
//import "./stocks.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import {DisplayDefaultStocks, StockSearch} from "./api";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { LoginPage } from './components/LoginPage';
import {CustomNavbar} from './components/CustomNavbar';
import {Form,FormControl,Button} from 'react-bootstrap/';
import { QuoteSearch } from './components/Quote';
import { Header } from './components/Header';







export default function App() {


  //is there an email address logged in
  const [email,setEmail] = useState("loggedout");
  const [token,setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impha2UxMjNAYXBpLmNvbSIsImV4cCI6MTU4NzQ0MjA4OSwiaWF0IjoxNTg3MzU1Njg5fQ.3Apu6xEPgWIYatGjhJuWxS11TB6AwK_vkfMvqHThXco");


  const updateEmail = (e) =>{
    setEmail(e);

  };


  return (
    <div className="App">
      <Header/>

    <Router>
      <div>

      <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Stock Look</Navbar.Brand>
      <Nav className="mr-auto">
      <Nav.Link as={Link} to="/stocks">Stocks</Nav.Link>
      <Nav.Link as={Link} to="/search">Search</Nav.Link>
      <Nav.Link as={Link} to="/quotes">Quotes</Nav.Link>
      </Nav>
      <Nav className="justify-content-end">
      <Nav.Link as={Link} to="/register">Register</Nav.Link>
      <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Nav>
      </Navbar>




      <Link to="/" className="Nav.Link">Home</Link>
      <Link to="/stocks" className="Nav.Link">Stocks</Link>
      <Link to="/search">Search</Link>
      <Link to="/quotes">Quotes</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>


      

      <Switch>
        <Route exact path ="/Stocks"> <DisplayDefaultStocks/></Route>
        <Route exact path ="/login"> <LoginPage emailSet={updateEmail}/></Route>
        <Route exact path ="/search"><StockSearch/></Route>
        <Route exact path ="/quotes"><QuoteSearch authToken={token}/></Route>
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


