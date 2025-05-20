import Carousel from "../carousel/carousel";
import ProductCard from "./productCard";
import { Link } from 'react-router-dom'
import img1 from "/src/assets/land.jpg";
import img2 from "/src/assets/land.jpg";
import img3 from "/src/assets/land.jpg";

function home() {
    return (
        <div className='flex flex-col items-center'>
            <Carousel
            slides={[
                { image: img1 || "", link: "https://example.com/1" },
                { image: img2 || "", link: "https://example.com/2" },
                { image: img3 || "", link: "https://example.com/3" },
            ]}
            />
            <div className="flex flex-col w-full mt-12">
                <div className="text-left font-bold text-3xl">Sản phẩm nổi bật</div>
                <div>
                    <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <ProductCard image={img1} link="/product" price={100000} product="Sản phẩm 1" sales={50}/>
                        <ProductCard image={img1} link="/product" price={200000} product="Sản phẩm 2" />
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
                        <ProductCard image={img1} link="/product" price={100000} product="Sản phẩm 1" sales={50}/>
                        <ProductCard image={img1} link="/product" price={200000} product="Sản phẩm 2" />
                        <ProductCard image={img1} link="/product" price={300000} product="Sản phẩm 3" />
                        <ProductCard image={img1} link="/product" price={400000} product="Sản phẩm 4" />
                        <ProductCard image={img1} link="/product" price={500000} product="Sản phẩm 5" />
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
                        <ProductCard image={img1} link="/product" price={100000} product="Sản phẩm 1" sales={50}/>
                        <ProductCard image={img1} link="/product" price={200000} product="Sản phẩm 2" />
                        <ProductCard image={img1} link="/product" price={300000} product="Sản phẩm 3" />
                        <ProductCard image={img1} link="/product" price={400000} product="Sản phẩm 4" />
                        <ProductCard image={img1} link="/product" price={500000} product="Sản phẩm 5" />
                        <ProductCard image={img1} link="/product" price={100000} product="Sản phẩm 1" sales={50}/>
                        <ProductCard image={img1} link="/product" price={200000} product="Sản phẩm 2" />
                        <ProductCard image={img1} link="/product" price={300000} product="Sản phẩm 3" />
                        <ProductCard image={img1} link="/product" price={400000} product="Sản phẩm 4" />
                        <ProductCard image={img1} link="/product" price={500000} product="Sản phẩm 5" />
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    <Link to="/about" className="text-center m-8 p-2 pr-8 pl-8 font-bold text-base border-2 cursor-pointer rounded-4xl text-nowrap transition hover:bg-black hover:text-white hover:border-black">Xem thêm</Link>
                </div>
            </div>
        </div>
    );
}

export default home