import React, { Component } from 'react';


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

    getUsername = () =>{
    var user = JSON.parse(localStorage.getItem('user'));
    var name = user.username
    Object.assign(this.state, ({username : name, isLoggedIn: true}))

}
    render(){
        if(this.state.isLoggedIn){
        this.getUsername()
    return(
    <div>
        <h1> Welcome {this.state.username}</h1>
        <h2>
            Hello world. This is my profile page
        </h2>
        <p>
            probably textbox
        </p>
        <p>
            maybe here
        </p>
        <p>
            blah blah
        </p>
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