import { useContext } from "react";
import myContext from "../context/myContext";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paging = () => {
  const { numbers, prevPage, changePage, nextPage, currentPage, mode } = useContext(myContext);

  // Define styles based on the mode
  const buttonStyle =
    mode === "dark" ? "bg-gray-700 text-white" : "bg-slate-200 text-black"; // Button background based on mode
  const activeButtonStyle =
    mode === "dark" ? "bg-gray-400" : "bg-gray-400"; // Active button background

  return (
    <Pagination className="flex flex-wrap" style={{ color: mode === "dark" ? "white" : "black" }}>
      <PaginationContent className="md:flex gap-x-1 md:gap-x-3">
        <PaginationItem className={`${buttonStyle} rounded`}>
          <PaginationPrevious href="#" onClick={prevPage} />
        </PaginationItem>

        {numbers.map((number, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => changePage(number)}
              className={`${number === currentPage ? `${activeButtonStyle}` : buttonStyle} rounded`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className={`${buttonStyle} rounded`}>
          <PaginationNext href="#" onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paging;
