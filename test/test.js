'use strict'

const AppStore = require('../index')
const countries = require('../resources/countries')
const genres = require('../resources/genre')
const co = require('co')

const country = countries[0]
const genre = genres[0]

const getChart = async() => {
  const result = await AppStore.topChart.fetch('free', genre.code, country.code)
  console.log(result)
}

const lookup = async() => {
  const result = await AppStore.lookup.fetch(country.code, ['414478124', '333206289'])
  console.log(result)
}

const search = async() => {
  const result = await AppStore.search.fetch(country.frontID, 'free music offline')
  console.log(result)
}

const rating = async() => {
  const result = await AppStore.rating.fetch('414478124')
  console.log(result)
}

const review = async() => {
  const result = await AppStore.review.fetch('414478124', country.frontID, 0, 1000, 4)
  console.log(result)
}

const hint = async() => {
  const result = await AppStore.hint.fetch(country.frontID, 'Wechat')
  console.log(result)
}

const trends = async() => {
  const result = await AppStore.trends.fetch(country.frontID)
  console.log(result)
}

co(function*() {
  yield trends()
})
