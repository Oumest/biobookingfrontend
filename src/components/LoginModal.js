import React, { Component, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import LoginForm from './Forms/LoginForm';
import {userService} from './services/userService';
import RegistrationForm from './Forms/RegistrationForm';
import { movieService } from './services/movieService';




export default class LoginModal extends Component{
    constructor(props) {
        super(props);

        this.render.bind(this);
        this.state = {
          showModal: false,
          showReg: false,
          movies : {}
        };
        this.onChildClicked = this.onChildClicked.bind(this);
      }
    onChildClicked = () => {
        this.setState({showModal: false});
    }

      close() {
        this.setState({ showModal: false });
      }
    
      open() {
        this.setState({ showModal: true });
      }
      reg = () => {
        Object.assign(this.state, {showReg : true, showModal : false})
        this.setState({showReg : true});
    }
    closeReg(){
      this.setState({showReg : false})
    }
    onRegClose = () => {
      this.setState({showReg : false, showModal : true})
    }


      render() {
        
          return(
              <div>
                <span onClick={this.open.bind(this)}>Log In</span>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Body>
                    <LoginForm onClicked={this.onChildClicked}/>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.reg}>Need an account?</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={!this.state.showModal && this.state.showReg} onHide={this.closeReg.bind(this)}>
                <Modal.Body>
                    <RegistrationForm onClicked={this.onRegClose}/>
                    </Modal.Body>
                </Modal>
              </div>
          )
      }
}