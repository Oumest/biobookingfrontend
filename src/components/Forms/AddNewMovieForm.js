import React, { Component, useState, Fragment } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {userService} from '../services/userService';
import { movieService } from '../services/movieService';




export default class AddNewMovieForm extends Component{
    constructor(props) {
        super(props);
        //this.render.bind(this)
        this.state = {
            MovieName : "",
            success : "",
            test : ""
        };
      }
      
       handleSubmit = async() => {
          var MovieName = this.state.MovieName;
          var resp = await movieService.addMovie(MovieName)
          setTimeout(() => {
          }, 1500);
          this.sendData(resp)

          //movieService.addShowing(this.state.MovieShowingTime, this.state.MovieName, this.state.LoungeId) // vars to send to backend
      }
      sendData = (response) =>{
        if(response.status === 200){
            var success = "Movie: " + this.state.MovieName + " added succesfully";
            this.setState({success})
        }
        else{
            var success = "Something went wrong. Error " + response.status 
            this.setState({success})
        }
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
                            <Form.Control type="name" id="password" placeholder="Enter movie title" onChange={p => this.state.MovieName= p.target.value} />
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