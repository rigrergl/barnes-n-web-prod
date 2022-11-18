import Link from 'next/link'
import { useState, useEffect } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "./components/Header";
import getConfig from "next/config";
import ResultsList from "./components/ResultsList";
import type { Listing } from "./components/Result";

const Search = () => {
  const [listings, setListings] = useState<Listing[]>();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn_13, setIsbn_13] = useState("");
  const [isbn_10, setIsbn_10] = useState("");
  const { publicRuntimeConfig } = getConfig();
  const backendUrl = publicRuntimeConfig.backendUrl;
  const [loggedIn, setLoggedIn] = useState(false);

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
                setLoggedIn(true);
                console.log(loggedIn);
            } else {
                // TODO
            }
        }
    )
  }

  const submitSearchForm = () => {
    fetch(backendUrl + "/listings/searchListings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" :  "*",    
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: JSON.stringify({
        bookTitle: title,
        isbn_10: isbn_10,
        isbn_13: isbn_13,
        author: author,
        latitude: null,
        longitude: null,
        maxDistanceInMiles: null,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setListings(result);
        console.log(listings);
      });
  };

  return (
    <div>
      <Header />
      <Container fluid="sm" className="searchInputBox">
        <Row>
        <Col>
            <h3 style={{ textAlign: "center" }}>Search</h3>
            {loggedIn && (<Form>
              <Form.Group controlId="formGridSearchCriteria">
                <Form.Label>Search Criteria</Form.Label>
                <Form.Control
                  className="mb-3"
                  style={{ width: "31vw" }}
                  type="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAuthor">
                <Form.Control
                  style={{ width: "25vw" }}
                  type="author"
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridIsbn13">
                <Form.Control
                  style={{ width: "15vw" }}
                  type="isbn_13"
                  placeholder="ISBN 13"
                  value={isbn_13}
                  onChange={(e) => setIsbn_13(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridIsbn10">
                <Form.Control
                  style={{ width: "15vw" }}
                  type="isbn_10"
                  placeholder="ISBN 10"
                  value={isbn_10}
                  onChange={(e) => setIsbn_10(e.target.value)}
                />
              </Form.Group>
              <Button color={"#FB8500"} onClick={submitSearchForm}>
                Search
              </Button>
            </Form>)}
          </Col>
          {loggedIn && (<Col>
            <h3 style={{ textAlign: "center" }}>Results</h3>
            <Row>
              <ResultsList results={listings} />
            </Row>
          </Col>)}
        </Row>

        {!loggedIn && (<Col className='top2'>
            <p style={{textAlign:'center'}}>You are not Logged in</p>
            <Link href="/Login" >
                <a><button className="submitButton" style={{borderRadius:'25px'}}>Login Page</button></a>
            </Link>
          </Col>)}
      </Container>
    </div>
  );
};

export default Search;
