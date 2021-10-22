<template>
  <div class="ProductSlot">
    <div class="image"><img :src="image + cloth.image" alt="" /></div>
    <div class="product-content">
      <div class="product-brand">
        {{ cloth.brand.brandName }}
      </div>
      <div class="product-date">
        {{ cloth.manufactureDate }}
      </div>
      <div class="product-name">
        {{ cloth.productName }}
      </div>
      <div class="product-description" v-if="cloth.productDescription.length >= 30">
        {{ cloth.productDescription.substring(0, 30) }}<span v-if="readMore"></span>
        <span v-else>...</span>
        <div v-show="readMore">{{ cloth.productDescription.substring(30, 100) }}</div>
        <button class="readmore-btn" @click="readMore = !readMore">
          <span v-if="readMore">Read Less</span>
          <span v-else>Read More</span>
        </button>
      </div>
      <div class="text">colors</div>
      <div class="prod-colors">
        <div
          class="box"
          v-for="color in cloth.colors"
          :key="color.colorCode"
        >
          <div
            class="color"
            :style="{ background: color.colorCode }"
            alt="color.colorName"
          ><span class="tooltiptext">{{ color.colorName }}</span></div>
        </div>
      </div>
      <div class="price">
        <p>price</p>
        <div class="cost">
          <p>
            ฿ <span>{{ cloth.productPrice }}</span>
          </p>
        </div>
        <base-button class="purchase-btn">
          Purchase <i class="fa fa-shopping-cart" aria-hidden="true"></i
        ></base-button>
      </div>
      <base-button class="edit-btn">
        <router-link :cloth="cloth" :to="{ name: 'EditProduct', params: { id: cloth.productId } }">
          Edit <i class="fa fa-edit" aria-hidden="true"></i>
        </router-link>
      </base-button>
      <base-button class="delete-btn" @click="deleteCloth">
        Delete <i class="fa fa-trash" aria-hidden="true"></i
      ></base-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cloth"],
  name: "ProductSlot",
  methods: {
    deleteCloth() {
      fetch(this.url, {
        method: "DELETE",
      })
        .then(() => this.$emit("delete", this.cloth.productId))
        .catch((err) => console.log(err.message));
      // fetch(this.urlImage, {
      //   method: "DELETE",
      // })
      //   .then(() => this.$emit("delete", this.cloth.image))
      //   .catch((err) => console.log(err.message));
    },
  },
  data() {
    return {
      readMore: false,
      url: "http://13.76.217.62:9090/clothes/" + this.cloth.productId,
      clothes: [],
      image: "http://13.76.217.62:9090/image/",
      // urlImage: "http://13.76.217.62:9090/image/" + this.cloth.image
    };
  },
};
</script>

<style scoped>
.ProductSlot {
  display: flex;
  margin: 50px;
  width: 680px;
  height: 480px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.ProductSlot .image img {
  width: 380px;
  height: 480px;
  object-fit: cover;
}
.ProductSlot .product-content {
  text-align: start;
  margin: 15px;
}
.ProductSlot .product-content .product-brand {
  margin-top: 5px;
  font-size: 15px;
  font-weight: 600;
  color: #ff7b7b;
  text-align: end;
  text-transform: uppercase;
}
.ProductSlot .product-content .product-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}
.ProductSlot .product-content .product-description {
  font-weight: 100;
  font-size: 15px;
}
.ProductSlot .product-content .product-date {
  margin-top: 10px;
  font-size: 10px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.24);
}
.readmore-btn {
  border: none;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #ff7b7b;
  cursor: pointer;
  background: none;
  font-weight: bold;
}
.ProductSlot .prod-colors {
  display: flex;
  flex-wrap: wrap;
}
.ProductSlot .text {
  font-size: 15px;
  font-weight: 600;
}
.ProductSlot .prod-colors .box .color {
  margin-top: 5px;
  margin-right: 3px;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.ProductSlot .price {
  margin-top: 15px;
}
.ProductSlot .price p {
  font-size: 15px;
  font-weight: 600;
}
.ProductSlot .price .cost {
  margin-top: 15px;
}
.ProductSlot .price .cost p {
  font-size: 25px;
  color: #ff7b7b;
}
.purchase-btn {
  margin-top: 10px;
  background: #292929;
  border: none;
  color: white;
  font-size: 15px;
  padding: 5px;
  transition: 0.25s all ease-in-out;
  cursor: pointer;
}
.purchase-btn:hover {
  background: #ff7b7b;
}
.edit-btn {
  margin-right: 15px;
  margin-top: 30px;
  border: none;
  color: white;
  font-size: 15px;
  padding: 5px;
  transition: 0.25s all ease-in-out;
  cursor: pointer;
  background: #cccccc;
}
.edit-btn a {
  text-decoration: none;
  color: white;
}
.edit-btn:hover {
  transform: translateY(-2px);
  background: #a1a1a1;
}
.delete-btn {
  margin-top: 30px;
  border: none;
  color: white;
  font-size: 15px;
  padding: 5px;
  transition: 0.25s all ease-in-out;
  cursor: pointer;
  background: rgb(220, 27, 20);
}
.delete-btn:hover {
  transform: translateY(-2px);
  background: #a30505;
}
.color:hover .tooltiptext {
  visibility: visible;
}
.tooltiptext {
  visibility: hidden;
  width: 50px;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  font-size: 13px;
}
@media (max-width: 1280px) {
  .ProductSlot .image img {
    width: 250px;
  }
   .ProductSlot .product-content {
    margin-left: 30px;
  }
}
@media (max-width: 920px) {
  .ProductSlot .image img {
    width: 200px;
  }
  .ProductSlot .product-content {
    text-align: start;
    margin-left: 30px;
  }
}
@media (max-width: 500px) {
  .edit-btn,
  .delete-btn {
    margin-top: 10px;
  }
  .ProductSlot .prod-colors .box .color {
    width: 20px;
    height: 20px;
  }
}
@media only screen and (max-width: 450px){
  .ProductSlot {
  display: flex;
  margin: 15px 25px 15px 25px;
  width: 400px;
  height: 450px;
}
.ProductSlot .image img {
  height: 450px;
  object-fit: cover;
}
.ProductSlot .product-content {
  text-align: start;
  margin: 5px 10x ;
}
.color:hover .tooltiptext {
  visibility: hidden;
}

}
</style>