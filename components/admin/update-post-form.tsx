"use client";
import { siteConfig } from "@/site-config";
import Image from "next/image";
import { getImageData } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "@/actions/post/update-post";
import { useState, useEffect, useTransition} from "react";
import { ImageIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPostSchema} from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import {kebabCase} from "change-case";
import { type Category } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, XIcon } from "lucide-react";
import { ModalMediaGrid } from "./modal-media-grid";

type Media = {
  id: number;
  imagePath: string;
}
type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  mediaId: number | null;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  categoryId: string;
  authorId: string; 
  media: Media | null; 
} 

type UpdatePostFormProps = {
  categories: Category[];
  postData: Post
  status: string;
}

type UpdatePostPayload = {
  postId: string | undefined;
  title: string;
  slug: string;
  excerpt: string | undefined | null;
  status: string;
  category: string;
  content: string;
  imagePath: string | undefined | null;
  existingImageId: number | undefined,
  deleteImage: boolean;
}

export const UpdatePostForm = (props: UpdatePostFormProps) => {

  const {categories, postData, status} = props

  const bucketUrl = siteConfig.fileStorage.bucketUrl

  const { update } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [deleteImage, setDeleteImage] = useState<boolean>(false)
  const [existingImage, setExistingImage] = useState<Media | undefined>();

  const [editSlug, setEditSlug] = useState<boolean>(true)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const form = useForm<z.infer<typeof AddPostSchema>>({
    resolver: zodResolver(AddPostSchema),
    defaultValues: {
      title: postData.title ?? '',
      slug: '',
      excerpt: postData.excerpt ?? '',
      status: postData.status ?? '',
      category: postData.categoryId ?? '',
      content: postData.content ?? ''
    },
  });

  //Watch title input to create url friendly slug
  const watchTitle = form.watch("title");

  //Show image for post update
  useEffect(() => {
    if(status === 'added'){
      setSuccess("Post successfully added!")
    }

    //Update featured image
    if(postData.media) {
      setImagePreview(`${bucketUrl}/${postData.media.imagePath}`)
      setExistingImage(postData.media)
    }

    //If post slug already exists, then set edit slug to false and disable auto creation. 
    if(postData) {
      setEditSlug(false)
      form.setValue("slug", postData.slug)
    }

  },[form, postData, bucketUrl, status])

  useEffect(() => {
    // Enable auto slug creation and editing if edit slug is turned on (true)
    if(editSlug === true) {
      // Converts title to kebab case, a url friendly slug
      const urlFriendlySlug = kebabCase(watchTitle)
      form.setValue("slug", urlFriendlySlug)
    }
  }, [watchTitle, form, editSlug]);

  const setMediaObjToFeatured = (imageObj: Media) => {
    setImagePreview(`${bucketUrl}/${imageObj.imagePath}`)
    setOpenDialog(false)
    setDeleteImage(false)
    setExistingImage(imageObj)
    form.setValue('image', undefined)
  }

  const removeFeaturedImage = () => {
    setImagePreview(undefined)
    setExistingImage(undefined)
    setDeleteImage(true)
    form.setValue('image', undefined)
  }

  const onSubmit = (values: z.infer<typeof AddPostSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    let uploadedImagePath: string

    startTransition(async () => {
      //if values.image exists, then upload new image to cloud storage and overwrite imageFilename for db
      if(values.image) {

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
        uploadedImagePath = await data.uuidFilename

      }

      //Craft payload data for database
      const payload: UpdatePostPayload = {
        postId: postData.id,
        title: values.title,
        slug: kebabCase(values.slug),
        excerpt: values.excerpt,
        status: values.status,
        category: values.category,
        content: values.content,
        imagePath: uploadedImagePath,
        existingImageId: existingImage?.id,
        deleteImage: deleteImage
      }

      //Update existing post, else add new post.
      if(!!postData) {
        updatePost(payload)
          .then((data) => {

            if(data.error) {
              setError(data.error)
            }
            if(data.success) {
              update();
              setSuccess(data.success)

              //update slug in input form
              if(data.data.slug) {
                const updatedSlug = data.data.slug
                form.setValue("slug", updatedSlug)
              }
            }
          })
          .catch((data) => {
              setError(data.error)
          })
         
      }
      else {
        updatePost(payload)
          .then((data) => {
            if (data.error) {
              setError(data.error);
            }

            if (data.success) {
              update();
              setSuccess(data.success);

              //update slug in input form
              if(data.data.slug) {
                const updatedSlug = data.data.slug
                form.setValue("slug", updatedSlug)
              }
            }
          })
          .catch((data) => {
            setError(data.error)
          });
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col-reverse md:flex-row gap-8 max-w-5xl">
          <div className="lg:w-full">
            <Card className="p-5" >
              <div className="mb-5">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Top 10 way to be awesome!"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <div className="flex gap-2 justify-center items-center">
                          <Input
                            {...field}
                            placeholder="top-10-ways-to-be-awesome"
                            disabled={isPending || editSlug === false}
                          />
                          <Edit className="border p-2 w-9 h-9 rounded-sm" onClick={() => setEditSlug(!editSlug)} />

                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experpt</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          className="bg-input text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TipTap</FormLabel>
                      <FormControl>
                        <TiptapEditor disabled={isPending} description={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          </div>
          <div className="md:w-[350px] space-y-5">
            <Button disabled={isPending} type="submit" className="w-full py-7">
              Update Post
            </Button>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full border border-border bg-muted">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full border border-border bg-muted">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {!!categories && categories.map((category, i) => (
                          <SelectItem key={i} value={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest} }) => (
                <FormItem>
                  <FormLabel>Post Image</FormLabel>
                  {!!imagePreview ? (
                    <div className="relative bg-muted flex justify-center items-center p-3 rounded-md border border-border">

                      <XIcon onClick={removeFeaturedImage} className="absolute top-0 right-0 m-4 p-[4px] bg-destructive text-white rounded-full"/>
                      <Image 
                        src={imagePreview} 
                        alt="Image preview" 
                        className="rounded-sm"
                        width="230"
                        height="160"
                        priority
                      />
                    </div>
                  ) : (
                      <div className="bg-muted flex justify-center aspect-video items-center p-3 rounded-md border border-border">
                        <ImageIcon className="w-10 h-10 text-muted-foreground/70"/>
                      </div>

                    )}
                  <FormControl>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <Button asChild variant="outline" className="border border-border hover:text-primary-foreground">
                        <DialogTrigger className="w-full">
                          Add Featured Image
                        </DialogTrigger>
                      </Button>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>
                          </DialogTitle>
                          <DialogDescription>

                            <FormError message={error} /> 
                            <FormField
                              control={form.control}
                              name="image"
                              render={({ field: { onChange, value, ...rest} }) => (
                                <FormItem>
                                  <FormLabel>Upload Image</FormLabel>
                                  <FormControl>


                                    <Tabs defaultValue="upload" className="min-h-[400px]">
                                      <div className="text-center mb-4">
                                        <TabsList className="max-w-[400px]">
                                          <TabsTrigger value="file-upload">File Upload</TabsTrigger>
                                          <TabsTrigger value="choose-media">Choose Media</TabsTrigger>
                                        </TabsList>
                                      </div>
                                      <TabsContent value="file-upload">
                                        <div className="h-[500px] flex items-center justify-center">

                                          <Input 
                                            type="file"
                                            className="file:bg-muted-foreground file:rounded-sm file:mr-4 bg-muted border-border text-foreground pt-[6px] max-w-[400px]"
                                            {...rest}
                                            onChange={(event) => {
                                              if(!event.target.files || event.target.files.length <= 0) {
                                                return
                                              }
                                              const {files, displayUrl} = getImageData(event)
                                              setImagePreview(displayUrl)
                                              setExistingImage(undefined)
                                              onChange(files)
                                              setDeleteImage(false)
                                              setOpenDialog(false)
                                            }}
                                          />
                                        </div>

                                      </TabsContent>
                                      <TabsContent value="choose-media">
                                        <ModalMediaGrid setMediaObj={setMediaObjToFeatured}  />
                                      </TabsContent>
                                    </Tabs>

                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
