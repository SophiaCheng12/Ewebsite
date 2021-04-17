<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button class="btn btn buildProductButton" @click="openModal(true)">
        建立新產品
      </button>
    </div>
    <div class="tableForm">
      <div class="tableBorder">
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="60"><p class="category">分類</p></th>
              <th width="100">產品名稱</th>
              <th width="100">售價</th>
              <th width="80">是否啟用</th>
              <th width="60">編輯</th>
              <th width="60">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>
                <p class="categoryTd">{{ item.category }}</p>
              </td>
              <td>{{ item.title }}</td>

              <td>{{ item.price | currency }}元</td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal(false, item)"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="deleteModal(item)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Pagination
      :initialPagination="pagination"
      @after-pagination="handleAfterPagination"
      class="pagination"
    />

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header text-white modalHeader">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i class="far fa-image"></i>
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                    style="height: 45px"
                  />
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
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
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--delete Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header text-white modalHeader">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
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
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
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
              @click="deleteProduct()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import $ from "jquery";

import Pagination from "../../components/NewPagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      pagination: {},
      status: {
        fileUploading: false,
      },
    };
  },

  created() {
    this.getProducts();
  },

  methods: {
    //參數設定預設值是1
    async getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      const vm = this;
      try {
        vm.isLoading = true;
        const response = await this.$http.get(api);
        // console.log("getProductsResponse", response);
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      } catch (error) {
        console.log("error", error);
      }
    },

    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },

    async updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      try {
        let httpMethod = "post";
        const vm = this;
        if (!vm.isNew) {
          api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
          httpMethod = "put";
        }

        const response = await this.$http[httpMethod](api, {
          data: vm.tempProduct,
        });
        // console.log("updateProductResponse", response);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("無法新增");
        }
      } catch (error) {
        console.log("error", error);
      }
    },

    deleteModal(item) {
      $("#delProductModal").modal("show");
      this.tempProduct = Object.assign({}, item);
    },

    async deleteProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      try {
        const response = await this.$http.delete(api);
        console.log("deleteProductResponse", response);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#delProductModal").modal("hide");
          vm.getProducts();
          console.log("無法刪除");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    async uploadFile() {
      console.log(this);
      try {
        const uploadedFile = this.$refs.files.files[0];
        const vm = this;
        vm.status.fileUploading = true;
        const formData = new FormData();
        formData.append("file-to-upload", uploadedFile);
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
        const response = await this.$http.post(url, formData, {
          // 把表單形式改成formData
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // console.log("uploadFile", response.data);
        vm.status.fileUploading = false;
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          // console.log("tempProduct", vm.tempProduct);
        } else {
          if (response.data.message === "檔案格式錯誤") {
            this.$bus.$emit(
              "message:push",

              `${response.data.message} , 請替換一個新的檔案`,
              "warning"
            );
          } else {
            this.$bus.$emit(
              "message:push",

              `${response.data.message} , 請稍後再試`,
              "warning"
            );
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    },

    handleAfterPagination(data) {
      this.products = data;
      console.log("data", data);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  height: 100%;
}
.tableForm {
  margin-left: 50px;
}
.tableBorder {
  /* border: 1px solid red; */
  min-height: 600px;
}
th,
td {
  font-size: 20px;
}
.buildProductButton {
  margin-right: 10px;
  margin-top: 0px;
  background-color: #fec9c9;
  border: none;
  color: white;
  opacity: 1;
  text-decoration: none;
}
/* #f0e5de*/
.buildProductButton:hover {
  opacity: 0.6;
}
.buildProductButton:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: none;
}
.category {
  margin-left: 90px;
}
.categoryTd {
  margin-left: 90px;
}
.pagination {
  margin-top: 100px;
  margin-left: 430px;
  margin-bottom: 20px;
}

.modalHeader {
  background-color: #fadad8;
}
.close {
  color: white;
}
.modalBody {
  background-color: #fffcf0;
}
.modalFooter {
  background-color: #fffcf0;
}
.checkButton {
  background-color: #c5c6b6;
  border: none;
  color: white;
  text-decoration: none;
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
.modalTitle {
  background-color: #fadad8;
}
textarea {
  resize: none;
}
</style>