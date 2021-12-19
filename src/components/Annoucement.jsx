import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-color:red;
    height:40px;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:700;
    font-size:16px;
`

const Annoucement = () => {
    return (
        <Container>
            Shop Now!!! Get $5.00 Discount on Orders Over $50!
        </Container>
    )
}

export default Annoucement
