const path = require('path');

module.exports = {
    entry: './scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
          Base:  path.resolve(__dirname, 'scripts/base'),
          Views: path.resolve(__dirname, 'static/views')
        }
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'raw-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
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
