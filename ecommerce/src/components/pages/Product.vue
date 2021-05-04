<template>
  <div>
    <loading :active.sync="isLoading"> </loading>
    <Navbar :initialCartLength="cartLength" />
    <body>
      <div class="d-flex flex-column align-items-center">
        <div class="d-flex flex-row">
          <div class="categoryImage">
            <div class="m-5 category">
              <span class="badge badge-secondary mr-2">分類 </span
              ><span>{{ product.category }}</span>
            </div>
            <div class="image" style="height: 320px; width: 600px">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  background-size: cover;
                  background-position-y: 60%;
                "
                class="imageContent"
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
              ></div>
            </div>
          </div>

          <div class="titlePrice">
            <div class="card-body">
              <h5 class="card-title">
                <strong
                  ><p href="#" class="text-dark">
                    {{ product.title }}
                  </p></strong
                >
              </h5>
             
               
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="text-secondary" style="font-size: 18px">
                  Price: {{ product.price }}元
                </div>
              </div>

             <div>
                <p class="card-text productContent ">{{ product.content }}</p> 
             </div>


              <!-- select -->
              <div class="selectRelative">
                <select
                  name=""
                  id=""
                  class="form-control mt-3 select"
                  v-model="num"
                >
                  <option :value="num" v-for="num in 10" :key="num">
                    {{ num }}{{ product.unit }}
                  </option>
                </select>
              </div>
            </div>

            <div class="card-footer d-flex">
              <div
                class="text-secondary text-nowrap mr-3"
                style="font-size: 18px"
              >
                <strong>小計</strong
                ><strong>{{ num * product.price }}元</strong>
              </div>

              <button
                type="button"
                class="btn btn btn-sm ml-auto addCartButton"
                @click="addtoCart(product.id, num)"
                :disabled="status.loadingItem === product.id"
              >
                <i
                  class="fas fa-spinner fa-spin icon"
                  v-if="status.loadingItem === product.id"
                ></i>
                <p class="addCart">加到購物車</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import { Toast } from "../../utility/sweetalert.js";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
      cart: [],
      num: 1,
      status: {
        loadingItem: "",
      },
      isLoading: false,
      cartLength: 0,
    };
  },

  created() {
    const { id } = this.$route.params;
    this.getProduct(id);
    this.getCart();
  },

  methods: {
    async getProduct(productId) {
      console.log("productId", productId);
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${productId}`;
      try {
        vm.isLoading = true;
        const response = await this.$http.get(url);
        vm.product = response.data.product;
        vm.isLoading = false;
        // console.log("product", response);
      } catch (error) {
        console.log("error", error);
      }
    },

    async getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      try {
        const response = await this.$http.get(url);

        console.log("response2", response);

        vm.cart = response.data.data;
        vm.cartLength = vm.cart.carts.length;
      } catch (error) {
        console("error", error);
      }
    },

    async addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      try {
        vm.status.loadingItem = id;
        const cart = {
          product_id: id,
          qty,
        };
        const response = await this.$http.post(url, { data: cart });
        console.log("addtocart", response);

        vm.status.loadingItem = "";

        if (response.data.success) {
          Toast.fire({
            icon: "success",
            title: "已加入購物車",
          });

          vm.$router.back(-1);
        }
        vm.getCart();
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>



<style scoped>
body {
  background-image: url("https://cdn.pixabay.com/photo/2017/09/07/19/46/soap-2726394__340.jpg");
  background-repeat: no-repeat;
  background-size: 150%;
  margin-top: 10px;
  padding-bottom: 10px;
  height: 100%;
  width: 100%;
  }
.categoryImage {
  margin-bottom: 20px;
  position: relative;
}
.titlePrice {
  border: 1px solid #fffff5;
  margin-top: 92px;
  height: 320px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
}

.category {
  font-size: 23px;
  position: absolute;
  top: 5px;
  left: -46px;
}
.image {
  margin-top: 92px;
  border: 1px solid #fffff5;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.7;
}
.productContent{
  width:100%;
  height:80px;
  /* border:1px solid red; */
  margin-top:50px;
  font-size:18px;
  color: gray;
}
.selectRelative {
  position: relative;
}
.select {
  position: absolute;
  top: -10px;
  left:0px;
}
.card-footer {
  margin-top: 40px;
}
.addCartButton {
  background-color: #eb9f9f;
  border: none;
  position: relative;
  width: 100px;
}
.addCartButton:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: none;
}
.addCartButton:active {
  background-color: #f16b6f;
}
.addCart {
  color: white;
  width: 100%;
  height: 100%;
}
.icon {
  position: absolute;
  left: 0px;
  top: 9px;
  color: gray;
}
</style>
