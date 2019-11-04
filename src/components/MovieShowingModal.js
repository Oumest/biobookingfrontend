import React, { Component, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import LoginForm from './Forms/LoginForm';
import {userService} from './services/userService';
import RegistrationForm from './Forms/RegistrationForm';
import { movieService } from './services/movieService';
import MovieShowingsForm from './Forms/MovieShowingsForm';




export default class MovieShowingModal extends Component{
    constructor(props) {
        super(props);

        this.render.bind(this);
        this.state = {
          showModal: false,
        };

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


      render() {
        
          return(
              <div>
                <span onClick={this.open.bind(this)}>Add new movie</span>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Body>
                    <MovieShowingsForm onClicked={this.onChildClicked}/>
                    </Modal.Body>
                </Modal>
              </div>
          )
      }
}