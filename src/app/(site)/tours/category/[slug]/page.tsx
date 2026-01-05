import { categories } from "@/src/data/Categories";
import TourPage from "@/src/components/pages/tours/Tours";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return <h1>Категория табылган жок</h1>;
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold m-[100px_10px_10px_20px]">{category.title}</h1>

      <TourPage categoryTitle={category.title} />
    </div>
  );
}
