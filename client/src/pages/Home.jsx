import React from 'react'
import FeaturedBooks from '../components/feature/FeaturedBooks';
import HeroBanner from '../components/Hero/HeroBanner';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <div>
          <HeroBanner />
    <FeaturedBooks/>
    <Footer/>
    </div>
  )
}

export default Home
