import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import banner from "../assets/clay-banks-hwLAI5lRhdM-unsplash.jpg";
const MainLayout = (props) => {
    return (
        <div>
            <Header />
            <img src={banner} className="faq-banner" alt="banner image" />
            {props.children}
            <Footer />
        </div>
    )
}

export default MainLayout
