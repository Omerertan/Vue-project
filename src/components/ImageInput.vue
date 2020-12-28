<template>
  <div id="imageInput" >
    <v-container class="d-flex justify-center">
        <v-row>
            <div v-if="!imageFileUrl" class="uploader-wrapper">
                <div class="image-dropzone" @click="chooseImage">
                    <p class="text-center justify-center">Resim seçiniz...</p>
                </div>
                <input
                    type="file"
                    style="display: none"
                    ref="imageInput"
                    accept="image/png,image/jpeg,image/jpg"
                    @change="handleImageChoosen"
                />
            </div>
            <div v-else class="image-wrapper">
                <img
                    width="200"
                    :src="imageFileUrl" 
                    class="uploaded-image error"
                />                
                <v-btn
                color="error"
                class=" mt-1"
                @click="clearImage"
                >
                <v-icon left>
                    mdi-delete
                </v-icon>
                Sil
                </v-btn>
            </div>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageFile: null,
      imageFileUrl: null,
    };
  },
  methods: {
    chooseImage() {
      this.$refs.imageInput.click();
    },
    handleImageChoosen(e) {
      const files = e.target.files;
      
			if(files[0] !== undefined) {
        // console.log(files[0]);
				if(files[0].name.lastIndexOf('.') <= 0) {
					return
        }
        
        const fr = new FileReader();
        
        fr.readAsDataURL(files[0]);
        
				fr.addEventListener('load', () => {
          // image base64 hali
          this.imageFileUrl = fr.result; 
          // Image bilgileri
          this.imageFile = files[0]; 
          console.log(this.imageFile);
          this.$store.commit("setImagePerson",this.imageFileUrl);
        });
			} else {
			  this.clearImage();
      }     
    },
    clearImage() {
      this.imageFile = null;
      this.imageFileUrl = null; 
    }
  }
};
</script>

<style lang="scss" scoped>
  #imageInput {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }
  .uploader-wrapper, .image-wrapper {
    margin: 5px auto;
  }  
  .image-dropzone {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 180px;
    margin: 0 auto;
    border: 2px dashed #ccc;
    cursor: pointer;
  }  
  .image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
     
    .clear-button {
      margin-top: 10px;
    }
  }
</style>