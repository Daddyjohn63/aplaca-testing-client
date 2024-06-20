"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { type TableUsers } from "@/types";
import { formatDateVerbose } from "@/lib/utils";
import Image from "next/image";

export const columns: ColumnDef<TableUsers>[] = [
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
    accessorKey: "image",
    header: "Image",
    cell: ({row}) => {
      const imageUrl = row.getValue("image")
      return (
        <div>
          {!!imageUrl && (
            <Image 
              alt="User Image" 
              src={`${imageUrl}`} 
              width="50"
              height="50"
              className="w-10 h-10 border-2 border-foreground rounded-full"/>
          )}
          {!imageUrl && (
            <div className="w-10 h-10 border-2 border-muted-foreground bg-muted rounded-full"></div>
          )}
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => {

      return (
        <div>
          {row.getValue("name")}
        </div>
      )
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({row}) => {

      return (
        <div>
          {row.getValue("email")}
        </div>
      )
    }
  },
  {
    accessorKey: "emailVerified",
    header: "Verified",
    cell: ({row}) => {

     const formattedDate = formatDateVerbose(row.getValue("emailVerified")) 
      return (
        <div>
          {formattedDate}
        </div>
      )
    }
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
