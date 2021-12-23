import React from 'react'
import styled from 'styled-components'
import Product from './Product';
import axios from 'axios'
import { useEffect, useState } from 'react'


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = () => {

    const [products,setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            
            try{
                await axios.get("https://server-pro-noob.herokuapp.com/pro-noob-pages/product/").then((res) => {
                console.log("Succesfully retrieved products.")
                setProducts(res.data)
                }).catch((e) => { console.log("Something went wrong. Could not retrieve products from Database.")})
  
            }catch(e){
                console.log(e)
            }
        }
        getProducts()
    },[])

    return (
        <Container>{products.map(item =>
            <Product item = {item} key = {item._id}/>)}
        </Container>
    )
}

export default Products
