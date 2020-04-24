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
  NavLink,
  Redirect
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
import { useHistory } from "react-router-dom";
import {HomePage} from './components/HomePage';
import { RegisterPage } from './components/RegisterPage';







export default function App() {


  //is there an email address logged in
  const [email,setEmail] = useState("a");
  const [token,setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impha2UxMjNAYXBpLmNvbSIsImV4cCI6MTU4Nzc5OTkxOCwiaWF0IjoxNTg3NzEzNTE4fQ.cjsBUWwhN_zj70W08O754DLnZ0QOG2_aGKbhATL4II4");
  const [loggedIn,setLogin] = useState(false);

  const updateEmail = (e) =>{
    setEmail(e);

  };

  const updateToken = (e) =>{
    setToken(e);
  };

  const updateLogin = (e) =>{
    setLogin(e);
  };


  return (

    <div className="App">
    <Header/>
    
    
    <Router>
      <div>
    
      <CustomNavbar emailVal ={email} logVal = {loggedIn}/>

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
      



      

      <Switch>
        <Route exact path ="/"><HomePage/></Route>
        <Route exact path ="/Stocks"> <DisplayDefaultStocks/></Route>
        <Route exact path ="/login"> <LoginPage loginSet={updateLogin}emailSet={updateEmail}tokenSet={updateToken}/></Route>
        <Route exact path ="/search"><StockSearch/></Route>
        <Route exact path ="/quotes"><QuoteSearch  authToken={token}/></Route>
        <Route exact path = "/register"><RegisterPage/></Route>
      </Switch>

      </div>
    </Router>

    </div>
  );
}


