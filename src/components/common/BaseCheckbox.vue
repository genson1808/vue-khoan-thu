<template>
    <div class="ccb">
        <el-checkbox :value="modelValue">
        </el-checkbox>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

</script>

<style lang="scss" scoped>
// ::v-deep .el-checkbox__inner {
//     background-color: greenyellow !important;
//     --el-checkbox-checked-bg-color: red;
//     border: 1px solid red !important;
// }

.ccb .el-checkbox .is-checked .el-checkbox__inner::after {
    border-color: #ffffff;
}

.ccb .el-checkbox .is-checked .el-checkbox__inner span {
    color: #40adfb;
}
</style>