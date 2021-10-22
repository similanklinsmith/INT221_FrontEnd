<template>
  <div class="popup">
    <div class="card">
      <router-link to="/team">
        <div
          class="side-tab"
          :style="[
            member.nickname === 'M'
              ? { background: '#F6C094' }
              : member.nickname === 'D'
              ? { background: '#ff324c' }
              : { background: '#ff8c66' },
          ]"
        >
          <h3 class="more">more</h3>
          <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </div>
      </router-link>
      <div class="content">
        <div class="close-icon" @click="closePopup">
          <i class="fa fa-times-circle" aria-hidden="true"></i>
        </div>
        <h4>
          Student ID : <span>{{ member.id }}</span>
        </h4>
        <h4>
          Student Name : <span>{{ member.name }}</span>
        </h4>
        <h4>Responsible for</h4>
        <div
          class="responsible"
          v-for="duty in member.responsible"
          :key="duty.id"
        >
          <p
            :style="[
              duty === 'Front-end'
                ? { background: '#f4858b' }
                : duty === 'Devop'
                ? { background: '#ec3762' }
                : duty === 'Database'
                ? { background: '#720f34' }
                : duty === 'Back-end'
                ? { background: '#f9726f' }
                : { background: '#fb8fad' },
            ]"
          >
            {{ duty }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: ["member"],
  methods: {
    closePopup() {
      const popup = document.querySelector(".popup");
      popup.style.display = "none";
    },
  },
};
</script>

<style scoped>
.popup {
  display: flex;
  margin-right: 45px;
  z-index: 999;
  position: fixed;
  top: 25%;
  left: 40%;
  animation-name: fade-in;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}
.popup .card {
  width: 609px;
  height: 322px;
  background: white;
  font-size: 20px;
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.25);
}
.popup .side-tab {
  background: #ff7b7b;
  width: 50px;
  height: 322px;
  position: absolute;
  transition: all 0.3s ease-in-out;
}
.popup .side-tab:hover {
  width: 100%;
  transform: rotate(0deg);
  font-size: 50px;
}
.popup .side-tab:hover h3 {
  display: none;
}
.popup .side-tab:hover .fa-arrow-circle-right {
  display: inline;
  transition: 0.2s all ease-in-out;
  color: white;
  font-size: 30px;
  margin-top: 140px;
}
.popup .side-tab .fa-arrow-circle-right {
  display: none;
}
.popup .side-tab h3 {
  color: white;
  font-size: 30px;
  margin-top: 140px;
  transform: rotate(270deg);
}
.popup .content {
  text-align: start;
  padding: 30px 80px;
  line-height: 1.8;
}
.fa-times-circle {
  position: absolute;
  color: #292929;
  right: 25px;
  font-size: 25px;
  transition: ease-in-out 0.15s all;
  cursor: pointer;
}
.fa-times-circle:hover {
  color: crimson;
}
.popup .content h4 {
  color: #292929;
}
.popup .content h4 span {
  font-weight: 400;
}
.popup .content .responsible {
  display: inline-flex;
}
.popup .content .responsible p {
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 5px 10px 5px 10px;
  background: #ff7b7b;
  border-radius: 25px;
  color: white;
  font-size: 20px;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(3%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 1280px) {
  .popup .card {
    width: 500px;
    height: 180px;
    background: white;
    font-size: 16px;
  }
  .popup .side-tab {
    width: 40px;
    height: 180px;
  }
  .popup .content {
    text-align: start;
    padding: 20px 60px;
    line-height: 1.5;
  }
  .popup .side-tab:hover {
    width: 100%;
    transform: rotate(0deg);
    font-size: 50px;
  }
  .popup .side-tab:hover h3 {
    display: none;
  }
  .popup .side-tab:hover .fa-arrow-circle-right {
    display: inline;
    transition: 0.2s all ease-in-out;
    color: white;
    font-size: 30px;
    margin-top: 70px;
  }
  .popup .side-tab .fa-arrow-circle-right {
    display: none;
  }
  .popup .side-tab h3 {
    color: white;
    font-size: 20px;
    margin-top: 75px;
    transform: rotate(270deg);
  }
}
@media (max-width: 920px) {
  .popup {
    margin-right: 45px;
    z-index: 1000;
    top: 45%;
    left: 25%;
  }
  .popup .content .responsible p {
    margin-top: 15px;
    margin-right: 5px;
    margin-left: 5px;
    padding: 5px 10px 5px 10px;
    font-size: 15px;
  }
}
@media (max-width: 640px) {
  .popup {
    margin-right: 10px;
    z-index: 999;
    position: fixed;
    top: 25%;
    left: 10%;
    animation-name: fade-in;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.25);
  }
  .popup .card {
    width: 400px;
    height: 180px;
    background: white;
    font-size: 16px;
  }
  .popup .side-tab h3 {
    color: white;
    font-size: 20px;
    margin-top: 90px;
    transform: rotate(270deg);
  }
  .popup .side-tab:hover .fa-arrow-circle-right {
    font-size: 30px;
    margin-top: 80px;
  }
}
@media only screen and (max-width: 450px) {
  .popup {
    margin-right: 10px;
    z-index: 999;
    position: fixed;
    top: 25%;
    left: 15%;
    animation-name: fade-in;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.25);
  }
  .popup .card {
    width: 275px;
    height: 200px;
    background: white;
    font-size: 14px;
    left: 0;
  }
  .popup .side-tab {
    width: 20px;
    height: 200px;
  }
  .popup .content {
    text-align: start;
    padding: 10px 30px;
    line-height: 1.5;
  }
}
</style>