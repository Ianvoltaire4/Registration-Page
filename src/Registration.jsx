import React, { useState, useEffect } from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
const Registration = () => {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const getUserImage = async() => {
        const response = await fetch('https://randomuser.me/api/')
        const data = await response.json()
        console.log(data)
        setImage(data.results[0].picture.large)
        return image
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        getUserImage()
        const newUser = { image: image, email: email, firstName: firstName, lastName: lastName, birthdate: birthdate, password: password }
        setUsers([...users, newUser])
    }
useEffect(()=> {
getUserImage()
},[])
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength='8' />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form><br/>
            <Carousel>
                {users.map((user, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={user.image} />
                                <Card.Body>
                                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><strong>DOB: </strong>{user.birthdate}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    )
}
export default Registration