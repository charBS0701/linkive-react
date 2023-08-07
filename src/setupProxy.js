const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: `http://${process.env.REACT_APP_API_DOMAIN}`,
        changeOrigin: true
    }));
};

// require('dotenv').config();

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         '/api',
//         createProxyMiddleware({
//             target: process.env.REACT_APP_API_DOMAIN,
//             changeOrigin: true,
//             // 추가 설정이 필요한 경우 여기에 작성할 수 있습니다.
//             timeout: 60000 // 60초로 타임아웃 값 설정
//         })
//     );
// };