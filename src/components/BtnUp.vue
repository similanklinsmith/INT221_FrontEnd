<template>
  <div class="btn-up">
    <i class="fa fa-arrow-up" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  name: "BtnUp",
  mounted() {
    $(document).ready(function () {
      $(window).scroll(function () {
        if (this.scrollY > 500) {
          $(".btn-up").addClass("show");
        } else {
          $(".btn-up").removeClass("show");
        }
      });
      $(".btn-up").click(function () {
        $("html").animate({ scrollTop: 0 });
      });
    });
  },
};
</script>

<style scoped>
.btn-up {
  position: fixed;
  height: 45px;
  width: 42px;
  background: #6b6b6b;
  right: 30px;
  bottom: 15px;
  text-align: center;
  line-height: 45px;
  font-size: 30px;
  color: white;
  z-index: 999;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s all ease;
}
.btn-up.show {
  bottom: 10px;
  opacity: 0.75;
  pointer-events: auto;
}
.btn-up:hover {
  background: #ff7b7b;
  opacity: 1;
}
</style>