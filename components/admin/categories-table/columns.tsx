"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { type Category } from "@prisma/client";
import Link from "next/link";

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    maxSize: 4, //Number is %. Line 212 in data-table. I couldn't get pixels to format correctly. 
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
    accessorKey: "name",
    size: 100,
    header: "Name",
    cell: ({row}) => {

      return (
        <div>
        <Link href={`/admin/categories/update-category/${row.original.id}`} className="font-bold text-primary">
          {row.getValue("name")}
        </Link>
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
