'use strict'

const request = require('superagent')
const format = require('util').format

const link = 'https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints?clientApplication=Software&term=%s'

/**
 * app store search bar dropdown list
 * @param frontId
 * @param keyword
 * @returns {Promise<*>}
 */
const fetch = async(frontId, keyword) => {
  const url = format(link, encodeURIComponent(keyword))

  try {
    return await request.get(url)
      .set('X-Apple-Store-Front', frontId)
      .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Safari/602.1.50')
  } catch(err) {
    throw err
  }
}

module.exports = {
  fetch
}
