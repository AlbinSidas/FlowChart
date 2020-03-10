const path = require('path');

module.exports = {
    entry: './scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },
    resolve: {
        alias: {
          Base:       path.resolve(__dirname,  'scripts/base'),
          Views:      path.resolve(__dirname,  'static/views'),
          Singletons: path.resolve(__dirname,  'scripts/singletons'),
          Styles:     path.resolve(__dirname,  'static/styling'),
          Model:      path.resolve(__dirname,  'scripts/model'),
          Network:    path.resolve(__dirname,  'scripts/network'),
          Scripts:    path.resolve(__dirname,  'scripts/')
        }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ["@babel/plugin-proposal-class-properties", {"loose": true}]
            }
          }
        }
      ],
      rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader', //html loader, url false
            options: {
            interpolate: true,
            },
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
            'file-loader', //resolve-url-loader
          ],
        },
          
        ],
    }

}
