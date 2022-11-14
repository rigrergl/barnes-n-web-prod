import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from "react-bootstrap";
import getConfig from "next/config";

export type HistoricalCheckOutListing = {
  listing_id?: string;
  ownerId?: string;
  title?: string;
  isbn_10?: string;
  isbn_13?: string;
  image?: string;
  author?: string;
  max_due_date?: string;
  rented_by?: string;
};

type Props = {
  title?: string;
  author?: string;
  isbn_10?: string;
  isbn_13?: string;
  listing_id?: string;
  max_due_date?: string;
  rented_by?: string;
};

const HistoricalCheckOutResult = (props: Props) => {
  const [checkInBook, setCheckInBook] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(true);
  const [currentlyRenting, setCurrentlyRenting] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const backendUrl = publicRuntimeConfig.backendUrl;

  useEffect(() => {
    checkRentedBy();
  }, []);

  const checkRentedBy = () => {
    if (props.rented_by != null || props.rented_by != "") {
      setCurrentlyRenting(true);
    }
  };

  const checkIn = async () => {
    const response = await fetch(backendUrl + "/listings/returnBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listingId: props.listing_id,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setCanCheckIn(false);
      setCurrentlyRenting(false);
      setCheckInBook(false);
      setSuccess(true);
    } else {
      setStatusMessage(data.message);
      setSuccess(true);
    }
  };

  const finishCheckIn = () => {
    console.log("DD: " + props.max_due_date);
    setCanCheckIn(false);
    setStatusMessage("You have checked in the book");
    setSuccess(true);
  };

  if (!checkInBook) {
    return (
      <Card className="searchResults">
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Text>Author: {props.author}</Card.Text>
          <Card.Text>ISBN 10: {props.isbn_10}</Card.Text>
          <Card.Text>ISBN 13: {props.isbn_13}</Card.Text>
          <Card.Text>Due Date: {props.max_due_date}</Card.Text>

          {currentlyRenting && <Card.Text>Currently Renting: Yes</Card.Text>}
          {!currentlyRenting && <Card.Text>Currently Renting: No</Card.Text>}

          {canCheckIn && (
            <Button
              className="submitButton"
              onClick={() => setCheckInBook(true)}
              variant="primary"
            >
              Checkin
            </Button>
          )}
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
          <Col className="loginText">Checkin</Col>
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
            {canCheckIn && (
              <Button
                className="checkoutButton"
                onClick={checkIn}
                variant="primary"
              >
                Checkin
              </Button>
            )}
          </Col>
          <Col sm={4}>
            <Button
              className="checkoutButton"
              onClick={() => setCheckInBook(false)}
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

export default HistoricalCheckOutResult;
