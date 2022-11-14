import { useState, useEffect } from 'react'
import getConfig from 'next/config'

const navigateToLogin = () => {
  window.location = "/Login";
};

const navigateToLoanBook = () => {
  window.location = "/LoanBookSubmission";
};

const navigateToHome = () => {
  window.location = "/";
};

const navigateToProfile = () => {
  window.location = "/Profile";
};

const navigateToSearch = () => {
  window.location = "/Search";
};

const navigateToHistory = () => {
  window.location = "/History";
};

const navigateToRegistration = () => {
  window.location = "/Registration";
};

const navigateToLogout = () => {
  window.location = "/Logout";
};

const Navigate = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const backendUrl = publicRuntimeConfig.backendUrl;

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

  useEffect(() => { 
    checksignin();
  }, [] );

  return (
    <center style={{ marginTop: "35px", height: "50px" }}>
      <button
        style={{
          textAlign: "center",
          fontSize: "15px",
          width: "12%",
          borderRadius: "10px",
          background: "white",
          borderColor: "black",
          minWidth: "65px",
          maxHeight: "100%",
          minHeight: "80%",
        }}
        onClick={navigateToHome}
      >
        Home
      </button>

      {loggedIn && (<button
        style={{
          textAlign: "center",
          fontSize: "15px",
          width: "12%",
          borderRadius: "10px",
          background: "white",
          borderColor: "black",
          marginLeft: "5px",
          minWidth: "65px",
          maxHeight: "100%",
          minHeight: "80%",
        }}
        onClick={navigateToProfile}
      >
        Profile
      </button>)}

      {loggedIn && (<button
        style={{
          textAlign: "center",
          fontSize: "15px",
          width: "12%",
          borderRadius: "10px",
          background: "white",
          borderColor: "black",
          marginLeft: "5px",
          minWidth: "65px",
          maxHeight: "100%",
          minHeight: "80%",
        }}
        onClick={navigateToSearch}
      >
        Search
      </button>)}

      {loggedIn && (<button
        style={{
          textAlign: "center",
          fontSize: "15px",
          width: "12%",
          borderRadius: "10px",
          background: "white",
          borderColor: "black",
          marginLeft: "5px",
          minWidth: "65px",
          maxHeight: "100%",
          minHeight: "80%",
        }}
        onClick={navigateToLoanBook}
      >
        Loan Book
      </button>)}

      {loggedIn && (<button
        style={{
          textAlign: "center",
          fontSize: "15px",
          width: "12%",
          borderRadius: "10px",
          background: "white",
          borderColor: "black",
          marginLeft: "5px",
          minWidth: "65px",
          maxHeight: "100%",
          minHeight: "80%",
        }}
        onClick={navigateToHistory}
      >
        History
      </button>)}

      {!loggedIn && (<button
        style={{
          textAlign: "center",
          fontSize: "15px",
          width: "12%",
          borderRadius: "10px",
          background: "white",
          borderColor: "black",
          marginLeft: "5px",
          minWidth: "65px",
          maxHeight: "100%",
          minHeight: "80%",
        }}
        onClick={navigateToLogin}
      >
        Login
      </button>)}

      {!loggedIn && (<button
        style={{
          textAlign: "center",
          fontSize: "15px",
          width: "12%",
          borderRadius: "10px",
          background: "white",
          borderColor: "black",
          marginLeft: "5px",
          minWidth: "65px",
          maxHeight: "100%",
          minHeight: "80%",
        }}
        onClick={navigateToRegistration}
      >
        Register
      </button>)}

      {loggedIn && (<button
        style={{
          textAlign: "center",
          fontSize: "15px",
          width: "12%",
          borderRadius: "10px",
          background: "white",
          borderColor: "black",
          marginLeft: "5px",
          minWidth: "65px",
          maxHeight: "100%",
          minHeight: "80%",
        }}
        onClick={navigateToLogout}
      >
        Logout
      </button>)}
    </center>
  );
};

export default Navigate;
