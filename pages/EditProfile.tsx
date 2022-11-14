import Header from "./components/Header";
import Link from 'next/link'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';

const EditProfile = () => {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [optaddress, setOptAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");

    const [success, setSuccess] = useState(0);
    const [statusMessage, setStatusMessage] = useState("");
    const [hasError, setHasError] = useState(false);

    const { publicRuntimeConfig } = getConfig();
    const backendUrl = publicRuntimeConfig.backendUrl;
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => { 
      checksignin();
      getprofileinfo();
    }, [] );

    const getprofileinfo = async () => {
    
      const response = await fetch(backendUrl + "/profile/getProfileInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json();

      if(response.ok)
      {
        setPhone(data.phone);
        setEmail(data.email);
        setStreet(data.street);
        setOptAddress(data.optaddress);
        setCity(data.city);
        setState(data.state);
        setZipcode(data.zipcode);
      }
      else
      {
        setStatusMessage(data.message);
      }
      
    };

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

    const updateProfile = async () => {
      if(phone != "" &&
      email != "" &&
      street != "" &&
      city != "" &&
      state != "" &&
      zipcode != "")
      {
        const response = await fetch(backendUrl + "/profile/editProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone, 
            email: email, 
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
    }
    else
    {
      setStatusMessage("Value changed cannot be empty, refresh page if needed");
    }
  }

    return (
        <div className='page'>
          
          {/* Header Component */}
          <Header />
    
          <Container fluid="sm" className='editProfileBox'>
    
            <Row className='toastRow'>
              {statusMessage &&
                      (<Alert className='alertToast' variant="success">
                          {statusMessage}
                      </Alert>)}
            </Row> 
    
          <Row >
            <Col className='registrationText'>
              Edit Profile
            </Col>
          </Row>
    
          <Row>
          {loggedIn && (<Col className='registrationInputBox2 top2'>
              <Form.Control
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    id="inputPhone"
                    placeholder="Phone Number"
                />
            </Col>)}
          </Row>
    
          <Row>
          {loggedIn && (<Col className='registrationInputBox2 top2'>
              <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="inputEmail"
                    placeholder="Email"
                />
            </Col>)}
          </Row>
    
          <Row>
          {loggedIn && (<Col className='registrationInputBox2 top2'>
              <Form.Control
                    onChange={(e) => setStreet(e.target.value)}
                    type="text"
                    id="inputStreet"
                    placeholder="Street Address"
                />
            </Col>)}
          </Row>
    
          <Row>
          {loggedIn && (<Col className='registrationInputBox2 top2'>
              <Form.Control
                    onChange={(e) => setOptAddress(e.target.value)}
                    type="text"
                    id="inputOptional"
                    placeholder="Optional Address (Apt., PO, Etc.)"
                />
            </Col>)}
          </Row>
    
          {loggedIn && (<Row className='registrationCityInputBox top2'>
            <Col xs={8}>
              <Form.Control
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    id="inputCity"
                    placeholder="City"
                />
            </Col>
            <Col xs={4}>
              {/*<StateDropdown />*/}
                <Form.Select aria-label="State" 
                    onChange={(e) => setState(e.target.value)}
                    id="inputState">
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
            </Col>
          </Row>)}
    
          <Row className='registrationCityInputBox top2'>
          {loggedIn && (<Col xs={8}>
              <Form.Control
                    onChange={(e) => setZipcode(e.target.value)}
                    type="text"
                    id="inputZipcode"
                    placeholder="Zipcode"
                />
            </Col>)}
          </Row>
    
          <Row>
          {loggedIn && (<Col >
              <Button className='submitButton' onClick={updateProfile} variant="primary">Update</Button>
            </Col>)}

          {!loggedIn && (<Col className='top2'>
            <p style={{textAlign:'center'}}>You are not Logged in</p>
            <Link href="/Login" >
                <a><button className="submitButton" style={{borderRadius:'25px'}}>Login Page</button></a>
            </Link>
          </Col>)}
          </Row>
        </Container>
    
        </div>
      )
    }
    
    export default EditProfile