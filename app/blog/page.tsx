import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import ViewCounter from "./view-counter";
import { sanityClient } from "sanity-client";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

type BlogPost = {
  _id: string;
  post_title?: string;
  slug?: {
    current: string;
  };
};

export default async function BlogPage() {
  const blogs = await sanityClient.fetch<BlogPost[]>(`*[_type == "blog-post"]`);
  console.log(blogs);
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>Blog Posts</h2>
        <ul>
          {blogs.map((post) => (
            <li key={post._id}>
              <a href={post?.slug?.current}>Blog Title: {post?.post_title}</a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
