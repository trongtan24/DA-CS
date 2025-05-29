import { ProductCard } from "../reuseable";
import img2 from "/src/assets/CBook.png";

function productPage() {
  return (
    <>
      <div className="flex flex-col w-full mt-12">
          <div className="text-center font-bold text-3xl">Sản phẩm nổi bật</div>
          <div>
              <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  <ProductCard image={img2} id={1} price={100000} product="Giáo Trình Kỹ Thuật Lập Trình C Căn Bản & Nâng Cao" sales={50}/>
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
                  <ProductCard image={img2} id={2} price={200000} product="Sản phẩm 2" />
              </div>


              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  1
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  2
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  3
                </button>
            </div>
          </div>
      </div>
    </>
  );
}

export default productPage;