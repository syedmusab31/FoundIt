import React from 'react'
import Title from '../components/Title';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import Banner from '../components/Banner';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks'

const Home = () => {
  return (
    <>
    <Hero />
    <CategorySection />
    <Banner />
    {/* <NewsLetter /> */}
    <HowItWorks />
    <Footer />
    </>
  )
}

export default Home
