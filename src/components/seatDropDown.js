import React, {Component} from 'react';
import {DropdownButton, ButtonGroup, Dropdown, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import {movieService} from '../components/services/movieService'


export default class SeatButton extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            emptySeats: "", // put array of dates here - get a func to fetch all dates
            btnTitle: "Choose seat: ",
            curentRow: "",
            currentSeatNumber: "",
            movieDate :this.props.movieDate,
            movieTitle : this.props.movieTitle,
            loading: true
        };
        //this.handleClick = this.handleClick.bind(this)
        this.getSeats = this.getSeats.bind(this);
      }
      async getSeats(){
        var dateAndLounge = {"BookingForDate" : this.state.movieDate, "LoungeId" : "1"}
        var seats = await movieService.getEmptySeats(dateAndLounge)

        setTimeout(() => {
            this.setState({emptySeats : seats, loading: false});
          }, 1500);
    }
      handleClickSeat(item){
          this.getSeats();
          var seat = []
          var seatNum = item.substring(1, item.length)
          var row = item.substring(0,1)
        seat.push(row, seatNum)
        var btnTitle = seat
        Object.assign(this.state, {btnTitle})
        this.sendData(seat)
      }
      sendData = (data) =>{
          var seat = data

          this.props.getSeat(seat)
      }

    render(){
        if (!this.state.movieTitle || !this.state.emptySeats || this.state.loading) {
            this.getSeats();
            return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        else{
        return(
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title={this.state.btnTitle} id="bg-nested-dropdown">
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