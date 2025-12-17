import Carousel from "../../carousel/Carousel";

const Attraction = () => {
  return (
    <div>
      <div className="container">
        <h1 className="text-4xl font-bold text-black">Топ-10 достопримечательностей <br /> <span className="text-4xl font-bold text-orange-500">Кыргызстана</span></h1>
        <Carousel/>
      </div>
    </div>
  );
};

export default Attraction;
