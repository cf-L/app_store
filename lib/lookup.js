'use strict'

const format = require('util').format
const request = require('superagent')
const _ = require('underscore')
const delay = require('../Util/helpers').delay

const lookupUrl = 'https://itunes.apple.com/lookup?country=%s&id=%s'

/**
 * Look up apps info
 * @param countryCode
 * @param appIds: Array of appId
 * @returns {Promise<{}>}
 */
const fetch = async(countryCode, appIds) => {
  const batch = Math.min(appIds.length, 200)
  let appInfos = {}
  for (let i = 0; i < appIds.length; i += batch) {
    const batchIds = appIds.slice(i, batch + i)
    const apps = await batchFetch(countryCode, batchIds)
    appInfos = _.extend(appInfos, apps)
    await delay(1000 * 2)
  }
  return appInfos
}

const batchFetch = async(countryCode, appIds, times) => {
  let tryTimes = times || 0
  const id = appIds.join(',')
  const url = format(lookupUrl, countryCode, id)

  try {
    const res = await request.get(url).timeout(1000 * 60)
    return JSON.parse(res.text).results || []
  } catch (err) {
    if (tryTimes < 10) {
      await delay(1000 * 10)
      tryTimes += 1
      return await batchFetch(countryCode, appIds, tryTimes)
    } else {
      return []
    }
  }
}

module.exports = {
  fetch
}
