module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/scss/_breakpoint.scss";`
      }
    }
  }
}