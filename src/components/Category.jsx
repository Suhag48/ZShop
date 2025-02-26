import { useContext, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import myContext from "../context/myContext";

const CategoryDropdown = ({
  type,
  openCategory,
  toggleCategory,
  category,
  receivingSelectedCategory,
}) => {

  return (
    <li
      onClick={() => toggleCategory(type)}
      className="flex justify-between relative"
    >
      <div className="flex items-center gap-2 capitalize font-medium text-sm">
        {type}
        {openCategory === type ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        )}
      </div>
      {openCategory === type && (
        <ul
          className={`absolute right-0 border-2 rounded p-2 shadow-lg space-y-1 bg-white text-sm 
      ${type === "mobile" ? "ml-28" : ""} 
      ${type === "laptop" ? "absolutebottom-[-15px]" : ""}`}
        >
          {category
            .filter((item) => item.slug.startsWith(type))
            .map((item, index) => (
              <li
                key={index}
                onClick={() => receivingSelectedCategory(item.slug)}
                className="hover:bg-slate-200 rounded px-2 py-1"
              >
                {item.slug.replace(`${type}s-`, "")}
              </li>
            ))}
        </ul>
      )}
    </li>
  );
};

const Category = () => {
  const [openCategory, setOpenCategory] = useState(null); // Track which category is open
  const { category, receivingSelectedCategory } = useContext(myContext);

  const toggleCategory = (categoryName) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="mb-2">Category</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-y-4 cursor-pointer">
          {/* Men Category */}
          <CategoryDropdown
            type="men"
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            category={category}
            receivingSelectedCategory={receivingSelectedCategory}
          />
          {/* Women Category */}
          <CategoryDropdown
            type="women"
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            category={category}
            receivingSelectedCategory={receivingSelectedCategory}
          />

          {/* Beauty Category */}
          <CategoryDropdown
            type="beauty"
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            category={category}
            receivingSelectedCategory={receivingSelectedCategory}
          />

          {/* furniture Category */}
          <CategoryDropdown
            type="furniture"
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            category={category}
            receivingSelectedCategory={receivingSelectedCategory}
          />

          {/* groceries Category */}
          <CategoryDropdown
            type="groceries"
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            category={category}
            receivingSelectedCategory={receivingSelectedCategory}
          />

          {/* mobile Category */}
          <CategoryDropdown
            type="mobile"
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            category={category}
            receivingSelectedCategory={receivingSelectedCategory}
          />

          {/* laptop Category */}
          <CategoryDropdown
            type="laptop"
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            category={category}
            receivingSelectedCategory={receivingSelectedCategory}
          />
        </ul>
      </CardContent>
    </Card>
  );
};

export default Category;
