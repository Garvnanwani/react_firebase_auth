import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();


    async function handleSignup(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordconfirmRef.current.value) {
            return setError(' Passwords dont match ')
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError(' Failed to create an account')
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>

                    {error && <Alert variant='danger'>{error}</Alert>}

                    <Form onSubmit={handleSignup}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordconfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className=" w-100 text-center ml-2 ">
                Already have an account? <Link to="./login" >Log In</Link>
            </div>
        </>
    )
}
