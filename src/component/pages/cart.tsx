import { useState } from "react";
import {CBook} from "../../assets/";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function cart(){
    const [quantity, setQuantity] = useState(1);
    var money = 100000;

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row gap-1 text-2xl">
                    <div className=" uppercase">
                        Giỏ hàng 
                    </div>
                    <div>
                        ( {0} sản phẩm)
                    </div>
                </div>

                <div className="w-full flex flex-row">
                    <div className="flex basis-2/3 items-center">
                        ( {0} sản phẩm) 
                    </div>
                    <div className="flex basis-1/3 justify-center ">
                        Số lượng 
                    </div>
                    <div className="flex basis-1/3 justify-center ">
                        Thành tiền
                    </div>
                </div>

                <div className="flex flex-col rounded-lg p-2 border-gray-200">

                    <div className="w-full flex flex-row items-center border-b-2 rounded-lg border-gray-200 bg-red-50 pt-4 pb-4 ">
                        <img src={CBook} alt="product_img" className="w-32 h-32 object-contain" />
                        <div className="flex flex-row items-center flex-1 h-32 gap-8.5">
                            <div className="flex flex-col basis-16/30 h-32 justify-between">
                                <div>
                                    Tên sản phẩm
                                </div>
                                <div>
                                    <span className="font-bold">{money.toLocaleString()} đ</span>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center basis-1/3">
                                <div>
                                    <input type="number" className="w-16 rounded bg-white border-b-2 border-transparent hover:border-gray-400 focus-visible:border-blue-500 focus:outline-none transition duration-300" value={quantity} onChange={(e) => {setQuantity(Number(e.target.value))}} min={1} max={100}/>
                                </div>

                                <div className="text-red-700 font-bold">
                                    {(money * quantity).toLocaleString()}đ
                                </div>
                            </div> 
                            <div>
                                <button className="text-red-400 hover:text-red-700 basis-1/3 transition duration-300 flex flex-row gap-1 items-center"> <FaRegTrashAlt/> Xoá</button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row items-center border-b-2 rounded-lg border-gray-200 bg-red-50 pt-4 pb-4 ">
                        <img src={CBook} alt="product_img" className="w-32 h-32 object-contain" />
                        <div className="flex flex-row items-center flex-1 h-32 gap-8.5">
                            <div className="flex flex-col basis-16/30 h-32 justify-between">
                                <div>
                                    Tên sản phẩm
                                </div>
                                <div>
                                    <span className="font-bold">{money.toLocaleString()} đ</span>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center basis-1/3">
                                <div>
                                    <input type="number" className="w-16 rounded bg-white border-b-2 border-transparent hover:border-gray-400 focus-visible:border-blue-500 focus:outline-none transition duration-300" value={quantity} onChange={(e) => {setQuantity(Number(e.target.value))}} min={1} max={100}/>
                                </div>

                                <div className="text-red-700 font-bold">
                                    {(money * quantity).toLocaleString()}đ
                                </div>
                            </div> 
                            <div>
                                <button className="text-red-400 hover:text-red-700 basis-1/3 transition duration-300 flex flex-row gap-1 items-center"> <FaRegTrashAlt/> Xoá</button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row items-center border-b-2 rounded-lg border-gray-200 bg-red-50 pt-4 pb-4 ">
                        <img src={CBook} alt="product_img" className="w-32 h-32 object-contain" />
                        <div className="flex flex-row items-center flex-1 h-32 gap-8.5">
                            <div className="flex flex-col basis-16/30 h-32 justify-between">
                                <div>
                                    Tên sản phẩm
                                </div>
                                <div>
                                    <span className="font-bold">{money.toLocaleString()} đ</span>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center basis-1/3">
                                <div>
                                    <input type="number" className="w-16 rounded bg-white border-b-2 border-transparent hover:border-gray-400 focus-visible:border-blue-500 focus:outline-none transition duration-300" value={quantity} onChange={(e) => {setQuantity(Number(e.target.value))}} min={1} max={100}/>
                                </div>

                                <div className="text-red-700 font-bold">
                                    {(money * quantity).toLocaleString()}đ
                                </div>
                            </div> 
                            <div>
                                <button className="text-red-400 hover:text-red-700 basis-1/3 transition duration-300 flex flex-row gap-1 items-center"> <FaRegTrashAlt/> Xoá</button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row items-center justify-center rounded-lg pt-4 pb-4 ">
                        <Link to="/productPage" className="bg-blue-500 hover:bg-indigo-500 cursor-pointer text-white transition duration-300 p-2 rounded-xl">Tiếp tục mua</Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default cart;