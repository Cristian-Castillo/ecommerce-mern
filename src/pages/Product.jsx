import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useState, useEffect } from 'react'
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from 'axios'
import {
  Link,
} from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  justify-content:space-between;

`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {

  const [quantity,setQuantity] = useState(0)
  const [product,setProduct] = useState({})
  const dispatch = useDispatch()
  const location = useLocation()

 
  useEffect(() => {
    const pathName = location.pathname.split("/")[2]

    const getProduct = async () => {
      try{
        
        await axios.get(`https://server-pro-noob.herokuapp.com/pro-noob-pages/product/find/${pathName}`)
        .then((res) => {
          console.log("Succesfully retrieved unique product")
          setProduct(res.data)
        }).catch(e => console.log(e))

      }catch(e){
        console.log(e)
      }
    }
    getProduct()
  },[location.pathname])

  const handleQuantity = (operator) => {
    if(operator === "decrease" && quantity === 0){
      return
    }
    else if(operator === "decrease" && quantity > 0){
      setQuantity(quantity => quantity -= 1)
    }
    else{
      setQuantity(quantity => quantity += 1)
    }
  }

  const handleCart = (e) => {
    dispatch(addProduct({
      product:product.title,
      quantity:quantity,
      total:product.price * quantity,
      img:product.img,
      id:product._id
    }))
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src= {product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          <Price>$ {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove 
                onClick = {() => handleQuantity('decrease')}
              />
              <Amount>{quantity}</Amount>
              <Add 
                onClick = {() => handleQuantity('increase')}
              />
            </AmountContainer>
            {quantity > 0 
              ? 
              <>
              <Button onClick = {handleCart}>ADD TO CART</Button>
                <Link to = "/product-list">
                  <Button >CONTINUE SHOPPING</Button>
                </Link>
              </>
              :
              <>
                <Button disabled>ADD TO CART</Button>
                <Link to = "/product-list">
                  <Button >CONTINUE SHOPPING</Button>
                </Link>
              </>
            }
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;