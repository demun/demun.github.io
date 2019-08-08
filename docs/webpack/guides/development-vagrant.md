# Development - Vagrant


고급 프로젝트가 있고 Virtual Machine에서 개발 환경을 실행하기 위해 [Vagrant](https://www.vagrantup.com/)를 사용하는 경우 VM에서 webpack을 실행하는 것이 좋습니다.

## Configuring the Project

시작하려면,`Vagrantfile` 에 정적 IP가 있는지 확인하십시오.


```ruby
Vagrant.configure("2") do |config|
  config.vm.network :private_network, ip: "10.10.10.61"
end
```

그런 다음 프로젝트에 webpack 및 webpack-dev-server를 설치하십시오.

```bash
npm install --save-dev webpack webpack-dev-server
```

`webpack.config.js` 파일이 있는지 확인하십시오. 아직 시작하지 않았다면 시작하기위한 최소한의 예제로 사용하십시오.

```js
module.exports = {
  context: __dirname,
  entry: './app.js'
};
```

그리고 `index.html` 파일을 만듭니다. 스크립트 태그는 번들을 가리켜야합니다. config에 `output.filename`이 지정되어 있지 않으면, 이것은 `bundle.js`가 될 것입니다.

```html
<!doctype html>
<html>
  <head>
    <script src="/bundle.js" charset="utf-8"></script>
  </head>
  <body>
    <h2>Heey!</h2>
  </body>
</html>
```

`app.js` 파일도 만들어야 합니다.

## Running the Server

이제 서버를 실행 해 봅시다.

```bash
webpack-dev-server --host 0.0.0.0 --public 10.10.10.61:8080 --watch-poll
```

기본적으로 서버는 localhost에서만 액세스 할 수 있습니다. 
우리는 우리 호스트 PC에서 그것을 액세스 할 것이므로, 이것을 허락하기 위해 `--host` 를 변경할 필요가 있습니다.

webpack-dev-server에는 번들에 스크립트가 포함되어 있습니다. 이 스크립트는 파일 변경시 WebSocket에 연결하여 다시로드합니다.
`--public` 플래그는 스크립트가 WebSocket을 찾을 곳을 알고 있는지 확인합니다.
서버는 기본적으로 포트 `8080`을 사용할 것이므로 여기서도 지정해야합니다.

`--watch-poll`은 webpack이 파일의 변화를 감지 할 수있게합니다.
기본적으로 webpack은 파일 시스템에 의해 트리거 된 이벤트를 수신하지만 VirtualBox에는 이와 관련된 많은 문제가 있습니다.

서버는 `http://10.10.10.61:8080` 에서 접근 가능해야합니다. `app.js`에서 변경을했다면, 다시 로드되어야 합니다.


## Advanced Usage with nginx

더 생산적인 환경을 모방하기 위해 webpack-dev-server를 nginx로 프록시 처리하는 것도 가능합니다.

nginx 설정 파일에 다음을 추가하십시오 :

```nginx
server {
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    error_page 502 @start-webpack-dev-server;
  }

  location @start-webpack-dev-server {
    default_type text/plain;
    return 502 "Please start the webpack-dev-server first.";
  }
}
```

`proxy_set_header` 라인은 웹 소켓이 올바르게 작동하기 때문에 중요합니다.

webpack-dev-server를 시작하기위한 명령은 다음과 같이 바꿀 수 있습니다 :

```bash
webpack-dev-server --public 10.10.10.61 --watch-poll
```

이것은 `127.0.0.1` 에서만 서버에 접근 할 수 있게 합니다. 왜냐하면 nginx가 호스트 PC에서 사용할 수 있도록 하기 때문입니다.

## Conclusion

우리는 정적 IP에서 Vagrant 상자에 액세스 할 수 있게 만든 다음 webpack-dev-server를 공개적으로 액세스 가능하게 만들어 브라우저에서 연결할 수 있게 했습니다. 그런 다음 VirtualBox가 파일 시스템 이벤트를 보내지 않아 서버가 파일 변경 내용을 다시로드하지 못하게하는 일반적인 문제를 해결했습니다.

