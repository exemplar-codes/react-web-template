import fs from "fs/promises";
import path from "path";

import { exec } from "child_process";
import { fileURLToPath } from "url";
import { promisify } from "util";
import PACKAGE_JSON from "./package.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execAsync = promisify(exec);

/**
 * Get repo details, repoUrl, ghPageURL (general prediction)
 * Most importantly the `base` of vite.config.js (needed for deployment in GitHub page)
 *
 * reusable
 */
export const getRepoDetails = async (safe = true) => {
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

    viteBaseName: (safe ? repoName : null) || __dirname.split(path.sep).at(-1), // get from repo, or fallback to folder name
  };
};
getRepoDetails.tests = [
  async () => {
    console.log(await getRepoDetails());
  },
  async () => {
    // unsafe works, creates repoName from folderName
    console.log(await getRepoDetails(false));
  },
];

/**
 * Set package.json
 * @param {valueOrFunction} valueOrFunction object to be set, or a callback whose return value to be set
 * callback will get current file content (object) as first param
 *
 * inspired by React's state setter.
 * Note: the callback param is a cached package.json (it will remain same irrespective of number of calls made)
 *
 * @returns {void}
 *
 * note: reusable function with the import - `import PACKAGE_JSON from "./package.json" assert { type: "json" };`
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
setPackageJSON.tests = [
  async () => {
    // homepage changes upon running
    await setPackageJSON({ homepage: "example.com" });
  },
  async () => {
    // there should be no change.
    await setPackageJSON({ homepage: "example.com" });
    await setPackageJSON(); // default is to reset from cached
  },
];

/**
 * Relevant to current set up only.
 *
 * So we want to get github pages URL and set it in package.json
 * Use the `getRepoDetails` function
 *
 * GitHub Pages needs this key. DX gain: this is a template repo, and I don't want to edit those two values (homepage and name in package.json) manually.
 */
export const setPackageJSONValuesForCurrentRepo = async (
  nameValue = null,
  homePageValue = null
) => {
  const PACKAGE_JSON_NAME = "name";
  const PACKAGE_JSON_HOMEPAGE = "homepage";

  const { repoName = "", ghURL = "" } = await getRepoDetails();
  return setPackageJSON((currentValue) => ({
    ...currentValue,
    [PACKAGE_JSON_NAME]: nameValue || repoName,
    [PACKAGE_JSON_HOMEPAGE]: homePageValue || ghURL,
  }));
};
setPackageJSONValuesForCurrentRepo.tests = [
  async () => {
    // homepage becomes 'example.com'
    await setPackageJSONValuesForCurrentRepo(null, "example.com");
  },
  async () => {
    // first, mess up package.json's values, then run. It should reset to actual values.
    await setPackageJSONValuesForCurrentRepo();
  },
];

// Goal:
// 1. Set base in vite.config.js
// 2. Set homepage in package.json
// 3. Run the build commands
// 4. Try to reset everything (`git checkout `), but GitHUb clones the repo again for each deploy, so may not be needed.
