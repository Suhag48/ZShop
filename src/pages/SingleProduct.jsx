import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// import thumbnail from "../assets/images/1.jpg";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";

// import img from "../assets/images/10.jpg";

import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchingSingleProduct } from "../features/singleProduct/singleProductSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";

const SingleProduct = () => {
  const [isWishList, setIsWishList] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => {
    dispatch(fetchingSingleProduct(id));
  }, [dispatch, id]);

  const singleProduct = useSelector(
    (state) => state.singleProductR.singleProduct
  );

  const {
    title,
    price,
    description,
    brand,
    category,
    dimensions,
    discountPercentage,
    images,
    rating,
    returnPolicy,
    stock,
    tags,
    warrantyInformation,
    weight,
    thumbnail,
  } = singleProduct;

  const [mainImage, setMainImage] = useState(thumbnail);

  // discount price
  const mainPrice = price - (price * discountPercentage) / 100;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // history.push("/cart")
  };

  return (
    <Layout>
      <section className="py-12 md:py-20 px-4 mx-auto">
        <Card className="flex mx-auto space-x-20 p-6 lg:w-4/5 border-2 shadow">
          <div className="w-2/5">
            <img
              src={mainImage}
              alt={title?.slice(0, 10)}
              className="h-60 w-80 shadow-md"
            />

            <div className="flex gap-x-4 mt-10">
              {images?.map((img, index) => {
                return (
                  <img
                    key={index}
                    src={img}
                    alt={title?.slice(0, 10)}
                    className="w-24 h-20 cursor-pointer"
                    onClick={() => setMainImage(img)}
                  />
                );
              })}

              {/* <img src="" alt="" className="w-24 h-20" />
              <img src="" alt="" className="w-24 h-20" /> */}
            </div>
          </div>

          <CardContent className="border p-4 w-3/5">
            <div className="flex flex-col space-y-3">
              <em className="flex items-center space-x-2">
                <span className="flex items-center">
                  {category} <ChevronRight className="w-4 h-4 mx-1" />{" "}
                  {tags?.length > 0 ? tags[1] : ""}
                </span>
              </em>
              <h3 className="text-lg md:text-2xl font-medium"> {title} </h3>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.floor(rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <em> {description} </em>
              <span className="flex gap-x-2">
                <h5 className="font-medium"> Price: </h5> ${price}
              </span>
              <span className="flex gap-x-2">
                <h5 className="font-medium">Discount: </h5>
                {discountPercentage}%
              </span>
              <span className="flex gap-x-2">
                <h5 className="font-medium"> Stock: </h5> {stock}
              </span>
            </div>

            <Tabs defaultValue="warranty" className="w-[400px] my-8">
              <TabsList className="space-x-4 md:space-x-8">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="warranty">Warranty</TabsTrigger>
              </TabsList>
              <TabsContent value="features">
                <ul className="ml-8 space-y-1 list-disc marker:text-slate-600 italic">
                  <li>depth: {dimensions?.depth}</li>
                  <li>height: {dimensions?.height}</li>
                  <li>width: {dimensions?.width}</li>
                  {dimensions?.weight ? (
                    <li>weight: {dimensions.weight}</li>
                  ) : (
                    ""
                  )}
                </ul>
              </TabsContent>
              <TabsContent value="warranty">
                <p className="italic ml-4"> {warrantyInformation} </p>
              </TabsContent>
            </Tabs>

            <div>
              <div className="flex items-center justify-between px-4">
                <div className="flex gap-x-3">
                  <del className="text-red-500"> ${price}</del>
                  <span>${mainPrice.toFixed(2)}</span>
                </div>

                <div className="flex gap-x-2">
                  <Button
                    onClick={() => setIsWishList(!isWishList)}
                    variant="outline"
                    size="icon"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isWishList ? "fill-current text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => handleAddToCart(singleProduct)}
                variant="outline"
                size="lg"
                className="rounded bg-slate-400 text-white hover:bg-slate-400 hover:text-white w-full xsm:w-1/2 text-center cursor-pointer mt-6"
              >
                <ShoppingCart />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default SingleProduct;
