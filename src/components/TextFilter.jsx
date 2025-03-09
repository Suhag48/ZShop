import { useContext } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import myContext from "../context/myContext";

const TextFilter = () => {
  const {receivingSearchedText, searchedText, handleTextFilter} = useContext(myContext)

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="mb-2 text-xl">Text Filter</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex gap-x-4 mb-6">
          <input
            onChange={(e) => receivingSearchedText(e.target.value)}
            type="text"
            value={searchedText}
            placeholder="product name"
            className="w-full border focus:outline-none px-2 py-1 rounded"
          />
        </div>
        <div className="flex gap-x-4">
          <Button
            onClick={handleTextFilter}
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

export default TextFilter;
