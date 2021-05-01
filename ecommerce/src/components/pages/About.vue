<template>
  <body>
    <div>
      <loading :active.sync="isLoading"></loading>
      <Navbar :initialCartLength="cartLength" />

      <div style="height: 450px; width: 1348px">
        <div
          style="
            height: 100%;
            width: 100%;
            background-size: cover;
            background-position-y: 60%;
          "
          class="majorImg"
        ></div>
        
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
            <router-link :to="{ name: 'Product', params: { id: item.id } }">
              <div class="image" style="width: 190px; height: 190px">
                <img
                  :src="item.imageUrl"
                  style="width: 170px; height: 170px"
                  class="image2 swiper-slide"
                />
              </div>
            </router-link>
            <!-- :click="productPage(item.id)" -->
          </swiper-slide>
        </swiper>
      </div>

     <div v-for="data in datas" :key="data.index">
     <div>{{data.title}}</div>
     <div style="height:150px;width:150px">
     <!-- <img src="../../img/design1.png" alt="" 
       /> -->
       <img :src="data.img" alt="" />
     </div>
     </div>
<!-- 
 <div>製作蠟模</div>
     <div style="height:150px;width:150px">
     <img src="../../img/engraving.png" alt="" 
       />
     </div>

     <div>加工</div>
     <div style="height:150px;width:150px">
     <img src="../../img/processing.png" alt="" 
       />
     </div>

     <div>鑲嵌寶石</div>
     <div style="height:150px;width:150px">
     <img src="../../img/mosaic.png" alt="" 
       />
     </div>

     <div>磨光</div>
     <div style="height:150px;width:150px">
     <img src="../../img/polished.png" alt="" 
       />
     </div>

      <div>珠寶完成，質量檢定</div>
     <div style="height:150px;width:150px">
     <img src="../../img/quality.png" alt="" 
       />
     </div> -->



      <Footer class="footer" />
    </div>
  </body>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import img1 from "../../img/design1.png"
import img2 from "../../img/engraving.png"
import img3 from "../../img/processing.png"
import img4 from "../../img/mosaic.png"
import img5 from "../../img/polished.png"
import img6 from "../../img/quality.png"
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
      cartLength: 0,
      new: "",
    
    
    datas:
    [
       {
      title: "珠寶圖面設計",
      img : img1
      },
       {
      title:"製作蠟模",
      img : img2
      },
       {
      title:"加工",
      img : img3
      },
       {
      title:"鑲嵌寶石",
      img : img4
      },
       {
      title:"磨光",
      img : img5
      },
       {
      title:"珠寶完成，質量檢定",
      img : img6
      }


    ]
    
    
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
        vm.cartLength = vm.cart.carts.length;
        vm.isLoading = false;
      });
    },

    // productPage(itemId) {
    //   let routeUrl = this.$router.resolve({
    //     name: "Product",
    //     params: { id: itemId },
    //   });
    //   window.open(routeUrl.href, "_blank");
    // },
  },
};
</script>


<style scoped>
body {
  background-color: #f2e9e1;
}
.majorImg {
  opacity: 0.5;
  height: 100%;
  width: 100%;
  background-image: url("https://images.unsplash.com/photo-1503351107055-43fe50b5d4fa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTN8fGpld2Vscnl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60");
  background-size: cover;
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
  margin-top: 20px;
  padding-top: 20px;
  margin-bottom: 80px;
  background-color: #d9d4cf;
  border-radius: 10px;
  opacity: 0.6;
}
.image2 {
  border-radius: 50%;
  margin-top: -10px;
  transition: 0.9s;
  opacity: 1;
  background-color: #f2e9e1;
}
.image2:hover {
  opacity: 0.6;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
}
</style>

