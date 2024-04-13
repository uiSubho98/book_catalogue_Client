import React from "react";
import WavyBackgroundDemo from "../components/Banner";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <WavyBackgroundDemo />
      {user && <Hero />}
    </>
  );
};

export default Home;
