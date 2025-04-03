import { useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

import myContext from "../context/myContext";

const Paging = () => {
  const { numbers, prevPage, changePage, nextPage, currentPage, mode } =
    useContext(myContext);

  // Define styles based on the mode
  const buttonStyle =
    mode === "dark" ? "bg-gray-700 text-white" : "bg-slate-200 text-black"; // Button background based on mode
  const activeButtonStyle = mode === "dark" ? "bg-gray-400" : "bg-gray-400"; // Active button background

  return (
    <Pagination
      className="flex flex-wrap"
      style={{ color: mode === "dark" ? "white" : "black" }}
    >
      <PaginationContent className="md:flex gap-x-1 md:gap-x-3">
        <PaginationItem>
          <PaginationPrevious
            onClick={prevPage}
            className={`${buttonStyle} rounded hidden sm:flex`}
          />
          <Button
            variant="outline"
            className={`w-1/2 mr-[-16px] text-right sm:hidden ${buttonStyle}`}
            onClick={prevPage}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {numbers.map((number, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => changePage(number)}
              className={`${
                number === currentPage ? `${activeButtonStyle}` : buttonStyle
              } rounded`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={nextPage}
            className={`${buttonStyle} rounded hidden sm:flex`}
          />
          <Button
            variant="outline"
            className={`w-1/2 sm:hidden ${buttonStyle}`}
            onClick={nextPage}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paging;
