import Carousel from "../carousel/carousel";
import ProductCard from "../reuseable/productCard";
import { Link } from 'react-router-dom'
import img2 from "/src/assets/CBook.png";
import img3 from "/src/assets/PythonBook.jpg";
import ToTheTopButton from "../reuseable/ToTheTopButton";
import { SiZalo } from "react-icons/si";

function home() {
  const phone = "0123456789";

    return (
        <div className="w-full px-4">
            <div className='flex flex-col items-center max-w-[1280px] mx-auto'>
                <ToTheTopButton />

                <Carousel
                slides={[
                    { image: "https://theme.hstatic.net/200000017360/1000763157/14/ms_banner_img3.jpg?v=202", link: "https://example.com/1" },
                    { image: "https://theme.hstatic.net/200000017360/1000763157/14/ms_banner_img3.jpg?v=202", link: "https://example.com/2" },
                    { image: "https://theme.hstatic.net/200000017360/1000763157/14/ms_banner_img3.jpg?v=202", link: "https://example.com/3" },
                    { image: "https://theme.hstatic.net/200000017360/1000763157/14/ms_banner_img3.jpg?v=202", link: "https://example.com/4" },
                ]}
                />
                <div className="flex flex-col w-full mt-12">
                    <div className="text-left font-bold text-3xl">Sản phẩm nổi bật</div>
                    <div>
                        <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                        <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                        <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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

                <div className="fixed flex flex-col bottom-4 right-4 bg-blue-500 rounded-full p-1">
                    <a className='underline underline-offset-4 transition duration-300 hover:text-black ' target='_blank' href={`https://zalo.me/${phone}`}>
                        <SiZalo size={32} className="bg-white text-blue-500 rounded-full p-1"/>
                    </a>
                </div>
            </div>
        </div>
        
    );
}

export default home