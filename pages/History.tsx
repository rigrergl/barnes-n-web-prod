import Header from "./components/Header";
import Link from 'next/link'
import { useState, useEffect } from 'react'
import getConfig from "next/config";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import HistoricalLoanList from "./components/HistoricalLoanList";
import HistoricalCheckOutList from "./components/HistoricalCheckOutList";
import type { HistoricalLoanListing } from "./components/HistoricalLoanResult";
import type { HistoricalCheckOutListing } from "./components/HistoricalCheckOutResult";

const History = () => {
  const { publicRuntimeConfig } = getConfig();
  const backendUrl = publicRuntimeConfig.backendUrl;
  const [success, setSuccess] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [checkoutListings, setcheckOutListings] =
    useState<HistoricalCheckOutListing[]>();
  const [loanListings, setLoanListings] = useState<HistoricalLoanListing[]>();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getCheckoutHistory();
    getLoanHistory();
    checksignin();
  }, []);

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

  const getCheckoutHistory = async () => {
    const response = await fetch(backendUrl + "/listings/myCheckouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    setHasError(response.status !== 200);
    setStatusMessage(data.message);
    setcheckOutListings(data);
  };

  const getLoanHistory = async () => {
    const response = await fetch(backendUrl + "/listings/myListings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    setHasError(response.status !== 200);
    setStatusMessage(data.message);
    setLoanListings(data);
  };

  return (
    <div className="page">
      <Header />
      <Container fluid="sm" className="historyBox">
        <Row>
          <Col className="submissionText">History</Col>
        </Row>

        {loggedIn && (<Row>
          <Col>
            <h3 style={{ textAlign: "center" }}>Check Outs</h3>
            <HistoricalCheckOutList results={checkoutListings} />
          </Col>
          <Col>
            <h3 style={{ textAlign: "center" }}>Loans</h3>
            <HistoricalLoanList results={loanListings} />
          </Col>
        </Row>)}

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

export default History;
