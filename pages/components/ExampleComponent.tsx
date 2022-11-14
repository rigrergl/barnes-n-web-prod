import { useState, ReactElement } from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

type Props = {
  children: ReactElement;
};

function ExampleComponent(props: Props) {
  const [showToast, toggleShowToast] = useState(true);

  return (
    <>
      {!showToast && (
        <Button onClick={() => toggleShowToast(true)}>Show Toast</Button>
      )}
      <Toast show={showToast} onClose={() => toggleShowToast(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{props.children}</Toast.Body>
      </Toast>
    </>
  );
}

export default ExampleComponent;
