<template>
  <v-container>
    <v-row justify="center">
    <v-dialog :value="value"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container >
            <ImageInput/>
            <v-row class="d-flex justify-center">             
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="Person.first_name"
                  label="Ad" 
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="Person.last_name"
                  label="Soyad"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row >  
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                  <v-text-field
                  v-model="Person.email"
                  label="E-mail"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <p class="red--text font-weight-light" >{{ message }}</p>
          </v-container> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
          >
            Çıkış
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="savePerson"
          >
            Kaydet
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-container>
</template>
<script>
import ImageInput from './ImageInput'
export default {
   props: {
     value: Boolean,
     title: String,
  },
  data() {
    return {
      message: '',
      emailRules: [
        v => !!v || 'E-mail gereklidir',
        v => /.+@.+/.test(v) || 'E-mail geçerli değil',
      ],
    }
  },
  components: {
     ImageInput,
  },
  computed : {
    Person: {
      get() {        
        return this.$store.getters.getPerson;
      },
      set(value) {   
      }
    },
  },
  methods: {
    closeDialog(){
        this.$emit('input', false); 
        this.message = '';
        // this.$store.commit("editPerson", this.person);
    },
    savePerson() {

      let person = this.$store.state.person;

      if(person.first_name.trim() == '') {
        this.message = "Adınızı giriniz !!";
      }
      else if(person.last_name.trim() == '') {
        this.message = "Soyadınızı giriniz !!" ;
      }
      else if(person.email.trim() == '') {
        this.message = "Email giriniz !!";
      }
      else {

        if(this.title == 'Kayıt Ekle') {
          // Eklenen kişi listenin sonunda gösterme
          if(this.$store.getters.lastPage != this.$store.getters.getTotalPage)
          {
            this.$store.dispatch("getList",2);
            this.$store.commit("changePage",2);
          }
          this.$store.dispatch("newPerson");
          // this.$store.dispatch("newPerson", {...this.person});
        }
        else if(this.title == 'Kayıt Güncelle') {
          // console.log("Güncel data :", this.$store.getters.getPerson);
          this.$store.dispatch("updatePerson");
        }
        this.closeDialog();
      }

    },
  },
      
}
</script>