<template>
  <BtnUp />
  <div class="home">
    <header>
      <div class="content">
        <div class="text-1">WELCOME</div>
        <div class="text-2"><span>NERDY</span>STYLE</div>
        <div class="text-3">YOUR OWN <span class="typewriter">STYLE</span></div>
      </div>
      <div class="column left"></div>
      <div class="float">
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-twitter-square"></i>
        <i class="fab fa-instagram-square"></i>
      </div>
      <video autoplay loop muted>
        <source src="../assets/header_video.mp4" type="video/mp4" />
      </video>
    </header>

    <section id="about-us">
      <div class="column left">
        <img src="../assets/img/home.jpg" alt="" />
      </div>
      <div class="column right">
        <h2>ABOUT-<span>US</span></h2>
        <p>
          <span>"</span> Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Magnam dolores esse, labore laborum culpa tenetur qui asperiores
          praesentium quidem laboriosam, ipsa aperiam sunt cupiditate porro
          corrupti nisi doloremque in! Porro nihil, facilis error quisquam
          tempora ipsam debitis eveniet hic nemo accusamus delectus ab,
          officiis, eos at dicta quo deleniti laudantium! <span>"</span>
        </p>
        <div class="box" >
          <div
            class="list"
            v-for="member in members"
            :key="member.id"
            @click="showMember(member.id)"
            :style="[
          member.nickname === 'M'
            ? { background: '#F6C094' }
            : member.nickname === 'D'
            ? { background: '#ff324c' }
            : { background: '#ff8c66' },
        ]"
          >
            {{ member.nickname }}
            <div class="popUpCard">
              <Popup :member="member" v-if="member.isShow === true"></Popup>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Popup from "../components/PopupMember.vue";
export default {
  name: "Home",
  components: { Popup },
  data() {
    return {
      members: [
        {
          nickname: "M",
          id: "62130500126",
          name: "Noparat Prasongdee",
          responsible: ["Database", "Devop","Document"],
          isShow: false,
        },
        {
          nickname: "D",
          id: "62130500096",
          name: "Similan Klinsmith",
          responsible: ["Front-end", "Devop", "Design"],
          isShow: false,
        },
        {
          nickname: "P",
          id: "62130500069",
          name: "Praepanwa Tedprasit",
          responsible: ["Database", "Devop", "Back-end"],
          isShow: false,
        },
      ],
    };
  },
  methods: {
    showMember(id) {
      for (let index = 0; index < this.members.length; index++) {
        if (this.members[index].isShow === true) {
          this.members[index].isShow = false;
        }
        if (this.members[index].id === id) {
          this.members[index].isShow = true;
        }
      }
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.typewriter{
  overflow: hidden; 
  border-right: .15em solid #ff7b7b;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.18em;
  animation: 
    typing 3.5s steps(30, end),
    blink-caret .5s step-end infinite;
}
.column {
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
.left {
  background: #ff7b7b;
  width: 45%;
  z-index: -10;
  margin-top: -60px;
  position: relative;
  background-size: cover;
  animation: slide 0.75s forwards;
  left: -45%;
  overflow: hidden;
}
video {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  z-index: -15;
}
.content {
  display: flex;
  flex-direction: column;
  margin: 250px 0 0 100px;
  position: absolute;
  text-align: start;
  z-index: 0;
  animation: slide 0.75s forwards;
  left: -100%;
}
.text-1 {
  font-size: 25px;
  font-weight: 400;
  color: white;
}
.text-2 {
  padding-left: 10px;
  font-size: 135px;
  font-weight: 600;
  margin-left: -3px;
  transition: 0.3s all ease-in-out;
  color: #292929;
  letter-spacing: 5px;
  background: #ff7b7b;
}
.text-2 span {
  color: white;
}
.text-2:hover {
  color: #ff7b7b;
  background: #292929;
  transform: skew(-10deg, 0);
}

.text-3 {
  font-size: 60px;
  font-weight: 600;
  margin: 5px 0 0 255px;
  color: white;
}
.text-3 span {
  color: white;
  font-weight: 400;
}
.float {
  display: flex;
  right: 0;
  top: 0px;
  flex-direction: column;
  z-index: 999;
  position: absolute;
  text-align: start;
  padding: 250px 100px 0 0;
}
.float .fa-facebook-square,
.float .fa-twitter-square,
.float .fa-instagram-square {
  margin-bottom: 30px;
  font-size: 30px;
  color: #292929;
  cursor: pointer;
  transition: 0.15s all ease-in-out;
}
.float .fa-facebook-square:hover,
.float .fa-twitter-square:hover,
.float .fa-instagram-square:hover {
  transform: scale(1.05);
  color: white;
}
section {
  padding-top: 60px;
  display: flex;
  width: 100%;
  height: 100vh;
}
section .left {
  background-image: url("../assets/img/home_grey.jpg");
  width: 45%;
  z-index: -10;
  margin-top: -60px;
  position: relative;
  background-size: cover;
}
section .left img {
  padding-top: 30px;
  justify-items: center;
  width: 700px;
  height: 700px;
  object-fit: contain;
}
section .right {
  width: 55%;
  margin-top: -60px;
  position: relative;
  right: 0;
}
h2 {
  font-size: 60px;
  padding-top: 25px;
}
h2 span {
  color: #ff7b7b;
}
.column p {
  width: 85%;
  padding: 25px 0px 25px 100px;
  text-align: justify;
  line-height: 1.8;
}
.column p span {
  color: #ff7b7b;
  font-size: 20px;
  font-weight: 600;
}
.box {
  display: flex;
  justify-content: space-between;
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 100px;
}
.box .list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  background: #ff7b7b;
  cursor: pointer;
  color: white;
  font-size: 80px;
  font-weight: 600;
  opacity: 0.5;
  transition: 0.15s ease-in-out all;
}
.box .list:hover {
  opacity: 1;
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white }
}
@keyframes slide {
  100% { left: 0; }
}
@media (max-width: 1280px) {
  .float {
    display: none;
  }
  .text-1 {
    font-size: 15px;
    font-weight: 400;
    color: white;
  }
  .text-2 {
    padding-left: 10px;
    font-size: 100px;
    font-weight: 600;
    margin-left: -3px;
    transition: 0.3s all ease-in-out;
    color: #292929;
    letter-spacing: 2px;
  }
  .text-2 span {
    color: white;
  }
  .text-2:hover {
    color: #ff7b7b;
    background: #292929;
    transform: skew(-10deg, 0);
  }

  .text-3 {
    font-size: 50px;
    font-weight: 600;
    margin: 5px 0 0 255px;
    color: white;
  }
  .text-3 span {
    color: white;
    font-weight: 400;
  }
  .box {
    padding-top: 5px;
    margin-left: 45px;
    margin-right: 25px;
    display: block;
  }
  .box .list {
    margin-top: 10px;
    width: 400px;
    height: 80px;
    background: #ff7b7b;
    cursor: pointer;
    color: white;
    font-size: 80px;
    font-weight: 600;
    opacity: 0.5;
    transition: 0.15s ease-in-out all;
  }
}

@media (max-width: 1024px){
    .box {
    padding-top: 5px;
    margin-left: 55px;
    margin-right: 25px;
  }
  .box .list {
    margin-top: 5px;
    width: 300px;
    height: 60px;
    background: #ff7b7b;
    cursor: pointer;
    color: white;
    font-size: 50px;
    font-weight: 600;
    opacity: 0.5;
    transition: 0.15s ease-in-out all;
  }
}
@media (max-width: 920px) {
  #about-us {
    overflow: hidden;
  }
  #about-us .right h2 {
    font-size: 30px;
  }
  #about-us .right p {
    line-height: 1.2;
  }
  .box {
    padding-top: 10px;
    margin-left: 25px;
    margin-right: 25px;
  }
  .box .list {
    margin-top: 5px;
    width: 300px;
    height: 60px;
    background: #ff7b7b;
    cursor: pointer;
    color: white;
    font-size: 50px;
    font-weight: 600;
    opacity: 0.5;
    transition: 0.15s ease-in-out all;
  }
  .text-1 {
    font-size: 12px;
    font-weight: 400;
    color: white;
  }
  .text-2 {
    padding-left: 5px;
    font-size: 85px;
    font-weight: 600;
    margin-left: -3px;
    transition: 0.3s all ease-in-out;
    color: #292929;
    letter-spacing: 2px;
  }

  .text-2:hover {
    color: #ff7b7b;
    background: #292929;
    transform: skew(-10deg, 0);
  }

  .text-3 {
    font-size: 40px;
    font-weight: 600;
    margin: 5px 0 0 150px;
    color: white;
    padding-left: 25px;
    background: #292929;
  }
  .text-3 span {
    color: white;
    font-weight: 400;
  }
}
@media (max-width: 768px){
  .box {
    padding-top: 5px;
    margin-left: 0px;
    margin-right: 5px;
  }
  .box .list {
    margin-top: 5px;
    width: 270px;
    height: 60px;
  }
}
@media (max-width: 640px){
  video {
    display: none;
  }
  .left {
    background: #ff7b7b;
    width: 100%;
    z-index: -10;
    margin-top: -60px;
    position: relative;
    height: 350px;
  }
  .content {
    margin: 100px 0 0 100px;
    position: absolute;
    text-align: start;
    z-index: 0;
  }
  .text-1 {
    font-size: 15px;
    font-weight: 300;
    color: white;
    margin-bottom: 10px;
  }
  .text-2 {
    padding-left: 10px;
    font-size: 45px;
    font-weight: 600;
    margin-left: -3px;
    transition: 0.3s all ease-in-out;
    color: #292929;
    letter-spacing: 2.5px;
    background: none;
  }
  .text-2 span {
    color: white;
  }
  .text-2:hover {
    color: #292929;
    background: none;
  }

  .text-3 {
    font-size: 25px;
    font-weight: 400;
    margin: 5px 0 0 5px;
    color: white;
    background: none;
  }
  .text-3 span {
    color: white;
    font-weight: 400;
  }
  #about-us .left {
    display: none;
  }
  section .right {
    width: 100%;
    margin-top: -60px;
    position: relative;
    margin-left: -15px;
  }
    .box {
    padding-top: 10px;
    margin-left: 25px;
    margin-right: 25px;
  }
    .box .list {
    margin-top: 5px;
    width: 350px;
    height: 60px;
    background: #ff7b7b;
    cursor: pointer;
    color: white;
    font-size: 50px;
    font-weight: 600;
    opacity: 0.5;
    transition: 0.15s ease-in-out all;
  }

}
@media only screen and (max-width: 450px) {
  video {
    display: none;
  }
  .left {
    background: #ff7b7b;
    width: 100%;
    z-index: -10;
    margin-top: -60px;
    position: relative;
    height: 350px;
  }
  .content {
    margin: 100px 0 0 20px;
    position: absolute;
    text-align: start;
    z-index: 0;
    width: 90%;
  }
  .text-1 {
    font-size: 15px;
    font-weight: 300;
    color: white;
    margin-bottom: 10px;
  }
  .text-2 {
    padding-left: 10px;
    font-size: 45px;
    font-weight: 600;
    margin-left: -3px;
    transition: 0.3s all ease-in-out;
    color: #292929;
    letter-spacing: 2.5px;
    background: none;
  }
  .text-2 span {
    color: white;
  }
  .text-2:hover {
    color: #292929;
    background: none;
  }

  .text-3 {
    font-size: 25px;
    font-weight: 400;
    margin: 5px 0 0 5px;
    color: white;
    background: none;
  }
  .text-3 span {
    color: white;
    font-weight: 400;
  }
  #about-us .left {
    display: none;
  }
  section .right {
    width: 100%;
    margin-top: -60px;
    position: relative;
    margin-left: -15px;
  }
  .box {
    padding-top: 10px;
    margin-left: 0px;
    padding-right: 30px;
  }
  .box .list {
    width: 300px;
    height: 60px;
  }

}
</style>
