import {products} from "./productList.js"            
import { Link } from "react-router-dom";
import ImgSkeleton from "../Skeleton/ImgSkeleton/ImgSkeleton.jsx";
import "./Products.scss";


export default function Products() {
  return (
    <div className="store-grid">
      {products.map((product) => (
        <Link
          key={product._id}
          to="https://urbantrendz.pages.dev/search-result"
        >
          <div className="card">
            <div className="image-container">
              <ImgSkeleton src={product.searchImage} />
            </div>

            <div className="details">
              <h4>{product.productName}</h4>
              <h3>Rs {product.price}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
