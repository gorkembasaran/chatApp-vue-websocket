<template>
    <div class="createPage">
      <div class="cgName">
        Group name:
        <input v-model="groupName" class="cgNameInput" type="text" />
      </div>
      <div class="cgDesc">
        Group description:
        <input v-model="groupDesc" class="cgDescInput" type="text" />
      </div>
      <div class="saved">
        <button @click="createGroup">Create</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'CreatePage',
    data() {
      return {
        groupName: '',
        groupDesc: ''
      };
    },
    methods: {
      ...mapActions(['createGroup']),
      async createGroup() {
        try {
            await this.$store.dispatch('createGroup', { groupName: this.groupName.trim(), groupDesc: this.groupDesc.trim() });

            this.$router.push('/');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    }
    }
  };
  </script>
  
  
  
  
  
  <style scoped>
  .createPage {
    display: flex;
    flex-direction: column;
  }
  .cgName, .cgDesc {
    margin-bottom: 10px;
  }
  .cgNameInput, .cgDescInput {
    width: 100%;
    padding: 5px;
  }
  .saved {
    text-align: center;
  }
  .saved button {
    padding: 10px 20px;
  }
  </style>
  