import { Link, useParams } from 'react-router-dom';
import RecipeCardResult from '../components/RecipeCardResult';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../types/type';

const CategoryLatestRecipesWrapper = () => {
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
    <section id="LatestRecipes" className="px-5 mt-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Latest Recipes</h2>
      </div>
      <div className="flex flex-col gap-[18px] mt-[18px]">
        {category.recipes.length > 0 ? (
          category.recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.slug}`}>
              <RecipeCardResult recipe={recipe} />
            </Link>
          ))
        ) : (
          <p>Belum ada resep</p>
        )}
      </div>
    </section>
  );
};

export default CategoryLatestRecipesWrapper;
