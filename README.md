# Routex Cookies [![npm](https://img.shields.io/npm/v/@routex/cookies.svg)](https://www.npmjs.com/package/@routex/cookies) [![Travis CI](https://img.shields.io/travis/com/Cretezy/routex-cookies.svg)](https://travis-ci.com/Cretezy/routex-cookies) [![Codecov](https://img.shields.io/codecov/c/github/Cretezy/routex-cookies.svg)](https://codecov.io/gh/Cretezy/routex-cookies) [![Greenkeeper badge](https://badges.greenkeeper.io/Cretezy/routex-cookies.svg)](https://greenkeeper.io/)

Cookies for [Routex](https://routex.netlify.com).

[Documentation](https://routex.netlify.com/docs/packages/cookies) - [GitHub](https://github.com/Cretezy/routex-cookies)

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

app.get("/", ctx => {
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

Please file feature requests and bugs at the [issue tracker](https://github.com/Cretezy/routex-cookies/issues).
