import React, { Component } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import { userService } from '../services/userService';

export default class RegistrationForm extends Component{
    render(){
        const data= {
            AccountName : "",
            AccountPassword : "",
            PhoneNumber: "",
            email: ""
        };
            function handleClick(e) {
              e.preventDefault();
              userService.register(data.AccountName, data.AccountPassword, data.PhoneNumber, data.email);
              console.log(data);
            };
        return(
    <Form>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control autoFocus type="email" id="email" placeholder="Enter email" onChange={e => data.email = e.target.value}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="AccountPassword" placeholder="Password" onChange={p => data.AccountPassword = p.target.value} />
                        </Form.Group>
                        <Form.Group controlId="aName">
                            <Form.Label>
                                Account Name
                            </Form.Label>
                            <Form.Control type="name" id="AccountName" placeholder="Account Name" onChange={n => data.AccountName = n.target.value}/>
                        </Form.Group>
                        <Form.Group controlId="aName">
                            <Form.Label>
                                Phone Number
                            </Form.Label>
                            <Form.Control type="name" id="PhoneNumber" placeholder="Phone Number" onChange={n => data.PhoneNumber = n.target.value}/>
                        </Form.Group>
                        <Form.Group controlId="buttons">
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2">
                                    <Button className="ml-2" id="submitBtn" variant="primary" type="submit" onClick={handleClick}>
                                    Sign up
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup >
                                    <Button className="ml-2" variant="primary" type="reset" onClick={this.props.onClicked}>Close</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form> 
        );
    }

}