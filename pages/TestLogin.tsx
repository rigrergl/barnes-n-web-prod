import { useState, createRef } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import getConfig from 'next/config'
import { Alert } from 'react-bootstrap';
import React from 'react';

const bcrypt = require("bcryptjs");

const TestLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { publicRuntimeConfig } = getConfig();
    const backendUrl = publicRuntimeConfig.backendUrl;


    const login = () => {
        fetch(backendUrl + "/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(
            response => {
                if (response.ok) {
                    setSuccess(true);
                } else {
                    // TODO
                }
            }
        )
    }

    return (
        <Container style={{ width: "44%", paddingTop: 44 }}>
             {success &&
                (<Alert variant="success">
                    Successfully logged in!
                </Alert>)}
            <Row>
                <Form.Label htmlFor="inputUsername">Username</Form.Label>
                <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="inputUsername"
                />
            </Row>
            <Row>
                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                />
                <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                </Form.Text>
            </Row>
            <div style={{ width: 100, paddingTop: 20, marginRight: 0, marginLeft: "auto" }}>
                <Button onClick={login} style={{ float: "right" }} variant="primary">Login</Button>
            </div>
        </Container>

    )
}

export default TestLogin