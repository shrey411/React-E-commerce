// import React from "react";

// const Home = () => {
//   return (
//     <>
//       <div className="hero border-1 pb-3">
//         <div className="card bg-dark text-white border-0 mx-3">
//           <img
//             className="card-img img-fluid"
//             src="./assets/main.png.jpg"
//             alt="Card"
//             height={500}
//           />
//           <div className="card-img-overlay d-flex align-items-center">
//             <div className="container">
//               <h5 className="card-title fs-1 text fw-lighter">New Season Arrivals</h5>
//               <p className="card-text fs-5 d-none d-sm-block ">
//                 This is a wider card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdvertisementSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Auto play the carousel
    autoplaySpeed: 2000, // Time between slides in milliseconds (3 seconds in this example)
  };
    
  const advertisements = [
    {
      
      image: "./assets/main1.png",
    },
    {
      
      image: "https://s3b.cashify.in/gpro/uploads/2022/08/02174834/Amazon-Great-Freedom-Festival_-Best-Smartwatch-Deals-to-Grab.jpg",
    },
    {
      
      image: "https://i.pinimg.com/originals/ca/e7/2c/cae72ce86998abcadd5051acd91a696b.jpg",
    },
    // Add more advertisements here
  ];

  return (
    <Slider {...settings}>                          
      {advertisements.map((ad, index) => (
        <div key={index}>
          <div className="hero border-1 pb-3">
            <div className="card bg-dark text-white border-0 mx-3">
              <img
                className="card-img img-fluid"
                src={ad.image}
                alt={ad.title}
                height={0}
              />
              <div className="card-img-overlay d-flex align-items-center">
                <div className="container">
                  <h5 className="card-title fs-1 text fw-lighter">{ad.title}</h5>
                  <p className="card-text fs-5 d-none d-sm-block">
                    {ad.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default AdvertisementSlider;

