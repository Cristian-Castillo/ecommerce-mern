import React from 'react'
import Announcement from '../components/Annoucement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Category from '../components/Category'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Category />
            <Products />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home
