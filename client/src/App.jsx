import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [blogProduct, setBlogProduct] = useState([]);

  const getBlogProduct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setBlogProduct(result.data.data);
    // console.log(result);
  };

  const handleDeleteBlog = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const newBlogProduct = blogProduct.filter((product) => {
      return product.id !== id;
    });
    setBlogProduct(newBlogProduct);
  };

  useEffect(() => {
    getBlogProduct();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {blogProduct.map((product) => {
          return (
            <div className="product">
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDeleteBlog(product.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
