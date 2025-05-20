import { Link } from "react-router-dom";
import { TbCurrencyDong } from "react-icons/tb";

interface ProductCardProps {
    image?: string;
    link?: string;
    price?: number;
    product?: string;
    sales?: number;
}

function productCard({ image, link, price, product, sales}: ProductCardProps) {
    price = price ? price : 0;
    const discountedPrice = sales ? Math.round(price * (1 - sales / 100)) : price;

  return (
    <>
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 hover:shadow-xl hover:border-gray-200 border-gray-100 border-2 hover:-translate-y-0.5 transition duration-300">
            <Link className="relative" to={link || "/"}>
                <img src={image || "https://via.placeholder.com/150"} alt="Product" className="w-full h-32 object-cover mb-2"/>
                <h3 className="text-lg font-semibold">{product}</h3>

                {sales && sales > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    -{sales}%
                </div>)}
            </Link>

            {sales && sales > 0 ? (
                <div>
                    <p className="text-sm flex flex-row line-through">{price.toLocaleString()}<TbCurrencyDong/></p>
                    <p className="text-sm flex flex-row text-red-500 font-bold">{discountedPrice.toLocaleString()}<TbCurrencyDong/></p>
                </div>
            ) : ( 
                <p className="text-sm flex flex-row">{price.toLocaleString()}<TbCurrencyDong/></p> 
            )}
        </div>
    </>
  );
}

export default productCard;