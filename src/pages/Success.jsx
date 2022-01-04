import React from 'react'
import { useSelector } from "react-redux";
import Announcement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import styled from 'styled-components';
import { mobile } from '../responsive';
import {
    Link,
  } from "react-router-dom";

const Container = styled.div`
    text-align:center;
    align-items:center;
`

const ContainerSuccess = styled.div`
    align-items:center;
    height:20vh;
    justify-content:center;
    margin-top:10px;
`

const Info = styled.div`
  flex: 3;

`;

const Bottom = styled.div`
  display: flex;
  justify-content:center;
  ${mobile({ flexDirection: "column" })}
  
`;

const Product = styled.div`
  display: flex;
  padding:20px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`

  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height:200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Button = styled.button`
  margin-top:10px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Success = () => {
    const user = useSelector(state => state.user)
    const myCart = useSelector(state => state.cart)

    return (
        <Container>
            <Navbar />
            <Announcement />
            <ContainerSuccess>
                <h1>Thank you for your purchase, {user.username}!</h1>
                <p>Please allow 3-5 business days for items to be shipped.</p>
                <Link to = "/product-list">
                    <Button>CONTINUE SHOPPING</Button>
                </Link>
              
            </ContainerSuccess>
            <Bottom>
                <Info>
                    {myCart.products.map((item) => 
                    <div  key = {item.id}>
                    <Product>
                    <ProductDetail>
                        <Image src={item.img} />
                        <Details>
                        <ProductName>
                            <b>Product:</b> {item.product}
                        </ProductName>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                    </PriceDetail>
                    </Product>
                    <Hr />
                    </div>)}
                </Info>
            </Bottom>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Success
