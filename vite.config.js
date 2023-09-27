import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { getRepoDetails, setHomePageInPackageJSON } from "./buildHelper";

const { viteBaseName = "", ghURL = "" } = await getRepoDetails();

await setHomePageInPackageJSON(ghURL); // set package.json homepage for gh pages

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${viteBaseName}/`,
});
