import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, createRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from "react-bootstrap";
import getConfig from "next/config";

export type Listing = {
  listing_id?: string;
  ownerId?: string;
  title?: string;
  isbn_10?: string;
  isbn_13?: string;
  image?: string;
  author?: string;
  max_due_date?: string;
  isRented?: string;
};

type Props = {
  title?: string;
  author?: string;
  isbn_10?: string;
  isbn_13?: string;
  listing_id?: string;
  max_due_date?: string;
};

const Result = (props: Props) => {
  const [checkoutBook, setCheckoutBook] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [canCheckOut, setCanCheckOut] = useState(true);
  const { publicRuntimeConfig } = getConfig();
  const backendUrl = publicRuntimeConfig.backendUrl;

  const finishCheckout = () => {
    console.log("DD: " + props.max_due_date);
    setCanCheckOut(false);
    // setStatusMessage("You have checked out the book");
    setSuccess(true);
  };

  const checkOutBook = () => {
    finishCheckout();
    fetch(backendUrl + "/listings/checkoutBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" :  "*",    
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: JSON.stringify({
        listingId: props.listing_id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Success");
        setStatusMessage(result.message);
      });
  };

  if (!checkoutBook) {
    return (
      <Card className="searchResults">
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Text>Author: {props.author}</Card.Text>
          <Card.Text>ISBN 10: {props.isbn_10}</Card.Text>
          <Card.Text>ISBN 13: {props.isbn_13}</Card.Text>
          <Card.Text>Due Date: {props.max_due_date}</Card.Text>
          <Button
            className="submitButton"
            onClick={() => setCheckoutBook(true)}
            variant="primary"
          >
            Checkout
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Container fluid="sm" className="checkoutBox1">
        <Row className="toastRowCheckout">
          {success && (
            <Alert className="alertToast" variant="success">
              {statusMessage};
            </Alert>
          )}
        </Row>

        <Row>
          <Col className="loginText">Checkout</Col>
        </Row>

        <Row>
          <Col className="registrationInputBox2 top2">Title: {props.title}</Col>
        </Row>

        <Row>
          <Col className="registrationInputBox2 top2">
            Author: {props.author}
          </Col>
        </Row>

        <Row>
          <Col className="registrationInputBox2 top2">
            ISBN(10): {props.isbn_10}
          </Col>
        </Row>

        <Row>
          <Col className="registrationInputBox2 top2">
            ISBN(13): {props.isbn_13}
          </Col>
        </Row>

        <Row>
          <Col className="registrationInputBox2 top2">
            Return By:{" "}
            {props.max_due_date != null &&
              props.max_due_date.substr(0, props.max_due_date.length - 14)}
          </Col>
        </Row>

        <Row>
          <Col sm={3}></Col>
          <Col sm={4}>
            {canCheckOut && (
              <Button
                className="checkoutButton"
                onClick={checkOutBook}
                variant="primary"
              >
                Checkout
              </Button>
            )}
          </Col>
          <Col sm={4}>
            <Button
              className="checkoutButton"
              onClick={() => setCheckoutBook(false)}
              variant="primary"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Result;
