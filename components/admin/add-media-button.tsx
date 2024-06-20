'use client'
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState } from "react";
import { getImageData } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddMediaSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addMedia } from "@/actions/media/add-media";

type AddImagePayload = {
  imagePath: string | undefined,
}


export const AddMediaButton = () => {

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof AddMediaSchema>>({
    resolver: zodResolver(AddMediaSchema),
    defaultValues: {
    },
  });

  const onSubmit = async (values: z.infer<typeof AddMediaSchema>) => {

    if(!values.image) {
      return
    }
    setError(undefined);
    setSuccess(undefined);

    try {


      let imageFilename: string | undefined;

      //Send post image to cloud storage if uploaded.
      const fileData = new FormData()
      fileData.set('file', values.image)

      const res = await fetch('/api/upload-post-image', {
        method: 'POST',
        body: fileData
      })

      if(!res.ok) {
        setError("Something went wrong, image did not upload.")
        return
      }
      const data = await res.json()
      imageFilename = await data.uuidFilename

      //Craft payload data for database
      const payload: AddImagePayload = {
        imagePath: imageFilename,
      }


      //Upload to database
      addMedia(payload)
        .then((data) => {
          //reload page after successful upload
          window.location.reload()

        })
        .catch((data) => {
          setError("Something went wrong, could not add media")
        })

    } catch(e) {
      setError("Something went wrong, could not add media")

    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button asChild>
          <DialogTrigger>
            Add Media
          </DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload an Image</DialogTitle>
            <DialogDescription>
              <FormError message={error} /> 
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest} }) => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          <Input 
                            id="picture"
                            type="file"
                            className="file:bg-muted-foreground file:rounded-sm file:mr-4 bg-muted border-border text-foreground pt-[6px]"
                            {...rest}
                            onChange={(event) => {
                              if(!event.target.files || event.target.files.length <= 0) {
                                return
                              }
                              const {files} = getImageData(event)
                              onChange(files)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-right">
                    <Button type="submit">Submit Image</Button>
                  </div>

                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
