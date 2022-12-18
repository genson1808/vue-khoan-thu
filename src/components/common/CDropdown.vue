<template>
  <div class="FormSelect" @blur.capture="handleBlur">
    {{ option }}
    <span :id="`${_uid}-label`">
      {{ label }}
    </span>
    <div class="FormSelect__control">
      <button
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
          role="option"
          @click="handleOptionClick(option)"
        >
          {{ option.label || option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import SvgAngle from "./SvgAngle.vue";
import { ref, computed, nextTick } from "vue";
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
});

const emit = defineEmits(["update:option"]);

const _uid = nanoid();

let optionsVisible = ref(false);

const root = ref(null);
const buttonRef = ref(null);
const optionsRef = ref(null);

const activeOptionIndex = computed(() => {
  let test = props.options.findIndex((x) => {
    console.log(x)
    console.log(props.option)
  })
  console.log("Active option", test)
    return props.options.findIndex(
    x => x.value === props.option || x === props.option);
})

const prevOptionIndex = computed(() => {
  const next = activeOptionIndex.value - 1;
  let prev = next >= 0 ? next : props.options.length - 1;
  console.log("prev--", prev);
  return prev;
});

const nextOptionIndex = computed(() => {
  const next = activeOptionIndex.value + 1;
  return next <= props.options.length - 1 ? next : 0;
});

const activeDescendant = computed(() => `${_uid}-option-${activeOptionIndex}`);

function handleOptionClick(option) {
  console.log("activeIndex", activeOptionIndex.value)
  emit("update:option", option);
  reset();
}

function handleBlur(e) {
  // if (root.value.contains(e.relatedTarget)) return;
  // hideOptions();
}

function toggleOptions() {
  optionsVisible.value ? hideOptions() : showOptions();
}

async function showOptions() {
  optionsVisible.value = true;
  await nextTick();
  optionsRef.value.focus();
}

function hideOptions() {
  optionsVisible.value = false;
}

async function reset() {
  hideOptions();
  await nextTick();
  buttonRef.value.focus();
}

function setupFocus() {
  if (props.option) return;
  emit("update:option", props.options[0]);
}

function selectPrevOption() {
  emit("update:option", props.options[prevOptionIndex.value]);
}


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
    top: 100%;
    z-index: 2;
    width: 100%;
    background-color: #fff;
    margin: 0;
    padding: 0;
    list-style-type: none;
    outline: none;
  }

  &__option {
    padding: 0.75em;
    cursor: default;

    &.has-focus {
      background-color: #ceebdc;
    }
  }
}
</style>
