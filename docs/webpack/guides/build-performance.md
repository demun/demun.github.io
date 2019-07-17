# Build Performance

이 가이드에는 빌드/컴파일 성능을 향상시키는 데 유용한 팁이 포함되어 있습니다.

---

## General

[development](/guides/development) 또는 [production](/guides/production)에서 빌드 스크립트를 실행하든 관계없이 다음 모범 사례가 도움이됩니다.


### Stay Up to Date

최신 webpack 버전을 사용하십시오. 우리는 항상 성능을 개선하고 있습니다. webpack의 최신 안정 버전은 다음과 같습니다:

[![latest webpack version](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)


__Node.js__ 를 최신 상태로 유지하면 성능 향상에 도움이 될 수 있습니다. 또한 패키지 관리자 (예: `npm` 또는`yarn`)를 최신으로 유지하면 도움이됩니다. 최신 버전은 보다 효율적인 모듈 트리를 생성하고 해결 속도를 향상시킵니다.


### Loaders

최소한 필요한 모듈 수에 로더를 적용하십시오. 대신에:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
```

`include` 필드를 사용하여 실제로 변환해야하는 로더 모듈만 적용하십시오:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      }
    ]
  }
};
```


### Bootstrap

각각의 추가 로더/플러그인에는 부팅 시간이 있다. 가능한 한 적은 수의 도구를 사용하도록 노력하십시오.


### Resolving

다음 단계를 통해 해결 속도를 높일 수 있습니다.

- `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles` 항목의 수를 최소화하십시오. 파일 시스템 호출 수가 증가하므로 항목의 수를 최소화 하십시오.
- 심볼 링크 (예 :`npm link` 또는`yarn link`)를 사용하지 않으면 `resolve.symlinks: false`를 설정하십시오.
- 사용자 정의 해결 플러그인을 사용하는 경우 상황에 따라 달라지지 않는 `resolve.cacheWithContext: false`를 설정하십시오.



### Dlls


덜 자주 변경되는 코드를 별도의 컴파일로 이동하려면 `DllPlugin` 을 사용한다. 이렇게 하면 빌드 프로세스의 복잡성은 증가하지만 애플리케이션의 컴파일 속도가 향상된다.


### Smaller = Faster

컴파일 전체 크기를 줄여서 빌드 성능을 높이십시오. 덩어리를 작게 유지하도록 노력하세요.

- 더 적은 수/더 작은 라이브러리 사용
- 다중 페이지 애플리케이션에서 `SplitChunksPlugin` 사용
- 다중 페이지 애플리케이션의 `async` 모드에서 `SplitChunksPlugin`을 사용하십시오.
- 미사용 코드 제거
- 현재 개발 중인 코드 부분만 컴파일한다.



### Worker Pool

`thread-loader`는 고가의 로더를 작업자 풀로 옮기는 데 사용할 수 있습니다.

W> Node.js 런타임 및 로더에 대한 부트 오버 헤드가 있으므로 너무 많은 작업자를 사용하지 마십시오. 작업자와 주 프로세스 간의 모듈 전송을 최소화하십시오. IPC는 비쌉니다.



### Persistent cache

`cache-loader`를 사용하여 영구 캐싱을 활성화 하십시오. `package.json`의` `"postinstall"` 에 캐시 디렉토리를 지우십시오.


### Custom plugins/loaders


여기에서 성능 문제를 일으키지 않도록 프로파일 하십시오.

---


## Development

다음 단계는 _development_ 에서 특히 유용합니다.


### Incremental Builds

webpack의 watch 모드를 사용하십시오. 다른 도구를 사용하여 파일을 보고 webpack을 호출하지 마십시오. 내장 watch 모드는 타임 스탬프를 추적하고 캐시 무효화를 위해 이 정보를 컴파일에 전달합니다.

일부 설정에서는 감시가 폴링 모드로 돌아갑니다. 감시된 파일이 많으면 많은 CPU 로드가 발생할 수 있습니다. 이러한 경우 `watchOptions.poll`을 사용하여 폴링 간격을 늘릴 수 있습니다.



### Compile in Memory

다음 유틸리티는 디스크에 쓰는 것이 아니라 메모리에서 자산을 컴파일하고 제공하여 성능을 향상시킵니다:

- `webpack-dev-server`
- `webpack-hot-middleware`
- `webpack-dev-middleware`

### stats.toJson speed

webpack 4는 기본적으로 `stats.toJson()`을 사용하여 많은 양의 데이터를 출력합니다. 증분 단계에서 필요하지 않으면 `stats` 객체의 일부를 검색하지 마십시오. v3.1.3 이후의 `webpack-dev-server` 에는 증분 빌드 단계마다 `stats` 오브젝트로부터 검색된 데이터의 양을 최소화 하기위한 실질적인 성능 수정이 포함되어 있습니다.



### Devtool

다른 `devtool` 설정의 성능 차이에 유의하십시오.

- `"eval"` 은 최고의 성능을 가지고 있지만, 변환된 코드에 대해서는 도움이 되지 않습니다.
- 조금 낮은 매핑 품질로 할 수 있다면 `cheap-source-map` 변종이 더 효과적 입니다.
- 증분 빌드에는 `eval-source-map` 변형을 사용하십시오.


=> 대부분의 경우 `cheap-module-eval-source-map`이 최선의 선택입니다.


### Avoid Production Specific Tooling


특정 유틸리티, 플러그인 및 로더는 프로덕션용으로 빌드 할 때만 의미가 있습니다. 예를 들어 개발 과정에서 `TerserPlugin` 을 사용하여 코드를 축소하고 맹글링하는 것은 일반적으로 의미가 없습니다. 이러한 도구는 일반적으로 개발시 제외해야 합니다.



- `TerserPlugin`
- `ExtractTextPlugin`
- `[hash]`/`[chunkhash]`
- `AggressiveSplittingPlugin`
- `AggressiveMergingPlugin`
- `ModuleConcatenationPlugin`


### Minimal Entry Chunk

webpack은 업데이트 된 청크만 파일 시스템에 방출합니다. 몇몇 설정 옵션들  (HMR, `[name]`/`[chunkhash]` in `output.chunkFilename`, `[hash]`)에 대해 변경된 청크와 함께 엔트리 청크는 무효화됩니다.

입력 덩어리를 작게 유지하여 방출 할 수 있는지 확인하십시오. 다음 코드 블록은 _다른 모든 청크가 있는 런타임만 포함하는 청크를 자식_ 으로 추출합니다:

```js
new CommonsChunkPlugin({
  name: 'manifest',
  minChunks: Infinity
});
```

### Avoid Extra Optimization Steps

webpack does extra algorithmic work to optimize the output for size and load performance. These optimizations are performant for smaller codebases, but can be costly in larger ones:

```js
module.exports = {
  // ...
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  }
};
```

### Output Without Path Info

webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules. Turn this off in the `options.output.pathinfo` setting:

```js
module.exports = {
  // ...
  output: {
    pathinfo: false
  }
};
```

### Node.js Version

There has been a [performance regression](https://github.com/nodejs/node/issues/19769) in the latest stable versions of Node.js and its ES2015 `Map` and `Set` implementations. A fix has been merged into master, but a release has yet to be made. In the meantime, to get the most out of incremental build speeds, try to stick with version 8.9.x (the problem exists between 8.9.10 - 9.11.1). webpack has moved to using those ES2015 data structures liberally, and it will improve the initial build times as well.

### TypeScript Loader

Recently, `ts-loader` has started to consume the internal TypeScript watch mode APIs which dramatically decreases the number of modules to be rebuilt on each iteration. This `experimentalWatchApi` shares the same logic as the normal TypeScript watch mode itself and is quite stable for development use. Turn on `transpileOnly`, as well, for even faster incremental builds.

```js
module.exports = {
  // ...
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        experimentalWatchApi: true,
      },
    },
  ],
};
```

Note: the `ts-loader` documentation suggests the use of `cache-loader`, but this actually slows the incremental builds down with disk writes.

To gain typechecking again, use the [`ForkTsCheckerWebpackPlugin`](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin).

There is a [full example](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin) on the ts-loader github repository.

---


## Production

The following steps are especially useful in _production_.

W> __Don't sacrifice the quality of your application for small performance gains!__ Keep in mind that optimization quality is, in most cases, more important than build performance.


### Multiple Compilations

When using multiple compilations, the following tools can help:

- [`parallel-webpack`](https://github.com/trivago/parallel-webpack): It allows for compilation in a worker pool.
- `cache-loader`: The cache can be shared between multiple compilations.


### Source Maps

Source maps are really expensive. Do you really need them?

---


## Specific Tooling Issues

The following tools have certain problems that can degrade build performance:


### Babel

- Minimize the number of preset/plugins


### TypeScript

- Use the `fork-ts-checker-webpack-plugin` for typechecking in a separate process.
- Configure loaders to skip typechecking.
- Use the `ts-loader` in `happyPackMode: true` / `transpileOnly: true`.


### Sass

- `node-sass` has a bug which blocks threads from the Node.js thread pool. When using it with the `thread-loader` set `workerParallelJobs: 2`.
