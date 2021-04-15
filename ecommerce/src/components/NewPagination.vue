<template>
  <!-- pagination -->
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getPagination(current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ active: current_page === page }"
      >
        <a class="page-link" href="#" @click.prevent="getPagination(page)">{{
          page
        }}</a>
      </li>

      <li class="page-item" :class="{ disabled: !has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getPagination(current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    initialPagination: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      pagination: {},
      category: "",
      current_page: 1,
      has_next: "",
      has_pre: "",
    };
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
    this.pagination = this.initialPagination;
  },

  methods: {
    async getPagination(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      try {
        const response = await this.$http.get(api);
        console.log("getPagination", response);
        this.category = response.data.pagination.category;
        this.current_page = response.data.pagination.current_page;
        this.has_next = response.data.pagination.has_next;
        this.has_pre = response.data.pagination.has_pre;
        this.$emit("after-pagination", response.data.products);
      } catch (error) {
        console.log("error", error);
      }
    },
  },

  watch: {
    initialPagination(newValue) {
      this.pagination = {
        ...this.pagination,
        ...newValue,
      };
    },
  },
};
</script>

<style scoped>
.pagination > li > a {
  background-color: white;
  color: #c5c6b6;
}

.pagination > li > a > span {
  background-color: white;
  color: #c5c6b6;
}

.pagination > .active > a {
  color: white;
  background-color: #c5c6b6;
  border: solid 1px #c5c6b6;
}
</style>