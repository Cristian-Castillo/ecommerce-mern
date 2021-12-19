import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import {
    Link,
  } from "react-router-dom";

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(70%)
    ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItems = ({item}) => {
    return (
        <Container>
            <Image src = {item.img} alt = "" />
            <Info>
                <Title>{item.title}</Title>
                <Link to={`/product-list/${item.cat}`}>
                    <Button>SHOP NOW</Button>
                </Link>
            </Info>
        </Container>
    )
}

export default CategoryItems