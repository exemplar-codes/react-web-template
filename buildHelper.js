import fs from "fs/promises";
import path from "path";

import { exec } from "child_process";
import { fileURLToPath } from "url";
import { promisify } from "util";
import PACKAGE_JSON from "./package.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execAsync = promisify(exec);

export default async function getRepoDetails() {
  const { stdout: gitConfig } = await execAsync("cat .git/config");

  const gitUrl = gitConfig
    .split("\n")
    .find((line) => line.trim().startsWith("url ="));
  // git@github.com:exemplar-codes/vite-react-js-template.git

  const usefulURL = gitUrl
    .trim()
    .slice("url = git@".length)
    .slice(0, -".git".length)
    .replace(":", "/");
  //   github.com:exemplar-codes/vite-react-js-template

  const [domain, cctld, orgOrUsername, repoName] = usefulURL
    .replace(".", "/")
    .split("/"); // github, com, exemplar-codes, vite-react-js-template

  return {
    usefulURL,
    domain,
    cctld,
    orgOrUsername,
    repoName,

    url: `https://${domain}.${cctld}/${orgOrUsername}/${repoName}`,
    ghURL: `https://${orgOrUsername}.github.io/${repoName}/`, // https://exemplar-codes.github.io/vite-react-js-template/

    viteBaseName: repoName || __dirname.split(path.sep).at(-1), // get from repo, or fallback to folder name
  };
}

/**
 * Set package.json
 * @param {valueOrFunction} valueOrFunction object to be set, or a callback whose return value to be set
 * callback will get current file content (object) as first param
 *
 * inspired by React's state setter.
 * Note: the callback param is a cached package.json (it will remain same irrespective of number of calls made)
 *
 * @returns {void}
 */
export const setPackageJSON = async (
  valueOrFunction = (originalValue) => {
    return originalValue;
  }
) => {
  const isFunction = typeof valueOrFunction === typeof (() => {});

  const newValue = isFunction ? valueOrFunction(PACKAGE_JSON) : valueOrFunction;

  await fs.writeFile(
    path.join(__dirname, "package.json"),
    JSON.stringify(newValue)
  );
};

// console.log(await getRepoDetails());

// Set base in vite.config.js
// Set homepage in package.json

// console.log(await getRepoDetails());
// await setPackageJSON((currentValue) => ({
//   ...currentValue,
//   homepage: "example.com",
// }));
// await setPackageJSON((currentValue) => ({ ...currentValue }));
