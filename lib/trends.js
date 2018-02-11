'use strict'

const request = require('superagent')
const format = require('util').format

const link = 'https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/trends?maxCount=%s'

const fetch = async(frontId, count) => {
  try {
    const maxCount = count || 100

    const url = format(link, maxCount)
    const res = await request.get(url)
      .set('X-Apple-Store-Front', frontId)
      .set('User-Agent', 'AppStore/2.0 iOS/8.3 model/iPhone5,2 build/12F70 (6; dt:82)')

    return JSON.parse(res.text)
  } catch(err) {
    throw err
  }
}

module.exports = {
  fetch
}

