import type { NextPage } from "next";
import Container from "react-bootstrap/Container";
import React from 'react';
import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";


const navigateToRegistration = () => {
  window.location.href = "/Registration";
};

const Home: NextPage = () => {
  return (
    <div className="page">
      {/* Header Component */}
      <Header />

      <Container fluid="sm" className="">
        <Row >
          <Col className='homepageTitle'>
            Welcome to Barnes-n-Web!
          </Col>
        </Row>

        <Row >
          <Col className='homepageBody'>
            Scared of commitment but love physical books you can hold?  <br />
            Then you've come to the right place!  <br />
            Barnes-n-Web provides a safe way to borrow books from others!  <br />
          </Col>
        </Row>

        <Row>
          <Button
            className='GetStarted'
            name='getStarted'
            onClick={navigateToRegistration}
            variant="primary"> Get Started </Button>
        </Row>

        <Row >
          <Col className='homepageBodyTitle'>
            How it works
          </Col>
        </Row>

        <Row>
          <div className="circle">
            <p className="textInCircle">Create an account <br/> or log in</p>
          </div>

          <div className="circle2">
            <p className="textInCircle">Search for the book you're looking for</p>
          </div>

          <div className="circle2">
            <p className="textInCircle">Borrow the book from our amazing loaners!</p>
          </div>
        </Row>


      </Container>

    </div>

  );
};

export default Home;