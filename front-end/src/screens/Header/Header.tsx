"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from 'next/navigation';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

const Header = () => {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width

    // Check if window object is available on the client-side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);

            // Set initial active index based on path
            const path = window.location.pathname;
            if (path === "/finances") {
                setActiveIndex(1);
            } else {
                setActiveIndex(0);
            }

            // Set initial window width on component mount
            setWindowWidth(window.innerWidth);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);


    // Menu Items
    const items = [
        {
            label: "Overview",
            icon: <FiTrendingUp className="mr-2 sm:text-sm" />,
            command: () => {
                router.push("/");
                setActiveIndex(0);
            },
            className: `${activeIndex === 0 ? "text-blue-500 font-bold" : "text-gray-500"} text-base sm:text-sm`,
        },
        {
            label: "Finances",
            icon: <FaMoneyBillWave className="mr-2 sm:text-sm" />,
            command: () => {
                router.push("/finances");
                setActiveIndex(1);
            },
            className: `${activeIndex === 1 ? "text-blue-500 font-bold" : "text-gray-500"} text-base sm:text-sm`,
        }
    ];

    // Conditional Rendering Based on Screen Width
    return (
        windowWidth <= 595 ?
            (
                <Sheet>
                    <SheetTrigger>Open</SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            ) :
            (
                <div className='w-full flex justify-center'>
                    <div className="w-[95%] flex flex-row">
                        {/* Logo Div */}
                        <div className="w-[50%] md:w-[35%] lg:w-[20%] text-2xl lg:text-3xl mb-1 pl-5 pt-6 pb-3 border border-white border-b-gray-300">
                            <span style={{ color: "#01830A" }} className="font-semibold">
                                $pend
                            </span>{" "}
                            <span style={{ color: "#01830A" }} className="font-semibold">
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
                                className="border-none [&_.p-tabmenu-nav]:text-base [&_.p-tabmenu-nav]:sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
            )
    );
};

export default Header;
