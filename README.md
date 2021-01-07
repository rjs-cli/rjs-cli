<h1>CLI RJS</h1>

[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/rjs-cli/rjs-cli/blob/master/LICENSE.md)

## ❯ Why ?

To help speed up productivity in React projects and stop copying, pasting, and renaming files each time you want to create a new component.

---

## ❯ Getting started

- [Install](#-install)
- [Usage](#-usage)
  - [Init](#-init)
  - [Generate Components](#-generate-components)

---

<h2 id="install">❯ Install</h2>

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install -g cli-rjs
```

Install with [yarn](https://yarnpkg.com/en/):

```sh
$ yarn global add cli-rjs
```

---

<h2 id="usage">❯ Usage</h2>

## Init

```sh
$ rjs init <appName> [options]
```

Once installed, creating a new React project is simple. You can simply run:

```sh
$ rjs init yourAppName
```

Or if you don't want to install you can run:

```
$ npx rjs init yourAppName
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+)_

Or just simply :

```sh
$ rjs init
```

> If you don't specify a name for your app it will trigger the interactive mode.

### Options

You can configure your app by adding some options

<table border="1px solid" style="border-collapse: collapse; margin: 1rem 0">
  <thead>
    <tr>
      <th style="padding: 0.75rem;">Option</th>
      <th style="padding: 0.75rem;">Description</th>
      <th style="padding: 0.75rem;">Value Type</th>
      <th style="padding: 0.75rem;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-typescript, -t</b></td>
      <td style="padding: 1.25rem;">Creates the project with the cra typescript template</td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-router, -r</b></td>
      <td style="padding: 1.25rem;">
        Installs react-router-dom right after finishing project creation
      </td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-sass, -S</b></td>
      <td style="padding: 1.25rem;">
        Installs node-sass right after finishing project creation
      </td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-modules, -m</b></td>
      <td style="padding: 1.25rem;">Configures the project for css modules</td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-redux, -R</b></td>
      <td style="padding: 1.25rem;">
        Creates a redux store with all the needed folders (actions, reducers..)
      </td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-axios, -a</b></td>
      <td style="padding: 1.25rem;">Sets up axios for the project</td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-npm, -N</b></td>
      <td style="padding: 1.25rem;">Uses npm as a package manager</td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--interactive, -i</b></td>
      <td style="padding: 1.25rem;">Triggers the interactive mode asking all of the above</td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
  </tbody>
</table>

<p style="margin: 2rem 0">
  With default values the structure of your project will look like this:
</p>

```
|-- /node_modules
|-- /public
|-- /src
    |-- /App
        |-- App.css
        |-- App.js
        |-- App.test.js
    |-- assets
        |-- /css
            |-- index.css
            |-- reset.css
        |-- /images
    |-- index.js
    |-- logo.svg
    |-- reportWebVitals.js
    |-- setupTests.js
|-- .gitignore
|-- package.json
|-- README.md
|-- yarn.lock
```

### Example commands with different option

> with typescript, redux and sass

```
$ rjs init -tRS
```

#### What you'll get

```
|-- /node_modules
|-- /public
|-- /src
    |-- /App
        |-- App.scss
        |-- App.tsx
        |-- App.test.tsx
    |-- assets
        |-- /images
        |-- /scss
            |-- _reset.scss
            |-- _variables.scss
            |-- index.scss
    |-- /containers
        |-- /App
            |-- App.ts
    |-- /store
        |-- / actions
            |-- index.ts
            |-- actions.template.ts
        |-- / middlewares
            |-- index.ts
            |-- middleware.template.ts
        |-- / reducers
            |-- index.ts
            |-- reducer.template.ts
        |-- / selectors
        |-- index.ts
    |-- index.js
    |-- logo.svg
    |-- react-app-env.d.ts
    |-- reportWebVitals.js
    |-- setupTests.js
|-- .gitignore
|-- package.json
|-- README.md
|-- yarn.lock
```

> with typescript, sass and css modules

```
$ rjs init -tmS
```

#### What you'll get

```
|-- /node_modules
|-- /public
|-- /src
    |-- /App
        |-- App.module.scss
        |-- App.tsx
        |-- App.test.tsx
    |-- assets
        |-- /images
        |-- /scss
            |-- _reset.scss
            |-- _variables.scss
            |-- index.scss
    |-- index.js
    |-- logo.svg
    |-- react-app-env.d.ts
    |-- reportWebVitals.js
    |-- setupTests.js
|-- .gitignore
|-- package.json
|-- README.md
|-- yarn.lock
```

<h2 id="generate-components">Generate Components</h2>

```sh
$ rjs generate-component | gc <name> [directory] [options]
```

This command will create a folder with your component name within your default (e.g. src/components) directory, and its corresponding file.

To create a component just run:

```sh
$ rjs generate-component Header
```

Or you can use an alias

```sh
$ rjs gc Header
```

This will generate a folder and a .js file with your component name.

```
|-- /src
    |-- /components
        |-- /Header
            |-- Header.js
```

### Example of the javascript generated component

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Header = () => {
  return <div>Header Component</div>;
};

Header.propTypes = {};

export default Header;
```

You can also attach a style file with you component:

```sh
$ rjs generate-component Header -s css
```

This will generate a folder with a .js file and a css file with your component name.

```
|-- /src
    |-- /components
        |-- /Header
            |-- Header.js
            |-- Header.css
```

You can also use typescript and css modules:

```sh
$ rjs gc Header -tms css
```

or

```sh
$ rjs generate-component Header --use-typescript --use-modules -with-styles scss
```

This will generate a folder with a .tsx file and a scss module file with your component name.

```
|-- /src
    |-- /components
        |-- /Header
            |-- Header.tsx
            |-- Header.module.scss
```

### Example of the typescript generated component

```tsx
import React, { FC } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return <div className={styles.Header}>Header Component</div>;
};

export default Header;
```

### Directory

You can also specify a directory name or path for your component, it will create a path from where you currently are

> if you're in src directory and want to create a Nav component in the components/Header/Nav

```sh
# path : src

$ rjs gc Nav components/Header/Nav -tms scss
```

Result

```
|-- /src
    |-- /components
        |-- /Header
            |-- Header.tsx
            |-- Header.module.scss
        |-- /Nav
            |-- Nav.tsx
            |-- Nav.module.scss
```

You can also create a component in the folder where you currently are by using . as a directory name.

Let's say you want to create a Layout component with typescript in your components directory

```sh
# path : src/components
$ rjs gc Layout . -t

```

Result

```
|-- /src
    |-- /components
        |-- /Header
            |-- Header.tsx
            |-- Header.module.scss
        |-- Layout.tsx
```

### Options

#### Here are all the available options

<table border="1px solid" style="border-collapse: collapse">
  <thead>
    <tr>
      <th style="padding: 0.75rem;">Option</th>
      <th style="padding: 0.75rem;">Description</th>
      <th style="padding: 0.75rem;">Value Type</th>
      <th style="padding: 0.75rem;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-typescript, -t</b></td>
      <td style="padding: 1.25rem;">Creates the component with typescript</td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
      <td style="padding: 1.25rem;"><b>--use-styles &lt;type&gt;, -s &lt;type&gt;</b></td>
      <td style="padding: 1.25rem;">
        Creates a style file along with the component file
      </td>
      <td style="padding: 1.25rem; text-align: center;">scss | css | false</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--use-modules, -m</b></td>
      <td style="padding: 1.25rem;">Configures the component and style file to use "css modules"</td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>
    <tr>
      <td style="padding: 1.25rem;"><b>--class, -c</b></td>
      <td style="padding: 1.25rem;">Configures the component and style file to use "css modules"</td>
      <td style="padding: 1.25rem; text-align: center;">boolean</td>
      <td style="padding: 1.25rem; text-align: center;">false</td>
    </tr>

  </tbody>
</table>

## License

rjs-cli is open source software [licensed as MIT](https://github.com/rjs-cli/rjs-cli/blob/master/LICENSE.md).
