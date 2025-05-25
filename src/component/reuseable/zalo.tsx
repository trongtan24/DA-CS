import { SiZalo } from "react-icons/si";

function zaloPopup(){
    const phone = "0123456789";
    return (
        <div className="fixed flex flex-col bottom-20 md:bottom-4 right-4 bg-blue-500 rounded-full p-1">
            <a className='underline underline-offset-4 transition duration-300 hover:text-black ' target='_blank' href={`https://zalo.me/${phone}`}>
                <SiZalo size={32} className="bg-white text-blue-500 rounded-full p-1"/>
            </a>
        </div>
    )
}

export default zaloPopup;