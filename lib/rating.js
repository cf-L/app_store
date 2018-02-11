'use strict'

const request = require('superagent')
const format = require('util').format

const link = 'https://itunes.apple.com/cn/customer-reviews/id%s?dataOnly=true&displayable-kind=11'

const fetch = async(appId) => {
  const url = format(link, appId)

  const res = await request.get(url)
    .set('User-Agent', 'AppStore/2.0 iOS/8.3 model/iPhone5,2 build/12F70 (6; dt:82)')
    .timeout(1000 * 30)

  const result = JSON.parse(res.text)
  const rating = {
    'ratingCount': 0,
    'five': 0,
    'four': 0,
    'three': 0,
    'two': 0,
    'one': 0,
  }

  rating.ratingCount = result.ratingCount || 0
  const ratingList = result.ratingCountList

  if (ratingList) {
    rating.five = ratingList[4] || 0
    rating.four = ratingList[3] || 0
    rating.three = ratingList[2] || 0
    rating.two = ratingList[1] || 0
    rating.one = ratingList[0] || 0
  }
  return rating
}

module.exports = {
  fetch
}
