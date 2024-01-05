import { prettyPrintDate } from "@/lib/utils";
import { ImageResponse } from "next/og";
import { client } from "sanity/lib/client";
import { PostSchemaType } from "sanity/schema-types/post-schema-type";

export const runtime = "edge";

// This entire design is heavily, heavily, (basically stolen exactly) from Guillermo Rauch's website: https://github.com/rauchg/blog/blob/24df4e40983ad515a8d0b53f8b4ac38c82abcc56/app/(post)/og/%5Bid%5D/route.tsx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const raleway = await fetch(
      new URL(
        "../../../../../public/fonts/Raleway-Regular.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    const ralewaySemiBold = await fetch(
      new URL(
        "../../../../../public/fonts/Raleway-SemiBold.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    const post = await client.fetch<PostSchemaType>(
      `*[_type == "post" && slug.current == "${searchParams.get("slug")}"][0]`,
      {
        next: {
          revalidate: 3600, // look for updates to revalidate cache every hour
        },
      }
    );

    return new ImageResponse(
      (
        <div
          tw="flex p-10 h-full w-full bg-white flex-col"
          style={font("Raleway")}
        >
          <header tw="flex text-[36px] w-full">
            <div tw="font-bold" style={font("Raleway Semi-Bold")}>
              Darius McFarland
            </div>
            <div tw="grow" />
            <div tw="text-[28px]">dariusmcfarland.com</div>
          </header>

          <main tw="flex grow pb-3 flex-col items-center justify-center">
            <div tw="flex">
              <div
                tw="bg-sky-100 p-8 text-7xl font-medium rounded-md text-center"
                style={font("Raleway Semi-Bold")}
              >
                {post.title}
              </div>
            </div>

            <div tw="mt-5 flex text-3xl text-gray-500" style={font("Raleway")}>
              {prettyPrintDate(post._createdAt)}
            </div>
          </main>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Raleway",
            data: await raleway,
          },
          {
            name: "Raleway Semi-Bold",
            data: await ralewaySemiBold,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
