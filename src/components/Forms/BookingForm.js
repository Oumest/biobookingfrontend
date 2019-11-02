import React, { Component } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import { bookingService } from '../services/BookingService';
//import Dropdown from '../DropdownList/Dropdown'
import DateButton from '../dateDropDown';
import SeatButton from '../seatDropDown';
import Spinner from 'react-bootstrap/Spinner'


export default class BookingForm extends Component{ // ADD DropDown for lounge. Change so user stores email in localstorage
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
            showSeatBtn : false,
        }
        this.handleClick = this.handleClick.bind(this)
    }
    dateCallback = (childData) => {
        Object.assign(this.state,{bookingForDate : childData});
        console.log("date from dateDropdown fetched")
        console.log(this.state)
        Object.assign(this.state, {showSeatBtn : true})
    }
    loggedIn(){
        if(!localStorage.user){
            return false
        }
        else {return true}
    }
    showSeatBtn(){
        
        return this.state.showSeatBtn
    }
    storeSeats = (childData) => {
        Object.assign(this.state,{rowNumber : childData[0], seatNumber : childData[1]})

    }
    seatCallback = (childData) => {
        console.log("fetched seat data..." + childData)
        this.storeSeats(childData)
        console.log(this.state)
    }

    handleClick(e) {
        e.preventDefault();
        if(!localStorage.user){
            
        bookingService.bookingWithoutAccount(this.state.email, this.state.bookingForDate, this.state.rowNumber, this.state.seatNumber, this.state.loungeId);
        }
        else{
            Object.assign(this.state, {email : localStorage.user.email})
            bookingService.bookingWithoutAccount(this.state.bookingForDate, this.state.rowNumber, this.state.seatNumber, this.state.loungeId)
        }
      };

    render(){
        const data= {
            email : "",
            bookingForDate : "",
            rowNumber: "",
            seatNumber: "",
            loungeId: ""
        };
            
        
        return(
    <Form> {this.state.selectedMovieShowing}
                        <Form.Group controlId="movie">
                            <Form.Label>{this.state.movieTitle}</Form.Label>                           
                        </Form.Group>
                        <Form.Group  controlId="emailaddress" hidden={this.loggedIn()}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => data.email = e.target.value}/>
                            <Form.Text className="text-muted">            
                            </Form.Text>
                        </Form.Group> 

                        <DateButton movieTitle = {this.state.selectedMovieShowing} dateCallback = {this.dateCallback} ></DateButton>                    
                             
                        <Form.Group controlId="rowNumber" hidden={!this.state.showSeatBtn}>
                            
                            <SeatButton movieDate={this.state.bookingForDate} movieTitle={this.state.selectedMovieShowing}  getSeat={this.seatCallback}/>
                            
                            
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
                                    <Button className="ml-2" id="submitBtn" variant="primary" type="submit" onClick={this.handleClick}>
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