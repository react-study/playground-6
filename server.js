const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');
const port = 8080;

const compiler = webpack(config);

const serverOptions = {
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    stats: {
        chunks: false,
        colors: true,
        hash: false,
        reasons: true,
        timings: true,
        version: false,
        warnings: true
    }
};

const server = new WebpackDevServer(compiler, serverOptions);
server.listen(port, ()=>{
	console.log(`now listening http://localhost:${port}`);
});
