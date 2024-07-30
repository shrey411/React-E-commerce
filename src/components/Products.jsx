import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import productData from "./productData.json"; // Import the JSON data
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("All"); // Initialize with "All" category

  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API request (replace this with your actual fetch call)
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (componentMounted) {
          setData(productData); // Set the data from productData.json
          setFilter(productData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      componentMounted = false;
    };
  }, []);

      // ... Your loading skeleton code ...
      const Loading = () => {
            return (
              <>
                <div className="col-12 py-5 text-center">
                  <Skeleton height={40} width={560} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                  <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                  <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                  <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                  <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                  <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                  <Skeleton height={592} />
                </div>
              </>
            );
    
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
    setCurrentCategory(cat);
  }

  const ShowProducts = () => {
    return (
      <>
      <div className="buttons text-center">
          {/* Create buttons to filter products by category */}
          <button onClick={() => filterProduct("HeadPhones")} className={`btn btn-outline-dark m-2 ${currentCategory === "HeadPhones" ? "active" : ""}`}>HeadPhones</button>
          <button onClick={() => filterProduct("Laptops")} className={`btn btn-outline-dark m-2 ${currentCategory === "Laptops" ? "active" : ""}`}>Laptops</button>
          <button onClick={() => filterProduct("Watches")} className={`btn btn-outline-dark m-2 ${currentCategory === "Watches" ? "active" : ""}`}>Watches</button>
        </div>
        {/* Your filter buttons here ... */}
        {filter.map((product) => { // Use 'product' instead of 'Product'
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">₹ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={"/Product/" + product.id} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
