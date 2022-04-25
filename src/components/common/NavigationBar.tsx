import React from 'react';
import {Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {logoutUser, useAuthDispatch, useAuthState} from '../../auth';
import {useNavigate} from 'react-router-dom';


export const NavigationBar: React.FC = () => {
    const authState = useAuthState();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        void logoutUser(dispatch);
        navigate('/');
    }

    const handleLink = (e: React.MouseEvent<HTMLElement>, to: string) => {
        e.preventDefault();
        navigate(to);
    }

    return (
        <Navbar
            sticky={'top'}
            bg={'white'}
        >
            <Container fluid>
                <Navbar.Brand
                    onClick={() => navigate('/')}
                >
                    CMP Portal
                </Navbar.Brand>
                <Nav
                    className="me-auto my-2 my-lg-0"
                >
                    <Nav.Link
                        onClick={e => handleLink(e,'equipment')}
                    >
                        All Equipment
                    </Nav.Link>
                    <NavDropdown title={'Admin Tools'}>
                        <NavDropdown.Item>
                            Manage Users
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            Manage Equipment
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {authState.token &&
                    <Button
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                }
            </Container>
        </Navbar>
    )
}
