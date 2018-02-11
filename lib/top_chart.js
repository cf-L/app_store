'use strict'

const request = require('superagent')
const format = require('util').format
const delay = require('../Util/helpers').delay

const link = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/topChartFragmentData?popId=%s&pageNumbers=%s&pageSize=%s&genreId=%s&cc=%s'

/**
 *
 * @param type: "free" or "pay"
 * @param genreId: genre id, default is all(36)
 * @param countryCode: ignore case. ex: cn
 * @param page: default is 0
 * @param limit: default is 1500
 * @param tryTimes: optional
 * @returns {Promise<*>}
 */
const fetch = async(type, genreId, countryCode, page, limit, tryTimes) => {
  const popId = type === 'free' ? 27 : 30
  const pageNumbers = page || 0
  const pageSize = limit || 1500
  const time = tryTimes || 0
  const genreCode = genreId || 36

  if (time >= 10) {
    return []
  }

  try {
    const url = format(link, popId, pageNumbers, pageSize, genreCode, countryCode)
    console.log(url)
    const res = await request.get(url)
      .set('User-Agent', 'iTunes-iPad/5.1.1 (64GB; dt:28)')
      .timeout(1000 * 30)

    const data = JSON.parse(res.text)
    const chart = data[0] ? (data[0].contentData || []) : []

    if (chart.length === 0 && time < 10) {
      time += 1
      await delay(1000 * 5)
      return await fetch(type, genreId, countryCode, page, limit, time)
    }

    return chart
  } catch (err) {
    console.log(err)
    if (time < 10) {
      await delay(1000 * 5)
      return await fetch(type, genreId, countryCode, page, limit, time)
    }
  }
}

module.exports = {
  fetch
}
