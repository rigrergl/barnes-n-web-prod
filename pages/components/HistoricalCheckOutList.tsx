import { ListGroupItem } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import type { HistoricalCheckOutListing } from "./HistoricalCheckOutResult";
import HistoricalCheckOutResult from "./HistoricalCheckOutResult";

type Props = {
  results?: HistoricalCheckOutListing[];
};

const getDateString = (date: string | undefined) => {
  if (!date) {
    return "";
  } else {
    return new Date(date).toDateString();
  }
};

const HistoricalCheckOutList = ({ results }: Props) => {
  if (!results?.length) {
    return <div></div>;
  }
  return (
    <div className="page">
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
              <HistoricalCheckOutResult
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
    </div>
  );
};

export default HistoricalCheckOutList;
