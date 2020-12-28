<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <Search/>
        <v-row 
          class="d-flex justify-end mx-1"
        >
          <v-btn color="primary" fab small  @click="addItem">
            <v-icon >mdi-plus</v-icon>            
          </v-btn>
        </v-row>
        <Form  v-model="showScheduleForm" :title="title"/>
        <v-simple-table>   
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  
                </th>
                <th class="text-left">
                  Ad
                </th>
                <th class="text-left">
                  Soyad
                </th>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in getFilteredList"
                :key="item.id"
              >
                <td>
                  <v-img
                    class="rounded-lg my-1"
                    lazy-src="https://cdn.vuetifyjs.com/images/john.jpg"
                    max-height="100"
                    max-width="100"
                    :src="item.avatar"
                  ></v-img>
                </td>
                <td>{{ item.first_name }}</td>
                <td>{{ item.last_name }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <v-btn
                    class="mx-1 my-1"
                    color="success"
                    fab
                    small
                    dark
                    @click="editItem(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    color="error"
                    small
                    fab
                    @click="openPopup(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <DeletePopup/>
        <v-snackbar
          v-model="snackbar"
          :timeout="3000"
          :color="color"
        >
          {{ getStatus }}

          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Kapat
            </v-btn>
          </template>
        </v-snackbar>
        <template>
        <div class="text-center my-1">
          <v-pagination
            v-model="Page"
            :length="getPage"
            circle
          ></v-pagination>
        </div>
      </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Search from './Search';
  import ImageInput from './ImageInput';
  import DeletePopup from './DeletePopup';
  import Form from './Form';
  export default {
    data: () => ({
      showScheduleForm: false,
      page: 1,
      snackbar: false,
      color: 'primary',
      title: 'Kayıt Ekle',
    }),
    computed: {
      getStatus() {
        let s = this.$store.getters.getStatus
        if( s == 201 ) {
          this.color = 'primary';
          this.snackbar = true;
          return 'Kişi başarılı şekilde eklendi.';
        }
        else if(s == 204) {
          this.color = 'error';
          this.snackbar = true;
          return 'Kişi silindi.'
        } 
        else if(s == 200) {
          this.color = 'success';
          this.snackbar = true;
          return 'Kişi güncellendi.'
        } 
        else if(s == 500) {
          this.color = 'error';
          this.snackbar = true;
          return 'İşlem başarısız'
        } 
      },
      getList() {
        return this.$store.getters.getPersons;
      },
      getPage() { 
        return this.$store.getters.getTotalPage;
      },
      getFilteredList() {
        let filterList = this.$store.state.personList;
        let word = this.$store.state.searchWord;
        if(word == null ) {
          return this.$store.getters.getPersons;
        } 
        else if(filterList.length !== 0 || filterList === undefined) {
          return filterList;
        }
      },
      Page: {
        get() {
          return this.$store.getters.lastPage;
        },
        set(value) {
          //console.log(value);
          this.changeList(value);
          this.$store.commit("changePage",value);
        }
      },
    },
    components : {
      Search,
      ImageInput,
      Form,
      DeletePopup
    },
    methods: {
      changeList(id) {
        this.$store.dispatch("getList",id);
      },
      closeDialog(){
        this.showEdit = false;
      },
      addItem () {        
        this.title = 'Kayıt Ekle';
        this.showScheduleForm=true;
        this.$store.commit("putPerson", this.person);
      },
      editItem (item) {
        this.title = 'Kayıt Güncelle';
        this.showScheduleForm=true;
        this.$store.commit("putPerson", item);
      },
      openPopup(item) {
        this.$store.commit("putPerson", item);
        return this.$store.commit("changeShowPopup",true);
      }
    },
  }
</script>