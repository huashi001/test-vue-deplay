const Mock = require('mockjs');

module.exports = {
  'GET /api/user': function(req, res) {
    res.send(Mock.mock({
      'list|10': [{
        name: '@name',
        city: '@city',
        age: '@integer(10, 100)'
      }]
    }))
  },
}