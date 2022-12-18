<template>
  <!-- <CDropdown
    :options="options"
    v-model:option="option"
    name="options"
    label="Pick an option below"
    empty-option-label="Select... "
  /> -->
  <TableDropdown
    :options="options"
    v-model:option="option"
    name="options"
    label="Pick an option below"
    empty-option-label="Select... "
    :width="200"
  />
  <TableDropdown
    :options="options2"
    v-model:option="option2"
    :isMultipleColumn="true"
    :hasShowHeader="true"
    name="options"
    label="Pick an option below"
    empty-option-label="Select... "
    :headers="['Tên', 'Số điện thoại']"
    :propsMapping="['name', 'phone']"
    :width="200"
  />
</template>

<script setup>
import { ref } from "vue";
import TableDropdown from "@/components/common/TableDropdown.vue";

let options = ref(["xuan", "ha", "thu", "dong"]);
let options2 = ref([
  { name: "son", phone: "0986437845", age: 18 },
  { name: "son2", phone: "0986437846", age: 19 },
  { name: "son2", phone: "0986437847", age: 20 },
  { name: "son3", phone: "0986437848", age: 21 },
  { name: "son4", phone: "0986437849", age: 22 },
]);
console.log("--", options.value[0]);
const option = ref("");
const option2 = ref("");
option.value = options.value[0];
</script>

<style lang="scss" scoped></style>
