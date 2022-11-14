import { ListGroupItem } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import type { Listing } from "./Result";
import Result from "./Result";

type Props = {
  results?: Listing[];
};

const getDateString = (date: string | undefined) => {
  if (!date) {
    return "";
  } else {
    return new Date(date).toDateString();
  }
};

const ResultsList = ({ results }: Props) => {
  if (!results?.length) {
    return <div></div>;
  }
  return (
    <ListGroup>
      <ListGroupItem>
        {results.map(
          ({ title, author, isbn_10, isbn_13, listing_id, max_due_date }) => (
            <Result
              title={title}
              author={author}
              isbn_10={isbn_10}
              isbn_13={isbn_13}
              listing_id={listing_id}
              max_due_date={getDateString(max_due_date)}
            />
          )
        )}
      </ListGroupItem>
    </ListGroup>
  );
};

export default ResultsList;
