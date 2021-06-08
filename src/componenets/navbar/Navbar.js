import React from 'react';
import {Navbar,Nav,Container} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const NavBar = () => {
    return(
		<Navbar bg="dark" expand="lg" style={{background:"linear-gradient(180deg,#8f79f5,#4a2ec7) ",padding:"20px"}}>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="m-auto">
				<Nav.Link style={{paddingRight:"60px" ,color:"white",fontSize:"20px"}} href="/">Home</Nav.Link>
				<Nav.Link style={{paddingRight:"60px" ,color:"white",fontSize:"20px"} }href="/examples">Examples</Nav.Link>
				<Nav.Link style={{paddingRight:"60px" ,color:"white",fontSize:"20px"}} href="/about">About</Nav.Link>
				
				</Nav>
				
			</Navbar.Collapse>
		</Navbar>)
}
export default NavBar;
