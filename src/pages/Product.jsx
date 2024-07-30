import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import productData from "../components/productData.json"; // Import the JSON data
import { Footer, Navbar } from "../components";



// ...

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const dispatch = useDispatch();

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching the product from JSON data
        const productDataFromJson = productData.find((item) => item.id === Number(id));

        if (productDataFromJson) {
          setProduct(productDataFromJson);
          setLoading(false);

          // Simulate fetching similar products from JSON data based on category
          const similarProductsFromJson = productData.filter(
            (item) => item.category === productDataFromJson.category
          );
          setSimilarProducts(similarProductsFromJson);
          setLoading2(false);
        } else {
          console.error("Product not found.");
          setLoading(false);
          setLoading2(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoading2(false);
      }
    };

    fetchData();
  }, [id]);

  const Loading = () => {
        return (
          <>
            <div className="container my-5 py-2">
              <div className="row">
                <div className="col-md-6 py-3">
                  <Skeleton height={400} width={400} />
                </div>
                <div className="col-md-6 py-5">
                  <Skeleton height={30} width={250} />
                  <Skeleton height={90} />
                  <Skeleton height={40} width={70} />
                  <Skeleton height={50} width={110} />
                  <Skeleton height={120} />
                  <Skeleton height={40} width={110} inline={true} />
                  <Skeleton className="mx-3" height={40} width={110} />
                </div>
              </div>
            </div>
          </>
        );
      };

const ShowProduct = () => {
      const productDescription = product.description.split(',').map((desc) => {
        const [key, value] = desc.split(/\s(.+)/);
        return { key, value };
    })
    const handlerAddToCart =() =>{
      console.log("Button clicked");
         addProductToCart(product)

}
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6 my-4">₹{product.price}</h3>
          {/* Render the description using the ProductDescription component */}
          
            <strong>Description:</strong>
              <table>
                <tbody>
                  {productDescription.map((item, index) => (
                    <tr key={index}>
                    <td>
                      <strong>{item.key}</strong>
                    </td>
                    <td>{item.value}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
          </div>
<div>
              {/* <button
                className="btn btn-outline-dark"
                onClick={() => {addProductToCart(product)}}
              > */}
              <button 
                 className="btn btn-outline-dark"
                 onClick={handlerAddToCart}
                 >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
          </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProductToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  }

export default Product;

