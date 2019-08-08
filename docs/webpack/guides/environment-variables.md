# Environment Variables

`webpack.config.js`에서 [development](/guides/development)와 [production builds](/guides/production) 사이의 모호성을 없애기 위해 환경 변수를 사용할 수 있습니다.

!!! tip
    webpack의 환경 변수는 `bash` 및 `CMD.exe` 와 같은 운영체제 쉘의 [environment variables](https://en.wikipedia.org/wiki/Environment_variable)와는 다릅니다


webpack 명령 행 [environment option](/api/cli/#environment-options) `--env`를 사용하면 원하는 만큼의 환경 변수를 전달할 수 있습니다.
환경 변수는 `webpack.config.js`에서 액세스 할 수 있게 됩니다.
예를 들어, `--env.production` 또는 `--env.NODE_ENV=local` (`NODE_ENV`는 일반적으로 환경 타입을 정의하는데 사용됩니다. [here](https://dzone.com/articles/what-you-should-know-about-node-env))




```bash
webpack --env.NODE_ENV=local --env.production --progress
```

!!! tip
    할당하지 않고 `env` 변수를 설정하면 `--env.production`은 기본적으로 `--env.production` 을 `true` 로 설정합니다. 사용할 수있는 다른 구문도 있습니다. 자세한 내용은 [webpack CLI](/api/cli/#environment-options) 설명서를 참조하십시오.


웹팩 설정에 한 가지 변경 사항이 있습니다. 일반적으로, `module.exports`는 설정 객체를 가리킵니다. `env` 변수를 사용하려면 `module.exports`를 함수로 변환해야합니다:


__webpack.config.js__

``` js
const path = require('path');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
};
```

<br>
