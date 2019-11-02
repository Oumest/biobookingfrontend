import React, {Component} from 'react';
import {DropdownButton, ButtonGroup, Dropdown, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

export default class SeatButton extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            emptySeats: ["A1", "A2", "C3", "D4"], // put array of dates here - get a func to fetch all dates
            curentRow: "",
            currentSeatNumber: "",
            movieDate :this.props.movieDate,
            movieTitle : this.props.movieTitle,
        };
        //this.handleClick = this.handleClick.bind(this)
        //this.fetchMovies = this.fetchMovies.bind(this);
      }
      async fetchSeats(movieName){
        
        console.log(movieName)
    }
      handleClickSeat(item){
          console.log("clicked seat: " + item + " for movie " + this.state.movieTitle)
          var seat = []
          var seatNum = item.substring(1, item.length)
          var row = item.substring(0,1)
        seat.push(row, seatNum)
        this.sendData(seat)
      }
      sendData = (data) =>{
          var seat = data
          console.log("sending seat data..." + seat)
          this.props.getSeat(seat)
      }

    render(){
        if (!this.state.movieTitle) {
            return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        else{
        return(
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title={"Choose seat"} id="bg-nested-dropdown" onLoad={() => console.log("loaded seatbtn")}>
                {this.state.emptySeats.map(
                        item => (
                            <Dropdown.Item onClick={() => this.handleClickSeat(item)}>
                                {item}
                            </Dropdown.Item>
                        )
                    ) }
                    
                </DropdownButton>
            </ButtonGroup>
        );
                        }
}
}