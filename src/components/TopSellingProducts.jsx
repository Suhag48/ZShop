import { useContext } from "react";
import myContext from "../context/myContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TopSellingProducts = () => {
  const { products } = useContext(myContext);

  return (
    <Card className="w-full border-2">
      <CardHeader>
        <CardTitle className="mb-2">Top Selling Products</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col">
        {products.slice(188, 192).map((product, index) => (
          <div key={index} className="flex flex-col gap-y-6">
            <div className="flex flex-col xl:flex-row xl:gap-x-6 text-center lg:text-start md:items-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-auto h-16"
              />
              <h2 className="text-gray-700">{product.title}</h2>
            </div>
            <Separator />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
