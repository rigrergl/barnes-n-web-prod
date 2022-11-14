const navigateToSearch = () => {
  window.location = "/Search";
};

const CancelButton = () => {
  return (
    <button
      onClick={navigateToSearch}
      style={{
        textAlign: "center",
        fontSize: "15px",
        width: "70%",
        borderRadius: "10px",
        background: "#d11a2a",
        borderColor: "black",
        marginLeft: "5px",
        marginTop: "20%",
        height: "60%",
        color: "white",
      }}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
