<template>
  <div class="wrapper">
    <el-tabs type="border-card">
      <el-tab-pane label="Quy trình">
        <BaseCheckbox />
      </el-tab-pane>
      <el-tab-pane label="Danh sách khoản thu">
        <Dropdown :data="options" modelValue="singleValue"/>
      </el-tab-pane>
      <el-tab-pane label="Phụ huynh đăng ký" />
      <el-tab-pane label="Đăng ký khoản thu" />
      <el-tab-pane label="Danh sách miễn giảm">
        <div class="tool__bar">
          <div class="tool__left">
            <span class="view__label">xem theo</span>
            <div class="radio__group">
              <div class="view__by__student">
                <label class="container">
                  <input
                    type="radio"
                    value="view-by-student"
                    checked="checked"
                    name="view_by"
                  />
                  <span class="checkmark"></span>
                </label>
                <span class="label">Học sinh </span>
              </div>
              <div class="view__by__fee">
                <label class="container">
                  <input
                    type="radio"
                    value="view-by-fee"
                    checked="checked"
                    name="view_by"
                  />
                  <span class="checkmark"></span>
                </label>
                <span class="label">Doanh thu </span>
              </div>
            </div>
          </div>
          <div class="tool__right">
            <div class="btn btn__add btn--green ml-8">Thêm</div>
            <div class="btn btn__quick_add btn--green ml-8">Thêm nhanh</div>
            <div class="btn btn__delete btn--white ml-8"></div>
            <div class="btn btn__print btn--white ml-8">
              <span class="icon__delete"></span>
            </div>
            <div class="btn btn__more btn--white ml-8">
              <span class="icon__more"></span>
            </div>
          </div>
        </div>

        <el-table
          :data="tableData"
          border
          style="width: 100%"
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
          :cell-style="{ textAlign: center }"
        >
          <el-table-column
            align="center"
            class="cb-column"
            type="selection"
            width="42"
          />
          <el-table-column prop="date" align="center" :min-width="100">
            <template #header>
              <div class="label__column">Tên học sinh</div>
              <!-- <div class="wrap__filter">
              <div class="filter__picker"></div>
              <input type="text" class="filter__input">
            </div> -->
            </template>
          </el-table-column>
          <el-table-column :align="center" align="center" prop="name">
            <template #header>
              <div class="label__column">Ngày sinh</div>
              <!-- <div class="wrap__filter">
              <div class="filter__picker"></div>
              <input type="date" class="filter__input">
            </div> -->
            </template>
          </el-table-column>
          <el-table-column prop="address" :min-width="100" align="center">
            <template #header class="cus-header">
              <div class="label__column">Lớp</div>
            </template>
          </el-table-column>
          <el-table-column prop="test2" align="center">
            <template #header class="cus-header">
              <div class="label__column">Mức miễn giảm</div>
            </template>
          </el-table-column>
          <el-table-column prop="test2" align="center">
            <template #header class="cus-header">
              <div class="label__column">Khoản thu</div>
            </template>
          </el-table-column>
          <el-table-column prop="test2" align="center">
            <template #header class="cus-header">
              <div class="label__column">Thời gian miễn giảm</div>
            </template>
          </el-table-column>
          <el-table-column prop="test2" align="center">
            <template #header class="cus-header">
              <div class="label__column">Diện miễn giảm</div>
            </template> </el-table-column
          >p
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Danh sách áp dụng chính sách giá"> </el-tab-pane>
    </el-tabs>
  </div>

  <FeeExemptionForm />
</template>

<script setup>
import { ref } from "vue";
import { ElTable } from "element-plus";
import BaseCheckbox from "@/components/common/BaseCheckbox.vue";
import FeeExemptionForm from "@/components/ui/pages/FeeExemption/FeeExemptionForm.vue";
import Dropdown from "@/components/common/Dropdown.vue";

const multipleTableRef = ref(null);
const multipleSelection = ref([]);

const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value.clearSelection();
  }
};

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(val);
};

let options = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];
let singleValue = ref("1");

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style lang="scss" scoped>
.el-tabs--border-card {
  // border: transparent;
  --el-color-primary: #0fa655;
  --el-tabs-header-height: 38px;
  box-sizing: border-box;
  border: 0px;
}

::v-deep .el-tabs__header.is-top {
  border-bottom: 0px;
  background-color: #f6f6f6;
}
::v-deep .el-tabs__item.is-top {
  height: 100%;
  border: 0px;
  border-top: 4px solid transparent;
  height: 38px;
  font-size: 13px;
  color: #ccc;
}

::v-deep .el-tabs__item.is-active {
  box-sizing: border-box;
  border: none;
  border-top: 2px solid #0fa655;
}

::v-deep .el-tabs__header.is-top {
  border-bottom-color: transparent;
}

::v-deep .el-checkbox__inner {
  width: 16px;
  height: 16px;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: transparent;
  background-image: url(@/assets/Icons/ic_Checkbox_Active.svg);
  border: none;
}

::v-deep .el-checkbox__input .el-checkbox__inner {
  background-color: transparent;
  background-image: url(@/assets/Icons/ic_Checkbox_inactive.svg);
  border: none;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner::after {
  display: none;
}

.label__column {
  color: #000;
  margin-top: -1px;
  margin-bottom: 7px;
  text-align: center;
}
.wrap__filter {
  display: flex;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  min-width: 30px;
  min-width: 100%;
  margin-left: -6px;
  margin-right: -6px;
  height: 24px;
  align-items: center;
  justify-items: space-between;
  background-color: white;

  .filter__picker {
    background-image: url(@/assets/Icons/ic_Filter.svg);
    background-repeat: no-repeat;
    background-size: cover;
    width: 20px;
    height: 20px;
  }

  .filter__input {
    flex: 1;
    border: none;
    min-width: 10px;
    margin: 5px 10px;

    &:focus {
      border: none;
      outline: none;
    }
  }
}

::v-deep .el-table th.el-table__cell {
  background-color: #f5f6fa;
  color: #000;
}

::v-deep .el-tabs--border-card > .el-tabs__content {
  padding-left: 12px;
  padding-right: 12px;
}

.cus-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool__bar {
  height: 33px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tool__left {
    display: flex;

    .view__label {
      margin-right: 26px;
      font-size: 13px;
    }

    .radio__group {
      display: flex;
      justify-content: center;

      .view__by__student {
        display: flex;
        margin-right: 8px;
        align-items: center;

        .label {
          padding-left: 4px;
        }
      }
      .view__by__fee {
        display: flex;
        .label {
          padding-left: 4px;
        }
        align-items: center;
      }
    }
  }

  .tool__right {
    display: flex;

    .ml-8 {
      margin-left: 8px;
    }

    .btn__delete {
      background-image: url(@/assets/Icons/ic_Delete_32.svg);
      background-size: cover;
      background-repeat: no-repeat;
      min-width: 32px;
      width: 32px;
      height: 32px;
      border: 0px;
    }

    .btn__print {
      min-width: 32px;
      height: 32px;
      .icon__delete {
        background: transparent url("@/assets/Icons/ic_sprites2.png") no-repeat !important;
        background-position: -845px -450px !important;
        width: 20px !important;
        height: 18px;
      }
    }

    .btn__more {
      min-width: 32px;
      height: 32px;
      .icon__more {
        width: 20px;
        height: 20px;
        background: url(@/assets/Icons/ic_More.png);
        background-position: -1106px -194px;
      }
    }
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.checkbox__btn {
  width: 20px;
  height: 20px;
}

.cb__icon {
  width: 20px;
  height: 20px;
  background-color: greenyellow;
}

/* radio custom */
.container {
  display: block;
  position: relative;
  cursor: pointer;
  width: 18px;
  height: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-image: url(@/assets/Icons/ic_Ratio_inactive.svg);
  }

  & input:checked ~ .checkmark {
    background-image: url(@/assets/Icons/ic_Ratio_Active.svg);
  }
}

.ip__cb:checked + .cb__icon {
  background-image: url(@/assets/Icons/ic_Ratio_Active.svg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
}
</style>
