import thumbnailTwo from "../assets/images/1.jpg";
import thumbnailOne from "../assets/images/3.jpg";
import thumbnaThree from "../assets/images/2.jpg";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slideImage = [thumbnailOne, thumbnailTwo, thumbnaThree];

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
      {slideImage.map((image, index) => {
        return (
          <div key={index} className="h-[280px] md:h-[345px]">
            <img src={image} alt="" className="w-full h-full object-cover rounded-sm"/>
          </div>
        );
      })}
    </Slider>
  );
}
