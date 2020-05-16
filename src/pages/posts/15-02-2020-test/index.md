---
path: "/generating-typescript-definition-files"
date: "2020-05-17"
title: "Generating TypeScript definition files directly from the source"
tags: ["JavaScript", "TypeScript", "tooling"]
excerpt: "Tools and techniques to generate TypeScript definition files directly from the source."
published: true
---

I'll go through a small list of tools and techniques to generate TypeScript definition files directly from the source hopping this information could be of any help whether you are migrating your codebase to use TypeScript or you are consuming third party code that doesn't provide type definitions.

First, let me set the scene, let's say your team is starting a new project within your company and you decided to use the opportunity to introduce TypeScript into your team tech-stack.

> -- I know, there are a lot of things we could discuss here like how was the decision-making process? or what makes this project suitable for trying a new technology? but let's keep it simple for example purposes.

Your team starts working on the project, everything is going great until you install one of the company internal JavaScript modules `@pied-piper/compress` and you start getting the following error on you code editor.

```
Could not find a declaration file for module '@pied-piper/compress'. '/node_modules/@pied-piper/compress/dist/bundle.js' implicitly has an 'any' type.
Try `npm install @types/pied-piper__compress` if it exists or add a new declaration (.d.ts) file containing `declare module '@pied-piper/compress';`
```

> -- This assumes you have `noImplicitAny` set to true in your tsconfig file, this is highly recommended to get all the benefits of using types in your code. If you set this configuration to false you won't get above error.

The error message is very clear, the module doesn't provide a type definition file and the TypeScript compiler will treat it as type `any`. The error message suggests 2 possible solutions:

1. Try `npm install @types/pied-piper__compress`, this will try to get the types from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). As we are dealing with an internal module (not public out of the company intranet) this is not a viable solution for us.
2. Add a new declaration (.d.ts) file containing `declare module '@pied-piper/compress';`. This is called a [shorthand declaration](https://www.typescriptlang.org/docs/handbook/modules.html#shorthand-ambient-modules) within the TypeScript world and it will indeed suppress the error but the big downside is that all imports will still have the `any` type.

Any of this options seems to be good enough so what is left? Well, we have 2 more options:

1. Manually write the type definitions. A good thing about TypeScript is that it allows you to adopt an incremental approach when writing your types, you can start with very basic types and iterate as you go. Keep in mind that this will require deep knowledge of the module you want to add types for, meaning that this won't be an easy task for large and complex modules.

2. Use a tool that automatically generates TypeScript definition files. Ok, this sounds like a good deal, let's expand on this.

## Automatically generating TypeScript definition files

Our strategy to generate definition files will depend on the nature of the JavaScript module, I'll cover the following 3 scenarios:

- a "plain" JavaScript module.
- a React component.
- a JSON schema.

### Generating type definitions for a JavaScript module

For this we can use [dts-gen](https://github.com/microsoft/dts-gen) which is a tool that generates definition files from any JavaScript object.

> -- "it simply examines the objects as they appear at runtime, rather than needing the source code that creates the object." from dts-gen README.

dts-gen provides a commandline tool but in this case we will use the API directly to write our own CLI, this will allow us to take advantage of other tools to get better results, I'll get back to this later.

We will also use [fs-extra](https://www.npmjs.com/package/fs-extra) which is an extended version of the native fs node module to interact with the file system.

First we install dts-gen and fs-extra

```bash
npm install dts-gen fs-extra
```

Then we can use it like this:

```js
const dtsgen = require("dts-gen/bin/lib");
const fse = require("fs-extra");
const path = require("path");

const dir = path.join(process.cwd(), "/types/@pied-piper/compress/index.d.ts");

let dts = dtsgen.generateModuleDeclarationFile(
  "@pied-piper/compress",
  require("@pied-piper/compress")
);

dts = `
declare module '@pied-piper/compress' {
    ${dts}
}
`;

fse.outputFile(dir, dts).catch(console.error);
```

That's it, running this script will generate a definition file in `/types/@pied-piper/compress/index.d.ts`. You will need to update your tsconfig file as follows so that TypeScript can use your new definition file.

```json
{
    "compilerOptions": {
        ...
        "typeRoots": [ "./types", "./node_modules/@types"]
    }
}
```

By this point you might have noticed two things,

1. Generated types are not perfect, there will be cases where dts-gen won't have enough information to guess the types and for this reason you will see some `any`s being used in function parameters and return types.
2. The format of the generated file is not following any rules.

Unfortunately I don't have a solution for #1 but even though the generated types are not perfect, and you will need to refine them over time this is a really good baseline going forward. I do have a solution for #2, [Prettier](https://prettier.io/) has support for TypeScript code and it also provides an API that will allow us to programmatically format our definition file, let's start by installing Prettier.

```bash
npm install prettier
```

```js{5}
const prettier = require("prettier");

// code to generate type definitions

dts = prettier.format(dts, { parser: "typescript" });
fse.outputFile(dir, dts).catch(console.error);
```

Cool, that was great but there is still one big problem 😓, this will only work for CommonJS modules. The good news is that we can work around this limitation by using [Babel](https://babeljs.io/) a ESModule friendly version would look as follows.

```bash
npm install @babel/core @babel/preset-env
```

```js
const dtsgen = require("dts-gen/bin/lib");
const prettier = require("prettier");
const babel = require("@babel/core");
const fse = require("fs-extra");
const path = require("path");

const dir = path.join(process.cwd(), "/types/@pied-piper/compress/index.d.ts");

babel
  .transformFileSync("./node_modules/@pied-piper/compress/dist/index.js", {
    presets: ["@babel/preset-env"],
  })
  .then(({ code }) => {
    fse.writeFileSync("./compress.js", code);

    let dts = dtsgen.generateModuleDeclarationFile(
      "@pied-piper/compress",
      require("./compress.js")
    );

    dts = `declare module '@pied-piper/compress' { ${dts} }`;
    dts = prettier.format(dts, { parser: "typescript" });

    fse.outputFile(dir, dts).catch(console.error);
  })
  .catch(console.error);
```

That's it this small script should be enough to get your projects rolling.

### Generating type definitions for a React component

The tool we will use for this is [react-to-typescript-definitions](https://github.com/KnisterPeter/react-to-typescript-definitions) which takes advantage of the component prop-types definitions and jsdoc to generate TypeScript definition files.

```bash
npm install react-to-typescript-definitions
```

```js
const react2dts = require("react-to-typescript-definitions");
const prettier = require("prettier");
const fse = require("fs-extra");
const path = require("path");

const dir = path.join(process.cwd(), "/types/@pied-piper/button/index.d.ts");

let dts = "";
try {
  dts = react2dts.generateFromFile(
    "@pied-piper/button",
    "node_modules/@pied-piper/button/src/index.jsx",
    {}
  );
  dts = prettier.format(dts, { parser: "typescript" });

  fse.outputFile(dir, dts).catch(console.error);
} catch (error) {
  console.error(error);
}
```

Yass that was easy, there are a couple considerations you need to take into account though:

- react-to-typescript-definitions does not support `PropTypes.instanceOf` at the moment, you can get around this by getting the source code first and replacing it with something generic like `PropTypes.object`.
- When the `propType` is a function `PropTypes.func` there is no enough information to generate accurate types for the function parameters nor infer the function return type.

### Generating type definitions for a JSON schema

Yep you guessed right there is also a tool ew can use for this, [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript).

```bash
npm install json-schema-to-typescript
```

```js
const json2ts = require("json-schema-to-typescript");
const prettier = require("prettier");
const fse = require("fs-extra");
const path = require("path");

const schema = require("@pied-piper/compress/template.schema");
const dir = path.join(
  process.cwd(),
  "/types/@pied-piper/compress/template/index.d.ts"
);

compile(mosaicTemplateSchema, "Template")
  .then((ts) => {
    let dts = `declare module '@pied-piper/compress' { ${ts} }`;

    dts = prettier.format(dts, { parser: "typescript" });
    fse.outputFile(dir, dts).catch(console.error);
  })
  .catch(console.error);
```

---

Thank you for making it this far, I really hope you could find at least one useful thing in this writing.

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
