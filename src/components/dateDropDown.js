import React, {Component} from 'react';
import {DropdownButton, ButtonGroup, Dropdown, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

export default class DateButton extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            AllDates: ["1", "2", "3", "4"], // put array of dates here - get a func to fetch all dates
            movieDate :"",
            movieTitle : this.props.movieTitle,
        };
        //this.handleClick = this.handleClick.bind(this)
        //this.fetchMovies = this.fetchMovies.bind(this);
      }
      async fetchDates(movieName){
        
        console.log(movieName)
    }
      handleClickDate(item){
        Object.assign(this.state, {movieDate : item})
        this.sendData()
        console.log(this.state)
      }
      sendData = () =>{
          this.props.formCallback(this.state.movieDate)
      }

    render(){
        if (!this.state.AllDates) {
            return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        else{
        return(
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title={"Choose date"} id="bg-nested-dropdown" onLoad={() => console.log(this.state)}>
                {this.state.AllDates.map(
                        item => (
                            <Dropdown.Item onClick={() => this.handleClickDate(item)}>
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