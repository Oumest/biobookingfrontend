import React, {Component} from 'react';
import {DropdownButton, ButtonGroup, Dropdown, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import {movieService} from '../components/services/movieService'


export default class LoungeListButton extends Component{
    constructor(props) {
        super(props);
        this.render.bind(this)
        this.state = {
            allLounges: "", // put array of dates here - get a func to fetch all dates
            btnTitle: "Choose lounge: ",
            isLoading : true

        };
        //this.handleClick = this.handleClick.bind(this)
        this.getLounges = this.getLounges.bind(this);
      }
      componentDidMount(){
          this.getLounges();
      }
      async getLounges(){
        var allLounges = await movieService.getAllLounges();
        
        setTimeout(() => {
            this.setState({ allLounges, isLoading: false });
          }, 1500);
        
    }
      handleClickLounge(item){
          var btnTitle = item
          Object.assign(this.state, {btnTitle})
        this.sendData(item)
      }
      sendData = (data) =>{
          var id = data

          this.props.getLoungeId(id)
      }

    render(){
        if (this.state.isLoading) {
            //this.getLounges()
            return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        else{
        return(
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title={this.state.btnTitle} id="bg-nested-dropdown">
                {this.state.allLounges.map(
                        item => (
                            <Dropdown.Item onClick={() => this.handleClickLounge(item.loungeId)}>
                                {item.loungeId}
                            </Dropdown.Item>
                        )
                    ) }
                    
                </DropdownButton>
            </ButtonGroup>
        );
                        }
}
}