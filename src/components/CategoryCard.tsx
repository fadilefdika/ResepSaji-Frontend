const CategoryCard = () => {
  return (
    <a href="category.html" className="card">
      <div className="flex flex-col w-fit min-w-[90px] rounded-[31px] p-[10px] pb-5 gap-[10px] text-center transition-all duration-300 shadow-[0_10px_20px_0_#FF4C1C80] bg-[#FF4C1C] text-white">
        <div className="flex shrink-0 w-[70px] h-[70px] rounded-full bg-white">
          <img src="/assets/images/icons/healthy.png" className="object-contain w-full h-full" alt="icon" />
        </div>
        <h3 className="font-semibold text-sm leading-[21px]">Healthy</h3>
      </div>
    </a>
  );
};

export default CategoryCard;
