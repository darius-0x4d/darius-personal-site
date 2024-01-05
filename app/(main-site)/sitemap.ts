import { client } from "sanity/lib/client";
import { PostSchemaType } from "sanity/schema-types/post-schema-type";

export default async function sitemap() {
  const blogs = await client.fetch<PostSchemaType[]>(
    `*[_type == "post"]{..., "categories": categories[]->, "author": author->}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  blogs.map((post) => ({
    url: `https://dariusmcfarland.com/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog", "/guestbook"].map((route) => ({
    url: `https://dariusmcfarland.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
