import styled from "styled-components";
import Announcement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector,useDispatch } from "react-redux";
import { FaTrash } from 'react-icons/fa';
import { deleteProduct } from '../redux/cartRedux';
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useEffect,useState } from 'react' 
import axios from 'axios'
import {
  Link,
} from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;


const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {


  const myCart = useSelector(state => state.cart)
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch()
  let userTotal = 0
  myCart.products.forEach(item => userTotal += item.total)
  userTotal = userTotal >= 50 ? userTotal-= 5 : userTotal

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
          await axios.post("https://server-pro-noob.herokuapp.com/pro-noob-pages/checkout/payment", {
            source: stripeToken.id,
            amount: userTotal,
          })
          .then((res) => { console.log("Success: "+ res)})
          .catch(e => console.log(e))
          
        history.push("/success")

      } catch(e){
        console.log("Error on payment: ",e)
      }
    };
    stripeToken && makeRequest();
  }, [dispatch, history, myCart.products, stripeToken, userTotal]);


  const handleDelete = (record) => {
    dispatch(deleteProduct(record))
    userTotal = 0
    myCart.products.forEach(item => userTotal += item.total)
    
    if(userTotal >= 50){
      userTotal -= 5
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to = "/product-list">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({myCart.products.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {myCart.products.map((item) => 
              <div key = {item.id}>
              <Product >
              <ProductDetail>
                <Image src={item.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {item.product}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item.id}
                  </ProductId>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
               
                  <ProductAmount>{item.quantity} x</ProductAmount>
                
                  <FaTrash  
                    onClick = {() => handleDelete({id:item.id,quantity:item.quantity,total:item.total})}
                    style = {{cursor:"pointer",marginLeft:"20px"}}
                    />
                </ProductAmountContainer>
                <ProductPrice>$ {item.total.toFixed(2)}</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            </div>)}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {userTotal.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Sepcial Discount</SummaryItemText>
              <SummaryItemPrice style = {{color:'red'}}>$ {userTotal.toFixed(2)  >= 50 ? '-5.00': '0'} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {userTotal.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="PRO NOOBZ"
              image="https://image.shutterstock.com/image-vector/minimalist-pro-logo-vector-on-260nw-1270719463.jpg"
              billingAddress
              shippingAddress
              description={`Your total is $${userTotal.toFixed(2)}`}
              amount={userTotal*100}
              token={onToken}
              stripeKey={KEY}
            >
              {myCart.products.length === 0 
                ? <Button style={{backgroundColor:"gray"}}disabled>CHECKOUT NOW</Button>
                :<Button style = {{cursor:"pointer"}}>CHECKOUT NOW</Button>
              }
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;