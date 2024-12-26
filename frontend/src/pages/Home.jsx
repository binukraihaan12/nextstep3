import React from "react";
import Header from "../components/Header";
import SubjectMenu from "../components/SubjectMenu";
import TopTeachers from "../components/TopTeachers";
import Testemonial from "../components/Testemonial";
import CallToAction from "../components/callToAction";
import ImageAd from "../components/imageAd";
import ClassAd from "../components/ClassAd";

const Home = () => {
  return (
    <div>
      <Header />
      <ImageAd />
      <SubjectMenu />
      <TopTeachers />
      <Testemonial />
      <ClassAd />
      <CallToAction />
    </div>
  );
};

export default Home;
