import { AboutType } from "@/src/types/about.interface";

interface Props {
  data: AboutType[];
}

export const AboutHeader = ({ data }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <h1 className="text-4xl sm:text-4xl font-bold max-w-lg">
        {data[0]?.title}{" "} <br />
        <span className="text-[#FF6600]">{data[0]?.subTitle}</span>
      </h1>

      <button className="bg-orange-500 text-white h-10 px-6 rounded-xl hover:bg-orange-600 duration-300">
        Узнать больше
      </button>
    </div>
  );
};
