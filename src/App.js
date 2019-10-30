import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Home } from "./Home";
import { Register } from "./Register";
import { Booking } from "./Booking";
import { Movies } from "./Movies";
import { Profile } from "./Profile";
import { NoMatch } from "./NoMatch";
import {Layout} from "./components/Layout";
import NavigationBar from "./components/navbar/NavigationBar";


class App extends Component{
  constructor() {
    super();

    this.state = {
        isShowing: false
    }
}

openModalHandler = () => {
    this.setState({
        isShowing: true
    });
}

closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
}
  render(){
    return(
      <React.Fragment>
        <NavigationBar />
        {
          // add movie lists from moviedb

        }

        <Layout>
         <Router>
           <Switch>
             <Route exact path="/" component={Home} />
             <Route path="/movies" component={Movies} />
             <Route path="/register" component={Register} />
             <Route path="/booking" component={Booking} />
             <Route path="/profile" component={Profile} />
             <Route component={NoMatch}/>
           </Switch>
         </Router>
        </Layout>
      </React.Fragment>
    );
  }
}


export default App;
