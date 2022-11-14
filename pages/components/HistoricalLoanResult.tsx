import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import getConfig from "next/config";

export type HistoricalLoanListing = {
  listing_id?: string;
  ownerId?: string;
  title?: string;
  isbn_10?: string;
  isbn_13?: string;
  image?: string;
  author?: string;
  max_due_date?: string;
  rented_by?: string;
};

type Props = {
  title?: string;
  author?: string;
  isbn_10?: string;
  isbn_13?: string;
  listing_id?: string;
  max_due_date?: string;
  rented_by?: string;
};

const HistoricalLoanResult = (props: Props) => {
  const { publicRuntimeConfig } = getConfig();
  const [currentlyLoaning, setCurrentlyLoaning] = useState(false);

  useEffect(() => {
    checkLoanedBy();
  }, []);

  const checkLoanedBy = () => {
    if (props.rented_by != null || props.rented_by != "") {
      setCurrentlyLoaning(true);
    }
  };

  return (
    <Card className="searchResults">
      <Card.Header>{props.title}</Card.Header>
      <Card.Body>
        <Card.Text>Author: {props.author}</Card.Text>
        <Card.Text>ISBN 10: {props.isbn_10}</Card.Text>
        <Card.Text>ISBN 13: {props.isbn_13}</Card.Text>
        <Card.Text>Due Date: {props.max_due_date}</Card.Text>
        {currentlyLoaning && <Card.Text>Currently Loaning: Yes</Card.Text>}
        {!currentlyLoaning && <Card.Text>Currently Loaning: No</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default HistoricalLoanResult;
