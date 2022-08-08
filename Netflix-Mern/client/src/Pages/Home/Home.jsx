import { Featured } from "Components/featured/Featured";
import { List } from "Components/List/List";
import Navbar from "Components/Navbar/Navbar";
import React from "react";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured type="" />
      <List />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Home;
