[![Twitter](https://img.shields.io/badge/twitter-@qq393464140-blue.svg)](http://twitter.com/qq393464140)

# quick-start
source of https://micro-app.github.io.

# One more thing

#### #referrer
Collection some information from the referrer page and save in `window.name`.

```js
let referrer = {};
try {
    referrer = JSON.parse(decodeURIComponent(window.name.replace(/^micro-app=/, '')));
} catch (e) {
    /* some code */
}
```

#### #referrer.app
> referrer.app : Object

Collection the app information.

Base64 icon will not be saved in `referrer.app.icon`.

* referrer.app.name : String
* referrer.app.link : Url
* referrer.app.icon : Url

#### #referrer.type
> referrer.type : String

The applicationCache event type which is triggered.

#### #referrer.version
> referrer.version : String

The version of referrer page.

#### #referrer.timeStamp
> referrer.timeStamp : Number

The moment at the referrer page prepare to redirect.

#### #referrer.lastUpdate
> referrer.lastUpdate : Number

The lastUpdate timeStamp of referrer page.

#### #referrer.timing
> referrer.timing : Object

The `performance.timing` of referrer page.

## License

MIT
