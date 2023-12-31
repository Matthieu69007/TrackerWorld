# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Crowdin workflow


Gen Localisation (may need to delete some json files to ensure proper update of existing strings):
```
npm run write-translations
```

Work in /docs for all mdx. They will automatically be inclded in the crowdin workflow
```
```
Upload
```
npm run crowdin upload
```

translate in crowdin...

download translated files
```
npm run crowdin download
```
