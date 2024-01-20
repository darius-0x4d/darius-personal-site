import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/local-studio/"],
      },
    ],
    sitemap: "https://www.dariusmcfarland.com/sitemap.xml",
  };
}
