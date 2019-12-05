module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://vue-course-api.hexschool.io', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathrewrite: {
                    '^/api': '^/api'
                }
            },
        },
        "port": 8888,
    },
    publicPath: './',
}