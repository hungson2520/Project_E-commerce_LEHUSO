import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const NavigateHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-[70px]   bg-gray-300 flex justify-evenly items-center px-8">
      <ul className="flex space-x-6 sm:w-[300px] justify-center sm:gap-5 lg:gap-20 lg:mx-[100px] ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center hover:bg-yellow-300 lg:px-5  py-5 cursor-pointer bg-blue-300"
              : "flex items-center hover:bg-yellow-300 lg:px-5 py-5 cursor-pointer bg-none "
          }
          to={`/product/smartphone`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-phone-fill mr-2"
            // className={({ isActive }) =>
            //   isActive
            //     ? "bi bi-phone-fill mr-2 text-blue-500"
            //     : "bi bi-phone-fill mr-2 "
            // }

            viewBox="0 0 16 16"
          >
            <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
          </svg>

          <span
            //   className=" text-blue-500"
            className={({ isActive }) => (isActive ? " text-blue-500" : " ")}
          >
            SmartPhone
          </span>
        </NavLink>
        <NavLink
          //   className="flex items-center  hover:bg-yellow-300  py-5 cursor-pointer"
          //   onClick={() => {
          //     navigate(`/product/tablet`);
          //   }}

          className={({ isActive }) =>
            isActive
              ? "flex items-center hover:bg-yellow-300 lg:px-5  py-5 cursor-pointer bg-blue-300"
              : "flex items-center hover:bg-yellow-300 lg:px-5 py-5 cursor-pointer bg-transparent "
          }
          to={`/product/Tablet`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-tablet-landscape-fill mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M2 14a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2zm11-7a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
          Tablet
        </NavLink>
        <NavLink
          //   className="flex items-center  hover:bg-yellow-300  py-5 cursor-pointer"
          //   onClick={() => {
          //     navigate(`/product/laptop`);
          //   }}
          className={({ isActive }) =>
            isActive
              ? "flex items-center hover:bg-yellow-300 lg:px-5 py-5 cursor-pointer bg-blue-300"
              : "flex items-center hover:bg-yellow-300 lg:px-5 py-5 cursor-pointer bg-transparent "
          }
          to={`/product/laptop`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-laptop-fill mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 2A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
          </svg>
          Laptop
        </NavLink>
        <NavLink
          //   className="flex items-center  hover:bg-yellow-300  py-5 px-5 cursor-pointer"
          //   onClick={() => {
          //     navigate(`/product/smartwatch`);
          //   }}
          className={({ isActive }) =>
            isActive
              ? "flex items-center hover:bg-yellow-300 lg:px-5 py-5 cursor-pointer bg-blue-300"
              : "flex items-center hover:bg-yellow-300 lg:px-5 py-5 cursor-pointer bg-transparent "
          }
          to={`/product/smartwatch`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-smartwatch mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M9 5a.5.5 0 0 0-1 0v3H6a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 .5-.5V5z" />
            <path d="M4 1.667v.383A2.5 2.5 0 0 0 2 4.5v7a2.5 2.5 0 0 0 2 2.45v.383C4 15.253 4.746 16 5.667 16h4.666c.92 0 1.667-.746 1.667-1.667v-.383a2.5 2.5 0 0 0 2-2.45V8h.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H14v-.5a2.5 2.5 0 0 0-2-2.45v-.383C12 .747 11.254 0 10.333 0H5.667C4.747 0 4 .746 4 1.667zM4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3z" />
          </svg>
          Smartwatch
        </NavLink>
      </ul>
    </header>
  );
};

export default NavigateHeader;
