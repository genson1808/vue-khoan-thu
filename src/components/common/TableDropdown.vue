<template>
  <div
    :style="{ width: width + 'px' }"
    class="FormSelect"
    @blur.capture="handleBlur"
  >
    {{ option }}
    <span :id="`${_uid}-label`">
      {{ label }}
    </span>
    <div class="FormSelect__control">
      <button
        :style="{ width: width + 'px' }"
        ref="buttonRef"
        :id="`${_uid}-button`"
        aria-haspopup="listbox"
        :aria-labelledby="`${_uid}-label ${_uid}-button`"
        :aria-expanded="optionsVisible"
        class="FormSelect__button"
        @click="toggleOptions"
        @keyup.up.down.prevent="showOptions"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
      >
        {{ option }}
        <span v-if="!option" class="FormSelect__placeholder">
          {{ placeholder }}
        </span>
        <SvgAngle
          class="FormSelect__icon"
          :class="{ 'FormSelect__icon--rotate-180': optionsVisible }"
        />
      </button>
      <ul
        v-if="!isMutileColumn"
        v-show="optionsVisible"
        ref="optionsRef"
        tabindex="-1"
        role="listbox"
        :aria-labelledby="`${_uid}-label`"
        :aria-activedescendant="activeDescendant"
        class="FormSelect__options"
        @focus="setupFocus"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
        @keydown.up.down.prevent
        @keydown.enter.esc.prevent="reset"
      >
        <li
          v-for="(option, index) in options"
          :key="option.label || option"
          :id="`${_uid}-option-${index}`"
          :aria-selected="activeOptionIndex === index"
          :class="activeOptionIndex === index && 'has-focus'"
          class="FormSelect__option"
          ref="dropdownItems"
          role="option"
          @click="handleOptionClick(option)"
        >
          {{ option.label || option }}
        </li>
      </ul>
      <div v-else v-show="optionsVisible" ref="optionsRef" class="tableFixHead">
        <table class="table">
          <thead v-if="hasShowHeader">
            <tr>
              <th v-for="(v, i) in tableHeaders" :key="i">
                {{ v }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(option, index) in options"
              :key="index"
              :tabindex="index"
              :id="`${_uid}-option-${index}`"
              :aria-selected="activeOptionIndex === index"
              :class="activeOptionIndex === index && 'has-focus'"
              class="FormSelect__option"
              role="option"
              ref="dropdownItems"
              @click="handleOptionClick(option)"
              @focus="setupFocus"
              @keyup.up.prevent="selectPrevOption"
              @keyup.down.prevent="selectNextOption"
              @keydown="search"
              @keydown.up.down.prevent
              @keydown.enter.esc.prevent="reset"
            >
              <CellData
                :buildWithProps="buildWithProps"
                :propsMapping="propsMapping"
                :data="option"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgAngle from "./SvgAngle.vue";
import CellData from "@/components/common/Dropdown/CellData.vue";
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { nanoid } from "nanoid";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Select",
  },
  options: {
    type: Array,
    default: () => [],
  },
  option: {
    type: [String, Number],
    default: "",
  },
  isMultipleColumn: {
    type: Boolean,
    default: false,
  },
  hasShowHeader: {
    type: Boolean,
    default: false,
  },
  headers: {
    type: Array,
    default: () => [],
  },
  propsMapping: {
    type: Array,
    default: () => [],
  },
  width: {
    type: Number,
    require: false,
  },
});

const emit = defineEmits(["update:option"]);

const _uid = nanoid();

// biến giữ status show dropdown
let optionsVisible = ref(false);
// Biến giữ table header label
const tableHeaders = ref([""]);

const buildWithProps = ref(false);

/*
khi component mounted thì check có prop header không
nếu không có thì lấy tên properties làm header label
@Authors: SONTB(18/12/2022)
*/
onMounted(() => {
  let headersLength = props.headers.length;
  let propsMLength = props.propsMapping.length;
  let keysArr = Object.keys(props.options[0]);
  if (props.isMutileColumn && headersLength) {
    if (headersLength > 0) {
      if (
        (headersLength != propsMLength && headersLength == keysArr.length) ||
        headersLength === propsMLength
      ) {
        buildWithProps.value = headersLength === propsMLength ? true : false;
        tableHeaders.value = props.headers;
      } else {
        tableHeaders.value = Object.keys(props.options[0]).map((val) => val);
      }
    } else {
      tableHeaders.value = Object.keys(props.options[0]).map((val) => val);
    }
  }
});

const root = ref(null);
const buttonRef = ref(null);
const optionsRef = ref(null);
const dropdownItems = ref(null);

/* Index item đang active */
const activeOptionIndex = computed(() => {
  return props.options.findIndex(
    (x) => x.value === props.option || x === props.option
  );
});

/* Index item trước đó */
const prevOptionIndex = computed(() => {
  const next = activeOptionIndex.value - 1;
  let prev = next >= 0 ? next : props.options.length - 1;
  return prev;
});

/* Index item tiếp theo */
const nextOptionIndex = computed(() => {
  const next = activeOptionIndex.value + 1;
  return next <= props.options.length - 1 ? next : 0;
});

/* Định danh sử dụng cho accessibility */
const activeDescendant = computed(() => `${_uid}-option-${activeOptionIndex}`);

/* Theo dõi index của item active để scroll view dropdown */
watch(activeOptionIndex, scrollIntoView);

/* Tính toán scroll dropdown */
function scrollIntoView() {
  nextTick();
  dropdownItems.value[activeOptionIndex.value].scrollIntoView({
    block: "center",
    behavior: "smooth",
  });
}

/**
 * @param {any} option
 * Xử lý khi selected item
 */
function handleOptionClick(option) {
  emit("update:option", option);
  reset();
}

function handleBlur(e) {
  // if (root.value.contains(e.relatedTarget)) return;
  // hideOptions();
}

/* Toggle options */
function toggleOptions() {
  optionsVisible.value ? hideOptions() : showOptions();
}

/* Handle show options */
async function showOptions() {
  optionsVisible.value = true;
  await nextTick();
  optionsRef.value.focus();
}

/* Handle hide options */
function hideOptions() {
  optionsVisible.value = false;
}

/* Reset options */
async function reset() {
  hideOptions();
  await nextTick();
  buttonRef.value.focus();
}

/* Focus item selected */
function setupFocus() {
  if (props.option) return;
  emit("update:option", props.options[0]);
}

/* Handle select previous option */
function selectPrevOption() {
  emit("update:option", props.options[prevOptionIndex.value]);
}

/* Handle select nect option */
function selectNextOption() {
  emit("update:option", props.options[nextOptionIndex.value]);
}
</script>

<style lang="scss" scoped>
.FormSelect {
  &__control {
    display: block;
    padding: 0.75em;
    width: 100%;
    border: 1px solid;
    border-radius: 0.1875em;
    outline: none;
    background-color: #fff;
    transition: border-color 0.2s;
    line-height: 1;
    position: relative;

    &:focus,
    &:focus-within,
    &--focus {
      border-color: var(--main-color);
      // box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    position: relative;
    padding: 0;
  }

  &__button {
    width: 100%;
    max-height: 32px;
    display: flex;
    justify-content: space-between;
    padding: 0.75em;
    background-color: transparent;
    border: none;
    outline: none;
  }

  &__placeholder {
    color: #979797;
  }

  &__icon {
    transition: transform 0.2s;

    &--rotate-180 {
      transform: rotate(180deg);
    }
  }

  &__options {
    position: absolute;
    top: calc(100% + 3px);
    z-index: 2;
    width: 100%;
    background-color: #fff;
    margin: 0;
    padding: 0;
    list-style-type: none;
    outline: none;
    border-radius: 4px;
    box-shadow: rgb(136 136 136) 0px 0px 6px;
  }

  &__option {
    padding: 0.75em;
    cursor: default;

    &.has-focus {
      background-color: #ceebdc;
    }
  }
  .tableFixHead {
    overflow: auto;
    height: 100px;
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    min-width: 100%;
    border-radius: 4px;
  }
  .tableFixHead thead th {
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #eee;
    white-space: nowrap;
  }

  /* Just common table stuff. Really. */
  table {
    /* border-collapse: collapse; */
    width: 100%;
    /* border: 0px; */
  }

  table tr {
    height: 26px;
  }

  th,
  td {
    padding: 8px 16px;
  }
  th {
    background: #eee;
  }

  /* width */
  .tableFixHead::-webkit-scrollbar {
    max-width: 5px;
  }

  /* Track */
  .tableFixHead::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 40px;
  }

  /* Handle */
  .tableFixHead::-webkit-scrollbar-thumb {
    background: #acacac;
    border-radius: 20px;
  }

  /* Handle on hover */
  .tableFixHead::-webkit-scrollbar-thumb:hover {
    background: #c2c2c2;
  }
}
</style>
