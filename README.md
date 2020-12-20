<h1>RJS CLI</h1>

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
$ npm install -g rjs-cli
```

Install with [yarn](https://yarnpkg.com/en/):

```sh
$ yarn global add rjs-cli
```

---

<h2 id="usage">❯ Usage</h2>

## Init

Once installed, creating a new React project is simple. You can simply run:

```sh
$ rjs init
```

Or if you don't want to install you can run:

```
$ npx rjs init
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+)_

Without any options this will trigger the interactive mode.

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

<h2 id="generate-components">Generate Components</h2>

This command will create a folder with your component name within your default (e.g. src/components) directory, and its corresponding files.

You can create a component like so:

```sh
$ rjs generate-component Header
```

Or you can use a shortcut

```sh
$ rjs gc Header
```

### Result of the command:

```
|-- /src
    |-- /components
        |-- /Header
            |-- Header.js
            |-- Header.css
```

### Example of the generated component

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Header = () => {
  return <div>Header Component</div>;
};

Header.propTypes = {};

export default Header;
```

## License

rjs-cli is open source software [licensed as MIT](https://github.com/rjs-cli/rjs-cli/blob/master/LICENSE.md).
