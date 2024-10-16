import { Swiper, SwiperSlide } from 'swiper/react';
import FeaturedRecipeCard from '../components/FeaturedRecipeCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../types/type';
import { Link, useParams } from 'react-router-dom';

const CategoryFeaturedRecipesWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/recipes', {
        headers: {
          'X-API-KEY': import.meta.env.VITE_API_BASE_URL,
        },
      })
      .then((response) => {
        setCategory(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <section id="MadeByPeople">
      <div className="flex items-center justify-between px-5">
        <h2 className="font-bold">Made by People</h2>
        <div className="font-semibold text-sm leading-[21px] text-[#FF4C1C]">Explore All</div>
      </div>
      <div className="swiper w-full mt-3">
        <Swiper className="w-full mt-3" direction="horizontal" spaceBetween={16} slidesPerView="auto" slidesOffsetBefore={20} slidesOffsetAfter={20}>
          {category.recipes.length > 0 ? (
            category.recipes.map((recipe) => (
              <SwiperSlide key={recipe.id} className="swiper-slide !w-fit">
                <Link to={`/recipe/${recipe.slug}`}>
                  <FeaturedRecipeCard recipe={recipe} />
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p>Belum ada resep dari kategori tersebut</p>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryFeaturedRecipesWrapper;
