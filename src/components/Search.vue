<template>
  <v-col
    cols="12"
    sm="12"
    md="12"
    class="px-0"
  >
    <v-text-field
      label="Solo"
      placeholder="Aramak istediğiniz kullanıcı..."
      solo 
      v-model="searchWord"> 
    </v-text-field>
  </v-col>
</template>
<script>
  export default {
    data: () => ({
    }),
    computed: {
      searchWord: {
      get () {
        return this.$store.state.searchWord;
      },
      set (value) {
        this.$store.commit('addSearchWord', value)
      }
    }
  }
}
</script>