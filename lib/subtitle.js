
const countries = require('../resources/countries')
const search = require('./search')
const lookup = require('./lookup')

const fetch = async(countryCode, appId) => {
  let appInfos = await lookup.fetch(countryCode, [appId])
  let app = appInfos.filter(x => x.trackId == appId)[0]
  if (!app) { return '' }

  let country = countries.filter(x => x.code == countryCode.toUpperCase())[0]
  if (!country) { return '' }

  if (app.trackName && app.artistName && country.frontID) {

    let result = await search.fetch(country.frontID, app.trackName + ' ' + app.artistName)
    if (result['storePlatformData']
      && result['storePlatformData']['native-search-lockup']
      && result['storePlatformData']['native-search-lockup']['results']) {

      let results = result['storePlatformData']['native-search-lockup']['results']
      if (!results[appId]) { return '' }
      return results[appId].subtitle || ''
    }
  }
}

module.exports = {
  fetch
}
