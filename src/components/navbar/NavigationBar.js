import React from 'react';
import { Component } from 'react';
import { Nav, Navbar,DropdownButton, ButtonGroup, Dropdown} from 'react-bootstrap'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import LoginModal from './../LoginModal';
import { userService } from '../services/userService';


const Styles = styled.div`
    .navbar {
        background-color: #222;
    }
    .navbar-bar, .navbar-nav .nav-link {
        color:#bbb;
        
        .button{
            style="background-color:transparent"
        }
    }
`;

export default class NavigationBar extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            isShowing: false,
            user: {username : ""},
            showLoginBtn : true,
            showLogoutBtn : false

            
        };
        this.showLoginBtn = this.showLoginBtn.bind(this)
        this.showLogoutBtn = this.showLogoutBtn.bind(this)

    };
    showLoginBtn = () => {
        const {showLoginBtn} = this.state;
        this.setState({showLoginBtn : !showLoginBtn})
    }
    showLogoutBtn = () =>{
        const {showLogoutBtn} = this.state;
        this.setState({showLogoutBtn :!showLogoutBtn})
    }
    logOut = () => {
        userService.logout();
    }
    componentDidMount() {
        var data = JSON.parse(localStorage.getItem('user'));
        Object.assign(this.state, { user: data})



        if(this.state.user){
            Object.assign(this.state, {showLoginBtn : true})
            this.setState({
                showLoginBtn : true
            })
        }
        else{
            Object.assign(this.state, {showLoginBtn : false})
            this.setState({
                showLoginBtn : false
            })            
        }
        
        
    }
    
    openModalHandler = () => {
        this.setState({
            isShowing: true,
            user : localStorage.getItem('user')
        });
        console.log(this.state.user)
    }
    
    getUsername = () =>{
        if(this.state.user){
            return this.state.user.username
        }
        return " "
    }
    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }
    render(){
        const{user, showLoginBtn} = this.state;
        return(
    <Styles>
        <Navbar inverse fluid sticky="top" bg="dark" expand="sm">
            <Navbar.Brand href="/">BookingBio</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="navleft">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/movies">Movies</Nav.Link>
                        <Nav.Link href="/booking">Booking</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto" >
                        <Button hidden={this.state.showLoginBtn}>
                           <LoginModal/> 
                        </Button>
                        <ButtonGroup hidden={!this.state.showLoginBtn}>
                            <DropdownButton as={ButtonGroup} title={"Signed in as: " + this.getUsername()} id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1" href="/Profile">
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={this.logOut} href="/">
                            Sign out
                        </Dropdown.Item>
                        </DropdownButton>
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    </Styles>
    
        );
    }
}
