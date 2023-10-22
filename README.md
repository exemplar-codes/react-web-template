# USP

Set up, and deploy React app for free within 10 seconds. You need a GitHub account.

# React + Vite (ignorable)

I am tired of [create-react-app](https://github.com/sanjar-notes/react/issues/45), it's very slow to `npm install` and `npm start`.
I intent to use this as my go to React template.

## How to use

1. `npm install` - install dependencies
2. `npm run dev` - start dev server
3. `npm run predeploy && npm run deploy` - deploy latest commit to github pages. No manual work is needed. Just visit the URL, it should be live!


## Using repo as template (optional)

1. Fork this repo on GitHub to start a new project.
2. Run `npm run fix_package_json_for_current_repo`. This fixes the `homepage` and `name` keys, which are needed for GitHub pages deployment.
3. Add package.json and commit.



Tip: Use [`pnpm`](https://pnpm.io/installation#using-npm) instead of `npm` for even faster installation time.
