import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for furthur instructions ")
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>

                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className=" w-100 text-center ml-2 ">
                Need an account? <Link to='./signup'>Sign up</Link>
            </div>
        </>
    )
}
