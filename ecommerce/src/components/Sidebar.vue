<template>
  <body>
    <div>
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-2 text-muted"
      >
        <span style="color: white">管理員</span>
        <a class="link-secondary" href="#" aria-label="Add a new report">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/admin/products"
            style="color: white"
          >
            <span data-feather="file-text"></span>

            <i class="fas fa-splotch"></i>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/admin/order_list"
            style="color: white"
          >
            <span data-feather="file-text"></span>

            <i class="fas fa-address-book"></i>
            訂單列表
          </router-link>
        </li>
      </ul>

      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-2 text-muted"
      >
        <span style="color: white">前台頁面</span>
        <a class="link-secondary" href="#" aria-label="Add a new report">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/customer_order"
            style="color: white"
          >
            <span data-feather="file-text"></span>
            <i class="fas fa-couch"></i>
            商品訂購
          </router-link>
        </li>
      </ul>
    </div>

    <div class="signOutRelative">
      <i class="fas fa-sign-out-alt signOutIcom" style="color: white"></i>
      <a href="#" class="nav-link signOut m-2" @click.stop.prevent="signOut()"
        >Sign out</a
      >
    </div>
  </body>
</template>

<script>
export default {
  methods: {
    async signOut() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      try {
        const response = await this.$http.post(api);
        console.log(response);
        const { data } = response;
        if (data.success) {
          vm.$router.push("/login");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>

<style scoped>
body {
  background-image: url("https://cdn.pixabay.com/photo/2020/04/28/19/16/at-home-5106035__340.jpg");
  background-size: 600%;
  background-position-x: -450px;
  background-repeat: no-repeat;
  width: 300px;
}
.signOutRelative {
  position: relative;
  font-size: 18px;
}
.signOutIcom {
  margin-left: 15px;
  margin-top: 100px;
}
.signOut {
  position: absolute;
  bottom: -15px;
  left: 15px;
  color: white;
}
h6 {
  font-size: 16px;
}
li {
  font-size: 18px;
}
</style>