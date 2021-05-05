<template>
  <div class="orderList">
    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4 tableForm">
      <div class="tableBorder">
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="30" class="time">購買時間</th>
              <th width="120"><p class="client">購買人</p></th>
              <th width="10" class="tel">電話</th>
              <th width="10" class="email">Email</th>
              <th width="110">
                <p class="item">購買款項</p>
              </th>
              <th width="180" class="money">應付金額</th>
              <th width="210" class="pay">是否付款</th>
              <th width="" class="edit">編輯</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.create_at | formatTime }}</td>
              <td>{{ order.user.name }}</td>
              <td>{{ order.user.tel }}</td>
              <td>{{ order.user.email }}</td>
              <div class="productBorder">
                <div style="max-height: 60px; overflow: auto">
                  <td
                    width="180"
                    class="title"
                    v-for="product in order.products"
                    :key="product.id"
                  >
                    <p
                      :class="{
                        titleLength: Object.keys(order.products).length > 1,
                      }"
                    >
                      {{ product.product.title }}
                      數量:{{ product.qty }}
                    </p>
                  </td>
                </div>
              </div>
              <td class="totalMoney">{{ order.total | currency }}元</td>
              <td>
                <span class="text-success" v-if="order.is_paid"> 已付款</span>
                <span v-else>未付款</span>
              </td>
              <td>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="
                    openModal(
                      order.user,
                      order,
                      order.total,
                      order.id,
                      order.products
                    )
                  "
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          :initialPagination="pagination"
          @after-pagination="handleAfterPagination"
          class="pagination"
        />
      </div>

      <!-- Modal -->

      <div
        class="modal fade"
        id="orderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header text-white modalHeader">
              <h5 class="modal-title" id="example ModalLabel">
                <span>編輯訂單</span>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body modalBody">
              <div class="row">
                <div>
                  <div>
                    <div class="form-row">
                      <div class="nameRelative mt-4">
                        <label for="name" class="name">購買人</label>
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          v-model="orderList.user.name"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="form-group">
                        <div>
                          <label for="tel" class="mb-5 telText">電話</label>
                          <input
                            type="number"
                            class="form-control"
                            id="tel"
                            v-model="orderList.user.tel"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="form-row">
                      <div class="form-group">
                        <label for="email" class="emailText">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          v-model="orderList.user.email"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group moneyRelative">
                  <label for="money" class="moneyText">應付金額</label>
                  <input
                    type="text"
                    ss
                    class="form-control mt-1"
                    id="money"
                    v-model="orderList.total"
                  />
                </div>
              </div>

              <div class="modal-footer modalFooter">
                <button
                  type="button"
                  class="btn btn-outline cancelButton"
                  data-dismiss="modal"
                >
                  取消
                </button>
                <button
                  type="button"
                  class="btn btn checkButton"
                  @click="updateOrder(orderList.id)"
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../../components/OrderListPagination.vue";
export default {
  components: {
    Pagination,
  },

  data() {
    return {
      isLoading: false,
      orders: [],
      orderList: { user: {} },
      pagination: {},
    };
  },

  created() {
    this.getOrders();
  },

  methods: {
    async getOrders(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      try {
        vm.isLoading = true;

        const response = await this.$http.get(api);
        console.log("getOrders", response);
        const { data } = response;
        vm.orders = data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      } catch (error) {
        console.log("error", error);
      }
    },

    openModal(orderUser, order, orderTotal, orderId, orderProducts) {
      $("#orderModal").modal("show");
      this.orderList = Object.assign(
        {},
        orderUser,
        order,
        orderTotal,
        orderId,
        orderProducts
      );
    },

    async updateOrder(orderListId) {
      const vm = this;

      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${orderListId}`;
      try {
        const response = await this.$http.put(api, { data: vm.orderList });
        console.log("updateOrder", response);
        if (response.data.success) {
          $("#orderModal").modal("hide");
          vm.getOrders();
        } else {
          $("#orderModal").modal("hide");
          vm.getOrders();
          console.log("無法編輯");
        }
        console.log(response);
      } catch (error) {
        console.log("error", error);
      }
    },

    handleAfterPagination(data) {
      this.orders = data;
      console.log("data", data);
    },
  },

  filters: {
    formatTime(num) {
      const dates = new Date(num * 1000);

      const year = dates.getFullYear();
      const month = dates.getMonth() + 1;
      const date = dates.getDate();
      const hours = dates.getHours();
      const minutes = dates.getMinutes();
      const seconds = dates.getSeconds();
      return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>


<style scoped>
.orderList{
  margin: 0 auto;
}
.tableForm {
  margin-left: 4.37rem; 
  padding-top: 35px;
}
.tableBorder {
  min-height: 800px;
}
table {
 width:100%;
}
.productBorder {
  border-top: 2px solid #9baec8;
}
.titleLength {
  border-top: 1px solid transparent;
}
.titleLength:before {
  content: "\2661";
  color: #ee6e9f;
}
th,
td {
  font-size: 16px;
}
.title {
  display: flex;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.time {
  white-space: nowrap;
}
.client {
  /* border: 1px solid red; */
  padding-left: 10px;
  white-space: nowrap;
}
.tel {
  padding-right: 35px;
  white-space: nowrap;
}
.email {
  padding-right: 65px;
  white-space: nowrap;
}
.item {
  padding-right: 50px;
  white-space: nowrap;
}
.money {
  padding-left: 30px;
  white-space: nowrap;
}
.totalMoney {
  white-space: nowrap;
}
.pay {
  white-space: nowrap;
}
.edit {
  padding-right: 20px;
  white-space: nowrap;
}
[type="text"],
[type="number"],
[type="email"] {
  width: 500px;
  margin-left: 200px;
  margin-bottom: 20px;
}
label {
  margin-right: 440px;
}
.timeRelative {
  position: relative;
}
.timeText {
  position: absolute;
  left: 204px;
  top: -20px;
}
.nameRelative {
  position: relative;
}
.name {
  position: absolute;
  left: 205px;
  top: -20px;
}

#tel {
  margin-top: -50px;
}
.telText {
  margin-right: 470px;
}
#email {
  margin-top: -10px;
  margin-left: 205px;
}
.emailText {
  margin-right: 462px;
}
#item {
  margin-top: 6px;
}
.itemRelative {
  position: relative;
}
.itemText {
  position: absolute;
  left: 204px;
  top: -20px;
}
.moneyRelative {
  position: relative;
}
.moneyText {
  position: absolute;
  left: 204px;
  top: -20px;
}
#money {
  margin-top: 40px;
}
.modalHeader {
  background-color: #fadad8;
}
.close {
  color: white;
}
.modalBody {
  border-radius: 0px;
  background-color: #fffcf0;
}
.checkButton {
  background-color: #c5c6b6;
  border: none;
  color: white;
  text-decoration: none;
  cursor: pointer;
}
.checkButton:active {
  background-color: #f0e5de;
}
.checkButton:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: none;
}
.cancelButton {
  color: #c5c6b6;
  border-color: #c5c6b6;
}
.cancelButton:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: none;
}
.pagination {
  margin-top: 90px;
  margin-bottom: 20px;
  margin-left: 390px;
}
</style>