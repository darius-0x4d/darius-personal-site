import { ReactElement } from "react";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { urlForImage } from "./image";

// Source: https://roboto.studio/blog/the-best-nextjs-and-sanity-image-component#getimagedimensions
export const IdealImage = ({ image }): ReactElement => {
  const alt = image?.alt ?? "An image without an alt, whoops";
  return (
    <div>
      {image?.asset && (
        <Image
          src={urlForImage(image).url()}
          alt={alt}
          width={getImageDimensions(image).width}
          height={getImageDimensions(image).height}
          placeholder="blur"
          blurDataURL={urlForImage(image).width(24).height(24).blur(10).url()}
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
        />
      )}
    </div>
  );
};
