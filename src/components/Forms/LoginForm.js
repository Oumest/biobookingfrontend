import React, { Component, useState } from 'react';
import {Button, Form, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {userService} from '../services/userService';



export default class LoginForm extends Component{
    render(){
        const data= {
            AccountName: "",
            AccountPassword: "",
        };
            function handleClick(e) {
              e.preventDefault();
              userService.login(data.AccountName, data.AccountPassword);
            };

        return(
    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control autoFocus type="name" id="AccountName" placeholder="Enter username" onChange={e => data.AccountName = e.target.value}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Password" onChange={p => data.AccountPassword = p.target.value} />
                            </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            
                            <Form.Check type="checkbox" label="Remember Me" />
                        </Form.Group>
                        <Form.Group controlId="buttons">
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2">
                                    <Button className="ml-2" id="submitBtn" variant="primary" type="submit" onClick={handleClick}>
                                    Submit
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