module.exports = {
  database: `mongodb://newspaper:${encodeURIComponent('test@2018')}@ds159187.mlab.com:59187/newspaper`,
}

// encodeURIComponent('<your pass>'), we use this method so we can type any chars in password without error
// we can use that with username if it has chars like @ etc...