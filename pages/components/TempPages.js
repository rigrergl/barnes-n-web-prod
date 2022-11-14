
const navigateToLogin = () => {
    window.location = '/Login';
}

const navigateToRegistration = () => {
    window.location = '/Registration';
}

const TempPages = () => {
  return (
    <>
        <button onClick={navigateToLogin}>Login</button>
        <button onClick={navigateToRegistration}>Registration</button>
    </>
  )
}


export default TempPages