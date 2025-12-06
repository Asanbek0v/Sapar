import { FC } from "react";
import "./Hero.css";
const Hero: FC = () => {
  return (
    <section id="hero">
      <div className="container">
        <div className="hero">
          <video autoPlay muted loop className="hero-video">
            <source src="/videos/kyrgyzstan.mp4" type="video/mp4" />
          </video>
          <div className="hero-content">
            <h1>
              Туры по <span>Кыргызстану</span>
            </h1>
            <p>Лучше один раз увидеть, чем сто раз мечтать</p>
            <div className="search">{/* Форма поиска */}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
