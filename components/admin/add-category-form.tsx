"use client";
import { Textarea } from "@/components/ui/textarea"
import { addCategory} from "@/actions/category/add-category";
import { useState, useEffect, useTransition, ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCategorySchema} from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {kebabCase} from "change-case";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Edit } from "lucide-react";

type AddCategoryPayload = {
  name: string;
  slug: string;
  description: string | undefined;
}

export const AddCategoryForm = () => {

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [editSlug, setEditSlug] = useState<boolean>(true)

  const form = useForm<z.infer<typeof AddCategorySchema>>({
    resolver: zodResolver(AddCategorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  });

  //Watch name input to create url friendly slug
  const watchName = form.watch("name");

  // Enable auto slug creation and editing if edit slug is turned on (true)
  useEffect(() => {
    if(editSlug === true) {
      // Converts title to kebab case, a url friendly slug
      const urlFriendlySlug = kebabCase(watchName)
      form.setValue("slug", urlFriendlySlug)
    }
  }, [watchName, form, editSlug]);

  const onSubmit = (values: z.infer<typeof AddCategorySchema>) => {

    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {

      //Craft payload data for database
      const payload: AddCategoryPayload = {
        name: values.name,
        slug: values.slug,
        description: values.description,
      }

      //Add payload data to action to create in database
       addCategory(payload)
         .then((data) => {
          if (data.error) {
             setError(data.error);
          }
          //If success, redirect to edit category page
          if (data.success) {
            window.location.href = `/admin/categories/update-category/${data.data.id}?status=added`;
          }
        })
        .catch((data) => {
          setError(data.error)
        });
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Business"
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
                            placeholder="business"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          disabled={isPending}
                          className="bg-input text-black"
                        />
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
              Add Category
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
