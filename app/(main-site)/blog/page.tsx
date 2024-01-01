import Link from "next/link";
import { client } from "sanity/lib/client";
import { PostSchemaType } from "sanity/schema-types/post-schema-type";
import { IdealImage } from "sanity/lib/ideal-image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CornersIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prettyPrintDate } from "@/lib/utils";
import { urlForImage } from "sanity/lib/image";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const blogs = await client.fetch<PostSchemaType[]>(
    `*[_type == "post"]{..., "categories": categories[]->, "author": author->}`,
    {
      next: {
        revalidate: 3600 // look for updates to revalidate cache every hour
      }
    }
  );
  // Create no blogs placeholder
  return (
    <>
      <main>
        <ul>
          {blogs.reverse().map((post) => (
            <Card key={post._id} className="mt-8">
              <Link
                className="flex md:flex-col space-y-1"
                href={`/blog/${post.slug.current}`}
              >
                <div className="w-full flex md:flex-col">
                  <CardHeader className="grid md:grid-cols-3 items-start gap-8 space-y-0 w-full">
                    {post.mainImage ?
                      <div className="justify-self-center md:col-span-1 md:justify-self-start">
                        <IdealImage image={post.mainImage} />
                      </div> : null
                    }


                    <div className={`space-y-1 ${post.mainImage ? "md:col-span-2" : "md:col-span-3 md:px-24 md:justify-self-center md:col-start-1"}`}>

                      <div className="md:hidden flex space-x-4 text-sm text-muted-foreground pt-2 pb-4 grid-cols-2">
                        <div className="flex items-center col-span-1">
                          <CornersIcon className="mr-1 h-4 w-4 fill-sky-400 text-sky-400" />
                          {post.categories[0].title}
                        </div>
                        <div className="text-sm flex self-center justify-end col-span-1">
                          {prettyPrintDate(post.publishedAt)}
                        </div>
                      </div>

                      <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {post.title}
                      </CardTitle>

                      <CardDescription className="pt-4">
                        {post.overview[0].children[0].text}
                      </CardDescription>

                      <div className="pt-4 md:hidden">
                        <Separator />
                        <div className="flex pt-4">
                          <Avatar>
                            <AvatarImage
                              className="rounded-full w-8 h-8 self-center"
                              src={urlForImage(post.author.image).url()}
                            />
                            <AvatarFallback>DM</AvatarFallback>
                          </Avatar>
                          <p className="pl-2 font-medium leading-none self-center">
                            {post.author.name}
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="flex space-x-4 text-sm text-muted-foreground pt-20 grid-cols-3">
                          <div className="flex col-span-1">
                            <Avatar>
                              <AvatarImage
                                className="rounded-full w-8 h-8 self-center"
                                src={urlForImage(post.author.image).url()}
                              />
                              <AvatarFallback>DM</AvatarFallback>
                            </Avatar>
                            <p className="pl-2 font-medium leading-none self-center">
                              {post.author.name}
                            </p>
                          </div>
                          <div className="flex items-center col-span-1">
                            <CornersIcon className="mr-1 h-4 w-4 fill-sky-400 text-sky-400" />
                            {post.categories[0].title}
                          </div>
                          <div className="text-sm flex self-center justify-end col-span-1">
                            {prettyPrintDate(post.publishedAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </div>
              </Link>
            </Card>
          ))}
        </ul>
      </main>
    </>
  );
}
