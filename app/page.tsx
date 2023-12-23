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
        {/* <h2>{"How'd I get here?"}</h2>
        <p>- BlackRock</p>
        <p>- NC State</p> */}

        {/* <span>CSS Timeline test</span> */}
        {/* <ul className="relative w-[660px] list-none mt-5 mx-auto my-0 px-0 py-[1em] before:absolute before:content-['_'] before:block before:w-1.5 before:h-full before:ml-[-3px] before:z-[5] before:left-2/4 before:top-0">
          <li>
            <div className="relative w-[300px] float-right">
              <div className="relative inline-block text-center">
                <span className="relative inline font-semibold text-left px-2.5 py-1.5 rounded-[5px] background: rgb(248, 248, 248)">
                  Freelancer
                </span>
                <span className="inline leading-[1em] text-[0.66666em] text-[rgb(250,80,80)] align-middle">
                  <span className="inline-block px-1.5 py-1 background: rgb(248, 248, 248)">
                    2013 - present
                  </span>
                </span>
              </div>
              <div className="text-[0.77777em] italic leading-[1.5em] ml-0 mr-[0.75em] mt-[1em] mb-0">
                My current employment. Way better than the position before!
              </div>
            </div>
          </li>

          <li>
            <div className="relative w-[300px] float-left text-right">
              <div className="relative inline-block text-center">
                <span className="relative inline font-semibold text-left px-2.5 py-1.5 rounded-[5px] background: rgb(248, 248, 248)">
                  Apple Inc.
                </span>
                <span className="inline leading-[1em] text-[0.66666em] text-[rgb(250,80,80)] align-middle">
                  <span className="inline-block px-1.5 py-1 background: rgb(248, 248, 248)">
                    2011 - 2013
                  </span>
                </span>
              </div>
              <div className="text-[0.77777em] italic leading-[1.5em] ml-0 mr-[0.75em] mt-[1em] mb-0">
                My first employer. All the stuff I've learned and projects I've
                been working on.
              </div>
            </div>
          </li>

          <li>
            <div className="relative w-[300px] float-right">
              <div className="relative inline-block text-center">
                <span className="relative inline font-semibold text-left px-2.5 py-1.5 rounded-[5px] background: rgb(248, 248, 248)">
                  Harvard University
                </span>
                <span className="inline leading-[1em] text-[0.66666em] text-[rgb(250,80,80)] align-middle">
                  <span className="inline-block px-1.5 py-1 background: rgb(248, 248, 248)">
                    2008 - 2011
                  </span>
                </span>
              </div>
              <div className="text-[0.77777em] italic leading-[1.5em] ml-0 mr-[0.75em] mt-[1em] mb-0">
                A description of all the lectures and courses I have taken and
                my final degree?
              </div>
            </div>
          </li>
        </ul> */}
        <section className="flex justify-center pt-8">
          <div className="w-80">
            <h2 className="text-xl text-gray-700 mb-7">How'd I get here?</h2>
            <ul>
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
                  <p className="text-sm text-gray-600">August 2020 - Present</p>
                  <p className="mt-2 text-gray-600 text-sm">
                    BlackRock Full-time
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
                  <p className="text-sm text-gray-600">May 2019 - Aug 2019</p>
                  <p className="mt-2 text-gray-600 text-sm">BlackRock intern</p>
                </div>
              </li>
              <li className="relative flex items-baseline gap-6 pb-5">
                <div>
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
                  <p className="text-sm text-gray-600">May 2020</p>
                  <p className="mt-2 text-gray-600 text-sm">
                    Graduated from NC State University
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

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
