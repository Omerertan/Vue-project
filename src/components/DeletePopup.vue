<template>
  <v-row justify="center">
    <v-dialog 
      persistent
       max-width="500"
      v-model="ShowPopup"
    >
      <v-card>
        <v-card-title class="headline  lighten-2">
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-2">
          Kişiyi silmek istediğinize emin misiniz ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="close"
          >
            Hayır
          </v-btn>
          <v-btn
            color="error darken-1"
            text
            @click="deleteItem"
          >
            Evet
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data () {
      return {
        
      }
    },
    methods: {
      close() {
        this.$store.commit("changeShowPopup",false);
      },
      deleteItem () {
        this.$store.dispatch("removePerson");
        this.close();
      },
    },
    computed: {      
      ShowPopup() {
        return this.$store.getters.getShowPopup;
      }
    }
  }
</script>