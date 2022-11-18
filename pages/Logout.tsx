import Header from "./components/Header";
import { useState, useEffect } from "react";
import getConfig from "next/config";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import Link from 'next/link'

const Logout = () => {
  const { publicRuntimeConfig } = getConfig();
  const backendUrl = publicRuntimeConfig.backendUrl;
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); //non null means we have gotten a response from the api
  const [loggedOut, setLoggedOut] = useState(true);

  useEffect(() => { 
    checksignin();
  }, [] );

  const checksignin = () => {
    fetch(backendUrl + "/auth/verifyCredentials", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" :  "*",    
            "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
        }
    }).then(
        response => {
            if (response.ok) {
                setLoggedOut(false);
            } else {
                // TODO
            }
        }
    )
  }

  const logout = async () => {
    const response = await fetch(backendUrl + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      setSuccess(true);
      window.location.reload();
    }

    setLoggedOut(true);
    setStatusMessage(data.message);
  };

  return (
    <div className="page">
      <Header />

      <Container fluid="sm" className="loginBox2">
        <Row className="toastRow">
          {statusMessage && (
            <Alert className="alertToast" variant={success? "success" : "danger"}>
              {statusMessage}
            </Alert>
          )}
        </Row>
        <Row>
          <Col className="logoutText">Logout</Col>
        </Row>

        <Row>
        {!loggedOut && (<Col>
            <Button className="submitButton" onClick={logout} variant="primary">
              Logout
            </Button>
          </Col>)}
        {loggedOut && (<Col className='top2'>
          <p style={{textAlign:'center'}}>You are not Logged in</p>
          <Link href="/Login" >
              <a><button className="submitButton" style={{borderRadius:'25px'}}>Login Page</button></a>
          </Link>
        </Col>)}
        </Row>
      </Container>
    </div>
  );
};

export default Logout;
