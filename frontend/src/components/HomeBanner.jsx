import banner from "../image/banner_tuutruong.png";
const HomeBanner = () => {
  /**
     * sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }
     */
  //md: min-width >=768
  return (
    <div className="z-[-1] relative flex-col flex md:flex-row  bg-blue-400 mb-8 mt-10">
      <div className="mx-auto px-8 py-10 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-3 text-center">
          <h1 className="text-3xl md:text-4xl font-bold  text-white mb-5">
            {" "}
            Mừng Ngày Tựu Trường năm học mới
          </h1>
          <p className="text-lg md:text-xl text-white mb-3">
            {" "}
            Nhiều khuyến mãi hấp dẫn dành riêng cho học sinh , sinh viên
          </p>
          <p className="text-lg md:text-xl text-white mb-3">
            {" "}
            Nhiều cơ hội bốc thăm trúng thưởng{" "}
            <p className="text-2xl md:text-4xl text-yellow-500 font-bold">
              lên đến 50%
            </p>
          </p>
        </div>
      </div>
      <div className="w-1/3 relative w-auto  md:w-1/3 aspect-video  ">
        <img className="object-contain " src={banner} alt="" />
      </div>
    </div>
  );
};

export default HomeBanner;
