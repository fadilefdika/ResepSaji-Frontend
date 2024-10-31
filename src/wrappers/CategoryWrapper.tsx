import { Swiper, SwiperSlide } from 'swiper/react';
import CategoryCard from '../components/CategoryCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../types/type';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loading';

const CategoryWrapper = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/categories', {
        headers: {
          'X-API-KEY': import.meta.env.VITE_API_BASE_URL,
        },
      })
      .then((response) => {
        setCategories(response.data.data);
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
    <section id="Categories" className="mt-[30px]">
      <div className="flex items-center justify-between px-5">
        <h2 className="font-bold">By Categories</h2>
      </div>
      <div className="swiper w-full mt-3">
        <Swiper className="w-full mt-3" direction="horizontal" spaceBetween={16} slidesPerView="auto" slidesOffsetBefore={20} slidesOffsetAfter={20}>
          {categories.map((category) => (
            <SwiperSlide key={category.id} className="!w-fit pb-[30px]">
              <Link to={`/category/${category.slug}`}>
                <CategoryCard category={category} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryWrapper;
