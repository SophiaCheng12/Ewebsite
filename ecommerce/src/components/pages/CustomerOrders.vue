
<template>
  <div>
    <loading :active.sync="isLoading"> </loading>

    <CustomerNavbar
      @after-showPagination="handleAfterShowPagination"
      :initialCartLength="cartLength"
    />

    <!-- nav-pills -->
    <body>
      <div class="container">
        <div class="row">
          <main>
            <ul class="nav nav-pills mb-4 mt-5">
              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="category('all')">
                  全部
                </a>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="category('寶石')"
                  >寶石
                </a>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="category('黃金')"
                  >黃金</a
                >
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="category('鑽石')"
                  >鑽石</a
                >
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="category('珍珠')"
                  >珍珠</a
                >
              </li>
            </ul>

            <!-- /nav-pills -->

            <!-- card -->
            <div class="row mt-4 products">
              <div
                class="col-md-2 mb-4 product"
                v-for="item in products"
                :key="item.id"
              >
                <div class="card border-0">
                  <div
                    style="
                      height: 550px;
                      background-size: cover;
                      background-position: center;
                    "
                    class="image"
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  ></div>

                  <div class="card-body">
                    <div class="itemCategory">
                      <span class="badge badge-dark mr-2 mb-2">分類 </span
                      ><span>{{ item.category }}</span>
                    </div>
                    <h5 class="card-title">
                      <p class="text-dark">{{ item.title }}</p>
                    </h5>
                   
                    <div
                      class="d-flex justify-content-between align-items-baseline priceRelative"
                    >
                      <div class="h5 price">{{ item.price }}元</div>
                    </div>
                  </div>
                  <div class="card-footer d-flex cardFooter">
                    <button type="button" class="btn btn btn-sm checkButton">
                      <router-link
                        :to="{ name: 'Product', params: { id: item.id } }"
                      >
                        <p class="checkMore">查看更多</p>
                      </router-link>
                    </button>

                    <button
                      type="button"
                      class="btn btn- btn-sm ml-auto addCartButton"
                      @click="addtoCart(item.id)"
                      :disabled="status.loadingItem === item.id"
                    >
                      <i
                        v-if="status.loadingItem === item.id"
                        class="fas fa-spinner fa-spin icon"
                        style="font-size: 1px"
                      ></i>

                      <p class="addCart">加到購物車</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-row justify-content-center pagination">
              <Pagination
                :initialPagination="pagination"
                @after-pagination="handleAfterPagination"
                v-if="isPagination"
              />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </body>
  </div>
</template> 

<script>
import Pagination from "../../components/NewPagination.vue";
import CustomerNavbar from "../../components/CustomerNavbar.vue";
import Footer from "../../components/Footer.vue";
import { Toast } from "../../utility/sweetalert.js";

export default {
  components: {
    CustomerNavbar,
    Pagination,
    Footer,
  },
  props: {
    initialCartLength: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      products: [],
      cart: [],
      newcart: {},
      product: {},
      pagination: {},

      status: {
        loadingItem: "",
      },
      isLoading: false,
      isPagination: true,
      cartLength: 0,

      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },

  created() {
    this.getProducts();
    this.getCart();
    this.getAllProducts();
  },

  methods: {
    async getProducts(page = 1) {
      const vm = this;

      try {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
        vm.isLoading = true;
        const response = await this.$http.get(url);
        vm.products = response.data.products;
        // console.log(response.data.products);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      } catch (error) {
        console.log("error", error);
      }
    },

    async getAllProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      try {
        const response = await this.$http.get(url);
        vm.allProducts = response.data.products;

        // console.log("allProducts", response);
        // vm.isLoading = false;
      } catch (error) {
        console, log("error", error);
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
        console.log(response.data);
        vm.status.loadingItem = "";

        if (response.data.success) {
          Toast.fire({
            icon: "success",
            title: "已加入購物車",
          });
        }
        vm.getCart();
      } catch (error) {
        console.log("error", error);
      }
    },

    async getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      try {
        const response = await this.$http.get(url);
        console.log("getCartresponse", response);
        // console.log("response2", response.data.data.carts);
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cartLength = vm.cart.carts.length;
        console.log(vm.cart);
      } catch (error) {
        console.log("error", error);
      }
    },

    handleAfterPagination(data) {
      this.products = data;

      console.log("data", data);
    },

    category(item) {
      if (item === "寶石") {
        this.category2 = this.allProducts.filter((product) => {
          return product.category === "寶石";
        });

        this.products = this.category2;
        this.isPagination = false;
        console.log(this.category2);
      } else if (item === "黃金") {
        console.log(item);
        this.category3 = this.allProducts.filter((product) => {
          return product.category === "黃金";
        });
        this.products = this.category3;
        this.isPagination = false;
        console.log(this.category3);
      } else if (item === "鑽石") {
        console.log(item);
        this.category4 = this.allProducts.filter((product) => {
          return product.category === "鑽石";
        });
        this.products = this.category4;
        this.isPagination = false;
        console.log(this.category4);
      } else if (item === "珍珠") {
        console.log(item);
        this.category5 = this.allProducts.filter((product) => {
          return product.category === "珍珠";
        });
        this.products = this.category5;
        this.isPagination = false;
        console.log(this.category5);
      } else if (item === "all") {
        console.log(item);

        this.products = this.allProducts;
        this.isPagination = false;
        console.log(this.allProducts);
      }
    },

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
  background-image: url("https://cdn.pixabay.com/photo/2016/12/23/07/58/holiday-table-1926946__340.jpg");
  background-repeat: repeat;
  background-size: 1500px;
  opacity: 0.9;
}
.nav-pills {
  display: flex;
  align-items: center;
  margin-left: 12px;
}
.nav-pills .nav-link {
  margin-right: 20px;
  margin-bottom: 7px;
  padding: 5px 10px 3px;
  color: #5e5e5f;
  border: 2px solid #8c9184;
  margin-bottom: 2rem;
  margin-top: 100px;
}
.nav-link:hover {
  background-color: #f0e5de;
}
.products {
  margin-left: -16px;
}
.product {
  height: 100%;
  margin-right: 96px;
}
.card {
  border: 1px solid red;
  border-radius: 20px;
  width: 250px;
  height: 350px;
  transition: all 1s ease-out;
  position: relative;
  margin-bottom: 20px;
  margin-top: 10px;
}
.card:hover::before {
  content: "\2665";
  color: #ef5285;
  position: absolute;
  right: 30px;
  top: 20px;
  font-size: 40px;
 } 
.image {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: all 0.6s;
  opacity: 1;
}
.image:hover {
  opacity: 0.5;
}
/* .cardText {
  height: 30px;
  max-height: 30px;
  overflow: auto;
} */
.itemCategory {
  margin-top: -10px;
}
.priceRelative {
  position: relative;
}
.price {
  position: absolute;
  right: 10px;
  top: -35px;
}
.checkButton {
  border: 1px solid #eb9f9f;
  background-color: #eb9f9f;
}
.checkButton:active {
  background-color: #f16b6f;
}
.checkButton:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: none;
}
.checkMore {
  color: white;
}
.addCartButton {
  border: none;
  background-color: #eb9f9f;
  position: relative;
  height: 35px;
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
  height: 100%;
  width: 100%;
  position: absolute;
  top: 5px;
  left: 1px;
}
.cardFooter {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 60px;
  width: 100%;
}
.icon {
  position: absolute;
  left: 0px;
  top: 9px;
  color: gray;
}
.pagination {
  margin-top: 60px;
  margin-bottom: 30px;
  margin-left: -35px;
}
</style>