<template>
  <div class="add-product">
    <form class="product-form" @submit.prevent="editSubmit">
      <div class="content">
        <div class="text-header">EDIT-<span>PRODUCT</span></div>
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
                step="any"
                v-model="prod_price"
                id="prod_price"
                type="number"
              />
            </div>
            <div class="row-2">
              <label for="prod_brand">Brand</label>
              <select name="prod_brand" id="prod_brand"  v-model="selected_brand">
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
              <img :src="preview_image" alt="" v-if="preview_image" />
              <img :src="image + prod_pic" alt=""  v-if="preview_image === ''"/>
              <p>{{ image_name }}</p>
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
              Edit Product <i class="fa fa-plus-square" aria-hidden="true"></i>
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
  name: "EditProduct",
  props: ["id", "cloth"],
  data() {
    return {
      urlEdit: "http://13.76.217.62:9090/clothes/" + this.id,
      urlColors: "http://13.76.217.62:9090/colors",
      urlBrands: "http://13.76.217.62:9090/brands",
      image: "http://13.76.217.62:9090/image/",
      preview_image: "",
      image_name:"",
      selected_image:"",
      selected_brand:"",
      clothes: [],
      prod_name: "",
      prod_date: "",
      prod_desc: "",
      prod_price: "",
      prod_pic: "",
      selected_color: [],
      colors: [],
      brands: [],
    };
  },
  computed: {
    checkUniqueProdName() {
      for (let index = 0; index < this.clothes.length; index++) {
        if (
          this.clothes[index].productName == this.prod_name &&
          this.clothes[index].productId != this.id
        ) {
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
    fetch("http://13.76.217.62:9090/clothes")
      .then((res) => res.json())
      .then((data) => (this.clothes = data))
      .catch((err) => console.log(err.message));
    fetch(this.urlEdit)
      .then((res) => res.json())
      .then((data) => {
        this.selected_brand = data.brand
        this.prod_date = data.manufactureDate
        this.prod_name = data.productName
        this.prod_desc = data.productDescription
        this.prod_price = data.productPrice
        this.prod_pic = data.image
        this.selected_color = data.colors
        this.image_name = data.image
        // this.selected_image = this.image+data.image
      });
    fetch(this.urlColors)
      .then((res) => res.json())
      .then((data) => (this.colors = data))
      .catch((err) => console.log(err.message));
    fetch(this.urlBrands)
      .then((res) => res.json())
      .then((data) => (this.brands = data))
      .catch((err) => console.log(err.message));
      console.log("image "+this.prod_pic)
  },
  methods: {
    oldColor(formerColor) {
      const colors = formerColor;
      for (let index = 0; index < colors.length; index++) {
        this.selected_color.push(colors[index].colorName);
      }
      const checkboxInput = document.getElementsByTagName("input");
      for (var i = 0; i < checkboxInput.length; i++) {
        if (checkboxInput[i].value == this.selected_color[i]) {
          checkboxInput[i].checked = true;
        }
      }
    },
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
      //console.log("this is selected_image " + this.selected_image);
      this.image_name = e.target.files[0].name;
      this.prod_pic = e.target.files[0].name;
    },
    createImage(file) {
     let reader = new FileReader();
      reader.onload = (e) => {
        this.preview_image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    editSubmit() {
      if (this.prod_name == "" || this.checkUniqueProdName) {
        alert("Please inform unique product name 🤓");
      } else if (
        this.prod_desc == "" ||
        this.prod_desc.length < 30 ||
        this.prod_desc.length > 100
      ) {
        alert(
          "Please inform the product description at least 30 to 100 characters 😲"
        );
      } else if (this.prod_price < 0 || this.prod_price == "") {
        alert("Please inform the product price ( positive number ) 😵");
      } else if (this.selected_brand == "") {
        alert("Please inform the product brand 🤫");
      } else if (this.prod_date == "") {
        alert("Please inform manufactured date 🤨");
      } else if (this.selected_color == "") {
        alert("Please choose at least one color 🤡");
      } else if (this.selected_image.name == "") {
        alert("Please choose image 😏");
      }else if( this.checkUniqueImageName){
        alert(`Please name another name instead of "${this.selected_image.name}" 😏`);
      } 
      // else if(this.selected_image.includes(this.image_name)){
      // const editProduct = {
      //   brand: this.selected_brand,
      //   manufactureDate: this.prod_date,
      //   productName: this.prod_name,
      //   productDescription: this.prod_desc,
      //   productPrice: this.prod_price,
      //   image: this.image_name,
      //   colors: this.selected_color,
      // };
      // const jsonEditCloth = JSON.stringify(editProduct);
      // const blob = new Blob([jsonEditCloth], {
      //     type: 'application/json'
      // });
      // const formData = new FormData();
      // formData.append("imageFile",null);console.log("hello")
      // formData.append("editedProduct",blob);
     
      // fetch(this.urlEdit, {
      //     method: "PUT",
      //     body: formData,
      //   })
      //     .then(() => {
      //       this.$router.push("/products");
      //     })
      //     .catch((err) => console.log(err));
      // }
      else{
        const editProduct = {
        brand: this.selected_brand,
        manufactureDate: this.prod_date,
        productName: this.prod_name,
        productDescription: this.prod_desc,
        productPrice: this.prod_price,
        colors: this.selected_color,
      };console.log("this is selected image "+this.selected_image)
      const jsonEditCloth = JSON.stringify(editProduct);
      const blob = new Blob([jsonEditCloth], {
          type: 'application/json'
      });
      const formData = new FormData();
      formData.append("imageFile", this.selected_image);
      formData.append("editedProduct",blob);
      fetch(this.urlEdit, {
          method: "PUT",
          body: formData,
        })
          .then(() => {
            this.$router.push("/products");
          })
          .catch((err) => console.log(err));
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
@media (max-width: 640px){
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