import { Dropdown, DropdownItem } from "flowbite-react";
import { MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";

function DropdownComponent() {
    const Name = (
    <div className="text-sm px-3 mt-3 items-center w-full h-fit py-2 text-nowrap flex flex-col rounded-md cursor-pointer bg-white hover:bg-gray-200 transition duration-300 border-2 border-gray-300">
        <MdMenuBook />
        Danh Mục
    </div>);
  return (
    <Dropdown className="p-0 flex gap-2 bg-white flex-col text-nowrap rounded text-black cursor-default hover:bg-white" label={Name} dismissOnClick={false} placement="right-start">
        <DropdownItem className="px-2 bg-white hover:bg-white flex flex-col text-nowrap cursor-default rounded gap-2 justify-baseline items-baseline"> 
            <Dropdown label={<div className="p-2 bg-white hover:underline pr-11.5">Sách lập trình</div>} className="text-black bg-white hover:bg-white border-2 border-gray-300" placement="right-start"> 
                <DropdownItem> 
                    <Link to="/">Ngôn ngữ C</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Ngôn ngữ C++</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Ngôn ngữ Java</Link> 
                </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Ngôn ngữ Python</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Ngôn ngữ JavaScript</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Ngôn ngữ C#</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Ngôn ngữ PHP</Link>
                    </DropdownItem>
            </Dropdown>

            <Dropdown label={<div className="p-2 bg-white hover:bg-white hover:underline">Sách tin học cơ bản</div>} className="text-black bg-white hover:bg-white border-2 border-gray-300" placement="right-start"> 
                <DropdownItem> 
                    <Link to="/">Word</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Powerpoint</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Excel</Link> 
                </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Project</Link>
                </DropdownItem>
            </Dropdown>
        </DropdownItem>
    </Dropdown>
  );
}

export default DropdownComponent;