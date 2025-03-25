import "primereact/resources/themes/lara-light-cyan/theme.css";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0)

  // Set Active index on page load
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/finances") {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  }, []);

  // Menu Items
  const items = [
    {
      label: "Overview",
      icon: <FiTrendingUp className="mr-2" />,
      command: () => {
        navigate("/");
        setActiveIndex(0);
      },
      className: activeIndex === 0 ? "text-blue-500 font-bold" : "text-gray-500",
    },
    {
      label: "Finances",
      icon: <FaMoneyBillWave className="mr-2" />,
      command: () => {
        navigate("/finances");
        setActiveIndex(1);
      },
    }
  ];

  // Styling for Logo
  const logoStyling = {
    color: "#01830A",
    fontFamily: "Inter"
  };

  return (
    <div className="w-[95%] flex flex-row">

      {/* Logo Div */}
      <div className="w-[50%] md:w-[35%] lg:w-[20%] text-2xl lg:text-3xl mb-1 pl-5 pt-6 pb-3 border border-white border-b-gray-300">
        <span style={logoStyling} className="font-semibold">
          $pend
        </span>{" "}
        <span style={logoStyling} className="font-semibold">
          $
        </span>
        ense
      </div>
      {/* Navigation Div */}
      <div className="w-[50%] md:w-[75%] lg:w-[80%] pt-6 mb-0 pb-1">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="border-none"
        />
      </div>
    </div>
  );
};

export default Header;
