# Entry Points

[Getting Started](/guides/getting-started/#using-a-configuration)에서 언급한 바와 같이 웹팩 구성에서 `entry` 속성을 정의하는 방법은 여러 가지가 있다. 
우리는 귀하에게 유용할 수 있는 이유를 설명하는 것 외에 귀하에게 '`entry` 속성을 구성할 수 있는 방법을 보여 줄 것이다.

## Single Entry (Shorthand) Syntax

Usage: `entry: string|Array<string>`

__webpack.config.js__

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

The single entry syntax for the `entry` property is a shorthand for:

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

T> __What happens when you pass an array to `entry`?__ Passing an array of file paths to the `entry` property creates what is known as a __"multi-main entry"__. This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".

This is a great choice when you are looking to quickly setup a webpack configuration for an application or tool with one entry point (i.e. a library). However, there is not much flexibility in extending or scaling your configuration with this syntax.


## Object Syntax

Usage: `entry: {[entryChunkName: string]: string|Array<string>}`

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};
```

The object syntax is more verbose. However, this is the most scalable way of defining entry/entries in your application.

T> __"Scalable webpack configurations"__ are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target, and runtime. They are then merged using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).


## Scenarios

Below is a list of entry configurations and their real-world use cases:

### Separate App and Vendor Entries

T> In webpack version < 4 it was common to add vendors as separate entrypoint to compile it as separate file (in combination with the `CommonsChunkPlugin`). <br><br> This is discouraged in webpack 4. Instead the `optimization.splitChunks` option takes care of separating vendors and app modules and creating a separate file. __Do not__ create a entry for vendors or other stuff which is not the starting point of execution.

### Multi Page Application

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

__What does this do?__ We are telling webpack that we would like 3 separate dependency graphs (like the above example).

__Why?__ In a multi-page application, the server is going to fetch a new HTML document for you. The page reloads this new document and assets are redownloaded. However, this gives us the unique opportunity to do multiple things:

- Use `optimization.splitChunks` to create bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the amount of entry points increase.

T> As a rule of thumb: Use exactly one entry point for each HTML document.
