'use strict'

const request = require('superagent')
const format = require('util').format

const userAgents = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Safari/602.1.50',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:50.0) Gecko/20100101 Firefox/50.0'
];

const link = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?clientApplication=Software&term=%s'

/**
 *
 * @param frontId
 * @param keyword
 * @returns {Promise<any>}
 */
const fetch = async(frontId, keyword) => {
  try {
    const url = format(link, encodeURIComponent(keyword))

    const res = await request.get(url)
      .set('X-Apple-Store-Front', frontId)
      .set('User-Agent', userAgents[Math.ceil(Math.random()*userAgents.length - 1)])
      .timeout(1000 * 30)

    return JSON.parse(res.text)
  } catch(err) {
    throw err
  }
}

module.exports = {
  fetch
}
