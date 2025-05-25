import Carousel from "../carousel/carousel.tsx";
import ProductCard from "../reuseable/productCard";
import { Link } from 'react-router-dom'
import img2 from "/src/assets/CBook.png";
import img3 from "/src/assets/PythonBook.jpg";
import video1 from "/src/assets/videoplayback.mp4";
import ToTheTopButton from "../reuseable/ToTheTopButton";
import { SiZalo } from "react-icons/si";
import ZaloPopup from "../reuseable/zalo.tsx"

function home() {
    const slides = [
        { image: img2, link: "https://example.com/book1" , isVideo: false },
        { image: img3, link: "https://example.com/book2" , isVideo: false },
        { image: img2, link: "https://example.com/book3" , isVideo: false },
        { image: video1, link: "https://example.com/book4" , isVideo: true },
    ];

    return (
        <div className="w-full px-4">
            <div className='flex flex-col items-center max-w-[1280px] mx-auto'>
                <ToTheTopButton />

                <div className="flex flex-row justify-center lg:justify-evenly">
                    <div className="text-left font-bold text-3xl lg:block hidden">Danh mục</div>
                    <Carousel slides={slides}/>
                </div>
                
                <div className="flex flex-col w-full mt-12">
                    <div className="text-left font-bold text-3xl">Sản phẩm nổi bật</div>
                    <div>
                        <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            <ProductCard image={img2} link="/product" price={100000} product="Giáo Trình Kỹ Thuật Lập Trình C Căn Bản & Nâng Cao" sales={50}/>
                            <ProductCard image={img2} link="/product" price={200000} product="Sản phẩm 2" />
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <Link to="/about" className="text-center m-8 p-2 pr-8 pl-8 font-bold text-base border-2 cursor-pointer rounded-4xl text-nowrap transition hover:bg-black hover:text-white hover:border-black">Xem thêm</Link>
                    </div>
                </div>
                
                <div className="flex flex-col w-full mt-12">
                    <div className="text-left font-bold text-3xl">Sản phẩm nổi bật</div>
                    <div>
                        <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            <ProductCard image={img3} link="/product" price={100000} product="Sản phẩm 1" sales={50}/>
                            <ProductCard image={img3} link="/product" price={200000} product="Sản phẩm 2" rating={1} />
                            <ProductCard image={img3} link="/product" price={300000} product="Sản phẩm 3" rating={4} />
                            <ProductCard image={img3} link="/product" price={400000} product="Sản phẩm 4" rating={6} />
                            <ProductCard image={img3} link="/product" price={500000} product="Sản phẩm 5" />
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <Link to="/about" className="text-center m-8 p-2 pr-8 pl-8 font-bold text-base border-2 cursor-pointer rounded-4xl text-nowrap transition hover:bg-black hover:text-white hover:border-black">Xem thêm</Link>
                    </div>
                </div>

                <div className="flex flex-col w-full mt-12">
                    <div className="text-left font-bold text-3xl">Sản phẩm nổi bật</div>
                    <div>
                        <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            <ProductCard image={img2} link="/product" price={100000} product="Sản phẩm 1" sales={50}/>
                            <ProductCard image={img2} link="/product" price={200000} product="Sản phẩm 2" />
                            <ProductCard image={img2} link="/product" price={300000} product="Sản phẩm 3" />
                            <ProductCard image={img2} link="/product" price={400000} product="Sản phẩm 4" />
                            <ProductCard image={img2} link="/product" price={500000} product="Sản phẩm 5" />
                            <ProductCard image={img2} link="/product" price={100000} product="Sản phẩm 1" sales={50}/>
                            <ProductCard image={img2} link="/product" price={200000} product="Sản phẩm 2" />
                            <ProductCard image={img2} link="/product" price={300000} product="Sản phẩm 3" />
                            <ProductCard image={img2} link="/product" price={400000} product="Sản phẩm 4" />
                            <ProductCard image={img2} link="/product" price={500000} product="Sản phẩm 5" />
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <Link to="/about" className="text-center m-8 p-2 pr-8 pl-8 font-bold text-base border-2 cursor-pointer rounded-4xl text-nowrap transition hover:bg-black hover:text-white hover:border-black">Xem thêm</Link>
                    </div>
                </div>

                <ZaloPopup/>

                
            </div>
        </div>
        
    );
}

export default home