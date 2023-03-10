<script setup>
    import { ref, reactive, computed } from "vue"

</script>

<template>
    <el-container>
        <el-aside id="SideBar" width="128px">
            <router-link to="/">通用计算器</router-link>
            <router-link to="/ex">EX</router-link>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<style scoped>
    #SideBar {
        display: flex;
        flex-direction: column;
    }
</style>
