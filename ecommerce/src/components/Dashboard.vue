<template>
  <div>
    <Alert />
    <body>
      <div class="container-fluid">
        <div class="row">
          <Sidebar />
          <main class="col-lg-9 col-md-8 col-sm-6">
            <router-view />
          </main>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Alert from "./AlertMessage.vue";

export default {
  components: {
    Sidebar,
    Alert,
  },

  created() {
    //把token從cookie裡取出
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log("myCookie", myCookie);
    //把cookie往後端傳送
    //所有發出去的請求預設都會加入myCookie
    this.$http.defaults.headers.common.Authorization = myCookie;
  },

  methods: {
    handleAfterShowPagination(boolean) {
      console.log(boolean);
      this.isPagination = boolean;
      this.getProducts();
    },
  },
};
</script>

<style scoped>
body {
  background-color: white;
  width: 100%;
}
</style>