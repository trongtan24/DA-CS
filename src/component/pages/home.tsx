import Carousel from "../carousel/carousel.tsx";
import {ProductCard, ScrollToTopLink} from "../reuseable";
import img1 from "/src/assets/slide.jpg"
import img2 from "/src/assets/CBook.png";
import img3 from "/src/assets/PythonBook.jpg";
import img4 from "/src/assets/slide_stanford.jpg"
import video1 from "/src/assets/videoplayback.mp4";

function home() {
    const slides = [
        { image: img1, link: "/test" , isVideo: false , id: 1},
        { image: img4, link: "/tests" , isVideo: false , id: 2},
        { image: video1, link: "/tests" , isVideo: true , id: 4},
    ];

    return (
        <div className="w-full px-4">
            <div className='flex flex-col items-center max-w-[1280px] mx-auto'>
                <div className="flex flex-row justify-center lg:justify-evenly">
                    {/* <div className="text-left font-bold text-3xl lg:block hidden">Danh mục</div> */}
                    <Carousel slides={slides}/>
                </div>
                
                <div className="flex flex-col w-full mt-12">
                    <div className="text-left font-bold text-3xl">Sách nổi bật</div>
                    <div>
                        <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            <ProductCard image={img2} id={1} price={100000} product="Giáo Trình Kỹ Thuật Lập Trình C Căn Bản & Nâng Cao" sales={50}/>
                            <ProductCard image={img3} id={2} price={200000} product="Sản phẩm 2" />
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <ScrollToTopLink to="/productpage" className="text-center m-8 p-2 pr-8 pl-8 font-bold text-base border-2 cursor-pointer rounded-4xl text-nowrap transition hover:bg-black hover:text-white hover:border-black">Xem thêm</ScrollToTopLink>
                    </div>
                </div>
                
                <div className="flex flex-col w-full mt-12">
                    <div className="text-left font-bold text-3xl">Sản phẩm ưu đãi</div>
                    <div>
                        <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 rounded-xl">
                            <ProductCard image={img3} price={100000} product="Sản phẩm 1" sales={50}/>
                            <ProductCard image={img3} price={200000} product="Sản phẩm 2" rating={1} sales={20}/>
                            <ProductCard image={img3} price={300000} product="Sản phẩm 3" rating={4} sales={10}/>
                            <ProductCard image={img3} price={400000} product="Sản phẩm 4" rating={6} sales={20}/>
                            <ProductCard image={img3} price={500000} product="Sản phẩm 5" sales={30}/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <ScrollToTopLink to="/productpage" className="text-center m-8 p-2 pr-8 pl-8 font-bold text-base border-2 cursor-pointer rounded-4xl text-nowrap transition hover:bg-black hover:text-white hover:border-black">Xem thêm</ScrollToTopLink>
                    </div>
                </div>

                <div className="flex flex-col w-full mt-12">
                    <div className="text-left font-bold text-3xl">Sản phẩm mới</div>
                    <div>
                        <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            <ProductCard image={img2} price={100000} product="Sản phẩm 1" sales={50}/>
                            <ProductCard image={img2} price={200000} product="Sản phẩm 2" />
                            <ProductCard image={img2} price={300000} product="Sản phẩm 3" />
                            <ProductCard image={img2} price={400000} product="Sản phẩm 4" />
                            <ProductCard image={img2} price={500000} product="Sản phẩm 5" />
                            <ProductCard image={img2} price={100000} product="Sản phẩm 1" sales={50}/>
                            <ProductCard image={img2} price={200000} product="Sản phẩm 2" />
                            <ProductCard image={img2} price={300000} product="Sản phẩm 3" />
                            <ProductCard image={img2} price={400000} product="Sản phẩm 4" />
                            <ProductCard image={img2} price={500000} product="Sản phẩm 5" />
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <ScrollToTopLink to="/productpage" className="text-center m-8 p-2 pr-8 pl-8 font-bold text-base border-2 cursor-pointer rounded-4xl text-nowrap transition hover:bg-black hover:text-white hover:border-black">Xem thêm</ScrollToTopLink>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default home