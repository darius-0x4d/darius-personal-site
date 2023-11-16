import Link from "next/link";
import Image from "next/image";
import { getBlogViews, getTweetCount, getStarCount } from "lib/metrics";
import { name, about, bio, avatar } from "lib/info";
import { BlurredBackground } from "@/components/ui/blurred-background";
import {
  CornersIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export const revalidate = 60;
export const metadata = {
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "Darius McFarland",
    description: "Developer, writer, and creator.",
    url: "https://leerob.io",
    siteName: "Darius McFarland",
    images: [
      {
        url: "https://leerob.io/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default async function HomePage() {
  let starCount, views, tweetCount;

  try {
    [starCount, views, tweetCount] = await Promise.all([
      getStarCount(),
      getBlogViews(),
      getTweetCount(),
    ]);
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="grid grid-rows-[repeat(2,_minmax(0,_0.5fr))] lg:gap-y-16">
      <div className="mt-12 h-[31.25rem]">
        <BlurredBackground />
      </div>
      <div className="">
        <span>{"What's good? I'm"}</span>
        <h1 className="font-bold text-3xl font-serif">{name}</h1>
        <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
          {about()}
        </p>
        <h2>{"How'd I get here?"}</h2>
        <p>- BlackRock</p>
        <p>- NC State</p>

        <h2 className="mt-8">Hit me up</h2>

        <ul className="flex flex-row md:flex-col justify-center mt-4 space-x-4 md:space-x-0  md:space-y-4 font-sm text-neutral-500 dark:text-neutral-400">
          <li>
            <a
              className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/darius_0x4d"
            >
              <TwitterLogoIcon className="h-6 w-6 " />
              <span className="pl-4">Twitter</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/darius-0x4d"
            >
              <GitHubLogoIcon className="h-6 w-6 " />
              <span className="pl-4">Github</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/darius-mcfarland/"
            >
              <LinkedInLogoIcon className="h-6 w-6 " />
              <span className="pl-4">LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
