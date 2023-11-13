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
import { CircleIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const blogs = await client.fetch<PostSchemaType[]>(`*[_type == "post"]`);
  console.log(blogs);
  // Create no blogs placeholder
  return (
    <>
      <main>
        <ul>
          {blogs.map((post) => (
            <Card key={post._id}>
              <Link
                className="flex flex-col space-y-1"
                href={`/blog/${post.slug.current}`}
              >
                <div className="w-full flex flex-col">
                  <CardHeader className="grid grid-cols-3 items-start gap-8 space-y-0">
                    <div className="col-span-1">
                      <IdealImage image={post.mainImage} />
                    </div>

                    <div className="space-y-1 col-span-2">
                      <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {post.title}
                      </CardTitle>

                      <CardDescription className="pt-4">
                        {post.body[0].children[0].text}
                      </CardDescription>

                      <div className="flex space-x-4 text-sm text-muted-foreground pt-20 grid-cols-3">
                        <div className="flex col-span-1">
                          <Avatar>
                            <AvatarImage
                              className="rounded-full w-8 h-8 self-center"
                              src="/images/mr-krabs-confused.jpg"
                            />
                            <AvatarFallback>DM</AvatarFallback>
                          </Avatar>
                          <p className="pl-2 font-medium leading-none self-center">
                            Darius McFarland
                          </p>
                        </div>
                        <div className="flex items-center col-span-1">
                          <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                          TypeScript
                        </div>
                        <div className="text-sm flex self-center justify-end col-span-1">
                          Updated April 2023
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
