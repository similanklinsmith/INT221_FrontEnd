<template>
  <div class="team">
    <div class="left">
      <img class="pic" :src="members[cursor-1].img" alt="" />
    </div>
    <!-- <Popup :member="members[cursor-1]"/> -->
    <div class="right">
      <div class="text-header">OUR-<span>TEAM</span></div>
      <div class="content">
        <div class="thumbnails" v-for="member in members" :key="member.id"  :class="member.clicked ? 'clicked-img' : ''">
          <img :src="member.img" alt="" @click="selected(member.id)"/>
        </div>
      </div>
      <div class="info">
          <div class="id"><span>Student ID</span>  {{ members[cursor-1].sid }}</div>
          <div class="name"><span>Name</span>  {{ members[cursor-1].name }}</div>
          <div class="nickname"><span>Nickname</span>   {{ members[cursor-1].nickname }}</div>
          <div class="email"><span>Email</span>   {{ members[cursor-1].email }}</div>
          <div class="res"><span>Responsible for</span>
            <div class="duties" v-for="res in members[cursor-1].responsible" :key="res">
                <div class="duty" :style="[
              res === '- Front-end'
                ? { background: '#f4858b' }
                : res === '- Devop'
                ? { background: '#ec3762' }
                : res === '- Database'
                ? { background: '#720f34' }
                : res === '- Back-end'
                ? { background: '#f9726f' }
                : { background: '#fb8fad' },
            ]">{{ res }}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
  <Footer />
</template>

<script>
export default {
  data() {
    return {
        cursor: 1,
      members: [
        {
          id: 1,
          nickname: "SaiMai",
          sid: "62130500126",
          name: "Noparat Prasongdee",
          email: "noparat.saimai@mail.kmutt.ac.th",
          responsible: ["- Database", "- Devop", "- Document"],
          clicked: true,
          img: require("@/assets/img/Mai.jpg"),
        },
        {
          id: 2,
          nickname: "Deep",
          sid: "62130500096",
          name: "Similan Klinsmith",
          email: "similan.klinsmith@mail.kmutt.ac.th",
          responsible: ["- Front-end", "- Devop", "- Design","- Document"],
          clicked: false,
          img: require("@/assets/img/Deep.jpg"),
        },
        {
          id:3,
          nickname: "Phaeng",
          sid: "62130500069",
          name: "Praepanwa Tedprasit",
          email: "praepanwa.phaeng@mail.kmutt.ac.th",
          responsible: ["- Database", "- Devop", "- Back-end", "- Document"],
          clicked: false,
          img: require("@/assets/img/phaeng.jpg"),
        },
      ],
    };
  },
  methods: {
    selected(id) {
      for (let index = 0; index < this.members.length; index++) {
        if (this.members[index].clicked === true) {
          this.members[index].clicked = false;
        }
      }
      this.cursor = id;
      this.members[this.cursor - 1].clicked = true;
      document.querySelector(".pic").src = this.members[this.cursor - 1].img;
      // console.log(this.cursor);
    },
    next(){
      this.cursor++;
      if (this.cursor > this.members.length) {
        this.cursor = 1
      }
     this.selected(this.cursor);
    //  console.log(this.cursor);
    },
    previous(){
      this.cursor--;
      if (this.cursor < 1) {
        this.cursor = this.members.length;
      }
     this.selected(this.cursor);
    //  console.log(this.cursor);
    }
  },
};
</script>

<style scoped>
.team {
  width: 100%;
  height: 100vh;
  display: flex;
  /* justify-content: center; */
}
.left {
  width: 50%;
  height: 100vh;
  /* background: black; */
}
.left img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
.right {
  width: 50%;
  height: 100vh;
  /* background: black; */
    animation-name: fade-in;
  animation-duration: 0.4s;
  animation-iteration-count: 1;
}
.team .text-header {
  font-weight: 600;
  font-size: 40px;
  margin-top: 30px;
}
.team .text-header span {
  color: #ff7b7b;
}

.right .info {
  /* width: 100%; */
  text-align: start;
  font-size: 18px;
  letter-spacing: 1.1px;
  margin: 30px 10px 10px 70px;
  line-height: 2;
  /* width: 90%; */
}
.right .info span {
  font-weight: 600;
  color: #292929;
  /* background: #292929; */
  padding: 3px;
  border-radius: 5px;
}
.right .content{
    display: flex;
    justify-content: center;
}
.right .thumbnails {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /* justify-content: center; */
  margin: 25px 25px 10px 25px;
  /* width: 10%; */
}
.right .thumbnails img {
height: 50px;
  width: 50px;
  object-fit: cover;
  transition: transform 0.3s, filter 0.5s ease-in-out;
  filter: grayscale(100%);
  overflow: hidden;
  cursor: pointer;
}
.right .content .thumbnails img:hover{
    filter: grayscale(0);
    transform: scale(1.025);
}
.right .info .res .duties{
    display: flex;
    flex-direction: row;
}
.right .info .res .duties .duty{
    background: #ff7b7b;
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 5px;
    border-radius: 15px;
    color: white;
    font-weight: 600;
    transition: 0.2s all ease-in-out;
}
.right .info .res .duties .duty:hover{
  transform: scale(1.05);
}
.clicked-img{
  height: 50px;
  width: 50px;
  object-fit: cover;
  transform: scale(1.15);
  pointer-events: none;
  filter:grayscale(0);
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
@media (max-width: 920px){
  .right .info {
  text-align: start;
  font-size: 15px;
  letter-spacing: 1.1px;
  margin: 30px 10px 10px 15px;
  line-height: 2;
  /* width: 90%; */
}
.right .thumbnails {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /* justify-content: center; */
  margin: 10px;
  margin-top: 50px;
  /* width: 10%; */
}
}
@media only screen and (max-width: 450px) {
.team {
  width: 100%;
  height: 100%;
  display: block;
  /* justify-content: center; */
}
.left {
  width: 100%;
  height: 400px;
  /* background: black; */
}
.left img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
.right {
width: 100%;
  height: 80vh;
  /* background: black; */
}
.right .info {
  /* width: 100%; */
  text-align: start;
  font-size: 13px;
  letter-spacing: 1.1px;
  margin: 10px 10px 10px 70px;
  line-height: 2;
  /* width: 90%; */
}
}
</style>