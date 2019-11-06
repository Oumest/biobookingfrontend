import React, { Component, useState, Fragment } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {userService} from '../services/userService';
import { movieService } from '../services/movieService';
import MovieListButton from '../movieListDropDown'



export default class RemoveMovieForm extends Component{
    constructor(props) {
        super(props);
        //this.render.bind(this)
        this.state = {
            MovieName : "",
            success : ""
        };
      }
      
       handleSubmit = async() => {
          var MovieName = this.state.MovieName;
          var resp = await movieService.deleteMovie(MovieName)
          setTimeout(() => {
          }, 1500);
          this.sendData(resp.status)

          //movieService.addShowing(this.state.MovieShowingTime, this.state.MovieName, this.state.LoungeId) // vars to send to backend
      }
      sendData = (responseStatus) =>{
        if(responseStatus === 200){
            var success = "Movie: " + this.state.MovieName + " removed succesfully";
            Object.assign(this.state, ({success}))
        }
        else{
            var success = "Something went wrong. Error " + responseStatus 
            Object.assign(this.state, ({success}))
        }
      }
      showSuccess = () =>{
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
      movieListCallback = (childData) => {
        Object.assign(this.state, {MovieName : childData})
    }

    render(){
        return(
                    <Form >
                        <Form.Group controlId="name">
                            <Form.Label>Movie Title:     </Form.Label>
                            <MovieListButton getMovieName={this.movieListCallback}/>
                        </Form.Group>

                        <Form.Group controlId="buttons">
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2">
                                    <Button className="ml-2" id="submitBtn" variant="primary" type="button" onClick={this.handleSubmit}>
                                    Submit
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup >
                                    <Button className="ml-2" variant="primary" type="button" onClick={this.props.onClicked}>Back</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Form.Group>
                        <Form.Group>
                        {this.showSuccess()}
                            
                        </Form.Group>
                    </Form>      
        );
    }

}