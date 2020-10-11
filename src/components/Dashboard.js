import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to Log out')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong>Email: {currentUser.email}</strong>
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className=" w-100 text-center ml-2 ">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
