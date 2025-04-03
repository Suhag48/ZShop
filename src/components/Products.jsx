import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

import myContext from "../context/myContext";

const Products = () => {
  const {
    isError,
    pagingProducts,
    filteredProducts,
    filteredByCategory,
    selectedCategory,
  } = useContext(myContext);

  const allProducts =
    filteredProducts.length > 0 ? filteredProducts.slice(0,45) : pagingProducts;

  useEffect(() => {
    filteredByCategory();
  }, [selectedCategory]);

  return (
    <section className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-6 pb-12 pt-8 md:pb-20 md:pt-16">
      {!isError && allProducts.length > 0 ? (
        allProducts.map((product) => {
          const { id, thumbnail, title, price, discountPercentage } = product;
          return (
            <Card
              key={id}
              className="shadow-sm rounded w-32 md:w-36 lg:w-40 xl:w-44"
            >
              <div className="overflow-hidden">
                <Link to={`/single_product/${id}`}>
                  <img
                    src={thumbnail}
                    alt={title?.slice(0, 18)}
                    className="w-auto h-24 rounded cursor-pointer duration-500 mx-auto"
                  />
                </Link>
              </div>
              <CardContent className="text-sm md:text-base flex flex-col text-gray-700 p-2 mt-2">
                <h3 className="capitalize"> {title.slice(0, 18)} </h3>
                <h4>Discount: {discountPercentage}%</h4>
                <h4> Price: ${price} </h4>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p>Loading Products!</p>
      )}
    </section>
  );
};

export default Products;
