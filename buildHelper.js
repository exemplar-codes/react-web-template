import { exec } from "child_process";
import { fileURLToPath } from "url";
import { promisify } from "util";
import path from "path";

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

// console.log(await getRepoDetails());
