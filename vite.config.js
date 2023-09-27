import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { getRepoDetails, setHomePageInPackageJSON } from "./buildHelper";

const { viteBaseName = "", ghURL = "" } = await getRepoDetails();

if (false && import.meta.env?.PROD) {
  // this (env being PROD) is true during gh pages buld, as seen in message 'vite v4.4.5 building for production...'
  await setHomePageInPackageJSON(ghURL); // set package.json homepage for gh pages
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${viteBaseName}/`,
});
