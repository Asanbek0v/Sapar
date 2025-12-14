import Image from "next/image";
import AboutCard1 from "@/src/assets/aboutcard1.svg";
import AboutCard2 from "@/src/assets/aboutcard2.svg";
import AboutCard3 from "@/src/assets/aboutcard3.svg";
import AboutCard4 from "@/src/assets/aboutcard4.svg";
import AboutIcons from "@/src/assets/abouticons.svg";

const AboutContent = () => {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="relative rounded-3xl overflow-hidden h-96 flex   items-start p-6 text-white">
        <Image src={AboutCard1} alt="card1" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold pl-4">Гарантия лучшей цены</h2>
          <p className="text-sm opacity-90 pl-4">Работаем без посредников</p>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden h-96">
        <Image src={AboutCard2} alt="card2" fill className="object-cover" />
      </div>
      <div className="relative rounded-3xl overflow-hidden h-96 flex items-end p-6 text-white ">
        <Image src={AboutCard3} alt="card3" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
        <h2 className="relative z-10 text-3xl font-semibold px-3 py-10">
          5000+ довольных туристов
        </h2>
      </div>
      <div className="relative rounded-3xl overflow-hidden h-96 flex flex-col justify-end p-6 text-white">
        <Image src={AboutCard4} alt="card4" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
        <div className="relative z-10  items-center gap-3">
          <h2 className="text-3xl font-semibold px-1 py-8">
            Лучшие гиды и места размещения
          </h2>
          <Image
            src={AboutIcons}
            alt="icon"
            width={150}
            height={70}
            className="relative right-7 px-1 py-4"
          />
        </div>
      </div>
    </div>
  );
};
export default AboutContent;
