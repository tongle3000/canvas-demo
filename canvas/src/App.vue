<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/wave">Wave(波浪)</router-link> |
    <router-link to="/wave2">Wave2(波浪)</router-link> |
    <router-link to="/dot-line">点线</router-link> |
    <router-link to="/tianti-yundong">天体运动</router-link> |
    <router-link to="/firstxyz">第一个</router-link> |
    <router-link to="/01">01</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
