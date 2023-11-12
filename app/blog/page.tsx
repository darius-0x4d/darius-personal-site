import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import ViewCounter from "./view-counter";
import { client } from "sanity/lib/client";
import { PostSchemaType } from "sanity/schema-types/post-schema-type";
import { IdealImage } from "sanity/lib/ideal-image";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const blogs = await client.fetch<PostSchemaType[]>(`*[_type == "post"]`);
  console.log(blogs);
  return (
    <>
      <header>
        <h1>Blog Posts</h1>
      </header>
      <main>
        <ul>
          {blogs.map((post) => (
            <li key={post._id}>
              <a href={post?.slug?.current}>Blog Title: {post?.title}</a>
              {/* <IdealImage image={post.mainImage} /> */}
              <h3>{post.body[0].children[0].text}</h3>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
