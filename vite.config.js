import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import svgr from "@svgr/rollup";
import eslint from "vite-plugin-eslint";

import {
  getRepoDetails,
  setPackageJSONValuesForCurrentRepo,
} from "./build_utils/buildHelper";

const { viteBaseName = "", repoName = "", ghURL = "" } = await getRepoDetails();

if (false && import.meta.env?.PROD) {
  // this (env being PROD) is true during gh pages build, as seen in the message 'vite v4.4.5 building for production...'
  await setPackageJSONValuesForCurrentRepo(repoName, ghURL); // set package.json homepage for gh pages
}

export default ({ mode }) => {
  // using function notation so loaded envs can be used
  const loadedEnvs = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      eslint(),
      react(),
      svgr({ dimensions: true, svgo: false, typescript: false }),
    ],
    base: `/${viteBaseName}/`,
    assetsInclude: ["**/*.zip"], // for zip and iframe assets
    resolve: {
      alias: {
        "@": resolve(import.meta.dirname, "src"),
        /*
    Aliased imports (preferred):
    - Alias for 'src': import MyComponent from "@/components/MyComponent"

    Other imports patterns till work:
    - npm imports: import React from 'react'
    - Org npm imports: "@redux/toolkit". "@/" doesnt clash since immediate slash.
    - Relative imports: "./components/MyComponent"
    */
      },
    },
  });
};
