import React, { Component } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import { bookingService } from '../services/BookingService';
//import Dropdown from '../DropdownList/Dropdown'
import DateButton from '../dateDropDown';


export default class BookingForm extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            selectedMovieShowing: this.props.movieTitle,
            email: "",
            bookingForDate : "",
            rowNumber : "",
            seatNumber: "",
            loungeId: "",
        }
    }
    callback = (childData) => {
        Object.assign(this.state,{bookingForDate : childData});
        console.log(this.state)
    }
    
    render(){
        const data= {
            email : "",
            bookingForDate : "",
            rowNumber: "",
            seatNumber: "",
            loungeId: ""
        };
            function handleClick(e) {
              e.preventDefault();
              bookingService.bookingWithoutAccount(data.email, data.bookingForDate, data.rowNumber, data.seatNumber, data.loungeId);
            };

        return(
    <Form> {this.state.selectedMovieShowing}
                        <Form.Group controlId="movie">
                            <Form.Label>{this.state.movieTitle}</Form.Label>                           
                        </Form.Group>
                        <Form.Group controlId="emailaddress">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => data.email = e.target.value}/>
                            <Form.Text className="text-muted">            
                            </Form.Text>
                        </Form.Group>  
                        <DateButton movieTitle = {this.state.selectedMovieShowing} formCallback = {this.callback} ></DateButton>                    
                             
                        <Form.Group controlId="rowNumber">
                            <Form.Label>
                                Choose row
                            </Form.Label>
                            <Form.Control onChange={n => data.rowNumber = n.target.value}/>
                        </Form.Group>
                        <Form.Group controlId="seatNumber">
                            <Form.Label>
                                Choose seat
                            </Form.Label>
                            <Form.Control onChange={n => data.seatNumber = n.target.value}/>                           
                        </Form.Group>  
                        <Form.Group controlId="loungeId">
                            <Form.Label>
                                Choose lounge
                            </Form.Label>
                            <Form.Control onChange={n => data.loungeId = n.target.value}/>                           
                        </Form.Group>                        
                        <Form.Group controlId="buttons">
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2">
                                    <Button className="ml-2" id="submitBtn" variant="primary" type="submit" onClick={handleClick}>
                                    Book
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup >
                                    <Button className="ml-2" variant="primary" type="reset" onClick={this.props.onClicked}>Close</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form> 
        );
    }

}