import React, { Component, useState } from 'react';
import {Button, Modal, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import RegistrationFrom from './Forms/RegistrationForm';
import {userService} from './services/userService';

export default class RegistrationModal extends Component{
    constructor(props) {
        super(props);

        this.render.bind(this);
        this.state = {showModal: false};
        this.onChildClicked = this.onChildClicked.bind(this);
      }
    onChildClicked(){
        this.setState({showModal: false});
        console.log(localStorage);
    }

      close() {
        this.setState({ showModal: false });
      }
    
      open() {
        console.log(localStorage.user);
        
        this.setState({ showModal: true });
      }
      render() {
        
          return(
              <div>
                <span onClick={this.open.bind(this)}>Log In</span>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Body>
                    <RegistrationFrom/>
                    </Modal.Body>
                </Modal>
              </div>
          )
      }
}