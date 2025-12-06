import tour1 from "@/src/assets/img/tour1.svg";
import tour2 from "@/src/assets/img/tour2.svg";
import tour3 from "@/src/assets/img/tour3.svg";
import tour4 from "@/src/assets/img/tour4.svg";
import tour5 from "@/src/assets/img/tour5.svg";
import Image from "next/image";

const Tours = () => {
  return (
    <section className="tours m-[50px_0]">
      <div className="container">
        <h1>
          Выберите свой <br /> <span>тур</span>
        </h1>
        <div className="flex relative gap-3">
          <div className="w-[570px] relative">
            <div className="bg-[#0000004c] w-[100%] h-[100%] absolute top-0 left-0 rounded-3xl"></div>
            <Image
              className="w-[100%] z-10"
              src={tour1}
              alt="img"
              width={100}
              height={100}
            />
            <h1 className="absolute bottom-[10px] text-xl text-white font-bold left-[80px]">
              Треккинг
            </h1>
          </div>
          <div className="flex flex-wrap gap-[15px]">
            <div className="w-[350px] relative">
              <div className="bg-[#0000004c] w-[100%] h-[100%] absolute top-0 left-0 rounded-3xl"></div>
              <Image className="w-[100%]" src={tour2} alt="img" />
              <h1 className="absolute bottom-[10px] text-xl text-white font-bold left-[50px]">
                Культурные туры
              </h1>
            </div>
            <div className="w-[350px] relative">
              <div className="bg-[#0000004c] w-[100%] h-[100%] absolute top-0 left-0 rounded-3xl"></div>
              <Image src={tour3} alt="img" />
              <h1 className="absolute bottom-[10px] text-xl text-white font-bold left-[60px]">
                Активные туры
              </h1>
            </div>
            <div className="w-[350px] relative">
              <div className="bg-[#0000004c] w-[100%] h-[100%] absolute top-0 left-0 rounded-3xl"></div>
              <Image src={tour4} alt="img" />
              <h1 className="absolute bottom-[10px] text-xl text-white font-bold left-[80px]">
                Альпинизм
              </h1>
            </div>
            <div className="w-[350px] relative">
              <div className="bg-[#0000004c] w-[100%] h-[100%] absolute top-0 left-0 rounded-3xl"></div>
              <Image src={tour5} alt="img" />
              <h1 className="absolute bottom-[10px] text-xl text-white font-bold left-[70px]">
                Лыжные туры
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tours;
