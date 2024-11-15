import logo from "../../../public/logo.png";
import Image from "next/image";

const Footer = () => {
  const links = {
    projects: "/projects",
    discover: "/discover",
    work: "/work",
  };
  return (
    <footer className="flex justify-between items-center px-8 md:px-16 lg:px-24 xl:px-40 py-6">
      <a href="/">
        <Image
          src={logo}
          alt="logo"
          className="filter invert cursor-pointer"
          width={120}
          height={120}
        />
      </a>
      <div className="flex space-x-4 ">
        {Object.entries(links).map(([key, value]) => (
          <a
            key={key}
            className="text-xl lowercase opacity-50 hover:opacity-100 "
            href={value}
          >
            {key}
          </a>
        ))}
      </div>
      <a
        className="manrope text-2xl font-bold opacity-75"
        href="https://www.shrit.in"
        target="_blank"
      >
        @shrit1401
      </a>
    </footer>
  );
};

export default Footer;
