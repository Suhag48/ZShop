import Layout from "../components/layout/Layout";

// import images
import about_us from "../assets/images/1.jpg";
import team from "../assets/images/2.jpg";
import story from "../assets/images/3.jpg";
import { Link } from "react-router-dom";

const About = () => {
  // reducing big text based on Condition
  const textSlice = (text) => {
    if (text.length > 400) {
      return text.slice(0, 400);
    } else {
      return text;
    }
  };

  return (
    <Layout>
      <section className="px-4 md:px-12 lg:px-28 py-12 md:py-20 text-gray-700">
        <div className=" flex flex-col gap-8 lg:gap-12">
          <div className="grid lg:grid-cols-2 gap-6 xl:gap-8 min-h-[300px] w-full">
            <div>
              <img src={about_us} alt="about" className="w-full h-full" />
            </div>
            <div className="border p-8 lg:p-4 xl:p-8 shadow-lg w-full">
              <h2 className="text-xl md:text-2xl font-medium text-center mb-4">
                Who We are?
              </h2>
              <p className="text-justify leading-8">
                {textSlice(
                  "We are more than just an eCommerce platform—we’re a team of passionate individuals dedicated to revolutionizing the online shopping experience. Founded on the belief that shopping should be easy, accessible, and enjoyable for everyone, we set out to create a marketplace that brings value, quality, and convenience to our customers' fingertips."
                )}

                <Link
                  to="#"
                  className="hover:underline hover:text-blue-800 ml-2"
                >
                  see more...
                </Link>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 xl:gap-8 min-h-[300px] w-full">
            <div className="lg:order-2">
              <img src={team} alt="team" className="w-full h-full" />
            </div>
            <div className="border p-8 lg:p-4 xl:p-8 shadow-lg w-full">
              <h2 className="text-xl md:text-2xl font-medium text-center mb-4">
                Our Team
              </h2>
              <p className="text-justify leading-8">
                {textSlice(
                  "At EasyBuy, our vision is to create a world where online shopping is not just a transaction, but a delightful experience that brings joy, convenience, and trust to every customer. We aspire to be the go-to platform for people seeking quality products, exceptional service, and a seamless shopping journey—every single time they visit us."
                )}

                <Link
                  to="#"
                  className="hover:underline hover:text-blue-800 ml-2"
                >
                  see more...
                </Link>
              </p>
            </div>
          </div>

          <div
            className="grid lg:grid-cols-2 gap-6 xl:gap-8 min-h-[300px] w-full"
            id="story"
          >
            <div>
              <img src={story} alt="story" className="w-full h-full" />
            </div>
            <div className="border p-8 lg:p-4 xl:p-8 shadow-lg w-full">
              <h2 className="text-xl md:text-2xl font-medium text-center mb-4">
                Our Story
              </h2>
              <p className="text-justify leading-8">
                {textSlice(
                  "What began as a vision to simplify the way people shop has grown into a thriving community of happy customers and dedicated partners. From our humble beginnings, EasyBuy has evolved into a trusted platform that caters to diverse shopping needs. Our journey is driven by our commitment to creating a place where customers can effortlessly explore a wide range of products and brands, all in one place."
                )}

                <Link
                  to="#"
                  className="hover:underline hover:text-blue-800 ml-2"
                >
                  see more...
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
