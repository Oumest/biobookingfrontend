import React, { Component } from 'react';
import ProfileForm from './components/Forms/ProfileForm';

export default class  Profile extends Component {
    constructor(props) {
        super(props);

        this.render.bind(this);
        this.state = {
            isLoggedIn: false,
          username : ""
        };
        this.getUsername = this.getUsername.bind(this)
    }

    componentDidMount(){
        this.getUsername();
    }
    getUsername = () =>{
    var user = JSON.parse(localStorage.getItem('user'));
    var name = user.username
    this.setState({username : name, isLoggedIn: true})
    //Object.assign(this.state, ({username : name, isLoggedIn: true}))

}
    render(){
        if(this.state.isLoggedIn){
    return(
    <div>
        <h1> Welcome {this.state.username}</h1>
        <ProfileForm></ProfileForm>
    </div>
    )
}
else{
    return(
        <div>
            Unauthorized
        </div>
        )

}
}
}