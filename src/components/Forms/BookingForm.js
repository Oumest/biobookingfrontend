import React, { Component } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import { bookingService } from '../services/BookingService';
//import Dropdown from '../DropdownList/Dropdown'
import DateButton from '../dateDropDown';
import SeatButton from '../seatDropDown';
import Spinner from 'react-bootstrap/Spinner';
import { movieService } from '../../components/services/movieService';
import LoungeListButton from '../loungeDropDown'



export default class BookingForm extends Component{ // ADD DropDown for lounge. Change so user stores email in localstorage
    constructor(props)
    {
        super(props)
        this.state={
            selectedMovieShowing: this.props.movieTitle,
            email: "",
            AllDates: "",
            bookingForDate : "",
            rowNumber : "",
            seatNumber: "",
            loungeId: "1",
            showSeatBtn : false,
            loading: true,
            booked : false,
            showLoungeBtn : false
        }
        this.handleClick = this.handleClick.bind(this)
        this.fetchDates = this.fetchDates.bind(this)
    }
    componentDidMount(){

        if(this.state.selectedMovieShowing){
        this.fetchDates().then(() => {this.loading = false})
        
        }
    }

    async fetchDates(){
        var title = this.state.selectedMovieShowing
      
      var AllDates = await movieService.getMoveShowings(title);
      //var dates = [];
      //dates = Alldates
      //var AllDates = dates
      setTimeout(() => {
        this.setState({ AllDates, loading: false });
      }, 1500);

      
}
    dateCallback = (childData) => {
        Object.assign(this.state,{bookingForDate : childData});
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
        this.storeSeats(childData)
        Object.assign(this.state, {showLoungeBtn: true})
    }
    
    createSeatBtn(date, title){
        if(this.state.showSeatBtn){
       return (
       <div><SeatButton movieDate={date} movieTitle={title}  getSeat={this.seatCallback}/></div>)
        }
    }

    createLoungeBtn(){
        if(this.state.showLoungeBtn){
            return(
                <div><LoungeListButton getLoungeId={this.loungeListCallback}/></div>
            )
        }
    }
    loungeListCallback = (childData) => {
        Object.assign(this.state, {loungeId : childData})
    }
    handleClick(e) {
        e.preventDefault();
        if(!localStorage.user){
        bookingService.bookingWithoutAccount(this.state.email, this.state.bookingForDate, this.state.rowNumber, this.state.seatNumber, this.state.loungeId);
        Object.assign(this.state, ({booked: true}))
        }
        else{
            bookingService.bookinWithAccount(this.state.bookingForDate, this.state.rowNumber, this.state.seatNumber, this.state.loungeId)
            Object.assign(this.state, ({booked: true}))
        }
      };


    render(){
        if (this.state.loading) {
            return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        else if(this.state.booked){
            const fulldate = this.state.bookingForDate
            const date = fulldate.substring(0,10) + " " + fulldate.substring(11, fulldate.length)
            return(
                
            <div><h3>Succesfully booked movie {this.state.selectedMovieShowing}</h3>
                <p> Movie date: {date}</p>
                <p> Your seat: {this.state.rowNumber}{this.state.seatNumber}</p>

                <ButtonToolbar>
                                <ButtonGroup >
                                    <Button className="ml-2" variant="primary" type="reset" onClick={this.props.onClicked}>Close</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
             </div>
            


            )
        }
        else{
        return(
                    <Form> {this.state.selectedMovieShowing && !this.state.loading}
                        <Form.Group controlId="movie">
                            <Form.Label>{this.state.selectedMovieShowing}</Form.Label>                           
                        </Form.Group>
                        <Form.Group  controlId="emailaddress" hidden={this.loggedIn()}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => this.state.email = e.target.value}/>
                            <Form.Text className="text-muted">            
                            </Form.Text>
                        </Form.Group> 
                        <Form.Label>Date: </Form.Label>
                        <DateButton movieTitle = {this.state.selectedMovieShowing} allDates = {this.state.AllDates} dateCallback = {this.dateCallback} ></DateButton>                    

                        <Form.Group controlId="rowNumber" hidden={!this.state.showSeatBtn} value={this.state.showSeatBtn} >
                        <Form.Label>Seat: </Form.Label>
                            {this.createSeatBtn(this.state.bookingForDate, this.state.selectedMovieShowing)}
                        </Form.Group>
                        <Form.Group controlId="loungeId">
                            <Form.Label>Lounge: </Form.Label>
                            {this.createLoungeBtn()}
                                                    
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
    }}

}