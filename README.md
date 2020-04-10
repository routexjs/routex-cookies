# Routex Cookies [![npm](https://img.shields.io/npm/v/@routex/cookies.svg)](https://www.npmjs.com/package/@routex/cookies) [![Travis CI](https://img.shields.io/travis/com/routexjs/routex-cookies.svg)](https://travis-ci.com/routexjs/routex-cookies) [![Codecov](https://img.shields.io/codecov/c/github/routexjs/routex-cookies.svg)](https://codecov.io/gh/routexjs/routex-cookies)

Cookies for [Routex](https://routex.js.org).

[Documentation](https://routex.js.org/docs/packages/cookies) - [GitHub](https://github.com/routexjs/routex-cookies)

## Example

Install:

```bash
yarn add @routex/cookies
# or
npm add @routex/cookies
```

Setup your app:

```js
const { Routex, TextBody } = require("routex");
const cookies = require("@routex/cookies");

const port = process.env.PORT || 3000;
const app = new Routex();

app.use(cookies());

app.get("/", (ctx) => {
  // Get cookie
  const name = ctx.cookies.get("name");

  if (!name) {
    // Set cookie
    ctx.cookies.set("name", "john");
  }

  // Remove cookie
  ctx.cookies.remove("name");

  ctx.body = new TextBody("Set name cookie");
});

app.listen(port).then(() => console.log(`Listening on ${port}`));
```

## Support

We support all currently active and maintained [Node LTS versions](https://github.com/nodejs/Release), include current Node versions.

Please file feature requests and bugs at the [issue tracker](https://github.com/routexjs/routex-cookies/issues).
