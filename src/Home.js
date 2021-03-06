import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'; 
import MovieContainer from './components/movies/components/MovieContainer';
import { movieService } from './components/services/movieService';
import { Col, Row, Container, ButtonToolbar, Button} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import styled from 'styled-components'
import {URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_MED  } from './helpers/const'
import dateDropDown from './components/dateDropDown';
import DateButton from './components/dateDropDown';
import BookingModal from './components/BookingModal';


const titleStyle = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
}

const StyledImg = styled.div`
    &:hover .image{
       opacity:1;
    }
    &:hover .title{
       opacity: 1;
    }
  `;
  const Info =  styled.div`
      position: absolute;
      top: 75%;
      margin:10px;
      color:white;
      font-weight:bold;
      opacity:0;
  `;
export default class Home extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            movies : "",
            showMovieList : true,
            showMovieInfo : false,
            movieToShow : [],
            showBookingModal : false, 
            AllDates: ""
        };
        this.handleClick = this.handleClick.bind(this)
        this.fetchMovies = this.fetchMovies.bind(this);
      }



      async componentDidMount(){
          this.fetchMovies();
          var vals = movieService.getAllMovies()
      }
      async fetchDates(){
        var title = this.state.movieToShow[0].title
      
      var AllDates = await movieService.getMoveShowings(title);
      //var dates = [];
      //dates = Alldates
      //var AllDates = dates
      Object.assign(this.state, {AllDates, loading: false})

      
}
async fetchMovies(){
    var movies = await movieService.getcurrentPop();
    this.setState({movies})

}
handleClick(item){
    this.setState(prevState => ({ showMovieList: !prevState.showMovieList, showMovieInfo: !prevState.showMovieInfo }))
    this.setState({showMovieList : false, showMovieInfo : true})

    var movieToShow = []
    movieToShow.push(item);
    Object.assign(this.state, {movieToShow})
    //this.fetchDates();

}
handleBackClick(){
    this.setState(prevState => ({ showMovieList: !prevState.showMovieList, showMovieInfo: !prevState.showMovieInfo }))
    Object.assign(this.state, {movieToShow : ""})
    
}
openBooking(){
    this.fetchDates();
    this.setState({showBookingModal : true})
}
    render(){
        if (!this.state.movies) {
            return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        
        else{
        return(
            <Container>
                
                <Row>
                    {this.state.showMovieList && this.state.movies.map(
                        movie => (
                            <Col>
                            <Image src={URL_IMG + IMG_SIZE_MED + movie.poster_path} onClick={() => this.handleClick(movie)} responsive></Image>
                            </Col>
                        )
                    ) }
                    {!this.state.showMovieList && this.state.movieToShow.map(
                        movie => (
                            
                            <React.Fragment>
                                <table>
                                    
                                <td>
                                    <dt>
                                    <StyledImg>
                                        <Image   src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path} responsive></Image>
                                    </StyledImg>
                                    </dt>
                                </td>
                                    <dd>
                                    <h1 className="align-text-top" style={titleStyle}>
                                {movie.title}
                                </h1>
                                    </dd>
                                <h4>
                                    Imdb vote: {movie.vote_average}
                                </h4>
                                
                                
                                <h4>
                                    Release date: {movie.release_date}
                                </h4>
                                </table>

                                <table>
                                    <dt>Overview</dt>
                                    {movie.description}
                                </table>
                                <table>
                                <ButtonToolbar className="text-right">
                                    <Button  variant="primary" size="lg" active onClick={() => this.openBooking()}>
                                    <BookingModal movieTitle={movie.title} AllDates={this.state.AllDates} hidden={this.state.showBookingModal}/>
                                    </Button>
                                    <Button variant="secondary" size="lg" active onClick={() => this.handleBackClick()} >
                                        Back
                                    </Button>
                                </ButtonToolbar>
                                
                                </table>
                            </React.Fragment>
                            
                        )
                    ) }
                   </Row>
            </Container>
        ) }}
}