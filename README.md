# App Store Api

### Description

Some Api from App Store



### Demo

##### Review

```javascript
const AppStore = require('app_store')
const co = require('co')
const countries = require('../resources/countries')

const review = async() => {
  const result = await AppStore.review.fetch('414478124', country.frontID, 0, 1000, 4)
  console.log(result)
}

co(function*() {
  yield trends()
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

```java
AppStore.topChart.fetch(type, genreCode, countryCode)
```

> About type: 'free' or 'pay'



##### trends

```javascript
AppStore.trends.fetch(frontId)
```



