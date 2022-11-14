

const navigateToEdit = () => {
    window.location = '/EditProfile';
}

const NavigateEdit = () => {
  return (
    <>
        <button style={{textAlign:'center', marginLeft:'35%', fontSize:'25px', width:'30%', borderRadius:'25px'
    , background: '#FB8500', marginTop:'10%', borderColor:'black', height:'60%'}} onClick={navigateToEdit}>Edit</button>
    </>
  
    
    
  )
}


export default NavigateEdit