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

!!! warning
    Node.js 런타임 및 로더에 대한 부트 오버 헤드가 있으므로 너무 많은 작업자를 사용하지 마십시오. 작업자와 주 프로세스 간의 모듈 전송을 최소화하십시오. IPC는 비쌉니다.



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

webpack은 크기 및로드 성능을 위해 출력을 최적화하기위한 추가 알고리즘 작업을 수행합니다. 이러한 최적화는 더 작은 코드베이스에서는 성능이 좋지만 큰 코드베이스에서는 비용이 많이들 수 있습니다.

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


webpack에는 출력 번들에 경로 정보를 생성하는 기능이 있습니다. 그러나 이렇게하면 수천 개의 모듈이 번들되는 프로젝트에 가비지 수집 압력이 가해집니다. `options.output.pathinfo` 설정에서 이것을 끄십시오 :

```js
module.exports = {
  // ...
  output: {
    pathinfo: false
  }
};
```

### Node.js Version

최신 안정 버전의 Node.js와 ES2015 `Map` 및 `Set` 구현에는 [performance regression](https://github.com/nodejs/node/issues/19769)가 있습니다. 
수정 사항이 마스터에 병합되었지만 릴리스가 아직 작성되지 않았습니다.
그 동안 증분 빌드 속도를 최대한 활용하려면 버전 8.9.x를 고수하십시오 (8.9.10 - 9.11.1 사이에 문제가 있음). 
webpack은 ES2015 데이터 구조를 자유롭게 사용하여 초기 빌드 시간을 향상시킵니다.

### TypeScript Loader

최근에 `ts-loader` 는 내부 TypeScript 감시(watch) 모드 API를 사용하기 시작하여 각 반복에서 재 빌드 될 모듈의 수를 크게 줄였습니다.
이 `experimentalWatchApi` 는 일반적인 TypeScript watch 모드와 동일한 로직을 공유하며 개발용으로 매우 안정적입니다.
더욱 빠른 증분 빌드를 위해서는 `transpileOnly` 도 활성화하십시오.

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

주의 : `ts-loader` 문서는 `cache-loader` 의 사용을 제안합니다, 그러나 이것은 실제로 디스크 쓰기로 점진적 빌드를 느리게 만듭니다.

다시 typechecking을 하려면 [`ForkTsCheckerWebpackPlugin`](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin).

ts-loader github 저장소에는 [전체 예제](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin)가 있습니다.


---


## Production

The following steps are especially useful in _production_.
다음 단계는 _production_ 환경에서 특히 유용합니다.


!!! warning
    __작은 성능 향상을 위해 응용 프로그램의 품질을 희생하지 마십시오!__ 최적화 품질은 대부분의 경우 빌드 성능보다 더 중요합니다.


### Multiple Compilations

여러 컴파일을 사용할 때 다음 도구가 도움이 될 수 있습니다.

- [`parallel-webpack`](https://github.com/trivago/parallel-webpack): 작업자 풀에서 컴파일 할 수 있습니다.
- `cache-loader`: 캐시는 여러 컴파일간에 공유 할 수 있습니다.


### Source Maps


소스 맵은 실제로 비용이 많이 듭니다. 당신은 정말로 그것을 필요로합니까?

---


## Specific Tooling Issues

다음 도구는 빌드 성능을 저하시킬 수있는 특정 문제가 있습니다.


### Babel

- Minimize the number of preset/plugins


### TypeScript

- `fork-ts-checker-webpack-plugin`을 사용하여 별도의 프로세스에서 형식 검사를 수행하십시오.
- 형식 확인을 건너 뛰도록 로더를 구성하십시오.
- `ts-loader` 에서 `happyPackMode: true` / `transpileOnly: true` 를 사용하세요.


### Sass

- `node-sass`는 Node.js 스레드 풀에서 스레드를 차단하는 버그가 있습니다. `thread-loader`와 함께 사용할 경우 `workerParallelJobs : 2` 로 설정한다.
