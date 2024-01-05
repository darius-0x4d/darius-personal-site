import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { client } from "sanity/lib/client";
import { PostSchemaType, Slug } from "sanity/schema-types/post-schema-type";
import { Metadata } from "next";
import { urlForImage } from "sanity/lib/image";
import { IdealImage } from "sanity/lib/ideal-image";
import { prettyPrintDate } from "@/lib/utils";
import StyledBlock from "components/styled-block";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ViewCounter from "../view-counter";

// export async function generateStaticParams() {
//   const slugs = await client.fetch<Slug[]>(`*[_type == "post"]{slug}`);

//   return slugs.map((slug) => ({
//     slug: slug.current,
//   }));
// }

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await client.fetch<PostSchemaType>(
    `*[_type == "post" && slug.current == "${params.slug}"][0]`,
    {
      next: {
        revalidate: 1, // look for updates to revalidate cache every hour
      },
    }
  );
  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.overview[0].children[0].text,
    openGraph: {
      title: post.title,
      description: post.overview[0].children[0].text,
      type: "article",
      publishedTime: post.publishedAt,
      url: `https://dariusmcfarland.com/blog/${params.slug}`,
      images: post.mainImage
        ? [
            {
              url: urlForImage(post.mainImage).url(),
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.overview[0].children[0].text,
      images: post.mainImage
        ? [
            {
              url: urlForImage(post.mainImage).url(),
            },
          ]
        : [],
      creator: "@darius_0x4d",
      site: "@darius_0x4d",
    },
  };
}

export default async function Blog({ params }) {
  const post = await client.fetch<PostSchemaType>(
    `*[_type == "post" && slug.current == "${params.slug}"]{
      ..., 
      body[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        },
      },
    }[0]`,
    {
      next: {
        revalidate: 3600, // look for updates to revalidate cache every hour
      },
    }
  );

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className="font-extrabold text-3xl max-w-[650px] md:max-w-full">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="grid grid-cols-[auto_1fr_auto] pb-8 pr-2 justify-items-end max-w-[650px] md:max-w-full">
        <div className="pt-1 tracking-tighter text-muted-foreground">
          {prettyPrintDate(post.publishedAt)}
        </div>
        <div className="text-muted-foreground tracking-tighter">
          <ViewCounter slug={params.slug} trackView></ViewCounter>
        </div>
      </div>
      {post.mainImage ? (
        <div className="flex justify-center">
          <IdealImage image={post.mainImage} />
        </div>
      ) : null}
      <div className="pt-4">
        <StyledBlock content={post.body} />
      </div>
      <div className="pt-12 flex justify-end">
        <Button asChild variant="ghost">
          <Link href={"/blog"}>
            <ArrowLeftIcon className="font-bold h-4 w-4" />
            <span className="font-bold pl-2">Return to All Posts</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
