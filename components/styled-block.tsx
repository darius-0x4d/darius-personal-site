import { PortableText, PortableTextComponents } from "@portabletext/react";
import { IdealImage } from "sanity/lib/ideal-image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";

const StyledBlock = (props) => {
  const { content } = props;

  const customBlockComponents: PortableTextComponents = {
    // first we tackle our custom block types
    types: {
      image: ({ value }) => {
        return (
          <div className="py-4 flex justify-center">
            <IdealImage image={value} />
          </div>
        );
      },
      code: ({ value }) => {
        const className = {
          className:
            "bg-slate-200 dark:bg-slate-700 overflow-x-auto p-2 rounded-md",
        };
        return (
          <SyntaxHighlighter
            language={value.language}
            useInlineStyles={false}
            {...className}
          >
            {value.code}
          </SyntaxHighlighter>
        );
      },
    },

    // then we define how the annotations should be rendered
    marks: {
      link: ({ children, value }) => {
        const rel = !value?.href?.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        if (!value.href) {
          return (
            <span className="text-muted-foreground font-semibold">
              {children}
            </span>
          );
        }
        return (
          <Link
            className="text-link underline underline-offset-2 font-semibold hover:text-rose-500"
            href={value.href}
            target="_blank"
            rel={rel}
          >
            {children}
          </Link>
        );
      },
      internalLink: ({ children, value }) => {
        const { slug = {} } = value;
        const href = `/blog/${slug.current}`;
        return (
          <Link
            className="text-link underline underline-offset-2 font-semibold hover:text-rose-500"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {children}
          </Link>
        );
      },
      em: ({ children }) => (
        <em className="text-muted-foreground font-semibold">{children}</em>
      ),
      highlight: ({ children }) => {
        // used as an inline code highlighter
        return (
          <span className="bg-slate-200 text-black dark:bg-slate-700 dark:text-white text-sm m-0 p-[0.2rem] whitespace-break-spaces rounded-md font-mono">
            {children}
          </span>
        );
      },
    },

    block: {
      // Ex. 1: customizing common block types
      h1: ({ children }) => (
        <h1 className="text-3xl font-extrabold tracking-tight scroll-m-20">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-extrabold pb-2 text-sky-500 dark:text-cyan-500 tracking-tight scroll-m-20 first:mt-0">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-extrabold text-muted-foreground tracking-tight scroll-m-20">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg font-extrabold tracking-tight scroll-m-20">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-6 border-l-2 border-l-blockquote pl-6 italic">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
      ),

      // Ex. 2: rendering custom styles
      customHeading: ({ children }) => (
        <h2 className="text-lg text-primary text-purple-700">{children}</h2>
      ),
    },

    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <ul className="my-6 ml-6 list-disc">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-6 ml-6 list-decimal">{children}</ol>
      ),

      // Ex. 2: rendering custom lists
      checkmarks: ({ children }) => (
        <ol className="m-auto text-lg">{children}</ol>
      ),
    },

    listItem: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <li className="ml-6 [&>li]:mt-2">{children}</li>
      ),

      // Ex. 2: rendering custom list items
      checkmarks: ({ children }) => (
        <li className="ml-6 [&>li]:mt-2">✅ {children}</li>
      ),
    },
  };

  return <PortableText value={content} components={customBlockComponents} />;
};
export default StyledBlock;
