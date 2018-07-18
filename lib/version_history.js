'use strict'

const request = require('superagent')
const format = require('util').format

const link = 'https://itunes.apple.com/app/id%s?mt=8'

const fetch = async(appId, frontId) => {
  try {
    const url = format(link, appId)

    const res = await request.get(url)
      .set('X-Apple-Store-Front', frontId || '143441-1,26')
      .set('User-Agent', 'iTunes-iPad/5.1.1 (64GB; dt:28)')
      .timeout(1000 * 30)

    const json = JSON.parse(res.text)
    return json.pageData.versionHistory || []

  } catch(err) {
    throw err
  }
}

module.exports = {
  fetch
}
