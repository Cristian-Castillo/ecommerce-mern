import styled from "styled-components";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.pinimg.com/originals/c1/b0/49/c1b0491897a472c47f8abb3f9898fe03.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:10px;
`;

const FormContainer = styled.form`
    background-color:white;
    padding:25px;
    border-radius:5px;
    box-shadow:10px 15px 15px black;
    border:0px solid black;
`

const Register = () => {

    const history = useHistory()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const handleRegister = async (e) => {

        e.preventDefault()

        try{
            await axios.post("https://server-pro-noob.herokuapp.com/pro-noob-pages/authenticate/register",{username, email, password})
            .then((res) => { 
                console.log(`Registration Success, welcome Noob ${res.data.username}`);
                history.push("/login")
            })
            .catch((err) => console.log(err));

        }catch(e){
            console.log(e)
        }
    }

    return (
            <Container>
                <FormContainer>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridText">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                onChange = {e => setUsername(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange = {e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                onChange = {e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Button 
                        onClick = {handleRegister}
                        variant="primary" 
                        type="submit">
                        Submit
                    </Button>
                </FormContainer>
            </Container>
    );
};

export default Register;