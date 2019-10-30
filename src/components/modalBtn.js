import React, { Component } from 'react'
import { Button, Modal, OverlayTrigger, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'


export default class AuthModal extends Component {

  constructor() {
    super();
    this.render.bind(this);
    this.state = {showModal: false}
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleSelect(eventKey) {
    
    alert(`selected ${eventKey}`);
  }
  render () {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    return (
      <div>
        <span onClick={this.open.bind(this)}>Sign Up</span>
        <span onClick={this.open.bind(this)}>Log In</span>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <Nav bsStyle='pills' activeKey={this.eventKey} onSelect={this.handleSelect}>
                  <NavItem eventKey={1} title="Item" ><span className="login-nav-tab">Log In</span></NavItem>
                  <NavItem eventKey={1} title="Item" ><span className="login-nav-tab">Sign Up</span></NavItem>
                </Nav>
              </Col>
            </Row>
            <Row className='top-space' >
              <form>
                <FormGroup >
                  <Row>
                    <Col md={12}>
                      <input className="col-md-10 col-md-offset-1 top-space fat-input" placeholder="Email"/>
                      <input className="col-md-10 col-md-offset-1 top-space fat-input" placeholder="Password"/>
                    </Col>
                  </Row>
                  <Row className='top-space'>
                    <Col md={6} className='forgot-password'>
                      <a href="">Forgot Password</a>
                    </Col>
                  </Row>
                  <Row className='top-space'>
                    <Col md={10} mdOffset={1}>
                      <Button bsStyle="btn btn-black btn-block">Login</Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </Row>
            <hr></hr>

            <Row>
              <Col md={12} className="text-center">
               Login with blah
              </Col>
            </Row>
            <Row className="top-space">
              <Col md={6}>
                <Button bsStyle='btn btn-block btn-danger'>
                  Google
                </Button>
              </Col>
              <Col md={6}>
                <Button bsStyle='btn btn-block btn-info'>
                  Facebook
                </Button>
              </Col>
            </Row>


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}