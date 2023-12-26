import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [productDetail, setProductDetail] = useState([]);
  const getresult = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductDetail(result.data.data);
    console.log(result);
  };
  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:4001/products/${productId}`);
    setProductDetail((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };
  useEffect(() => {
    getresult();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productDetail.map((item) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteProduct(item.id)}
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
