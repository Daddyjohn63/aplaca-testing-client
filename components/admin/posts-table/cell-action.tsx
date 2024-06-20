"use client";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { type TablePost } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { deletePost } from "@/actions/post/delete-post";

interface CellActionProps {
  data: TablePost;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {toast} = useToast()

  const onConfirm = async () => {
  
    deletePost(data.id)
      .then((res) => {
        setOpen(false);
        if(res.error) {
          toast({
            title: "Error:",
            description: res.error,
            variant: 'destructive'
          })
        }
        if(res.success) {
          toast({
            title: "Success",
            description: res.success,
          })
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
    }).catch(() => {
        setOpen(false)
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: 'destructive'
        })

    })
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/posts/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
