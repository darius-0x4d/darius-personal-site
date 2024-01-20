import { client } from "sanity/lib/client";
import { PostSchemaType } from "sanity/schema-types/post-schema-type";

export default async function sitemap() {
  const blogs = await client.fetch<PostSchemaType[]>(
    `*[_type == "post" && isArchived == false]{..., "categories": categories[]->, "author": author->}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const blogPosts = blogs.map((post) => ({
    url: `https://www.dariusmcfarland.com/blog/${post.slug.current}`,
    lastModified: post.publishedAt.split("T")[0],
  }));

  const routes = ["", "/blog", "/guestbook"].map((route) => ({
    url: `https://www.dariusmcfarland.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogPosts];
}
