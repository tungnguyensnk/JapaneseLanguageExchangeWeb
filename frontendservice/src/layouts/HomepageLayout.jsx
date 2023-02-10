import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
const HomepageLayout = (props) => {
  return (
    <div>
      <Header />
        {props.children}
      <Footer />
    </div>
  )
}
export default HomepageLayout