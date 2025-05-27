import { Dropdown, DropdownItem } from "flowbite-react";
import { MdMenuBook } from "react-icons/md";

function DropdownComponent() {
    const divs = (
        <div className="text-md px-3 items-center w-full h-fit py-2 text-nowrap flex flex-col rounded-md cursor-pointer bg-white hover:bg-gray-200 transition duration-300 md:border-2 border-gray-300">
            <MdMenuBook />
            Danh Mục
        </div>
    );

    return (
        <Dropdown className="" label="Danh mục" renderTrigger={() => divs}>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
    )
}

export default DropdownComponent;