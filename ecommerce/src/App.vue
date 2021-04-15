<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
@import "./assets/all.scss";
/** CSS reset  **/
body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
  // font-family: "Noto Sans TC", sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0px;
  padding: 0px;
}

ul,
ol,
li {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
a,
a:hover,
a:focus {
  text-decoration: none;
}
img {
  width: 100%;
  height: 100%;
  display: block;
}
// .btn,
// button,
// button:focus,
// input:focus,
// textarea:focus,
// select,
// select:focus,
// a:focus {
//   outline: 0px !important;
// }
// button {
//   background-color: transparent;
//   border: 0;
//   cursor: pointer;
// }
// button[disabled] {
//   pointer-events: none;
// }

input {
  padding: 0;
}

input:required {
  box-shadow: none;
}

input:invalid {
  box-shadow: none;
}
</style>
