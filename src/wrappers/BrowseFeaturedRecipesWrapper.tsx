import { Swiper, SwiperSlide } from 'swiper/react';
import FeaturedRecipeCard from '../components/FeaturedRecipeCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Recipe } from '../types/type';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loading';

const BrowseFeaturedRecipesWrapper = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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
        setRecipes(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <section id="MadeByPeople">
      <div className="flex items-center justify-between px-5">
        <h2 className="font-bold">Made by People</h2>
        <div className="font-semibold text-sm leading-[21px] text-[#FF4C1C]">Explore All</div>
      </div>
      <div className="swiper w-full mt-3">
        {recipes.length === 0 ? (
          <div className="text-center mt-5">
            <p>Belum ada resep untuk sekarang</p>
          </div>
        ) : (
          <Swiper className="w-full mt-3" direction="horizontal" spaceBetween={16} slidesPerView="auto" slidesOffsetBefore={20} slidesOffsetAfter={20}>
            {recipes.map((recipe) => (
              <SwiperSlide key={recipe.id} className="swiper-slide !w-fit">
                <Link to={`/recipe/${recipe.slug}`}>
                  <FeaturedRecipeCard recipe={recipe} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default BrowseFeaturedRecipesWrapper;
