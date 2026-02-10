import React from "react";
import Hero from "../components/Hero.jsx";
import { Instructor } from "../components/Instructor.jsx";
import { Technologies } from "../components/Technologies.jsx";
import Footer from "../components/Footer.jsx";

export const Home = () => {
  return (
    <>
      {" "}
      <Hero />
     <Instructor />
    <Technologies></Technologies>
    <Footer />
    </>
  );
};
