import { useContext } from "react";
import myContext from "../context/MyContext";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paging = () => {
  const { numbers, prevPage, changePage, nextPage, currentPage } =
    useContext(myContext);

  const active = "bg-slate-200 focus-visible:ring-transparent";

  return (
    <Pagination className="flex flex-wrap">
      <PaginationContent className="md:flex gap-x-1">
        <PaginationItem className="bg-slate-200 rounded">
          <PaginationPrevious href="#" onClick={prevPage} />
        </PaginationItem>
        {numbers.map((number, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => changePage(number)}
              className={number === currentPage ? active : ""}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="bg-slate-200 rounded">
          <PaginationNext href="#" onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paging;
