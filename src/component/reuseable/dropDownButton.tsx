import { Dropdown, DropdownItem } from "flowbite-react";
import { MdMenuBook } from "react-icons/md";
import { ScrollToTopLink } from "../reuseable"

function DropdownComponent() {
    const linkClass = `w-full bg-white text-nowrap flex flex-row items-center justify-center rounded-md md:transition md:duration-300 cursor-pointer hover:bg-gray-200 hover:text-black`;


    const Name = (
    <div className={linkClass}>
        <MdMenuBook />
        Danh Mục
    </div>
    );

  return (
    <Dropdown className="" label={Name} dismissOnClick={false} placement="bottom-start">
        <DropdownItem className="px-2 bg-white hover:bg-white flex flex-col text-nowrap cursor-default rounded gap-2 justify-baseline items-baseline"> 
            <Dropdown label={<div className="p-2 bg-white hover:underline pr-11.5">Sách lập trình</div>} className="text-black bg-white hover:bg-white border-2 border-gray-300" placement="bottom-start"> 
                <DropdownItem> 
                    <ScrollToTopLink to="/">Ngôn ngữ C</ScrollToTopLink>
                    </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Ngôn ngữ C++</ScrollToTopLink>
                    </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Ngôn ngữ Java</ScrollToTopLink> 
                </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Ngôn ngữ Python</ScrollToTopLink>
                    </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Ngôn ngữ JavaScript</ScrollToTopLink>
                    </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Ngôn ngữ C#</ScrollToTopLink>
                    </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Ngôn ngữ PHP</ScrollToTopLink>
                    </DropdownItem>
            </Dropdown>

            <Dropdown label={<div className="p-2 bg-white hover:bg-white hover:underline">Sách tin học cơ bản</div>} className="text-black bg-white hover:bg-white border-2 border-gray-300" placement="bottom-start"> 
                <DropdownItem> 
                    <ScrollToTopLink to="/">Word</ScrollToTopLink>
                    </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Powerpoint</ScrollToTopLink>
                    </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Excel</ScrollToTopLink> 
                </DropdownItem>

                <DropdownItem> 
                    <ScrollToTopLink to="/">Project</ScrollToTopLink>
                </DropdownItem>
            </Dropdown>
        </DropdownItem>
    </Dropdown>
  );
}

export default DropdownComponent;