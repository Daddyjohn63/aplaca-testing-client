"use client"
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/router";


type PaginationProps = {
  totalPages: number;
  page: number;

}

export function PaginationControls(props: PaginationProps) {

  const {page, totalPages} = props;

  let startPage = Math.max(1, page - 5);
  let endPage = Math.min(totalPages, page + 5);

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={`?page=${Math.max(1, page - 1)}`} />
          </PaginationItem>
        ) : (
           <Button disabled variant="link" className="text-muted-foreground gap-1"><ChevronLeftIcon className="h-4 w-4" /> Previous</Button>
          )}
          {Array.from({length: endPage - startPage + 1}, (_,i) => (
        <PaginationItem key={startPage + i}>
            <PaginationLink isActive={page === startPage + i} href={`?page=${startPage + i}`} className="border-muted-foreground">{startPage + i}</PaginationLink>
          </PaginationItem>
          ))}
        {totalPages > endPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page < totalPages ? (
          <PaginationItem>
            <PaginationNext href={`?page=${Math.min(totalPages, page + 1)}`} />
          </PaginationItem>
        ): (
           <Button disabled variant="link" className="text-muted-foreground gap-1">Next <ChevronRightIcon className="h-4 w-4" /></Button>
        )}
      </PaginationContent>
    </Pagination>

  )
}

