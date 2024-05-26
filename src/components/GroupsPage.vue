<template>
    <div class="groups-feature">
        <div class="groups">
            <div class="groups-left">
                <div class="group-name"></div>
                <div class="group-founder"></div>
            </div>
            <div class="groups-right">
                <div class="group-desc"></div>
                <div class="group-button">
                    <!-- <button v-if="!isMember(group)" @click="joinGroup(group)">Join</button>
                    <button v-else>Already joined</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'GroupsPage',
    computed: {
    },
    methods: {
    },
    created() {
    }
};
</script>

<style scoped>
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
    .groups-feature {
        background-color: rgba(210, 243, 224, 0.754);
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.357);
    }
    .groups {
        display: flex;
    }
    .groups-left {
        width: 30%;
        padding: 20px;
        border-right: 1px solid rgba(0, 0, 0, 0.357);
    }
    .group-name {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        padding: 5px;
    }
    .group-founder {
        border-top: 1px solid black;
        display: flex;
        align-items: center;
        padding: 5px;
        font-size: 12px;
        font-weight: bold;
    }
    .groups-right {
        display: flex;
        width: 70%;
    }
    .group-desc {
        font-size: 14px;
        padding: 20px;
        width: 80%;
    }
    .group-button {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .none {
        display: none;
    }

</style>