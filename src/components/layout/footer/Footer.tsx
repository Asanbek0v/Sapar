import Image from "next/image";
import footerlogo from "@/src/assets/header.jpg";
import { FC } from "react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="mt-28 mb-10">
      <div className="container mx-auto px-4">
        <div className="flex items-start justify-between gap-10">
          <div className="flex flex-col items-start gap-4">
            <Image src={footerlogo} alt="logo" width={70} />

            <h1 className="text-black/40 font-medium text-[20px] leading-snug">
              Туроператор №1 <br /> по Кыргызстану
            </h1>

            <div className="flex gap-6">
              <FaTelegramPlane className="text-[#FF6600] text-3xl" />
              <FaWhatsapp className="text-[#FF6600] text-3xl" />
              <FaInstagram className="text-[#FF6600] text-3xl" />
            </div>

            <h2 className="text-black/40 text-[11px] mt-2">
              Sapar.kg 2025. All rights reserved
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            <h1 className="text-black text-[22px] font-medium">Контакты</h1>
            <p className="text-black/80 text-[16px] font-normal">
              +996704210706
            </p>
            <p className="text-black/80 text-[16px] font-normal leading-snug">
              Кыргызстан <br /> г. Бишкек, улица <br /> Куренкеева 138
            </p>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            <h1 className="text-black text-[20px] font-medium">Информация</h1>
            <p className="text-black/70">Отдых в Кыргызстана</p>
            <p className="text-black/70">Пограничный пропуск</p>
            <p className="text-black/70">Достопримечательности</p>
            <p className="text-black/70">Чем заняться</p>
            <p className="text-black/70">Культура и традиции</p>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            <h1 className="text-black text-[20px] font-medium">О нас</h1>
            <p className="text-black/70">О компании</p>
            <p className="text-black/70">Туры</p>
            <p className="text-black/70">Сотрудничество</p>
            <p className="text-black/70">Публичная оферта</p>
            <p className="text-black/70">Политика конфиденциальности</p>
            <p className="text-black/70">Политика устойчивости</p>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            <h1 className="text-black text-[20px] font-medium">
              Заказать обратный <br /> звонок
            </h1>
            <p className="text-black/60 text-[16px] my-2">
              Оставьте свой номер телефона ниже
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="+996"
                className="py-2 px-4 border border-[#ff6600] rounded-md outline-none"
              />
              <button className="py-2 px-4 rounded-md bg-[#ff6600] text-white">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
