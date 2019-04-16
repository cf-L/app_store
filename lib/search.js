'use strict'

const request = require('superagent')
const format = require('util').format
const delay = require('../Util/helpers').delay
const genres = require('../resources/genre')

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

const top10GenreIds = async(frontId, word, times) => {
  try {
    const json = await fetch(frontId, word)
    let results = []

    if (json.storePlatformData
      && json.storePlatformData['native-search-lockup']
      && json.storePlatformData['native-search-lockup'].results) {

      const apps = json.storePlatformData['native-search-lockup'].results

      for (const appId in apps) {
        const app = apps[appId]
        if (app && app.genres && Array.isArray(app.genres)) {
          results = results.concat(app.genres.map(x => x.genreId))
        }
      }
    }

    return results
  } catch (error) {
    console.log('app store search error: ', error.message)
    if ((times || 0) < 5) {
      await delay(500)
      return await top10GenreIds(frontId, word, (times || 0) + 1)
    } else {
      return []
    }
  }
}

const top10Genre = async(frontId, word, times) => {
  try {
    const genreIds = await top10GenreIds(frontId, word)
    return genreIds
      .map(x => genres.filter(y => y.code === x)[0])
      .filter(x => x !== undefined)
  } catch (error) {
    throw error
  }
}

const possibleGenres = async(frontId, word, times) => {
  try {
    let genreIds = await top10GenreIds(frontId, word)
    genreIds = Array.from(new Set(genreIds))
    return genreIds
      .map(x => genres.filter(y => y.code === x)[0])
      .filter(x => x !== undefined)
  } catch (error) {
    throw error
  }
}

const rankings = async(frontId, word, appIds, times) => {
  try {

    const json = await fetch(frontId, word)
    if (json.pageData && json.pageData.bubbles) {

      const bubbles = json.pageData.bubbles[0] || {}

      const results = {}
      appIds.forEach(x => results[x] = 0)

      if (bubbles.results) {
        bubbles.results.forEach((item, index) => {
          appIds.forEach(appId => {
            if (item.id === appId && !item[appId]) {
              results[appId] = index + 1
            }
          })
        })
      }

      return {
        results,
        count: bubbles.totalCount || 0
      }

    } else {
      return {
        results: appIds.map(x => {
          const obj = {}
          obj[x] = 0
          return obj
        }),
        count: 0
      }
    }

  } catch (error) {
    if ((times || 0) < 5) {
      await delay(500)
      return await rankings(frontId, word, appIds, (times || 0) + 1)
    } else {
      return {
        results: appIds.map(x => {
          const obj = {}
          obj[x] = 0
          return obj
        }),
        count: 0
      }
    }
  }
}

module.exports = {
  fetch,
  rankings,
  top10Genre,
  possibleGenres
}
