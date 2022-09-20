const path = require("path");

module.exports = {
  entry: {
    global: "./js/global.js",
    prayerTime: "./js/prayer-time.js",
    prayerTimings: "./js/prayer-timings.js",
    sunriseTime: "./js/sunrise-time.js",
    timesSetup: "./js/times-setup.js",
    homePage: "./js/home-page.js",
    calenderBox: "./js/calender-box.js",
    calenderPackage: "./js/calender-package.js",
    fasting: "./js/fasting.js",
    visitors: "./js/visitors.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
