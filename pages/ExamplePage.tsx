import { NextPage } from 'next';
import getConfig from 'next/config';
import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import Container from "react-bootstrap/Container";

const ExamplePage: NextPage = () => {
    const [testList, setTestList] = useState([]);
    const { publicRuntimeConfig } = getConfig();
    const backendUrl = publicRuntimeConfig.backendUrl;

    useEffect(() => {
        fetch(backendUrl + "/test/users", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => setTestList(data))
    }, []);


    return (
        <Container className="p-3">
            <ListGroup>
                {testList.map(user => {
                    return (
                        <ListGroup.Item key={user['username']}>{user['username']}</ListGroup.Item>
                    )
                })}
            </ListGroup>
        </Container>
    )
}

export default ExamplePage