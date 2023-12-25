import { notFound } from "next/navigation";
import { Mdx } from "components/mdx";
import { getTweets } from "lib/twitter";
import Balancer from "react-wrap-balancer";
import ViewCounter from "../view-counter";
import { client } from "sanity/lib/client";
import { PostSchemaType, Slug } from "sanity/schema-types/post-schema-type";
import { Metadata } from "next";
import { getUrlFilename } from "@sanity/asset-utils";
import { urlForImage } from "sanity/lib/image";
import { IdealImage } from "sanity/lib/ideal-image";
import { prettyPrintDate } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await client.fetch<Slug[]>(`*[_type == "post"]{slug}`);

  return slugs.map((slug) => ({
    slug: slug.current,
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await client.fetch<PostSchemaType>(
    `*[_type == "post" && slug.current == "${params.slug}"][0]`
  );
  console.log(post);
  if (!post) {
    return;
  }

  // const {
  //   title: {
  //     title,
  //     default: "Another Blog Post",
  //   },
  //   publishedAt: publishedTime,
  //   summary: description,
  //   image,
  //   slug,
  // } = post;
  // const ogImage = image
  //   ? `https://leerob.io${image}`
  //   : `https://leerob.io/api/og?title=${title}`;

  return {
    title: post.title,
    description: post.body[0].children[0].text,
    openGraph: {
      title: post.title,
      description: post.body[0].children[0].text,
      type: "article",
      publishedTime: post._createdAt,
      // url: `https://leerob.io/blog/${slug}`,
      images: [
        {
          url: urlForImage(post.mainImage).url(),
        },
      ],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: [ogImage],
    // },
  };
}

export default async function Blog({ params }) {
  const post = await client.fetch<PostSchemaType>(
    `*[_type == "post" && slug.current == "${params.slug}"][0]`
  );

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif max-w-[650px]">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm max-w-[650px]">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
          {prettyPrintDate(post.publishedAt)}
        </div>
        <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
      </div>
      <IdealImage image={post.mainImage} />
      <h3>{post.body[0].children[0].text}</h3>
      {/* <Mdx code={post.body.code} tweets={tweets} /> */}
    </section>
  );
}
