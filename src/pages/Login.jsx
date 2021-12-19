import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlice';
import styled from "styled-components";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/GTA_6_Release_Rockstar_Games.jpg")
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


const Login = () => {
  const history =  useHistory()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
      e.preventDefault()

      try{
          await axios.post("http://localhost:5000/pro-noob-pages/authenticate/login",{username, email, password})
          .then((res) => { 
              console.log(`Login Success, welcome Noob ${res.data.username}`);
              dispatch(login({username,email,token:res.data.accessToken}))
              history.push('/')
          })
          .catch((err) => console.log(err));

      }catch(e){
          console.log(e)
      }
  }

  return (
    <Container>
        <FormContainer >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  onChange = {(e) =>setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>User name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter user name" 
                  onChange = {(e) =>setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password"
                  onChange = {(e) => setPassword(e.target.value)} 
                />
            </Form.Group>
            <Button onClick = {handleLogin}variant="primary" type="submit">
                Submit
            </Button>
        </FormContainer>
    </Container>
  );
};

export default Login;