<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-nav navbar-nav-left">
        <h1 class="nav-title">Lập kế hoạch thu</h1>
      </div>
      <div class=".navbar-nav navbar-nav-right">
        <div class="school__display pointer">
          <div class="school__icon"></div>
          <div class="school__name">
            [Thí điểm] Trường tiểu học Edu Platform 4
          </div>
        </div>
        <el-select
          :show-arrow="false"
          filterable
          v-model="value"
          class="m-2"
          placeholder="Select"
        >
          <el-option
            v-for="(item, i) in options"
            :key="i"
            :label="item"
            :value="item"
          />
        </el-select>
        <div class="btn guide__btn">Hướng dẫn</div>
        <div class="split"></div>
        <div class="data__search pointer"></div>
        <div class="noti pointer">
          <div class="noti-alert">9+</div>
        </div>
        <div class="user-info-container">
          <div class="avatar pointer"></div>
          <span class="user-name pointer">admin</span>
          <div class="icon-dropdown pointer"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import Dropdown from "@/components/common/Dropdown.vue";
import { ref } from "vue";

const selectedYear = ref("2020-2021");

const schoolYears = new Map();
schoolYears.set("2021-2022", "2021-2022");
schoolYears.set("2020-2021", "2020-2021");

const value = ref("");

let options = ref(["2020-2021", "2021-2022", "2022-2023"]);
</script>

<style lang="scss" scoped>
li.el-select-dropdown__item.selected {
  color: #03ae66 !important;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  --el-fill-color-light: #ceebdc;
}

.header {
  width: 100%;
  height: 48px;
  background-color: #ffffff;
  position: relative;
  z-index: 1;

  .navbar {
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    box-shadow: 3px 1px 3px 2px #e0e0e0;

    .navbar-nav {
      display: flex;
      align-items: center;
    }

    .navbar-nav-left {
      .nav-title {
        font-size: 16px;
        font-family: OpenSans Semibold;
      }
    }

    .navbar-nav-right {
      display: flex;
      align-items: center;

      .school__display {
        display: flex;
        align-items: center;
        border: solid 1px #ebebf2;
        border-radius: 4px;
        margin-right: 16px;

        .school__icon {
          background-image: url("@/assets/Icons/school_icon.svg");
          background-repeat: no-repeat;
          background-size: cover;
          width: 32px;
          height: 32px;
        }

        .school__name {
          padding: 7px 10px 7px 10px;
        }
      }
      .el-select {
        width: 120px;
        margin-right: 16px;
        --el-select-input-focus-border-color: var(--focus-border-color);
      }

      .noti {
        background-image: url("@/assets/Icons/noti.svg");
        width: 22px;
        height: 25px;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        margin-right: 16px;

        .noti-alert {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #fff;
          background-color: #ff6666;
          position: absolute;
          top: 0;
          right: -5px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }
      }

      .select_year {
        margin-right: 16px;
      }

      .guide__btn {
        border-radius: 4px;
        color: #03ae66;
        background-color: #b6e4cb;
      }

      .data__search {
        background-image: url("@/assets/Icons/zeplin.svg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 32px;
        height: 32px;
        margin-right: 16px;
      }

      .split {
        border-right: solid 1px #ebebf2;
        height: 26px;
        margin: 6px 5px 5px 5px;
        margin-right: 11px;
      }

      .user-info-container {
        display: flex;
        align-items: center;

        .user-name {
          margin: 0 8px;
          color: #000;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .icon-dropdown {
          background: url("@/assets/Icons/ic_sprites.svg") no-repeat -185px -165px;
          width: 11px;
          height: 7px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          background-image: url("@/assets/Icons/avt.png");
          background-size: cover;
        }
      }
    }
  }
}
</style>
