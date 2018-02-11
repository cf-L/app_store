var _ = require('underscore')

const delay = async(interval) => {
    await timeout(interval)
}

function timeout(interval) {
  return new Promise((resole) => {
    setTimeout(resole, interval)
  })
}

module.exports = {
  delay
}
