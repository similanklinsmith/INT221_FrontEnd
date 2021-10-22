<template>
  <div class="notFound">
    <h2>404</h2>
    <h3>
      This is not the<br />
      web page you<br />
      are looking for
    </h3>
    <base-button @click="$router.push('/')">Back to homepage</base-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.notFound {
  padding-top: 15%;
}
.notFound h2 {
  font-size: 50px;
  color: #ff7b7b;
}
button{
  background: #ff7b7b;
  padding: 10px;
  color: white;
  font-size: 15px;
  margin: 10px;
  border: none;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
}
button:hover{
  transform: scale(1.1);
}
</style>