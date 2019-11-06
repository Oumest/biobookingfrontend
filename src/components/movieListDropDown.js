import React, {Component} from 'react';
import {DropdownButton, ButtonGroup, Dropdown, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import {movieService} from '../components/services/movieService'


export default class MovieListButton extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            allMovies: "", // put array of dates here - get a func to fetch all dates
            btnTitle: "Choose movie: ",
            isLoading : true,
            

        };
        //this.handleClick = this.handleClick.bind(this)
        this.getMovies = this.getMovies.bind(this);
      }
      componentDidMount(){
          this.getMovies();
      }
      async getMovies(){
        var allMovies = await movieService.getAllMovies();
        
        setTimeout(() => {
            this.setState({ allMovies, isLoading: false });
          }, 1500);
        
    }
      handleClickMovie(item){
        var btnTitle = item
        Object.assign(this.state, {btnTitle})
      this.sendData(item)
      }
      sendData = (data) =>{
          var title = data

          this.props.getMovieName(title)
      }

    render(){
        if (this.state.isLoading && !this.props.movieName) {
            return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        else{
        return(
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title={this.state.btnTitle} id="bg-nested-dropdown">
                {this.state.allMovies.map(
                        item => (
                            <Dropdown.Item onClick={() => this.handleClickMovie(item.movieName)}>
                                {item.movieName}
                            </Dropdown.Item>
                        )
                    ) }
                    
                </DropdownButton>
            </ButtonGroup>
        );
                        }
}
}