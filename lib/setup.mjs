import { promises as fs } from "fs";
import path from "path";
import dotenv from "dotenv";

const info = `
export const name = 'Your Name';
export const about = () => {
  return (
    <>
      Hey, I'm a developer who loves Next.js. I work at BigCo or CoolStartup as a Software Engineer.
    </>
  );
};
`;

const deleteFolderRecursive = async (path) => {
  const stat = await fs.stat(path);
  if (stat.isDirectory()) {
    const files = await fs.readdir(path);
    await Promise.all(
      files.map((file) => deleteFolderRecursive(`${path}/${file}`))
    );
    await fs.rmdir(path);
  } else {
    await fs.unlink(path);
  }
};

(async () => {
  dotenv.config();

  if (process.env.IS_TEMPLATE === "false") {
    // This means it's not the template, it's my legit site
    // I orderride the env variable for my site. This means that when
    // folks clone this repo for the first time, it will delete my personal content
    return;
  }

  const libDir = path.join(process.cwd(), "lib");
  const imagesDir = path.join(process.cwd(), "public", "images");

  await deleteFolderRecursive(imagesDir);
  await fs.writeFile(path.join(libDir, "info.tsx"), info);
})();
