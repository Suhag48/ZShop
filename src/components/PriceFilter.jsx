import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import myContext from "../context/MyContext";

const PriceFilter = () => {
  const {receivingMinPrice, receivingMaxPrice, handlePriceFilter, minPrice, maxPrice} = useContext(myContext)

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="mb-2">Price Filter</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-x-3 mb-6">
          <input
            onChange={(e) => receivingMinPrice(e.target.value)}
            type="number"
            placeholder="min-price"
            value={minPrice}
            className="w-full border focus:outline-none px-2 py-1 rounded"
          />
          <input
            onChange={(e) => receivingMaxPrice(e.target.value)}
            type="number"
            placeholder="max-price"
            value={maxPrice}
            className="w-full border focus:outline-none px-2 py-1 rounded"
          />
        </div>
        <div className="flex gap-x-4">
          <Button
            onClick={handlePriceFilter}
            variant="outline"
            className="bg-slate-200"
          >
            Filter
          </Button>
          {/* <Button onClick={clearFilter} variant="outline" className="bg-slate-200">
            Clear
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceFilter;
