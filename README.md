# App Store Api

[![npm version](https://img.shields.io/npm/v/app_store_crawler.svg?style=flat-square)](https://www.npmjs.com/package/app_store_crawler)
[![Build Status](https://travis-ci.org/cf-L/app_store.svg?branch=master)](https://travis-ci.org/cf-L/app_store)

### Description

Some Api from App Store



### Installation

```shell
$ npm install app_store_crawler --save
```



### Demo

##### Review

```javascript
const AppStore = require('app_store_crawler')
const co = require('co')
const countries = require('../resources/countries')

const review = async() => {
  const result = await AppStore.review.fetch('414478124', country.frontID, 0, 1000, 4)
  console.log(result)
}

co(function*() {
  yield review()
})
```



### Api

##### Hint

```javascript
AppStore.hint.fetch(frontId, keyword)
```



##### lookup

```javascript
AppStore.lookup.fetch(countryCode, appIds)
```



##### rating

```javascript
AppStore.rating.fetch(appId)
```



##### review

```javascript
AppStore.review.fetch(appId, frontId, startIndex, endIndex, sort)
```

> About sort: A number, 1~4(1:Most helpful, 2: highest rating, 3:lowest rating, 4:Newly published)



##### search

```javascript
AppStore.search.fetch(frontId, keyword)
```



##### top chart

```javascript
AppStore.topChart.fetch(type, genreCode, countryCode)
```

> About type: 'free' or 'pay'



##### trends

```javascript
AppStore.trends.fetch(frontId)
```

#### subtitle

```javascript
AppStore.subtitle.fetch(countryCode, appId)
```

#### app version hisotry

```javascript
AppStore.version.fetch(appId, frontId)
```


