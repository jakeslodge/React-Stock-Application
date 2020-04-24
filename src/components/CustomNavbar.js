import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import {Form,FormControl,Button,Nav} from 'react-bootstrap/';
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import { render } from "@testing-library/react";


export class CustomNavbar extends React.Component{
    
  constructor(props){
    super(props);
    this.state ={email:this.props.emailVal,loggedinstatus:this.props.logVal}
  }

  componentWillReceiveProps(props)
  {
    this.setState({email:props.emailVal,loggedinstatus:props.logVal});
  }

  render(){

    //default cause noone is logged in
    if(!this.state.loggedinstatus)
    {
    return(
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
      
    );
    }
    else
    {

    return( //someone is logged in
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Stock Look</Navbar.Brand>
      <Nav className="mr-auto">
      <Nav.Link as={Link} to="/stocks">Stocks</Nav.Link>
      <Nav.Link as={Link} to="/search">Search</Nav.Link>
      <Nav.Link as={Link} to="/quotes">Quotes</Nav.Link>
      </Nav>
      <Nav className="justify-content-end">
    <Navbar.Text>Signed in as:{this.state.email}</Navbar.Text>
      <Nav.Link as={Link} to="/register">Register</Nav.Link>
      <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Nav>
      </Navbar>
      
    );
    }
  
    


  }
    

    

}