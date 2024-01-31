import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import { Container, Row, Col} from 'react-bootstrap';
import Wishlist from './wishlist';
import Currentreads from './currentreads';
import NavigationBar from './NavBar';
import Stats from './stats';
import History from './history';

function App() {
  return (
    <>
   <div className="App">
    <Router>
      <Container fluid>
        <Row>
          {/* Profile Info and Navigation */}
          <NavigationBar/>
          {/* Content */}
          <Col className="contents">
            <Routes>
              <Route path="/wishlist" Component={Wishlist} />
              <Route path="/currentreads" Component={Currentreads} />
              <Route path="/history" Component={History} />
              <Route path="/stats" Component={Stats} />
              <Route path="/" element={<Navigate to="/wishlist"/>} />
            </Routes>         
          </Col>
        </Row>
      </Container>
      </Router>
    </div>
    </>
  )
}

export default App
