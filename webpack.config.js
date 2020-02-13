const path = require('path');

module.exports = {
    entry: './scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
          Base:       path.resolve(__dirname, 'scripts/base'),
          Views:      path.resolve(__dirname, 'static/views'),
          Singletons: path.resolve(__dirname, 'scripts/singletons'),
          Styles:     path.resolve(__dirname, 'static/styling')
        }
    },
    module: {
      
      rules: [
        {
          test: /\.html$/i,
          loader: 'raw-loader', //html loader, url false
        },
        {
          test: /\.css$/i,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          }],
        },
        {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader',
         ],
       },
        
      ],
    }

}
