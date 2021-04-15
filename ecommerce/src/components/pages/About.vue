<template>
  <body>
    <div>
      <loading :active.sync="isLoading"></loading>
      <Navbar :initialcart="cart.carts" />

      <div>
        <img
          src="https://images.unsplash.com/photo-1503351107055-43fe50b5d4fa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTN8fGpld2Vscnl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
          style="height: 450px"
          class="majorImg"
        />
      </div>
      <div class="about">
        <p class="text">
          誕生於2021年的Jewelry Box<br /><span class="text2"
            >將珠寶帶入生活</span
          ><br /><span class="text3">風情萬種</span><br /><span class="text4"
            >千變萬化</span
          ><br /><span class="text5">如同幸運的種子</span><br /><span
            class="text6"
            >魅力無限</span
          >
        </p>
      </div>
      <div class="popular">
        <p class="popular2">本月精品</p>
      </div>

      <div>
        <swiper :options="swiperOption" ref="mySwiper" v-if="data.length > 1">
          <!--用v-if控制loop環狀輪播，否則不起作用-->
          <!-- <div class="swiper-button-prev">=></div>
        <div class="swiper-button-next"></div> -->

          <swiper-slide
            v-for="(item, index) in data"
            :index="index"
            :key="item.index"
            class="swiper_box"
          >
            <div class="image">
              <img
                :src="item.imageUrl"
                style="width: 200px; height: 200px"
                class="image2 swiper-slide"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <Footer class="footer" />
    </div>
  </body>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";

export default {
  name: "About",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      cart: [],
      swiperOption: {
        initialSlide: 0,

        direction: "horizontal",
        // autoplay: {
        //   delay: 2000,
        //   disableOnInteraction: false,
        // },
        autoplay: 2500,
        grabCursor: true,
        loop: true,
        slidesPerView: "auto",
        // loopedSlides: 3,
        // loopAdditionalSlides: 0,
        //一個螢幕展示的數量
        slidesPerView: 6,
        disableOnInteraction: false,

        //修改swiper自己或子元素時，自動初始化swiper
        observer: true,
        //修改swiper的父元素時，自動初始化swiper
        observeParents: true,
      },
      isLoading: false,
      data: [],
      isPagination: true,
    };
  },

  created() {
    this.getData();
    this.getCart();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },

  methods: {
    getData() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.data = response.data.products;
        vm.isLoading = false;
      });
    },

    handleAfterShowPagination(boolean) {
      console.log(boolean);
      this.isPagination = boolean;
      this.getProducts();
    },

    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        console.log("response", response);
        // console.log("response2", response.data.data.carts);
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
  },
};
</script>


<style scoped>
body {
  background-color: #f2e9e1;
}
.majorImg {
  opacity: 0.6;
}

.about {
  width: 100%;
  height: 500px;
  background-color: #f2e9e1;
  display: flex;
  justify-content: center;
}
.text {
  margin-top: 60px;
  line-height: 65px;
  letter-spacing: 15px;
  font-size: 18px;
}
.text2 {
  margin-left: 150px;
}
.text3 {
  margin-left: 200px;
}
.text4 {
  margin-left: 200px;
}
.text5 {
  margin-left: 150px;
}
.text6 {
  margin-left: 200px;
}
.popular {
  background-color: #f2e9e1;
  /* margin-top: 500px; */
}
.popular2 {
  margin-left: 30px;
  font-size: 20px;
}
.popular2:before {
  content: "\2606";
}
.popular2:after {
  content: "\2606";
}
.image {
  display: flex;
  justify-content: space-evenly;
  background-color: #f2e9e1;
  padding-top: 20px;
  margin-bottom: 80px;
}
.image2 {
  border-radius: 10px;
  margin-bottom: 20px;
  transition: 0.9s;
  opacity: 1;
  background-color: #f2e9e1;
  border: 1px solid #f2e9e1;
}
.image2:hover {
  opacity: 0.6;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
}
</style>

