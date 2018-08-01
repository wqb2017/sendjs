# sendjs

sendjs is a request library

## Browser support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 9+ ✔ |

## install

npm install sendjs --save

## import

import sendjs from 'sendjs';

## Example

* get methods sendjs.get(url,data,config).then().then().catch()

```js
sendjs
  .get('/user', {
    age: 23
  })
  .then(function(response) {
    // handle success
    console.log(response);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(function() {
    // always executed
  });
```

* post methods sendjs.post(url,data,config).then().then().catch()

```js
sendjs
  .post('/user', {
    age: 23
  })
  .then(function(response) {
    // handle success
    console.log(response);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(function() {
    // always executed
  });
```

* ajax methods sendjs.ajax(url,data,config).then().then().catch()

```js
sendjs
  .ajax({
    data: {},
    //request type【post，get】
    type: 'get',
    async: true,
    //request server address
    baseUrl: '',
    //request header
    header: {
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  })
  .then(function(response) {
    // handle success
    console.log(response);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(function() {
    // always executed
  });
```

* default params set

```js
sendjs.create({
  data: {},
  //request type【post，get】
  type: 'get',
  async: true,
  //request server address
  baseUrl: '',
  //request header
  header: {
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
});
```

## sendjs API or Request method aliases

* sendjs.create({...config...})
* sendjs.get(url,data,config)
* sendjs.post(url,data,config)
* sendjs.ajax({...config...})
* sendjs.downClient(url,data,config)
* sendjs.upClient(url,data,config)

## Request Config
```js
  //default request params
  data: {},
  //request type【post，get】
  type: 'get',
  async:true,
  //request server address
  baseUrl: '',
  //request header
  header: {
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  },
```

## License

MIT
