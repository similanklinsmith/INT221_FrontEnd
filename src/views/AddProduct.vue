<template>
  <div class="add-product">
    <form class="product-form" @submit.prevent="addProduct">
      <div class="content">
        <div class="text-header">ADD-<span>PRODUCT</span></div>
        <div class="input">
          <div class="prodname-input">
            <label for="prod_name">Product Name</label>

            <input v-model="prod_name" id="prod_name" type="text" />
          </div>
          <div class="proddesc-input">
            <label for="prod_desc"
              >Product Description
              <span :style="[ 100-prod_desc.length < 0 ? {color: 'red'} : {}]">{{ 100 - prod_desc.length }} character(s) left</span></label
            >
            <textarea v-model="prod_desc" id="prod_desc" type="text" />
          </div>
          <div class="prod-input-row">
            <div class="row-1">
              <label for="prod_price">Product Price</label>
              <input
                v-model.number="prod_price"
                id="prod_price"
                type="number"
                step="any"
              />
            </div>
            <div class="row-2">
              <label for="prod_brand">Brand</label>
              <select
                name="prod_brand"
                id="prod_brand"
                v-model="selected_brand"
              >
                <option
                  v-for="brand in brands"
                  :key="brand.brandId"
                  :value="brand"
                >
                  {{ brand.brandName }}
                </option>
              </select>
            </div>
          </div>
          <div class="proddate-input">
            <label for="prod_date">Manufactured Date</label>
            <input
              v-model="prod_date"
              type="date"
              id="prod_date"
              name="prod_date"
            />
          </div>
          <div class="prodcolor-input">
            <label
              >Colors
              <span class="clear-color" @click="clearColor">clear</span></label
            >
            <div class="colors">
              <div
                class="color-slot"
                v-for="color in colors"
                :key="color.colorCode"
              >
                <input
                  type="checkbox"
                  :id="color.colorName"
                  :name="color.colorName"
                  :value="color"
                  v-model="selected_color"
                />
                <label :for="color.colorName">{{ color.colorName }}</label>
              </div>
            </div>
          </div>
          <div class="prodpic-input">
            <div class="show-img">
              <img
                src="../assets/img/uploadimage.png"
                alt=""
                v-if="preview_image === ''"
              />
              <img :src="preview_image" alt="" v-if="preview_image" />
              <p>{{ selected_image.name }}</p>
            </div>

            <input
              @change="onFileChange"
              type="file"
              class="custom-file-input"
              accept="image/*"
            />
            
          </div>
          <div class="submit">
            <base-button class="submit-btn">
              Add Product <i class="fa fa-plus-square" aria-hidden="true"></i>
            </base-button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <Footer />
</template>

<script>
export default {
  data() {
    return {
      urlClothes: "http://13.76.217.62:9090/clothes",
      urlColors: "http://13.76.217.62:9090/colors",
      urlBrands: "http://13.76.217.62:9090/brands",
      image: "http://13.76.217.62:9090/image/",
      preview_image: "",
      selected_image: "",
      clothes: [],
      prod_name: "",
      selected_brand: "",
      prod_date: "",
      prod_desc: "",
      prod_price: "",
      selected_color: [],
      colors: [],
      brands: [],
    };
  },
  computed: {
    checkUniqueProdName() {
      for (let index = 0; index < this.clothes.length; index++) {
        if (this.clothes[index].productName == this.prod_name) {
          return true;
        }
      }
    },
    checkUniqueImageName(){
      for (let index = 0; index < this.clothes.length; index++) {
        if (this.clothes[index].image == this.selected_image.name) {
          return true;
        }
      }
    }
  },
  mounted() {
    fetch(this.urlClothes)
      .then((res) => res.json())
      .then((data) => (this.clothes = data))

      .catch((err) => console.log(err.message));
    fetch(this.urlColors)
      .then((res) => res.json())
      .then((data) => (this.colors = data))

      .catch((err) => console.log(err.message));
    fetch(this.urlBrands)
      .then((res) => res.json())
      .then((data) => (this.brands = data))

      .catch((err) => console.log(err.message));
  },
  methods: {
    clearColor() {
      const checkboxInput = document.getElementsByTagName("input");
      for (var i = 0; i < checkboxInput.length; i++) {
        checkboxInput[i].checked = false;
        this.selected_color = [];
      }
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      this.selected_image = e.target.files[0];
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.preview_image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addProduct() {
      const newProduct = {
        productName: this.prod_name,
        productDescription: this.prod_desc,
        productPrice: this.prod_price,
        image: this.selected_image.name,
        manufactureDate: this.prod_date,
        brand: this.selected_brand,
        colors: this.selected_color,
      };
      if (newProduct.productName == "" || this.checkUniqueProdName) {
        alert("Please inform unique product name 🤓");
      } else if (
        newProduct.productDescription == "" ||
        newProduct.productDescription.length < 30 ||
        newProduct.productDescription.length > 100
      ) {
        alert(
          "Please inform the product description at least 30 to 100 characters 😲"
        );
      } else if (newProduct.productPrice < 0 || newProduct.productPrice == "") {
        alert("Please inform the product price ( positive number ) 😵");
      } else if (newProduct.brand == "") {
        alert("Please inform the product brand 🤫");
      } else if (newProduct.manufactureDate == "") {
        alert("Please inform manufactured date 🤨");
      } else if (newProduct.colors == "") {
        alert("Please choose at least one color 🤡");
      } else if (newProduct.image == null) {
        alert("Please choose image 😏");
      } else if( this.checkUniqueImageName){
        alert(`Please name another name instead of "${this.selected_image.name}" 😏`);
      } else {
        const jsonNewCloth = JSON.stringify(newProduct);
        const blob = new Blob([jsonNewCloth], {
          type: "application/json",
        });
        const formData = new FormData();
        formData.append("imageFile", this.selected_image);
        formData.append("newProduct", blob);
        fetch(this.urlClothes, {
	        method: "POST",
	        body: formData
        })
        .catch((err) => console.log(err));
        this.prod_name = ""
        this.selected_brand = ""
        this.prod_desc = ""
        this.prod_price = ""
        this.prod_date = ""
        this.preview_image = ""
        this.selected_image = ""
        this.selected_color = []
      }
    },
  },
};
</script>

<style scoped>
.add-product {
  height: 100vh;
  width: 100%;
  background-image: url("../assets/img/bg_add_product.jpg");
  background-size: cover;
  border-image-repeat: none;
  display: flex;
  justify-items: center;
  justify-content: center;
}
.product-form {
  animation-name: fade-in;
  animation-duration: 0.4s;
  animation-iteration-count: 1;
  margin-top: 15px;
  width: 600px;
  height: 710px;
  background: white;
  position: relative;
  transition: 0.2s all ease-in-out;
}
.product-form:hover {
  transform: scale(1.01);
}
.product-form .text-header {
  font-weight: 600;
  font-size: 40px;
  margin-top: 10px;
}
.product-form .text-header span {
  color: #ff7b7b;
}
.product-form .input {
  padding: 15px;
  padding-left: 50px;
}
.product-form .prodname-input,
.product-form .proddesc-input,
.product-form .proddate-input {
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-top: 15px;
}
.product-form .proddesc-input label span {
  font-weight: lighter;
  font-size: 12px;
  color: #969696;
}
.product-form .prodpic-input {
  display: flex;
  margin-top: 10px;
}
.product-form .prodpic-input label {
  margin: 15px;
}
.product-form .prodcolor-input {
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-top: 15px;
}
.product-form .prodcolor-input .colors {
  display: flex;
  flex-wrap: wrap;
}

.product-form .prod-input-row {
  text-align: start;
  display: flex;
  margin-top: 15px;
}
.prodcolor-input label {
  margin-bottom: 10px;
  margin-top: 10px;
}
.prodcolor-input .color-slot label {
  font-weight: normal;
}
.product-form .prodpic-input img {
  width: 100px;
  height: 100px;
}
.product-form .prodpic-input .show-img p {
  font-weight: 600;
  font-size: 12px;
}
label {
  font-weight: 600;
  margin-bottom: 10px;
}
input,
select {
  width: 200px;
  padding: 5px;
  background: #e6e6e6;
  border: none;
  font-size: 16px;
}

textarea {
  width: 450px;
  height: 100px;
  resize: none;
  padding: 5px;
  background: #e6e6e6;
  border: none;
  font-size: 16px;
}
.prodcolor-input .colors input,
.prodcolor-input .colors label {
  width: 10px;
  margin: 5px;
}
.clear-color {
  background: crimson;
  font-weight: normal;
  padding: 2px;
  color: white;
  font-size: 13px;
  transition: 0.15s all ease-in-out;
}
.clear-color:hover {
  background: rgb(117, 0, 0);
}
.prodpic-input .custom-file-input {
  background: none;
}
.prodpic-input .custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.prodpic-input .custom-file-input::before {
  content: "Select some files";
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.submit .submit-btn {
  width: 180px;
  height: 40px;
  padding: 7px;
  background: #10a729;
  color: white;
  font-size: 20px;
  border: none;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
}
.submit .submit-btn:hover {
  background: #0c7a1e;
  transform: translateY(-4px);
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
@media (max-width: 640px) {
  .add-product {
    height: 900px;
    width: 100%;
    background-image: url("../assets/img/bg_add_product.jpg");
    background-size: cover;
    border-image-repeat: none;
    display: flex;
    justify-items: center;
    justify-content: center;
  }
  .product-form {
    margin: 15px;
    width: 550px;
    height: 800px;
    background: white;
    position: relative;
    transition: 0.2s all ease-in-out;
  }
  textarea {
    width: 300px;
    height: 100px;
  }
  .product-form .prod-input-row {
    text-align: start;
    display: block;
    margin-top: 15px;
  }
  .row-1 {
    margin-bottom: 15px;
  }
  .row-1 input {
    margin-left: 10px;
    width: 100px;
  }
  .row-2 select {
    margin-left: 10px;
    width: 100px;
  }
  .submit .submit-btn {
    margin-top: 25px;
    margin-right: 10px;
    width: 180px;
    height: 40px;
    padding: 7px;
    background: #10a729;
    color: white;
    font-size: 20px;
    border: none;
    transition: 0.2s all ease-in-out;
    cursor: pointer;
  }
}
@media only screen and (max-width: 450px) {
  .add-product {
    height: 900px;
    width: 100%;
    background-image: url("../assets/img/bg_add_product.jpg");
    background-size: cover;
    border-image-repeat: none;
    display: flex;
    justify-items: center;
    justify-content: center;
  }
  .product-form {
    margin: 15px;
    width: 400px;
    height: 800px;
    background: white;
    position: relative;
    transition: 0.2s all ease-in-out;
  }
  textarea {
    width: 300px;
    height: 100px;
  }
  .product-form .prod-input-row {
    text-align: start;
    display: block;
    margin-top: 15px;
  }
  .row-1 {
    margin-bottom: 15px;
  }
  .row-1 input {
    margin-left: 10px;
    width: 100px;
  }
  .row-2 select {
    margin-left: 10px;
    width: 100px;
  }
  .submit .submit-btn {
    margin-top: 25px;
    margin-right: 10px;
    width: 180px;
    height: 40px;
    padding: 7px;
    background: #10a729;
    color: white;
    font-size: 20px;
    border: none;
    transition: 0.2s all ease-in-out;
    cursor: pointer;
  }
}
</style>