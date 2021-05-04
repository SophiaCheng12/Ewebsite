<template>
  <body>
    <div>
      <loading :active.sync="isLoading"> </loading>
      <Navbar :initialCartLength="cartLength" />

      <!-- shopping cart -->
      <div class="d-flex flex-rows shoppingOrder">
        <div>
          <div class="my-5 row justify-content-center">
            <div class="my-5 row justify-content-center scrollbar table100">
              <div class="table100-head">
                <table class="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th width="120">Image</th>
                      <th width="120">Title</th>
                      <th width="120">Quantity</th>
                      <th class="price1">Price</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div class="table100-body">
                <table>
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class="align-middle">
                        <button
                          type="button"
                          class="btn btn-danger btn-sm trashButton"
                          @click="removeCartItem(item.id)"
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>
                        <img
                          :src="item.product.imageUrl"
                          style="height: 60px; width: 60px"
                          alt=""
                          class="image"
                        />
                      </td>
                      <td class="align-middle">
                        <p class="title">
                          {{ item.product.title }}
                        </p>
                      </td>
                      <td class="align-middle">
                        {{ item.qty }}
                      </td>

                      <td class="align-middle text-right">
                        <p class="price">
                          <strong>{{ item.final_total | currency }}元</strong>
                        </p>
                      </td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td></td>
                      <td colspan="3" class="text-right total">總計</td>
                      <td class="text-right total2">
                        <strong>{{ cart.total | currency }}元</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- order -->
        <div class="orderBorder1">
        <div class="orderBorder">
          <div class="order">
            <div class="my-5 row justify-content-center">
              <div class="orderInput">
                <validation-observer v-slot="{ invalid }" class="col-md-6">
                  <form @submit.prevent="createOrder">
                    <validation-provider
                      rules="required|email"
                      v-slot="{ errors, classes }"
                    >
                      <!-- 輸入框 -->

                      <div class="form-group">
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          v-model="form.user.email"
                          class="form-control"
                          :class="classes"
                          placeholder="請輸入Email"
                          style="width: 400px"
                        />

                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>

                    <validation-provider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <!-- 輸入框 -->
                      <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input
                          id="username"
                          type="text"
                          name="name"
                          v-model="form.user.name"
                          class="form-control"
                          :class="classes"
                          placeholder="請輸入姓名"
                          style="width: 400px"
                        />

                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>

                    <validation-provider
                      rules="required|numeric"
                      v-slot="{ errors, classes }"
                    >
                      <!-- 輸入框 -->
                      <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input
                          id="usertel"
                          type="tel"
                          name="tel"
                          v-model="form.user.tel"
                          class="form-control"
                          :class="classes"
                          placeholder="請輸入電話"
                          style="width: 400px"
                        />

                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>

                    <validation-provider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <!-- 輸入框 -->
                      <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input
                          id="useraddress"
                          type="text"
                          name="address"
                          v-model="form.user.address"
                          class="form-control"
                          :class="classes"
                          placeholder="請輸入地址"
                          style="width: 400px"
                        />

                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>

                    <validation-provider v-slot="{ errors, classes }">
                      <!-- 輸入框 -->
                      <div class="form-group">
                        <label for="comment">留言</label>
                        <!-- rules="required" -->
                        <textarea
                          id="comment"
                          type="text"
                          cols="30"
                          rows="5"
                          name="comment"
                          v-model="form.message"
                          class="form-control"
                          :class="classes"
                          style="width: 400px"
                        ></textarea>

                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>

                    <div class="text-right">
                      <button class="btn btn orderButton" :disabled="invalid">
                        <p class="orderButtonText">送出訂單</p>
                      </button>
                    </div>
                  </form>
                </validation-observer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </body>
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
      cart: [],
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      isLoading: false,
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
        vm.isLoading = true;

        const response = await this.$http.get(url);
        // console.log("response2", response.data.data.carts);
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cartLength = vm.cart.carts.length;
      } catch (error) {
        console.log("error", error);
      }
    },

    async removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;

      try {
        const response = await this.$http.delete(url);
        // console.log("removeResponse", response);
        if (response.data.success) {
          Toast.fire({
            icon: "success",
            title: "已刪除商品",
          });
          vm.getCart();
        }
      } catch (error) {
        console.log("error", error);
      }
    },

    async createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      let order = vm.form;

      try {
        const response = await this.$http.post(url, { data: order });
        console.log("訂單已建立", response);
        if (response.data.success) {
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
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
  background-image: url("https://cdn.pixabay.com/photo/2020/11/29/15/06/box-5788021__340.jpg");
  background-repeat: no-repeat;
  background-size: 250%;
  opacity: 0.6;
  background-position-x: -1500px;
  background-position-y: -150px;
  width:100%;
  height:100%;
  background-color:blue;
 }
.scrollbar {
  font-size: 20px;
  width: 500px;
  color: #77aaad;
}
.table100 {
  width: 600px;
  position: relative;
  padding-top: 60px;
  margin-right: 10rem; 
  margin-left: 5rem; 
}
.table100-head {
  position: absolute;
  top: 0;
  left: 0;
}
.table100-body {
   max-height: 500px;
   overflow: auto;
}
.table {
  width: 600px; 
  margin-top: -40px;
  color: #77aaad;
}
.shoppingOrder {
  margin-left: 0px; 
  width:100%;
  height:100%;
}
.price1{
  padding-left:50px;
}
.orderBorder1{
   width:40%;
}
.orderBorder {
   width:100%;
   height:100%;
   background-image: url("https://cdn.pixabay.com/photo/2018/09/06/23/42/hydrangea-3659619__340.jpg");
   overflow: hidden
   }
.order {
  margin-top: 38px;
  margin-left: 100px;
}
.orderInput {
  background-color: #ffeee4;
  max-width: 500px;
  padding-left: 50px;
  margin-left: 10px;
  margin-right: 100px;
  border-radius: 10px;
  margin-top: 15px;
}
.orderButton {
  margin-right: 45px;
  width: 120px;
  background-color: #e85a71;
  border: none;
}
.orderButton:active {
  background-color: #f16b6f;
}
.orderButton:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: none;
}
.orderButtonText {
  color: white;
}
input {
  margin-right: 45px;
}
textarea {
  resize: none;
}
.total {
  /* border:1px solid yellow; */
  width: 200px;
  padding-right: 68px; 
  white-space: nowrap;
}
.total2{
   padding-right:58px;
    width: 300px
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.trashButton {
  margin-right: 280px;
}
.image {
  margin-left: -250px;
  margin-bottom: 5px;
}
.title {
  margin-left: -150px;
}
.price {
  margin-left:24px;
  width: 95px; 
  white-space: nowrap;
  }
.table thead th {
  border-color: #f2e9e1;
}
</style> 