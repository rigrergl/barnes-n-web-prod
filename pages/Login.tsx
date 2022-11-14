import Header from "./components/Header";
import getConfig from 'next/config'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import Link from 'next/link'
import { useState, useEffect } from 'react'


const bcrypt = require("bcryptjs");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fail, setFail] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const { publicRuntimeConfig } = getConfig();
  const backendUrl = publicRuntimeConfig.backendUrl;

  useEffect(() => { 
    checksignin();
  }, [] );

  const login = async () => {
    const response = await fetch(backendUrl + "/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const data = await response.json();
    if (response.ok) {
        setSuccess(true);
        setLoggedIn(true);
        window.location.reload();
    } else {
        setFail(true);
        setStatusMessage(data.message);
    }
}

const checksignin = () => {
  fetch(backendUrl + "/auth/verifyCredentials", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      }
  }).then(
      response => {
          if (response.ok) {
              setLoggedIn(true);
              console.log(loggedIn);
          } else {
              // TODO
          }
      }
  )
}

  

  return (
    <div className='page'>

        {/* Header Component */}
        <Header />
        
        <Container fluid="sm" className='loginBox2'>
          <Row className='toastRow'>
          {success &&
                  (<Alert className='alertToast' variant="success">
                      Successfully logged in!
                  </Alert>)}
          {fail &&
          (<Alert className='alertToast' variant="success">
              Failed to Login! {statusMessage}
          </Alert>)}
          </Row>       
        <Row >
        
          <Col className='loginText'>
            Login 
          </Col>
        </Row>
        <Row>
        {!loggedIn && (<Col className='newUserLink'>
          <Link href="/Registration">
                <a style={{textDecoration: 'none', color:'black'}}>New User? Sign Up</a>
            </Link>
            <p className='newUserLine'></p>
          </Col>)}
        </Row>
        <Row>
        {!loggedIn && (<Col >
            <Form.Label htmlFor="inputUsername">Username:</Form.Label>
            <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="inputUsername"
                placeholder="Username"
            />
          </Col>)}
        </Row>
        <Row>
        {!loggedIn && (<Col className='top2'>
            <Form.Label htmlFor="inputPassword5">Password:</Form.Label>
            <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
            />
            {/*<a href='' style={{color:'black'}}>Forgot Password?</a>*/} 
            <br/>
            {/*<Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
          </Form.Text>*/}
          </Col>)}

          {loggedIn && (<Col className='top2'>
            <p style={{textAlign:'center'}}>You are already Logged in</p>
            <Link href="/Logout" >
                <a><button className="submitButton" style={{borderRadius:'25px'}}>Logout Page</button></a>
            </Link>
          </Col>)}
        </Row>
        <Row>
          
          <Col >
            {!loggedIn && (
            <Button className='submitButton' onClick={login} variant="primary">Login</Button>)}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login