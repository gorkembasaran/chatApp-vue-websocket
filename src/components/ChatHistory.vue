<template>
    <div class="chat-feature none">
      <div class="groupName">
        Grubun Adı: {{ group }}
      </div>
      <div class="chatHistory">
        <div v-for="message in messages" :key="message.timestamp">
          <strong>{{ message.user }}:</strong> {{ message.message }}
        </div>
      </div>
      <div class="chatInput">
        <input v-model="newMessage" placeholder="Mesajınızı yazın..." />
        <button @click="sendMessage">Gönder</button>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        newMessage: ''
      };
    },
    computed: {
    },
    methods: {
    },
    mounted() {
    }
  };
</script>

  <style scoped>
  .chat-feature {
    display: flex;
    flex-direction: column;
    height: 600px;
  }
  .groupName {
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
  }
  .chatHistory {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
  }
  .messages {
    margin-bottom: 10px;
  }
  .messagesSelf {
    text-align: right;
  }
  .person, .personSelf {
    font-weight: bold;
  }
  .msg {
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 5px;
    display: inline-block;
  }
  .date {
    font-size: 12px;
    color: #888;
  }
  .chatInput {
    display: flex;
    padding: 10px;
  }
  .textInput {
    flex-grow: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .textButton {
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(250, 235, 215, 0.298);
    border: 1px solid rgba(0, 0, 0, 0.519);
    transition: background 0.5s ease;
  }
  .textButton:hover {
    background-color: rgba(156, 246, 176, 0.512);
    cursor: pointer;
  }
  </style>
  