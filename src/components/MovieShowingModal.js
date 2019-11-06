import React, { Component, useState } from 'react';
import {Button, Modal, ButtonGroup} from 'react-bootstrap';
import LoginForm from './Forms/LoginForm';
import {userService} from './services/userService';
import RegistrationForm from './Forms/RegistrationForm';
import { movieService } from './services/movieService';
import MovieShowingsForm from './Forms/MovieShowingsForm';
import AddNewMovieForm from './Forms/AddNewMovieForm'
import RemoveMovieForm from './Forms/RemoveMovieForm'




export default class MovieShowingModal extends Component{
    constructor(props) {
        super(props);

        this.render.bind(this);
        this.state = {
          showModal: false,
          showAddMovie: false,
          showRemoveMovie: false
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
      addMovie = () => {
        Object.assign(this.state, {showAddMovie : true, showModal : false, showRemoveMovie : false})
        this.setState({showAddMovie : true});
    }
    addShowing = () =>{
      this.setState({showAddMovie : false, showRemoveMovie : false})
      this.open();
    }

    closeAddMovie = () =>{
      this.setState({showAddMovie : false})
    }
    closeRemoveMovie = () => {
      this.setState({showRemoveMovie : false})
    }
    addMovieCallback = (childData) => {
      Object.assign(this.state, {movieMessage : childData})
    }
    removeMovie = () => {
      Object.assign(this.state, {showAddMovie : false, showModal : false, showRemoveMovie : true})
        this.setState({showRemoveMovie : true});
    }
    

      render() {
        
          return(
              <div>
                <span onClick={this.open.bind(this)}>Add new movie</span>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <ButtonGroup aria-label="Basic example">
                  <Button onClick={this.addShowing}>Add movie showings</Button>
                  <Button onClick={this.addMovie}>Add new movies</Button>
                  <Button onClick={this.removeMovie}>Remove movies</Button>
                  </ButtonGroup>
                    <Modal.Body>
                    <MovieShowingsForm onClicked={this.onChildClicked}/>
                    </Modal.Body>
                </Modal> 
              
                <Modal show={this.state.showAddMovie} onHide={this.closeAddMovie.bind(this)}>
                <Modal.Body>
                    <AddNewMovieForm onClicked={this.addShowing}/>
                    </Modal.Body>
                </Modal>
                <Modal show = {this.state.showRemoveMovie} onHide={this.closeRemoveMovie.bind(this)}>
                  <Modal.Body>
                    <RemoveMovieForm onClicked={this.addShowing}/>
                  </Modal.Body>
                </Modal>
                
              </div>
          )
      }
}