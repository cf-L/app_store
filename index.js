'use strict'

const topChart = require('./lib/top_chart')
const lookup = require('./lib/lookup')
const search = require('./lib/search')
const rating = require('./lib/rating')
const review = require('./lib/review')
const hint = require('./lib/hint')
const trends = require('./lib/trends')
const subtitle = require('./lib/subtitle')
const version = require('./lib/version_history')
const priority = require('./lib/priority')

module.exports = {
  topChart,
  lookup,
  search,
  rating,
  review,
  hint,
  trends,
  subtitle,
  version,
  priority
}
