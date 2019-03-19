'use strict'

const xmlJS = require('xml2js')
const hintRequest = require('./hint')
const delay = require('../Util/helpers').delay

const fetchHints = async(frontId, word, times) => {
  try {
    const response = await hintRequest.fetch(frontId, word.toLowerCase())
    const json = await xmlParser(response.text)
    const validate = xmlValidate(json)
    const hints = jsonParser(json)

    return hints
  } catch (error) {
    if (times < 5) {
      await delay(500)
      return await fetchHints(countryCode, word, times + 1)
    } else {
      return []
    }
  }
}

const xmlValidate = (json) => {
  if (json.plist && json.plist.dict) {
    const dict = json.plist.dict[0]
    if (dict && dict.array && dict.array[0] && dict.array[0].dict) {
      return true
    }
  }
  return false
}

const xmlParser = (text) => {
  return new Promise((resolve, reject) => {
    xmlJS.parseString(text, function(err, result) {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const jsonParser = (json) => {
  const result = []
  const array = json.plist.dict[0].array[0].dict

  for (const dict of array) {
    const hint = { text: '', priority: 0 }

    if (dict.string && dict.string[0]) {
      hint.text = dict.string[0]
    }

    if (dict.integer) {
      hint.priority = dict.integer[0] || 0
    }

    result.push(hint)
  }
  return result
}

const all = async(frontId, word) => {
  const hints = await fetchHints(frontId, word)
  return hints
}

const single = async(frontId, word) => {
  const hints = await fetchHints(frontId, word)
  const hint = hints.filter(x => x.text.toLowerCase() === word.toLowerCase())[0]
  return hint || { text: word, priority: 0 }
}

module.exports = {
  all,
  single
}
