import React, {FormEvent, FormEventHandler, useState} from 'react';
import {Button, Card, Container, Form} from 'react-bootstrap';
import {loginUser, useAuthDispatch} from '../../auth';

export const LoginForm: React.FC = () => {
    const dispatch = useAuthDispatch();
    const [username, setUsername] = useState<string|undefined>(undefined);
    const [password, setPassword] = useState<string|undefined>(undefined);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
        await loginUser(dispatch, {
            username: username as string,
            password: password as string,
        });
    }
    return (
        <Container>
        <Form
            onSubmit={(e) => handleLogin(e)}
        >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Container>
    )
}
