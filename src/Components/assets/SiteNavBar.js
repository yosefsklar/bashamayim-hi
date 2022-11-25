import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import classes from '../../styles/Navbar.module.css';
import {Link} from 'react-router-dom';

export default class TimeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {
        return (
            <Navbar className={classes.NavbarOuter} expand="lg">
                <Navbar.Brand className={classes.NavbarInner} href="#">Bashamayim Hi</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/*<Navbar.Collapse id="basic-navbar-nav">*/}
                {/*    <Nav className="mr-auto">*/}
                {/*        <Nav.Link as={Link} to="/about">About</Nav.Link>*/}
                {/*        <Nav.Link as={Link} to="/suggestions">Suggestions</Nav.Link>*/}
                {/*    </Nav>*/}
                {/*</Navbar.Collapse>*/}
            </Navbar>
        )
    }
}