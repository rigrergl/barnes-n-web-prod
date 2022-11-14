import { useState } from "react";
import genMockCoordinates from "@/lib/genMockCoordinates";
import getConfig from 'next/config'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'

const CreateListingModal = () => {
    const [showSelf, setShowSelf] = useState(true);


    /* Form states*/
    const [title, setTitle] = useState("");
    const [isbn10, setIsbn10] = useState("");
    const [isbn13, setIsbn13] = useState("");
    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState("");
    const [maxDueDate, setMaxDueDate] = useState();

    const { publicRuntimeConfig } = getConfig();
    const backendUrl = publicRuntimeConfig.backendUrl;


    const uploadListing = () => {
        const mockCoordinates = genMockCoordinates();

        const data = {
            title: title,
            latitude: mockCoordinates.latitude,
            longitude: mockCoordinates.longitude,
            isbn10: isbn10,
            isbn13: isbn13,
            image: image,
            author: author,
            maxDueDate: maxDueDate
        }

        fetch(backendUrl + "/listings/CreateListing", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(
            response => {
                if (response.ok) {
                    setShowSelf(true);
                } else {
                    // TODO
                }
            }
        );
    }

    return (
        <div>

            dgdgf
            {/* <Modal show={showSelf} onHide={() => setShowSelf(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Form.Label htmlFor="inputTitle">Title</Form.Label>
                            <Form.Control
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                id="inputTitle"
                            />
                        </Row>
                    </Container>
                    <Button variant="primary" onClick={() => uploadListing()}>Get Coordinates</Button>
                </Modal.Body>
            </Modal> */}



            <Modal
                animation={false}
                show={showSelf}
                onHide={() => setShowSelf(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSelf(false)}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateListingModal