'use strict'

const request = require('superagent')
const format = require('util').format

const link = 'https://itunes.apple.com/%s/customer-reviews/id%s?dataOnly=true&displayable-kind=11'

const fetch = async(countryCode, appId) => {
  const url = format(link, countryCode, appId)

  const res = await request.get(url)
    .set('User-Agent', 'AppStore/2.0 iOS/8.3 model/iPhone5,2 build/12F70 (6; dt:82)')
    .timeout(1000 * 30)

  const result = JSON.parse(res.text)
  return result
}

module.exports = {
  fetch
}
