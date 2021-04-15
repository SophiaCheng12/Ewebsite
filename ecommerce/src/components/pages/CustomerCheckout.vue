<template>
  <div class="my-5 row">
    <loading :active.sync="isLoading"> </loading>
    <div class="background">
      <form class="checkOuts" @submit.prevent="payOrder">
        <div class="d-flex flex-row">
          <div class="itemTable table100">
            <div class="table100-head">
              <table class="table">
                <thead>
                  <tr>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div class="table100-body">
              <table>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">
                      <p class="qty">{{ item.qty }}</p>
                    </td>

                    <td class="align-middle text-right">
                      <p class="total">{{ item.final_total }}</p>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">{{ order.total }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div class="infoTable">
            <table class="table">
              <tbody>
                <tr>
                  <th width="100">Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th width="200" class="tel">收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-right" v-if="order.is_paid === false">
              <button class="btn btn checkButton" :disabled="isLoading">
                <p class="checkButtonText">確認付款</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {},
      },
      isLoading: false,
    };
  },

  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();
  },

  methods: {
    async getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      try {
        vm.isLoading = true;
        const response = await this.$http.get(url);
        // console.log("getOrderResponse", response);
        vm.order = response.data.order;
        vm.isLoading = false;
      } catch (error) {
        console.log("error", error);
      }
    },

    async payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      try {
        vm.isLoading = true;
        const response = await this.$http.post(url);
        console.log("payOrderResponse", response);
        if (response.data.success) {
          vm.getOrder();
          vm.isLoading = false;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>

<style scoped>
.background {
  background-image: url("https://cdn.pixabay.com/photo/2021/02/26/11/20/wood-digital-paper-6051495__340.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 450px;
  opacity: 0.8;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.1);
}
.table100 {
  position: relative;
  padding-top: 60px;
}
.table100-head {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.table100-body {
  max-height: 200px;
  overflow: auto;
}
.checkOuts {
  margin-left: 12rem;
  width: 800px;
  margin-top: 45px;
  margin-right: 35px;
  background-color: #fffcf0;
  opacity: 0.5;
  max-height: 300px;
}
.itemTable {
  width: 390px;
  font-size: 18px;
  white-space: nowrap;
}
.infoTable {
  display: block;
  margin-left: 3rem;
  width: 250px;
  font-size: 18px;
  white-space: nowrap;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.checkButton {
  margin-right: -90px;
  margin-top: -120px;
  background-color: #e85a71;
  border: none;
}
.checkButton:active {
  background-color: #f16b6f;
}
.checkButton:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: none;
}
.checkButtonText {
  color: white;
}
.qty {
  margin-left: 80px;
}
.total {
  margin-left: 100px;
}
</style>