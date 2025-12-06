import Attraction from "./attraction/Attraction";
import Hero from "./hero/Hero";
import Tours from "./tours/Tours";

const LayoutMain = () => {
  return (
    <div>
      <Hero />
      <Tours />
      <Attraction />
    </div>
  );
};

export default LayoutMain;
