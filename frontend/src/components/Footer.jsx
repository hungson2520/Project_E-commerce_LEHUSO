import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-600 h-80 w-full flex mt-50px">
      <div className="flex-1 bg-gray-300">
        <ul className="mt-10 ml-14 text-yellow text-xs md:text-sm lg:text-lg xl:text-xl">
          <li className="mb-8">Cửa hàng chúng tôi LEHUSO chuyên kinh doanh</li>
          <li
            onClick={() => navigate("/product/smartphone")}
            className="cursor-pointer"
          >
            <span className="hover:bg-blue-400"> SmartPhone</span>
          </li>
          <li
            onClick={() => navigate("/product/tablet")}
            className="cursor-pointer"
          >
            <span className="hover:bg-blue-400">Tablet</span>
          </li>
          <li
            onClick={() => navigate("/product/laptop")}
            className="cursor-pointer"
          >
            <span className="hover:bg-blue-400">Laptop</span>
          </li>
          <li
            onClick={() => navigate("/product/smartwatch")}
            className="cursor-pointer"
          >
            <span className="hover:bg-blue-400">Smartwatch</span>
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-gray-400">
        <h4 className="mt-10 text-white ml-5 text-xs md:text-sm lg:text-lg xl:text-xl">
          About Us
        </h4>
        <p className="text-white ml-5 text-xs md:text-sm lg:text-lg xl:text-xl">
          Cửa hàng chúng tôi LEHUSO đảm bảo sẽ cung cấp những dịch vụ tốt nhất
          thị trường cho quý vị , hy vọng sẽ được phục vụ những thượng đế của
          chúng tôi.
        </p>
      </div>
      <div className="flex-1 bg-gray-300">
        <p className="text-orange mt-10 ml-5 text-xs md:text-sm lg:text-lg xl:text-xl ">
          Contact Us xin vui lòng liên hệ :{" "}
          <strong>hungson2520@gmail.com</strong>
          <p>
            Liên Hệ Qua Facebook của tôi :
            <Link
              className="text-blue-500"
              to="https://www.facebook.com/HarrySon25/"
            >
              FaceBook
            </Link>
          </p>
          <p>
            Gọi Mua :<span className="text-blue-500">078.490.2222</span>
          </p>
        </p>
      </div>
    </div>
  );
};

export default Footer;
