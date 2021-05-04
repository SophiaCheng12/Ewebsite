<template>
  <div>
    <Navbar :initialCartLength="cartLength" />

    <Alert />
    <body>
      <div class="container">
        <div class="row">
          <main>
            <router-view />
          </main>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Alert from "./AlertMessage.vue";

export default {
  components: {
    Navbar,
    Alert,
  },

  data() {
    return {
      cart: [],
      cartLength: 0,
    };
  },

  created() {
    this.getCart();
  },

  methods: {
    async getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      try {
        const response = await this.$http.get(url);

        // console.log("response2", response);
        vm.cart = response.data.data;
        vm.cartLength = vm.cart.carts.length;
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>

<style scoped>
body {
  background-image: url("https://cdn.pixabay.com/photo/2021/02/26/11/20/wood-digital-paper-6051495__340.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  /* max-height: 445px; */
  height: 100%;
  overflow: hidden;
}
</style>

