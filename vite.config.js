import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import {
  getRepoDetails,
  setPackageJSONValuesForCurrentRepo,
} from "./buildHelper";

const { viteBaseName = "", repoName = "", ghURL = "" } = await getRepoDetails();

if (false && import.meta.env?.PROD) {
  // this (env being PROD) is true during gh pages build, as seen in the message 'vite v4.4.5 building for production...'
  await setPackageJSONValuesForCurrentRepo(repoName, ghURL); // set package.json homepage for gh pages
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${viteBaseName}/`,
});
