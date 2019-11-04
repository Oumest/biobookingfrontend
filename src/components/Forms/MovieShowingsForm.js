import React, { Component, useState } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {userService} from '../services/userService';



export default class MovieShowingsForm extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            MovieName : "",
            Date: "",
            Time: "",
            LoungeId: ""
        };
      }
      handleSubmit = () => {
          var MovieShowingTime = this.state.Date + "T" + this.state.Time + ":00"
          Object.assign(this.state, ({MovieShowingTime}))
          console.log(this.state.MovieShowingTime, this.state.MovieName, this.state.LoungeId) // vars to send to backend
      }

    render(){
        return(
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control autoFocus type="name" id="MovieTitle" placeholder="Enter movie title" onChange={e => this.state.MovieName = e.target.value}/>
                        </Form.Group>
                        <Form.Group controlId="loungeid">
                            <Form.Label>LoungeId</Form.Label>
                            <Form.Control type="name" id="loungeId" placeholder="Enter lounge id" onChange={p => this.state.LoungeId= p.target.value} />
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="name" id="password" placeholder="Enter date Yyyy-Mm-Dd" onChange={p => this.state.Date= p.target.value} />
                        </Form.Group>
                        <Form.Group controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="name" id="Time" placeholder="Time Hh:Mm" onChange={p => this.state.Time = p.target.value} />
                        </Form.Group>

                        <Form.Group controlId="buttons">
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2">
                                    <Button className="ml-2" id="submitBtn" variant="primary" type="button" onClick={this.handleSubmit}>
                                    Submit
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup >
                                    <Button className="ml-2" variant="primary" type="button" onClick={this.props.onClicked}>Close</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form> 
        );
    }

}