import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CBook } from "../../assets/"


interface ProductProps {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

  const products: ProductProps[] = [
    { id: 1, image: CBook, name: 'Giáo Trình Kỹ Thuật Lập Trình C Căn Bản & Nâng Cao', description: 'test', price: 10, category: 'Sách', stock: 5 },
    { id: 2, image: CBook, name: 'Sản phẩm 2', description: 'test', price: 10, category: 'Sách', stock: 5 },
  ];

function productDetail() {
  const { productId } = useParams();
  const locationId = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductProps | null>(null);
  useEffect(() => {
    const idLoc = locationId.state.id;
    
    const foundProduct = products.find((p) => p.id === idLoc)

    setProduct(foundProduct || null);
  }, [productId, navigate]);

  if (!product){
    return (
      <>
        <h1>Sản phẩm đang bị lỗi hoặc đã bị gỡ bỏ.</h1>
      </>
    )
  }

  return (
    <>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Giá: ${product.price}</p>
      <p>Thể loại: {product.category}</p>
      <p>Số lượng: {product.stock}</p>
    </>
  );
}

export default productDetail;