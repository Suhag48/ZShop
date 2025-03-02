import { useContext } from "react";
import myContext from "../context/myContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MobileFilter = () => {
  const {
    category,
    receivingSearchedText,
    receivingMaxPrice,
    receivingMinPrice,
    searchedText,
    handleTextFilter,
    handlePriceFilter,
    minPrice,
    maxPrice,
    filterByMobileCategory,
  } = useContext(myContext);

  return (
    <section className="mt-20 bg-gray-300 py-10 md:hidden">
      {/* search by category */}
      <div className="flex flex-col w-2/3 sm:w-1/3 mx-auto gap-y-6 relative">
        <div>
          <select
            onChange={(e) => filterByMobileCategory(e.target.value)}
            name="category"
            id="category"
            className="p-2 w-full focus:border-amber-500 cursor-pointer text-sm border-none outline-none rounded-sm"
          >
            {category.map((cat, index) => (
              <option key={index} value={cat.slug} className="cursor-pointer">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* search by product name */}
        <div className="flex flex-col gap-y-3">
          <Input
            type="text"
            value={searchedText}
            placeholder="product name"
            className="focus-visible:ring-0 text-sm"
            onChange={(e) => receivingSearchedText(e.target.value)}
          />
          <Button
            variant="outline"
            className="bg-white"
            onClick={handleTextFilter}
          >
            Search Product
          </Button>
        </div>

        {/* search by price */}
        <div className="flex flex-col gap-y-3">
          <Input
            type="number"
            value={minPrice}
            placeholder="min price"
            className="focus-visible:ring-0 text-sm"
            onChange={(e) => receivingMinPrice(e.target.value)}
          />
          <Input
            type="number"
            value={maxPrice}
            placeholder="max price"
            className="focus-visible:ring-0 text-sm"
            onChange={(e) => receivingMaxPrice(e.target.value)}
          />
          <Button
            variant="outline"
            className="bg-white"
            onClick={handlePriceFilter}
          >
            Filter Product
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobileFilter;
