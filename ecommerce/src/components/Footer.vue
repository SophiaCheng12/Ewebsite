<template>
  <div>
    <footer class="footer">
      <div class="d-flex flex-row justify-content-between info">
        <div class="tel">
          <i class="fas fa-phone"></i>
          02-28912345
        </div>
        <div class="copyright">© 2021 本網站為學習用途</div>

        <div class="place">
          <i class="fas fa-map-marker-alt"></i>
          台北市北投區希望路66號
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  height: 40px;
  margin-top: 50px;
  font-size: 18px;
  background-color: #fadad8;
  color: #fffcf0;
}
.info {
  padding-top: 10px;
}
.tel {
  margin-left: 100px;
}
.tel:hover {
  color: #a7a7a2;
}
.copyright {
  margin-left: 50px;
}
.copyright:hover {
  color: #a7a7a2;
}
.place {
  margin-right: 100px;
}
.place:hover {
  color: #a7a7a2;
}
</style>