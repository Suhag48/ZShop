import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

import Layout from "../components/layout/Layout";

// import images
import who from "../assets/images/who.jpg";
import team from "../assets/images/team.jpg";
import story from "../assets/images/story.jpg";

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
        <div className="flex flex-col gap-10 lg:gap-12">
          <Card className="flex flex-col md:flex-row h-full md:h-[360px] lg:h-[320px] w-full md:rounded-none border-none">
            <div className="w-full md:w-1/2 h-full">
              <img src={who} alt="who we are?" className="w-full h-full" />
            </div>
            <CardContent className="border p-8 md:p-4 xl:p-8 shadow-sm w-full md:w-1/2 h-full">
              <h2 className="text-xl md:text-2xl font-medium text-center mb-3">
                Who We are?
              </h2>
              <p className="text-justify leading-8 md:leading-7 xl:leading-8">
                {textSlice(
                  "We are more than just an eCommerce platform—we’re a team of passionate individuals dedicated to revolutionizing the online shopping experience. Founded on the belief that shopping should be easy, accessible, and enjoyable for everyone, we set out to create a marketplace that brings value, quality, and convenience to our customers' fingertips."
                )}

                <Link
                  to="#"
                  className="hover:underline text-blue-800 ml-2"
                >
                  see more...
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col md:flex-row h-full md:h-[360px] lg:h-[320px] w-full md:rounded-none border-none">
            <div className="md:order-2 w-full md:w-1/2 h-full">
              <img src={team} alt="team" className="w-full h-full" />
            </div>
            <CardContent className="border p-8 md:p-4 xl:p-8 shadow-sm w-full md:w-1/2 h-full">
              <h2 className="text-xl md:text-2xl font-medium text-center mb-3">
                Our Team
              </h2>
              <p className="text-justify leading-8 md:leading-7 xl:leading-8">
                {textSlice(
                  "At EasyBuy, our vision is to create a world where online shopping is not just a transaction, but a delightful experience that brings joy, convenience, and trust to every customer. We aspire to be the go-to platform for people seeking quality products, exceptional service, and a seamless shopping journey—every single time they visit us."
                )}

                <Link
                  to="#"
                  className="hover:underline text-blue-800 ml-2"
                >
                  see more...
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col md:flex-row h-full md:h-[360px] lg:h-[320px] w-full rounded-none border-none">
            <div className="md:w-1/2 w-full h-full">
              <img src={story} alt="story" className="w-full h-full" />
            </div>
            <CardContent className="border p-8 md:p-4 xl:p-8 shadow-sm w-full md:w-1/2 h-full">
              <h2 className="text-xl md:text-2xl font-medium text-center mb-3">
                Our Story
              </h2>
              <p className="text-justify leading-8 md:leading-7 xl:leading-8">
                {textSlice(
                  "What began as a vision to simplify the way shop has grown into a community of happy customers and dedicated partners. From our humble beginnings, EasyBuy has evolved into a trusted platform that caters to diverse shopping needs. Our journey is driven by our commitment to creating a place where customers can explore a wide range of products and brands."
                )}

                <Link
                  to="#"
                  className="hover:underline text-blue-800 ml-2"
                >
                  see more...
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default About;
