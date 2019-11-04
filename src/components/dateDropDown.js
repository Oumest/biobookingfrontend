import React, {Component} from 'react';
import {DropdownButton, ButtonGroup, Dropdown, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { movieService } from './services/movieService';


export default class DateButton extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            AllDates: this.props.allDates, // put array of dates here - get a func to fetch all dates
            movieDate :"",
            movieTitle : this.props.movieTitle,
            isFetching: true
        };
        //this.handleClick = this.handleClick.bind(this)
        //this.fetchDates = this.fetchDates.bind(this);
      }
      async componentDidMount(){

        
    }

      async fetchDates(){ // should get dates - check fetched formatting..
            var title = this.state.movieTitle
          
          var Alldates = await movieService.getMoveShowings(title);
          var dates = [];
          dates = Alldates
          var AllDates = dates
          Object.assign(this.state, {AllDates, isFetching : false})
          
    }
      handleClickDate(item){
        Object.assign(this.state, {movieDate : item.date + "T" + item.time})
        this.sendData()
      }
      sendData = () =>{
          this.props.dateCallback(this.state.movieDate)
      }
      isFetchDates(){
          return this.state.isFetching
      }
      generateDateBtn = () =>{

          return <DropdownButton as={ButtonGroup} title={"Choose date"} id="bg-nested-dropdown">
          {this.state.AllDates && this.state.AllDates.map(
                  item => (
                      <Dropdown.Item onClick={() => this.handleClickDate(item)}>
                          {item.date + " " + item.time}
                      </Dropdown.Item>
                  )
              ) }
              
          </DropdownButton>

      }

    render(){
        
        return(
            <ButtonGroup>

                {this.generateDateBtn()}
                    

            </ButtonGroup>
        );
    
}
}