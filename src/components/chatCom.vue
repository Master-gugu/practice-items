<template>
    <div class="chatCom">
        {{ chatText }}
        <mapCom></mapCom>
    </div>
</template>

<script>
import mapCom from './mapCom.vue'
export default {
    name: 'chatCom',
    data () {
        return {
            chatText: '展示'
        }
    },
    components: {
        mapCom
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.chatCom {

}
</style>