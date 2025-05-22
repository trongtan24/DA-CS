import { Dropdown, DropdownItem } from "flowbite-react";
import { MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";


function DropdownComponent() {
    const Name = (
    <div className="text-sm px-3 mt-3 items-center w-full h-fit py-2 text-nowrap flex flex-col rounded-md cursor-pointer hover:bg-gray-200 transition duration-300 border-2 border-gray-300">
        <MdMenuBook />
        Danh Mục
    </div>);
  return (
    <Dropdown className="p-0 flex flex-col text-nowrap rounded text-black cursor-default" label={Name} dismissOnClick={false} placement="right-start">
        <DropdownItem className="px-2 flex flex-col text-nowrap cursor-default rounded"> 
            <Dropdown label={<div className="p-2 hover:underline">Sách lập trình</div>} className="text-black" placement="right-start"> 
                <DropdownItem> 
                    <Link to="/">Ngôn ngữ C</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Ngôn ngữ C++</Link>
                    </DropdownItem>

                <DropdownItem> 
                    <Link to="/">Ngôn ngữ </Link> 
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

            <Dropdown label={<div className="p-2 hover:underline">Sách tin học cơ bản</div>} className="text-black" placement="right-start"> 
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