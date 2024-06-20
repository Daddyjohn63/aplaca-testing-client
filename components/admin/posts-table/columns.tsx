"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { type TablePost } from "@/types";
import Link from "next/link";

export const columns: ColumnDef<TablePost>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => {

      return (
        <div className="min-w-[200px]">
        <Link href={`/admin/posts/update-post/${row.original.id}`} className="font-bold text-primary">
          {row.getValue("title")}
        </Link>
        </div>
      )
    }
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({row}) => (<div className="min-w-[100px]">{row.getValue("author")}</div>)
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      return (
        <span className={`${row.getValue("status") === "published" ? 'bg-green-500' : 'bg-red-500'} py-1 px-3 rounded-full`}>{row.getValue("status")}</span>
      )

    }
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
