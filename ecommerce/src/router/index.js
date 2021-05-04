//官方元件
import Vue from 'vue'
import VueRouter from 'vue-router'

//自訂元件
import About from '@/components/pages/About.vue'
import Login from '@/components/pages/Login.vue'
import Dashboard from '@/components/Dashboard.vue'
import Dashboard2 from '@/components/Dashboard2.vue'
import Products from '@/components/pages/Products.vue'
import CustomerOrder from '@/components/pages/CustomerOrders.vue'
import OrderList from '@/components/pages/OrderList.vue'
import CustomerCheckout from '@/components/pages/CustomerCheckout.vue'
import Product from '@/components/pages/Product.vue'
import ShoppingCart from '@/components/pages/ShoppingCart.vue'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/',
      name: 'root',
      redirect: '/about'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      //meta:路由訊息
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'order_list',
          name: 'OrderList',
          component: OrderList,
          meta: { requiresAuth: true }
        },

      ]
    },
    {
      path: '/customer_order',
      name: 'CustomerOrder',
      component: CustomerOrder,

    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product
    },
    {
      path: '/shopping_cart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/',
      name: 'Dashboard2',
      component: Dashboard2,
      children: [

        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,

        },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})