import Review from "./review/Review";
import About from "./about/About";
import Hero from "./hero/Hero";
import Tours from "./tours/Tours";
import Attraction from "./attraction/Attraction";

const LayoutMain = () => {
  return (
    <>
      <Hero />
      <Attraction />
      <Tours />
      <About />
      <Review />
    </>
  );
};

export default LayoutMain;
