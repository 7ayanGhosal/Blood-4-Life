const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/emailVerification",
      "/otpVerification",
      "/signup",
      "/login",
      "/resetprofile",
      "/resetPass",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
