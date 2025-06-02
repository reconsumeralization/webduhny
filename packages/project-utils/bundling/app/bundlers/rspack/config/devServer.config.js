"use strict";

const fs = require("fs");

module.exports = function ({ host, port, https, allowedHost, paths }) {
    let server = {};
    if (https) {
        server = {
            type: "https",
            options: {
                requestCert: false
            }
        };
    }
    return {
        host,
        port,
        compress: true,
        static: {
            directory: paths.appPublic,
            watch: true
        },
        open: true,
        hot: true,
        webSocketServer: "ws",
        devMiddleware: {
            publicPath: "/"
        },
        ...server,
        client: {
            overlay: true,
            logging: "warn",
            progress: true
        },
        historyApiFallback: {
            disableDotRule: true
        },
        allowedHosts: allowedHost ? [allowedHost] : undefined,
        setupMiddlewares: (middlewares, devServer) => {
            return [
                ...middlewares,
                () => {
                    const { app } = devServer;
                    if (fs.existsSync(paths.proxySetup)) {
                        // This registers user provided middleware for proxy reasons
                        require(paths.proxySetup)(app);
                    }
                }
            ];
        }
    };
};
