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

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [optaddress, setOptAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [success, setSuccess] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const [statusMessage, setStatusMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const { publicRuntimeConfig } = getConfig();
  const backendUrl = publicRuntimeConfig.backendUrl;

  const checksignin = () => {
    fetch(backendUrl + "/auth/verifyCredentials", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
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

  useEffect(() => { 
    checksignin();
  }, [] );

  const signup = async () => {
    if (
      username != "" &&
      password != "" &&
      confirmPassword != "" &&
      fullname != "" &&
      phone != "" &&
      email != "" &&
      street != "" &&
      city != "" &&
      state != "" &&
      zipcode != ""
    ) {
      if (password === confirmPassword) {
        const response = await fetch(backendUrl + "/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            fullname: fullname,
            phone: phone,
            street: street,
            optaddress: optaddress,
            city: city,
            state: state,
            zipcode: zipcode,
          }),
        });

        const data = await response.json();
        setHasError(response.status !== 200);
        setStatusMessage(data.message);
      } else {
        setStatusMessage("Passwords need to match");
      }
    } else {
      setStatusMessage("All Fields must be entered");
    }
  };

  return (
    <div className="page">
      {/* Header Component */}
      <Header />

      <Container fluid="sm" className="registrationBox2">
        <Row className="toastRow">
          {statusMessage && (
            <Alert
              className="alertToast"
              variant={hasError ? "danger" : "success"}
            >
              {statusMessage}
            </Alert>
          )}
        </Row>

        <Row>
          <Col className="registrationText">Registration</Col>
        </Row>

        <Row>
        {!loggedIn && (<Col className="registrationInputBox2 top2">
            <Form.Control
              required
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="inputUsername"
              placeholder="Username"
            />
          </Col>)}
        </Row>

        <Row>
        {!loggedIn && (<Col className="registrationInputBox2 top2">
          <Form.Control
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Password"
            />
            <div className="top2">
            <Form.Control
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="inputPassword5Confirm"
                aria-describedby="passwordHelpBlock"
                placeholder="Confirm Password"
              />
            </div>
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </Form.Text>
          </Col>)}
        </Row>

        <Row>
        {!loggedIn && (<Col className="registrationInputBox2 top2">
            <Form.Control
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="inputFullName"
              placeholder="Full Name"
            />
          </Col>)}
        </Row>

        <Row>
        {!loggedIn && (<Col className="registrationInputBox2 top2">
            <Form.Control
              required
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              id="inputPhone"
              placeholder="Phone Number"
            />
          </Col>)}
        </Row>

        <Row>
        {!loggedIn && (<Col className="registrationInputBox2 top2">
            <Form.Control
              required
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="inputEmail"
              placeholder="Email"
            />
          </Col>)}
        </Row>

        <Row>
        {!loggedIn && (<Col className="registrationInputBox2 top2">
            <Form.Control
              required
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              id="inputStreet"
              placeholder="Street Address"
            />
          </Col>)}
        </Row>

        <Row>
        {!loggedIn && (<Col className="registrationInputBox2 top2">
            <Form.Control
              onChange={(e) => setOptAddress(e.target.value)}
              type="text"
              id="inputOptional"
              placeholder="Optional Address (Apt., PO, Etc.)"
            />
          </Col>)}
        </Row>

        <Row className="registrationCityInputBox top2">
        {!loggedIn && (<Col xs={8}>
            <Form.Control
              required
              onChange={(e) => setCity(e.target.value)}
              type="text"
              id="inputCity"
              placeholder="City"
            />
          </Col>)}
          {!loggedIn && (<Col xs={4}>
            {/*<StateDropdown />*/}
            <Form.Select
              aria-label="State"
              required
              onChange={(e) => setState(e.target.value)}
              id="inputState"
            >
              <option>State</option>
              <option value="Alabama">AL</option>
              <option value="Alaska">AK</option>
              <option value="Arizona">AZ</option>
              <option value="Arkansas">AR</option>
              <option value="American Samoa">AS</option>
              <option value="California">CA</option>
              <option value="Colorado">CO</option>
              <option value="Connecticut">CT</option>
              <option value="Delaware">DE</option>
              <option value="District of Columbia">DC</option>
              <option value="Florida">FL</option>
              <option value="Georgia">GA</option>
              <option value="Guam">GU</option>
              <option value="Hawaii">HI</option>
              <option value="Idaho">ID</option>
              <option value="Illinois">IL</option>
              <option value="Indiana">IN</option>
              <option value="Iowa">IA</option>
              <option value="Kansas">KS</option>
              <option value="Kentucky">KY</option>
              <option value="Louisiana">LA</option>
              <option value="Maine">ME</option>
              <option value="Maryland">MD</option>
              <option value="Massachusetts">MA</option>
              <option value="Michigan">MI</option>
              <option value="Minnesota">MN</option>
              <option value="Mississippi">MS</option>
              <option value="Missouri">MO</option>
              <option value="Montana">MT</option>
              <option value="Nebraska">NE</option>
              <option value="Nevada">NV</option>
              <option value="New Hampshire">NH</option>
              <option value="New Jersey">NJ</option>
              <option value="New Mexico">NM</option>
              <option value="New York">NY</option>
              <option value="North Carolina">NC</option>
              <option value="North Dakota">ND</option>
              <option value="Northern Mariana Islands">CM</option>
              <option value="Ohio">OH</option>
              <option value="Oklahoma">OK</option>
              <option value="Oregon">OR</option>
              <option value="Pennsylvania">PA</option>
              <option value="Puerto Rico">PR</option>
              <option value="Rhode Island">RI</option>
              <option value="South Carolina">SC</option>
              <option value="South Dakota">SD</option>
              <option value="Tennessee">TN</option>
              <option value="Texas">TX</option>
              <option value="	Trust Territories">TT</option>
              <option value="Utah">UT</option>
              <option value="Vermont">VT</option>
              <option value="Virginia">VA</option>
              <option value="Virgin Islands">VI</option>
              <option value="Washington">WA</option>
              <option value="West Virginia">WV</option>
              <option value="Wisconsin">WI</option>
              <option value="Wyoming">WY</option>
            </Form.Select>
          </Col>)}
        </Row>

        <Row className="registrationCityInputBox top2">
        {!loggedIn && (<Col xs={8}>
            <Form.Control
              required
              onChange={(e) => setZipcode(e.target.value)}
              type="text"
              id="inputZipcode"
              placeholder="Zipcode"
            />
          </Col>)}
        </Row>

        <Row>
        {!loggedIn && (<Col>
            <Button className="submitButton" onClick={signup} variant="primary">
              Register
            </Button>
          </Col>)}
          {loggedIn && (<Col>
            <p style={{textAlign:'center'}}>You are already Logged in</p>
            <Link href="/Logout" >
                <a><button className="submitButton" style={{borderRadius:'25px'}}>Logout Page</button></a>
            </Link>
          </Col>)}
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
