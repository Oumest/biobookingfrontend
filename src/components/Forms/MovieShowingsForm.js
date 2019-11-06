import React, { Component, useState, Fragment } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {userService} from '../services/userService';
import { movieService } from '../services/movieService';
import MovieListButton from '../movieListDropDown'
import LoungeListButton from '../loungeDropDown'




export default class MovieShowingsForm extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            MovieName : "",
            Date: "",
            Time: "",
            LoungeId: "",
            success : ""
        };
      }
      
      handleSubmit = () => {
          var MovieShowingTime = this.state.Date + "T" + this.state.Time + ":00"
          Object.assign(this.state, ({MovieShowingTime}))
          this.setState({MovieShowingTime})

          movieService.addShowing(this.state.MovieShowingTime, this.state.MovieName, this.state.LoungeId) // vars to send to backend
          var success = this.state.MovieName + " added succesfully for " + this.state.Date + " " + this.state.Time + " in Lounge " + this.state.LoungeId;
            this.setState({success})
      }
      movieListCallback = (childData) => {
        Object.assign(this.state, {MovieName : childData})
    }
    loungeListCallback = (childData) => {
        Object.assign(this.state, {LoungeId : childData})
        
    }

    render(){
        var showSuccess = () =>{
            if(this.state.success){
            return <Form.Label>
                {this.state.success}
            </Form.Label>
            }
            else{
                return <Form.Label>
                {this.state.success}
            </Form.Label>
            }
        }
        return( 
                    <Form >

                        <Form.Group controlId="name">
                            <Form.Label>Movie Title:     </Form.Label>
                            <MovieListButton getMovieName={this.movieListCallback}/>
                        </Form.Group>
                        <Form.Group controlId="loungeid">
                            <Form.Label>Choose lounge:     </Form.Label>
                            <LoungeListButton movieName={this.state.MovieName} getLoungeId={this.loungeListCallback}/>
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="name" id="date" placeholder="Enter date Yyyy-Mm-Dd" onChange={p => this.state.Date= p.target.value} />
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
                        <Form.Group>
                            {this.state.success}
                        </Form.Group>
                    </Form>      
        );
    }

}