import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import BookingForm from './Forms/BookingForm';
import { movieService } from './services/movieService';

export default class BookingModal extends Component{
    constructor(props) {
        super(props);

        this.render.bind(this);
        this.state = {
          showModal: false,
          movie : this.props.movieTitle,
          user: {},
          dates: []
        };
        this.onChildClicked = this.onChildClicked.bind(this);
      }
      onChildClicked = () => {
        this.setState({showModal: false});
    }
    open(){
        this.setState({showModal : true});
        console.log(this.props)
        console.log(this.state)
    }
    close(){
        this.setState({showModal : false});
    }

render(){
    return(
        <div>
                <span onClick={this.open.bind(this)}>Choose date</span>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Body>
                    <BookingForm movieTitle = {this.state.movie} onClicked={this.onChildClicked}/>
                    </Modal.Body>
                </Modal>
              </div>
    );
}
}