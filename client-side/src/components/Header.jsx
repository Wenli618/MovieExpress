
import logoImg from '../assets/logo.svg'
// import { useAuth } from "../../context/AuthContext"
import {BiSolidUser, BiSolidHeart} from "react-icons/bi"
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';

const Header = ({ user, onLogout }) => {
    console.log(user)

    return (
        <Navbar collapseOnSelect expand="md" sticky="top" className="navbar">
            <Container className="navContainer">
                <Navbar.Brand className="brandLink" as={Link} to='/'>
                    <img alt="modernme logo"
                    src={logoImg}
                    className="logoImg"
                    />
                    <div className="logoTextBox">Movie Express</div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav" className='navItems'>
                    <Form className="d-flex searchForm">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                    <Nav className='navLinks'> 

                       {!user && <Nav.Link className="navLink" as={Link} to="/login"><BiSolidUser className="bi bi-person-fill navLinkIcon" /></Nav.Link>}

                       {user && <Nav.Link className="navLink userGreeting" as={Link} to={user.role == "admin"? "/auth" : "/"}>
                            Hi, {user.username}!                    
                        </Nav.Link>}

                        {user && <Nav.Link className="navLink" onClick={onLogout} as={Link} to="/">Logout</Nav.Link>}
                
                        <Nav.Link className="navLink" as={Link} to='/'><BiSolidHeart className="bi bi-heart-fill navLinkIcon" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Header;







// function Header() {
//   return (
//     <div>Header</div>
//   )
// }

// export default Header

