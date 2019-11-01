import { userService } from "../../services/userService";
import React, { Component } from 'react';
import { Container, Row, Col, Image} from 'react-bootstrap';



export default class MovieContainer extends Component{

    constructor(props) {
        super(props);

        this.render.bind(this);
        this.state = {
          movies : {},
          img : ""
        };
      }
      async componentDidMount() {
        var data = await userService.getNewPopMovies();
        this.setState({movies : data})
        this.setState({img : data[1].poster_path})
        }

        render(){
            const style={
                display: 'flex',
                flexWrap: 'wrap'
              }
              
            return(
                <Container fluid={false}>
        <Row style={style}>
        <Image src={"http://image.tmdb.org/t/p/w185/" + this.state.img} responsive></Image>
        </Row>
      </Container>
            );
        }
}