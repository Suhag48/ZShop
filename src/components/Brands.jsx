import { useContext, useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import myContext from "../context/myContext";

const Brands = () => {
  const { products, gettingSelectedBrand } = useContext(myContext);

  // 1. Get all brands from products, removing any undefined values.
  const allBrands = products
    .map((product) => product.brand)
    .filter((brand) => brand);

  // 2. Count how many times each brand appears.
  const brandCounts = countOccurrences(allBrands);

  // 3. Find brands that appear at least 3 times.
  const popularBrands = getPopularBrands(brandCounts);

  // 4. Track which brand is currently selected.
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    gettingSelectedBrand(selectedBrand);
  }, [selectedBrand]);

  // Render the component.
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="mb-2 text-xl lg:text-2xl">Brands</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedBrand}
          onValueChange={setSelectedBrand}
          className="flex flex-col space-y-3"
        >
          {popularBrands.map((brand, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={brand}
                id={`brand-${index}`}
                className="size-[12px]"
              />
              <Label htmlFor={`brand-${index}`}>{brand}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

// Helper function to count occurrences of each brand.
function countOccurrences(brands) {
  const counts = {};
  for (const brand of brands) {
    counts[brand] = (counts[brand] || 0) + 1;
  }
  return counts;
}

// Helper function to get brands that appear at least 3 times.
function getPopularBrands(brandCounts) {
  return [
    "All",
    ...Object.entries(brandCounts)
      .filter(([brand, count]) => count >= 3)
      .map(([brand, count]) => brand),
  ];
}

export default Brands;
