<template>
  <div>
    <div>
      <nav class="navbar navbar-white bg-white" style="height: 180px">
        <div class="brand">
          <div class="d-flex flex-column align-items-center">
            <div>
              <router-link to="/about"
                ><h2 class="title animate__animated animate__zoomIn">Jewelry Box</h2></router-link
              >
            </div>
            <div class="d-flex flex-row info">
              <router-link to="/about">
                <P class="mt-4 about" style="color: #c5c6b6"
                  >ABOUT</P
                ></router-link
              >

              <a
                href="#"
                class="mt-4 products"
                style="color: #c5c6b6"
                @click.stop.prevent="showPagination(true)"
              >
                PRODUCTS
              </a>

              <router-link to="/shopping_cart"
                ><p class="mt-4 shopping" style="color: #c5c6b6">
                  SHOPPING CART
                </p></router-link
              >

              <div class="length" v-if="cartLength > 0">
                {{ cartLength }}
              </div>
            </div>
          </div>
        </div>

        <ul class="navbar-nav signOutAll">
          <li class="nav-item text-nowrap d-flex flex-row">
            <router-link to="/login" class="nav-link signOut m-2"
              >Jewelry box後台</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialCartLength: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      isRouterLink: true,
      cart: [],
      cartLength: 0,
    };
  },

  created() {
    this.getCart();
  },

  methods: {
    getCart() {
      this.cartLength = this.initialCartLength;
    },

    showPagination(boolean) {
      this.$emit("after-showPagination", boolean);
    },
  },

  watch: {
    initialCartLength() {
      this.cartLength = this.initialCartLength;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.brand {
  margin: 0 auto;
  width:100%
}
.title {
  margin-top: 20px;
  letter-spacing: 15px;
  font-size: 35px;
  color: black;
  margin: 0 auto;
}

.info {
  /* border: 1px solid red; */
  margin-top: 35px;
  letter-spacing: 5px;
  margin-left: -38px;
  font-size: 20px;
  color: black;
}
.about {
  padding-right: 80px;
  margin: 0 auto;
}
.products {
  padding-right: 80px;
  margin: 0 auto;
}
.shopping {
  margin: 0 auto;
}
.signOutAll {
  margin-top: -150px;
  position:relative;
}
.signOut {
  cursor: pointer;
  color: #c5c6b6;
  font-size: 16px;
  position:absolute;
  right:0;
  top:-15px;
}
.length {
  height: 30px;
  width: 30px;
  text-align: center;
  border: 1px solid #fec9c9;
  background-color: #fec9c9;
  color: white;
  border-radius: 50%;
  font-size: 15px;
  padding-left: 5px;
  padding-top: 3px;
}
</style> 
