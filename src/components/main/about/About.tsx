"use client";

import AboutContent from "@/src/entities/about/AboutContent";
import { AboutHeader } from "@/src/entities/about/AboutHeader";
import { AboutType } from "@/src/types/about.interface";

const About = () => {
  const data: AboutType[] = [
    {
      title: "Немного",
      subTitle: "о нашем cайте",
    },
  ];

  return (
    <section id="About" className="pt-16 pb-16">
      <div className="container mx-auto px-4">
        <AboutHeader data={data} />
        <AboutContent />
      </div>
    </section>
  );
};

export default About;
