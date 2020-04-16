import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import {Form,FormControl,Button,Nav} from 'react-bootstrap/';
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";

export function CustomNavbar(props){
    

    if(props.email!==""){
        return(<h1>given email</h1>);
    }
    else
    {
        return(

            <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Stock View</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#stocks">Stocks</Nav.Link>
      <Nav.Link href="#search">Search</Nav.Link>
      <Nav.Link href="#quote">Quote</Nav.Link>
    </Nav>
    
      
      <Nav.Link href="#login">Login</Nav.Link>
      <Nav.Link href="#register">Register</Nav.Link>
    
  </Navbar>
        </>






        );
    }

    

}