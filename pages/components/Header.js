//import logo from '../pages/components/images/logo.png'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigate from './Navigate';

const Header = () => {
  return (
    <div className='header'>

      <Container fluid style={{float:'left', height:'100px'}}>
        <Row >
          <Col sm={1} style={{minWidth:'100px', maxWidth:'120px', maxHeight:'100px'}}>
            <img style={{padding: 12.5}} className='headerLogo' src='./images/logo.png' />
          </Col>
          <Col sm={2} style={{minWidth:'220px', maxWidth:'250px', maxHeight:'100px'}}>
            <p className='headerLogoText' style={{color:'black'}}>Barnes-N-Web</p>
          </Col>
          <Col style={{maxHeight:'100px'}}>
            <Navigate />
          </Col>
        </Row>
      </Container>

      
    </div>
  )
}

export default Header