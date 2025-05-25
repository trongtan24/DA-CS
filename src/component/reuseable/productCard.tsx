import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

interface ProductCardProps {
    image?: string;
    link?: string;
    price?: number;
    product?: string;
    sales?: number;
    rating?: number;
}

function productCard({ image, link, price, product, sales, rating}: ProductCardProps) {
    price = price ? price : 0;
    const discountedPrice = sales ? Math.round(price * (1 - sales / 100)) : price;
    const renderStar = (rating: number) => {
        const star = [];

        for (let i = 0; i < 5; i++) {
            if (i < Math.round(rating || 0)) {
                star.push(<FaStar key={i} className="text-yellow-500" />);
            } else {
                star.push(<FaStar key={i} className="text-gray-300" />);
            }
        }
        
        return star;
    };
  return (
    <>
        <div className="flex flex-col p-2 bg-white shadow-md pb-6 rounded-xl hover:shadow-xl hover:border-gray-200 border-gray-100 border-2 hover:-translate-y-0.5 transition duration-300">
            <Link className="relative hover:text-red-500 transition duration-300" to={link || "/"}>
                <img src={image || "https://via.placeholder.com/150"} alt="Product" className="w-full h-48 object-contain mb-2 rounded-t-xl p-1"/>

                <div className="">
                     <h3 className="text-lg break-words font-semibold line-clamp-2 ">{product}</h3>

                    {sales && sales > 0 && (
                    <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                        Giảm {sales}%
                    </div>)}
                </div>
            </Link>
            <div className="">
                {sales && sales > 0 ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <span className="text-md flex line-through">{price.toLocaleString()}đ</span>
                        <span className="text-md flex text-red-500 font-bold">{discountedPrice.toLocaleString()}đ</span>
                    </div>
                ) : ( 
                    <p className="text-md flex flex-row text-red-500 font-bold">{price.toLocaleString()}đ</p> 
                )}
                
                <div className="flex flex-row gap-0.5 mt-2">
                    {renderStar(rating || 0)}
                </div>
            </div>
        </div>
    </>
  );
}

export default productCard;