import React, { Component, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import LoginForm from './Forms/LoginForm';
import {userService} from './services/userService';
import RegistrationForm from './Forms/RegistrationForm';




export default class LoginModal extends Component{
    constructor(props) {
        super(props);

        this.render.bind(this);
        this.state = {
          showModal: false,
          showReg: false
        };
        this.onChildClicked = this.onChildClicked.bind(this);
      }
    onChildClicked(){
        this.setState({showModal: false});
    }

      close() {
        this.setState({ showModal: false });
      }
    
      open() {
        this.setState({ showModal: true });
      }
      reg = () => {
        console.log("show reg")
        Object.assign(this.state, {showReg : true, showModal : false})
        this.setState({showReg : true});
    }
    closeReg(){
      this.setState({showReg : false})
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
                    <RegistrationForm/>
                    </Modal.Body>
                </Modal>
              </div>
          )
      }
}