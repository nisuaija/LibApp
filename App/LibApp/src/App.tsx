import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './css/App.css';
import './css/login.css';
import { Container, Row, Col} from 'react-bootstrap';
import Wishlist from './wishlist';
import Currentreads from './currentreads';
import NavigationBar from './NavBar';
import Stats from './stats';
import History from './history';
import Login from './Login';
import { useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [forceCheck, setForceCheck] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      try {
        await axios.get(`http://localhost:5175/api/User/GetUserDataFromSession?sessionToken=${token}`);
        console.log("Logged In");
        setLoggedIn(true);
      } catch (error) {
        console.log("Logged Out");
        setLoggedIn(false);
      }
    };

    checkToken();
    
  }, [forceCheck]);


  const LogOut = async() => {
    try {
      await axios.delete(`http://localhost:5175/api/User/Logout?sessionToken=${localStorage.getItem('token')}`)
      localStorage.clear();
      setForceCheck(true);
    }
    catch(error)
    {
      console.log(error);
      setForceCheck(true);
    }
  }

 
  return (
    <>
      {!loggedIn ? (          
        <div>
          <img className="background" src="Books.png"/>
          <div className='blurLayer'></div>
          <div className='loginLayer'>
            <Router>
              <Routes>
                <Route path="/login" element={<Login checkToken={() =>setForceCheck(true)} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </Router>
          </div>
        </div>
      ) : (
        <div className="App">
          <Router>
            <Container fluid>
              <Row>
                {/* Profile Info and Navigation */}
                <NavigationBar logout={LogOut}/>
                {/* Content */}
                <Col className="contents">
                  <Routes>
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/currentreads" element={<Currentreads />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/stats" element={<Stats /> } />
                    <Route path="/login" element={<Navigate to="/wishlist" />} />
                    <Route path="/" element={<Navigate to="/wishlist" />} />
                  </Routes>         
                </Col>
              </Row>
            </Container>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
