import React from 'react'
import Cover from '../assets/cover.svg'
import Recommen from '../component/home/Recommen'
import About from '../component/home/About'
import BestSeller from '../component/home/BestSeller'
import Footer from '../component/home/Footer'

const Home = () => {

    return (
        <div>
            <div>
                <img src={Cover} className='object-contain' />
            </div>
            <div className=''>
                <Recommen />
                <About />
                <BestSeller />
                <Footer />
                <div></div>
            </div>
        </div>
    )
}

export default Home