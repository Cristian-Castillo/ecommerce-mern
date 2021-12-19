import React from 'react'
import styled from 'styled-components'
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../redux/userSlice'
import {
    Link
  } from "react-router-dom";

const Container = styled.div`
    display:flex;
    align-items:center;
    height:60px;
    justify-content:space-evenly;
    ${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
    display:flex;
    width:100%;
    padding:10px 5px;
    ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    padding:0px 5px;
`
const Language = styled.h4`
    display:flex;
    align-items:center;
    cursor:pointer;
    ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
    display:flex;
    align-items:center;
    border:0.5px solid black;
    padding:0px 2px;
    margin-left:5px;
`

const Input = styled.input`
    border:none;
    ${mobile({ width: "50px" })}
`

const Center = styled.div`
    flex:1;
    display:flex;
    align-items:center;
`

const Logo = styled.h1`
    font-size:30px;
    ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
    flex:end;
    margin-right:5px;
    display:flex;
    align-items:center;
    ${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.div`
    padding:0px 5px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`


const Navbar = () => {
    const cartQuantity = useSelector(state => state.cart)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    const handleSession = () => {
        window.localStorage.clear()
        const userData = { username:"",email:"",password:""}
        dispatch(reset(userData))   
    }
  
    return (
    <Container>
        <Wrapper>
            <Left>
                 <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder = "Search" />
                    <Search style = {{cursor:"pointer", color:"gray"}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Logo><Link style = {{textDecoration:"none",color:"black"}} to = "/">PRO NOOBZ.</Link></Logo>
            </Center>
            <Right>
                {
                    user.username === "" 
                    ?
                    <Link style = {{textDecoration:"none",color:"black"}} to ="/register">
                        <MenuItem>Register</MenuItem>
                    </Link>
                    : null 
                }
                {
                    user.username === "" 
                    ?   <Link style = {{textDecoration:"none",color:"black"}} to = "/login">
                            <MenuItem >Sign In</MenuItem>
                        </Link> 
                    :   <Link 
                            onClick = {handleSession}
                            style = {{textDecoration:"none",color:"black"}} to = "/">
                            <MenuItem >Sign Out</MenuItem>
                        </Link>
                }
                    <MenuItem>
                {
                    user.username === "" 
                    ?   <Link to ="/">
                            <Badge style = {{textDecoration:"none",color:"black"}}  color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </Link>
                    :
                        <Link to ="/cart">
                            <Badge style = {{textDecoration:"none",color:"black"}} badgeContent={cartQuantity.quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </Link>
                }
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
    )
}

export default Navbar
