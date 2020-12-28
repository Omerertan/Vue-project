import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex, axios);


export const store =  new Vuex.Store({
  state: {
    persons: [],
    page: 1,
    total_page: 0,
    status: 0,
    person: {},
    personList: [],
    searchWord: null,
    filteredPerson: null,
    showPopup: false,
  },
  getters: {
    getSearchWord(state) {
      return state.persons;
    },
    getPersons(state) {
      return state.persons;
    },
    getPerson(state) {
      return state.person;
    },
    getTotalPage(state) {
      //console.log('Toplam sayfa sayısı: ', state.total_page);
      return state.total_page;
    },
    getStatus(state) {
      //console.log(state.status);
      return state.status;
    },
    lastPage(state) {
      return state.page;
    },
    getShowPopup(state) {
      return state.showPopup;
    }
  },
  mutations: {
    addSearchWord(state, word) {

      // Gelen değer null ise state değiştirme
      state.personList=  [];
      if (!(word) || word === '{}') {
        state.searchWord = null;
        state.filteredPerson = null;
        // state.filteredCourses = null
      }
      else {
        state.searchWord = word;
        word = word.trim().toLowerCase();
        var s = state.persons.filter((item) => {
          return item.first_name.toLowerCase().includes(word)          
        });
        if(s.length != 0) {            
          s.forEach(element => {
            state.personList.push(element);
          });
        }
      }
    },
    addPersonList(state, person) {
      state.persons.push(person);
      //console.log(state.persons);
      state.searchWord = null;
      setTimeout(() => {
        state.status = 0;
      }, 3000);
    },
    updatePersonList(state) {
      if(state.personList.length !== 0 || state.personList !== undefined) { 
        let sayi2 = state.personList.findIndex(x => x.id === state.person.id);       
        Vue.set(state.personList, sayi2, state.person);
        //console.log("update personList:",state.personList);
      }
      let sayi = state.persons.findIndex(x => x.id === state.person.id);
      Vue.set(state.persons, sayi, state.person);
      //console.log("update son:",state.persons);
      state.searchWord = null;
      setTimeout(() => {
        state.status = 0;
      }, 3000);
    },
    removePersonList(state, item) {
      if(state.personList.length !== 0 || state.personList !== undefined) {
        state.personList.splice(state.personList.findIndex(x => x.id === item.id),1);
      }
      state.persons.splice(state.persons.findIndex(x => x.id === item.id),1);
      state.searchWord = null;
      setTimeout(() => {
        state.status = 0;
      }, 3000);
    },
    updateStatus(state, number) {
      state.status = number;
    },    
    removeStatus(state) {
      state.status = 0;
    },
    putPerson(state,edit) {
      //console.log("put",edit);
      state.person = {...edit};
      //state.person = edit;
    },
    setImagePerson(state, base64) {
      //console.log("avatar geldi");
      state.person.avatar = base64;
    },
    totalPage(state, total) {
      state.total_page = total;
    },
    changePage(state, n) {
      state.page = n;
    },
    changeShowPopup(state, value) {
      state.showPopup = value;
    }
  },
  actions: {
    async getList({ commit, state },number) {
      // Axios kişiler listesini çekme
      await axios.get('https://reqres.in/api/users?page='+number)
      .then(response => {
        //console.log(response.data.data);
        state.persons = [];
        
        let dataList = response.data.data
        for (let i in dataList) {
          commit("addPersonList", dataList[i]);
        }
        commit("totalPage", response.data.total_pages);    
        //console.log(state.persons);    
      })  
    },
    async newPerson({ commit, state }, newp) {
      // Axios kişi ekleme işlemi 
      
      await axios.post('https://reqres.in/api/users', state.person)
      .then((response) => {       

        state.person.id = response.data.id;  
        //console.log(state.person); 
        commit('addPersonList', state.person);

        // Request status değerini state atamak
        commit('updateStatus', response.status);

      })
      .catch(e => console.log(e));
    },
    async updatePerson({ commit, state }) {
      //console.log("person",state.person);
      await axios.put('https://reqres.in/api/users/'+state.person.id, state.person)
      .then((response) => {        

        commit('updatePersonList');
        // console.log(response.state.person);

        // Request status değerini state atamak
        commit('updateStatus', response.status);

      })
      .catch(e => console.log(e));
    },
    async removePerson({ commit, state }) {
      await axios.delete('https://reqres.in/api/users/'+state.person.id)
      .then(response => {

        
        commit('removePersonList', state.person);
        
        commit('updateStatus', response.status);
        
      }).catch(e => console.log(e));
    },
  },
});
