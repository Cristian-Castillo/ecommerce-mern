import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import CategoryItem from './CategoryItems'
import { mobile } from "../responsive";

const Container = styled.div`
    display:flex;
    align-items:center;
    ${mobile({ padding: "0px", flexDirection:"column" })}
`

const Category = () => {
    return (
        <Container>
            {categories.map((item,i) => <CategoryItem item = {item} key = {item.id}/>)}
        </Container>
    )
}

export default Category
