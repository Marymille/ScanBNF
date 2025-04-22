module.exports = {

    publicPath: process.env.NODE_ENV === 'production'

      ? '/web/cesr/BNF-Scan'

      : '/',

    pwa: {

      name: 'BNF-Scan',

      themeColor: '#990000',

      msTileColor: '#000000'

    }

  }