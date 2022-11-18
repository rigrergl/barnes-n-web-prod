import { ListGroupItem } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import type { HistoricalLoanListing } from "./HistoricalLoanResult";
import HistoricalLoanResult from "./HistoricalLoanResult";

type Props = {
  results?: HistoricalLoanListing[];
};

const getDateString = (date: string | undefined) => {
  if (!date) {
    return "";
  } else {
    return new Date(date).toDateString();
  }
};

const HistoricalLoanList = ({ results }: Props) => {
  if (!results?.length) {
    return <div></div>;
  }
  return (
    <ListGroup>
      <ListGroupItem>
        {results.map(
          ({
            title,
            author,
            isbn_10,
            isbn_13,
            listing_id,
            max_due_date,
            rented_by,
          }) => (
            <HistoricalLoanResult
              key={listing_id}
              title={title}
              author={author}
              isbn_10={isbn_10}
              isbn_13={isbn_13}
              listing_id={listing_id}
              max_due_date={getDateString(max_due_date)}
              rented_by={rented_by}
            />
          )
        )}
      </ListGroupItem>
    </ListGroup>
  );
};

export default HistoricalLoanList;
