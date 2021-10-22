<template>
  <BtnUp />
  <div class="product">
    <section class="header-product">
      <div class="header">
        <div class="column left">
          <img src="../assets/img/header_product.jpg" alt="" />
        </div>
        <div class="column right">
          <div class="content">
            <h4>2021</h4>
            <h3>New Arrival <span>Sweater</span></h3>
            <div class="description">
              <p>
                <span>"</span>Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Dolores quaerat, saepe repellat hic nemo quo
                eos est quis iusto incidunt. Tempora illum ducimus placeat
                alias.
                <span>"</span>
              </p>
            </div>
            <div class="colors">
              <h4>colors</h4>
              <div class="box-color">
                <div class="color first" alt="red"></div>
                <div class="color second" alt="black"></div>
                <div class="color third" alt="white"></div>
              </div>
            </div>
            <div class="price">
              <div class="cost">
                <h4>price</h4>
                <h3>฿ 1299</h3>
              </div>
              <div class="add-product">
                <button><i class="fa fa-plus" aria-hidden="true"></i></button>
                <input type="number" value="1" />
                <button><i class="fa fa-minus" aria-hidden="true"></i></button>
              </div>
            </div>
            <div class="purchase-btn">
              <button type="submit">
                Purchase <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="body-product">
      <h1>OUR-<span>PRODUCTS</span></h1>
      <div class="search">
        <input
          type="search"
          v-model="searchInput"
          placeholder="seach by product name"
        />
      </div>
      <div class="products" v-if="searchProduct.length !== 0">
        <div
          class="our-products"
          v-for="cloth in searchProduct"
          :key="cloth.id"
        >
          <ProductSlot :cloth="cloth" @delete="handleDelete" />
        </div>
      </div>
      <div class="not-found" v-else>
        <h1><span>sorry, product <div class="search">{{ searchInput }}</div></span> Not Found</h1>
        <i class="fa fa-window-close" aria-hidden="true"></i>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import ProductSlot from "../components/ProductSlot.vue";
export default {
  components: { ProductSlot },
  methods: {
    handleDelete(id) {
      this.clothes = this.clothes.filter((cloth) => {
        return cloth.productId !== id;
      });
    },
  },
  data() {
    return {
      clothes: [],
      url: "http://13.76.217.62:9090/clothes",
      searchInput: "",
    };
  },
  mounted() {
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => (this.clothes = data))
      .catch((err) => console.log(err.message));
  },
  computed: {
    searchProduct() {
      return this.clothes.filter((cloth) => {
        return cloth.productName
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.column {
  z-index: -100;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}
.left {
  width: 55%;
  z-index: 100;
  position: relative;
  background-size: cover;
}
.left img {
  transition: 0.3s all ease-in-out;
  margin-left: -40px;
}
.left img:hover {
  transform: scale(1.1);
}
.right {
  margin-top: 70px;
  z-index: 1;
  right: 0;
  display: flex;
  width: 45%;
  position: absolute;
  animation-name: fade-in;
  animation-duration: 0.35s;
  animation-iteration-count: 1;
}
.right .content {
  margin: 0px 20px 50px 120px;
  text-align: start;
  color: #292929;
}
.right .content h4 {
  font-size: 30px;
  margin-top: 55px;
}
.right .content h3 {
  font-size: 45px;
  padding-top: 5px;
  letter-spacing: 1.8;
}
.right .content h3 span {
  color: #ff7b7b;
}
.right .content .description {
  padding-right: 100px;
  margin-top: 30px;
  line-height: 1.5;
}
.right .content .description span {
  color: #ff7b7b;
  font-weight: 600;
}

.right .content .colors h4 {
  font-size: 25px;
  margin-top: 25px;
}
.right .content .colors .box-color {
  display: flex;
}
.right .content .colors .box-color .first {
  margin: 10px;
  width: 50px;
  height: 50px;
  background: crimson;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.right .content .colors .box-color .second {
  margin: 10px;
  width: 50px;
  height: 50px;
  background: black;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.right .content .colors .box-color .third {
  margin: 10px;
  width: 50px;
  height: 50px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.right .content .price {
  display: flex;
  justify-content: space-between;
}
.right .content .price .cost h4 {
  font-size: 25px;
}
.right .content .price .cost h3 {
  color: #ff7b7b;
  font-weight: 600;
}
.right .content .price .add-product {
  margin-top: 100px;
  margin-right: 150px;
}
.right .content .price .add-product input {
  width: 45px;
  height: 45px;
  margin-left: 15px;
  margin-right: 15px;
}
.right .content .price .add-product button i {
  width: 105px;
  height: 105px;
}
.right .content .price .add-product button {
  border: none;
}

.right .content .price .add-product .fa-plus,
.right .content .price .add-product .fa-minus {
  background: #ff7b7b;
  padding: 3px;
  color: white;
  font-size: 25px;
}
.right .content .purchase-btn {
  margin-top: 45px;
}
.right .content .purchase-btn button {
  background: #292929;
  padding: 10px;
  color: white;
  font-size: 20px;
  border: none;
  transition: 0.25s all ease-in-out;
  cursor: pointer;
}
.right .content .purchase-btn button:hover {
  background: #ff7b7b;
}
.body-product {
  width: 100%;
}
.body-product .search {
  margin-top: 15px;
  margin-bottom: 5px;
}

.body-product .search input {
  height: 35px;
  width: 500px;
  background: #e6e6e6;
  border: none;
  padding-left: 10px;
}
.body-product .search input:focus {
  outline: none;
}
.body-product .search button {
  border: none;
  padding: 5px;
  height: 35px;
  background: #292929;
  color: white;
  transition: 0.25s all ease-in-out;
  cursor: pointer;
}
.body-product .search button:hover {
  background: #ff7b7b;
}
.body-product h1 {
  margin-top: 50px;
  padding-top: 10px;
  color: #292929;
  font-size: 50px;
}
.body-product h1 span {
  color: #ff7b7b;
}
.body-product .products {
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.body-product .products .our-products {
  width: 50%;
  transition: 0.25s all ease-in-out;
}
.body-product .products .our-products:hover {
  transform: scale(1.025);
}
.body-product .not-found {
  padding-top: 100px;
  padding-bottom: 200px;
}
.body-product .not-found h1 {
  color: #ff7b7b;
}
.body-product .not-found h1 span {
  font-size: 25px;
  display: block;
  color: #292929;
}
.body-product .not-found .fa-window-close {
  font-size: 50px;
  color: #e6e6e6;
}
.not-found .search{
  color: rgb(179, 179, 179);
  font-weight: 300;
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
  .right .content {
    margin: 0px 10px 0px 35px;
  }
  .right .content h4 {
    font-size: 20px;
    margin-top: 25px;
  }
  .right .content h3 {
    font-size: 35px;
    padding-top: 2px;
    letter-spacing: 1.8;
  }
  .right .content .description {
    padding-right: 80px;
    margin-top: 15px;
    line-height: 1.35;
  }
  .right .content .colors h4 {
    font-size: 15px;
    margin-top: 15px;
  }
  .right .content .colors .box-color {
    display: flex;
  }
  .right .content .colors .box-color .first {
    margin: 5px;
    width: 20px;
    height: 20px;
    background: crimson;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .right .content .colors .box-color .second {
    margin: 5px;
    width: 20px;
    height: 20px;
    background: black;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .right .content .colors .box-color .third {
    margin: 5px;
    width: 20px;
    height: 20px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .right .content .price {
    display: flex;
    justify-content: space-between;
  }
  .right .content .price .cost h4 {
    font-size: 15px;
  }
  .right .content .price .cost h3 {
    color: #ff7b7b;
    font-weight: 600;
  }
  .right .content .price .add-product {
    margin-top: 50px;
    margin-right: 75px;
  }
  .right .content .price .add-product input {
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .right .content .price .add-product button i {
    width: 75px;
    height: 75px;
  }
  .right .content .price .add-product button {
    border: none;
  }

  .right .content .price .add-product .fa-plus,
  .right .content .price .add-product .fa-minus {
    background: #ff7b7b;
    padding: 3px;
    color: white;
    font-size: 15px;
  }
  .right .content .purchase-btn {
    margin-top: 30px;
  }
  .right .content .purchase-btn button {
    background: #292929;
    padding: 10px;
    color: white;
    font-size: 18px;
    border: none;
    transition: 0.25s all ease-in-out;
    cursor: pointer;
  }
  .body-product .products .our-products {
    width: 100%;
    justify-content: center;
    justify-items: center;
    display: flex;
  }

  .body-product .search input {
    width: 200px;
  }
}
@media (max-width: 640px){
   .header {
    height: 800px;
  }
.left img:hover {
  transform: scale(1.05);
}
  .left {
    width: 100%;
    height: 450px;
  }
  .left img {
    width: 100%;
    margin-left: 0.5px;
    position: relative;
  }
  .right {
    margin-top: 350px;
    padding-top: 180px;
    width: 100%;
  }
  .right .content {
    margin: 0px 0px 0px 30px;
  }
  .right .content {
    height: 0;
  }
  .body-product {
    margin-top: 180px;
  }
  .body-product .search {
    margin-bottom: 0px;
  }
  .body-product .search input {
    height: 35px;
    width: 350px;
    background: #e6e6e6;
    border: none;
    padding-left: 10px;
  }
  .body-product .search input:focus {
    outline: none;
  }
  .body-product h1 {
    margin-top: 50px;
    padding-top: 10px;
    color: #292929;
    font-size: 25px;
  }
}
@media only screen and (max-width: 450px) {
  .header {
    height: 800px;
  }
  .left {
    width: 100%;
  }
  .left img {
    width: 100%;
    margin-left: 0.5px;
    position: relative;
  }
  .right {
    margin-top: 300px;
    padding-top: 180px;
    width: 100%;
  }
  .right .content {
    margin: 0px 0px 0px 30px;
  }
  .right .content {
    height: 0;
  }
  .body-product {
    margin-top: 180px;
  }
  .body-product .search {
    margin-bottom: 0px;
  }
  .body-product .search input {
    height: 35px;
    width: 350px;
    background: #e6e6e6;
    border: none;
    padding-left: 10px;
  }
  .body-product .search input:focus {
    outline: none;
  }
  .body-product h1 {
    margin-top: 50px;
    padding-top: 10px;
    color: #292929;
    font-size: 25px;
  }
}
</style>
