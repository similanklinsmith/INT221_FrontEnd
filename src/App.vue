<template>
  <div
    id="nav"
    :style="[currentRouteName === 'Home' ? { background: 'none' } : {}]"
  >
    <div
      class="logo"
      :style="[currentRouteName === 'Home' ? { color: '#292929' } : {}]"
    >
      NERDY<span>STYLE</span>.
    </div>
    <ul class="menu">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/products">Products</router-link></li>
      <li><router-link to="/add-product">Add product</router-link></li>
      <li><a href="/#about-us">About-us</a></li>
      <li><router-link to="/team">Team</router-link></li>
    </ul>
    <div class="menu-btn" @click="isShow = !isShow">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
  </div>
  <div class="menu-bar" v-show="isShow">
    <router-link to="/" @click="isShow = !isShow">Home</router-link>
    <router-link to="/products" @click="isShow = !isShow">Products</router-link>
    <router-link to="/add-product" @click="isShow = !isShow"
      >Add product</router-link
    >
    <a href="/#about-us" @click="isShow = !isShow">About-us</a>
         <router-link to="/team" @click="isShow = !isShow"
      >Team</router-link
    >
  </div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #292929;
}

#nav {
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 50px 0px 100px;
  width: 100%;
  background: rgb(0, 0, 0);
}

.menu-bar {
  display: none;
}

#nav .logo {
  font-size: 40px;
  color: #ff7b7b;
  font-weight: 600;
}
#nav .logo span {
  color: white;
}
#nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  letter-spacing: 1px;
  padding: 8px 10px;
  margin: 0 45px;
  margin-left: 15px;
}
#nav ul {
  display: flex;
  list-style: none;
}
#nav ul li {
  margin: 0 5px;
}
#nav a:hover {
  color: #ff7b7b;
  transition: all ease-in 0.2s;
}
#nav a.router-link-exact-active {
  transition: all ease-in 0.2s;
  color: white;
  background: #292929;
  border-radius: 50px 50px;
}

.menu-btn {
  color: white;
  font-size: 23px;
  cursor: pointer;
  display: none;
}
.menu-btn:hover {
  color: #ff7b7b;
  transition: ease-in-out 0.3s;
}
@media (max-width: 1280px) {
  #nav {
    background: black;
  }
  #nav ul {
    display: none;
  }
  .menu-btn {
    display: block;
    z-index: 999;
  }
  .menu-bar {
    overflow: hidden;
    right: 0%;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    width: 45%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
  .menu-bar a {
    padding-top: 35px;
    padding-bottom: 35px;
    color: #292929;
    text-decoration: none;
    background: white;
    transition: 0.25s all ease-in-out;
    font-size: 20px;
    font-weight: 600;
  }
  .menu-bar a:hover {
    color: white;
    background: #ff7b7b;
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
}
@media (max-width: 640px){
  #nav {
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 0px 30px;
  width: 100%;
  background: rgb(0, 0, 0);
}
#nav .logo {
  font-size: 25px;
}
}
@media only screen and (max-width: 450px) {
  #nav {
    z-index: 1000;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 0px 20px;
    width: 100%;
    background: rgb(0, 0, 0);
  }
  #nav .logo {
    font-size: 15px;
  }
  .menu-btn {
    z-index: 1000;
    right: 0%;
  }
}
</style>
