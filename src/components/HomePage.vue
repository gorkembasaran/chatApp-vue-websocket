<template>
    <div class="container">
        <div class="header">
            <div class="links">
                <div class="link">Discover Groups!</div>
                <div class="link">Chats</div>
                <div class="link">Create Group</div>
            </div>
            <div class="settings" :class="logoutClass">
                <a class="exitButton" @click.prevent="logout" href="#">Exit</a>
            </div>
        </div>
        <div class="feature">
            <div class="feature-left">
                <CreatePage></CreatePage>
                <GroupsPage></GroupsPage>
                <ChatHistory :messages="messages" @sendMessage="sendMessage"></ChatHistory>
            </div>
            <div class="feature-right">
                <div class="savedGroups">
                    <div class="title">Grup Adı</div>
                    <div class="text">İçerikleri görüntülemek için tıkla!</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreatePage from './CreatePage.vue'
import GroupsPage from './GroupsPage.vue'
import ChatHistory from './ChatHistory.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'HomePage',
    components: {
        CreatePage,
        GroupsPage,
        ChatHistory
    },
    computed: {
        ...mapGetters(['messages', 'group', 'user', 'isAuthenticated'])
    },
    methods: {
        ...mapActions(['logout', 'sendMessage']),
        ...mapActions(['fetchUserGroups', 'sendMessage']),
            async showChatHistory(group) {
                this.$router.push({ name: 'ChatHistory', params: { groupId: group.id } });
            }
    },
    created() {
        this.$store.dispatch('connectWebSocket');
    }

}
</script>


<style scoped>
    .header {
        width: 100%;
        display: flex;
    }
    .links {
        display: flex;
        width: 80%;
    }
    .link {
        padding: 20px;
        background-color: rgba(113, 113, 178, 0.243);
        margin-left: 20px;
    }
    .link:hover {
        background-color: rgba(113, 113, 178, 0.439);
        cursor: pointer;
    }
    .settings {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .feature {
        display: flex;
        width: 100%;
    }
    .feature-left {
        display: flex;
        flex-direction: column;
        width: 79%;
        margin-top: 20px;
        margin-right: 5px;
    }
    
    button {
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(250, 235, 215, 0.298);
        border: 1px solid rgba(0, 0, 0, 0.519);
        transition: background 0.5s ease;
    }
    button:hover {
        background-color: rgba(156, 246, 176, 0.512);
        cursor: pointer;
    }
    .exitButton {
        text-decoration: none;
        color: black;
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(250, 235, 215, 0.298);
        border: 1px solid rgba(0, 0, 0, 0.519);
        transition: background 0.5s ease;
    }
    .exitButton:hover {
        background-color: rgba(156, 246, 176, 0.512);
        cursor: pointer;
    }
    .feature-right {
        margin-top: 30px;
        width: 20%;
        display: flex;
        flex-direction: column;
        height: 660px;
        overflow: auto;
    }
    .savedGroups {
        display: flex;
        padding: 10px;
        padding-top: 20px;
        padding-bottom: 20px;
        flex-direction: column;
        background-color: rgba(210, 227, 227, 0.226);
        border-radius: 10px;
        transition: background .6s ease;
    }
    .savedGroups:hover {
        cursor: pointer;
        background-color: rgb(210, 227, 227);
    }
    .title {
        font-size: 12px;
        font-weight: bold;
    }
    .text {
        font-size: 12px;
    }
    .select {
        background-color: rgb(170, 203, 203);
    }
    .d-none {
        display: none;
    }

</style>