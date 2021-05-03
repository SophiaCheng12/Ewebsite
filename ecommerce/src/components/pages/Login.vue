<template>
  <body class="text-center">
    <div class="form-signin">
      <main>
        <form @submit.prevent="signin">
          <h1 class="h3 mb-3 fw-normal signin">Sign In</h1>
          <div>
            <label for="inputEmail" class="visually-hidden"></label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required=""
              autofocus=""
              v-model="user.username"
            />
          </div>

          <div class="mt-3">
            <label for="inputPassword" class="visually-hidden"></label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required=""
              v-model="user.password"
            />
          </div>

          <button class="w-100 btn btn signInButton" type="submit">
            Sign in
          </button>
          <p class="mt-5 mb-3 text-muted">© 2021</p>
        </form>
      </main>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async signin() {
      const api = `${process.env.APIPATH}/admin/signin`;

      const vm = this;

      try {
        const response = await this.$http.post(api, vm.user);
        console.log(response);
        const { data } = response;
        if (data.success) {
          const token = data.token;
          const expired = data.expired;
          // console.log(token, expired);
          //把token、expired寫入cookie的
          //someCookieName=true，Cookie名稱(可自訂)和它的值
          //用new Date轉換時間格式
          document.cookie = `hexToken=${token}; expires=${new Date(
            expired
          )}; path=/`;
          vm.$router.push("/admin/products");
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
  display: flex;
  align-items: center;
  padding-top: 390px;
  background-image: url("https://cdn.pixabay.com/photo/2018/01/09/22/51/rose-3072698__340.jpg");
  background-repeat: no-repeat;
  background-size: 150%;
  height: 100%;
  opacity: 0.8;
  transform: rotate(180deg);
  border: 1px solid red;
}
.signin {
  letter-spacing: 5px;
  color: #fffff2;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding-top: 60px;
  margin-left: 50px;
  transform: rotate(180deg);
}
.form-signin {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  margin-top: -24px;
}
.signInButton {
  background-color: #ffeee4;
  color: gray;
  border: none;
}
.signInButton:active {
  background-color: #f1bbba;
}
.signInButton:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: none;
}
</style>
