module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^lib/(.*)$": "<rootDir>/src/lib/$1",
    "^root/(.*)$": "<rootDir>/$1"
  }
}
