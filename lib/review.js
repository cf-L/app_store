'use strict'

const request = require('superagent')
const format = require('util').format

const link = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/userReviewsRow?id=%s&displayable-kind=11&startIndex=%s&endIndex=%s&sort=%s'

/**
 *
 * @param appId
 * @param frontId
 * @param startIndex
 * @param endIndex
 * @param sort: Number 1~4: 1:Most helpful, 2: highest rating, 3:lowest rating, 4:Newly published
 * @returns {Promise<void>}
 */
const fetch = async(appId, frontId, startIndex, endIndex, sort) => {

  const url = format(link, appId, startIndex, endIndex, sort)

  const res = await request.get(url)
    .set('X-Apple-Store-Front', frontId)
    .set('User-Agent', 'AppStore/2.0 iOS/8.3 model/iPhone5,2 build/12F70 (6; dt:82)')

  return JSON.parse(res.text).userReviewList || []
}

module.exports = {
  fetch
}
