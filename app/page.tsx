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
      <div className="mt-12 h-[37.25rem]">
        <BlurredBackground />
      </div>
      <div className="">
        <span className="text-2xl text-muted-foreground">{"What's good? I'm"}</span>
        <h1 className="font-bold text-3xl mt-1 text-sky-500 dark:text-cyan-500">{name}</h1>
        <p className="text-lg my-5 max-w-[460px] text-neutral-950 dark:text-neutral-100">
          {about()}
        </p>
        <h2 className="text-2xl dark:text-muted-foreground font-medium">{"How'd I get here?"}</h2>
        <section className="flex justify-center md:justify-normal pt-4 md:pl-8">
          <div className="w-80">
            <ul>
              <li className="relative flex items-baseline gap-6 pb-5">
                <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    className="fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold dark:text-cyan-500">August 2020 - Present</p>
                  <p className="mt-2 text-md text-neutral-800 dark:text-neutral-200">
                    Software Engineer at BlackRock
                  </p>
                </div>
              </li>
              <li className="relative flex items-baseline gap-6 pb-5">
                <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    className="bi bi-circle-fill fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold dark:text-cyan-500">May 2020</p>
                  <p className="mt-2 text-md text-neutral-800 dark:text-neutral-200">
                    Graduated from NC State University
                  </p>
                </div>
              </li>
              <li className="relative flex items-baseline gap-6 pb-5">
                <div >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    className="bi bi-circle-fill fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold dark:text-cyan-500">May 2019 - August 2019</p>
                  <p className="mt-2 text-md text-neutral-800 dark:text-neutral-200">Interned with BlackRock</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <h2 className="mt-4 text-2xl dark:text-muted-foreground font-medium">Hit me up</h2>

        <ul className="flex flex-row md:flex-col justify-center mt-4 pb-4 md:pl-4 space-x-4 md:space-x-0  md:space-y-4 font-sm text-neutral-800 dark:text-neutral-100">
          <li>
            <a
              className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/darius_0x4d"
            >
              <TwitterLogoIcon className="h-7 w-7 " />
              <span className="pl-4 text-lg">Twitter</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/darius-0x4d"
            >
              <GitHubLogoIcon className="h-7 w-7 " />
              <span className="pl-4 text-lg">Github</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/darius-mcfarland/"
            >
              <LinkedInLogoIcon className="h-7 w-7 " />
              <span className="pl-4 text-lg">LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
