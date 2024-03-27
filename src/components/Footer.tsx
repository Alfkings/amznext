import Image from "next/image";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <div className="flex items-center justify-center w-full h-20 gap-4 text-gray-300 bg-amazon_light">
      <Image className="mdl:w-24 w-14" src={logo} alt="logo" />
      <p className="-mt-4 text-sm">
        All rights reserved{" "}
        <a
          className="hover:text-white hover:underline decoration-[1px] cursor-pointer duration-300"
          href="https://reactbd.com"
          target="_blank"
        >
          @reactbd.com
        </a>
      </p>
    </div>
  );
};

export default Footer;
