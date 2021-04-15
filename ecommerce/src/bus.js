import Vue from 'vue'
//使用$bus可以跨元件通訊
Vue.prototype.$bus = new Vue()

//AlertMessage
//this.$bus.$emit( "message:push",message,status)
//message : 訊息內容
//status : Alert的樣式