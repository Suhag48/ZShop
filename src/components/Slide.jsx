import thumbnailOne from "../assets/images/1.jpg";
import thumbnailTwo from "../assets/images/2.jpg";
import thumbnalThree from "../assets/images/3.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slide() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      {/* slide one */}
      <div className="h-[280px] md:h-[350px] relative">
        <img
          src={thumbnailOne}
          alt="slide one"
          className="w-full h-full object-cover rounded-sm"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-10 text-gray-700 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-1 sm:mb-2">
            Shop the Latest Trends
          </h2>
          <p className="italic px-4 sm:px-0">
            Discover top-rated products at unbeatable prices.
          </p>
        </div>
      </div>

      {/* slide two */}
      <div className="h-[280px] md:h-[350px] relative">
        <img
          src={thumbnailTwo}
          alt="slide two"
          className="w-full h-full object-cover rounded-sm"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-10 text-gray-700 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-1 sm:mb-2">
            Exclusive Offers Just for You
          </h2>
          <p className="italic px-4 sm:px-0">
            Hurry, limited-time deals on your favorite items.
          </p>
        </div>
      </div>

      {/* slide three */}
      <div className="h-[280px] md:h-[350px] relative">
        <img
          src={thumbnalThree}
          alt="slide three"
          className="w-full h-full object-cover rounded-sm"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-10 text-gray-700 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-1 sm:mb-2">
            New Arrivals Every Week
          </h2>
          <p className="italic px-4 sm:px-0">
            Stay ahead with fresh styles and products every week.
          </p>
        </div>
      </div>
    </Slider>
  );
}
