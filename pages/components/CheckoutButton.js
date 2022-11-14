import Checkout from "pages/Checkout";
import Button from "react-bootstrap/Button";

const navigateToCheckout = () => {
  window.location = "/Checkout";
};

const CheckoutButton = ({
  title,
  author,
  isbn_10,
  isbn_13,
  listingId,
  maxDueDate,
}) => {
  return (
    <Button variant="success" onClick={navigateToCheckout}>
      Check Out
    </Button>
  );
};

export default CheckoutButton;
