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
          <div className="w-[760px] h-[500px] relative">
            <div className="bg-[#0000004c] w-full h-[540px] absolute top-0 left-0 rounded-4xl"></div>
            <Image
              className="w-full z-10"
              src={tour1}
              alt="img"
              width={100}
              height={100}
            />
            <h1 className="absolute -bottom-8 text-xl text-white font-bold left-30">
              Треккинг
            </h1>
          </div>
          <div className="flex flex-wrap gap-[15px]">
            <div className="w-[395px] relative">
              <div className="bg-[#0000004c] w-full h-full absolute top-0 left-0 rounded-4xl"></div>
              <Image className="w-full" src={tour2} alt="img" />
              <h1 className="absolute bottom-2.5 text-xl text-white font-bold left-25">
                Культурные туры
              </h1>
            </div>
            <div className="w-[395px] relative">
              <div className="bg-[#0000004c] w-full h-full absolute top-0 left-0 rounded-4xl"></div>
              <Image src={tour3} alt="img" />
              <h1 className="absolute bottom-2.5 text-xl text-white font-bold left-30">
                Активные туры
              </h1>
            </div>
            <div className="w-[395px] relative">
              <div className="bg-[#0000004c] w-full h-full absolute top-0 left-0 rounded-4xl"></div>
              <Image src={tour4} alt="img" />
              <h1 className="absolute bottom-2.5 text-xl text-white font-bold left-35">
                Альпинизм
              </h1>
            </div>
            <div className="w-[395px] relative">
              <div className="bg-[#0000004c] w-full h-full absolute top-0 left-0 rounded-4xl"></div>
              <Image src={tour5} alt="img" />
              <h1 className="absolute bottom-2.5 text-xl text-white font-bold left-30">
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
