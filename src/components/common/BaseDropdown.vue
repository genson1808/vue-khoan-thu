<template>
  <div class="FormSelect" @keydown.tab="tabKeyPressed = true" @blur="handleBlur">
    <span :id="`${_uid}-label`">{{ label }}</span>
    <div class="FormSelect__control">
      <input
        v-if="!tabKeyPressed"
        aria-hidden="true"
        class="u-visually-hidden"
        @focus="handleFocusTrap"
        :value="modelValue.value"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
        @keydown="search"
        @keydown.up.down.prevent
        @keydown.enter.esc.prevent="toggleOptions"
      >
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
        @keydown="search"
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
        >{{ option.label || option }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from "vue";

let optionsVisible = ref(true);
const keysSoFar = ref("");
const tabKeyPressed = ref(false);
let _uid = 1;

// const optionsRef = ref(null);

const props = defineProps({
    options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const activeOptionIndex = computed(() => {
    return props.options.findIndex(
    x => x.value === props.modelValue.value || x === props.modelValue.value);
})
const prevOptionIndex = computed(() => {
    const next = activeOptionIndex.value - 1;
    return next >= 0 ? next : props.options.length - 1;
})
const nextOptionIndex = computed(() => {
    const next = activeOptionIndex.value + 1;
    return next <= props.options.length - 1 ? next : 0;
})

const activeDescendant = computed(() => {
    return `${_uid}-option-${activeOptionIndex.value}`;
})

async function handleFocusTrap(e) {
    optionsVisible.value = true;
    await nextTick();
}
function handleOptionClick(option) {
    emit("update:modelValue", option);
    reset();
}
function handleBlur(e) {
    if (this.$el.contains(e.relatedTarget)) return;
    this.hideOptions();
}

function toggleOptions() {
  optionsVisible.value ? hideOptions() : showOptions();
}

async function showOptions() {
  optionsVisible.value = true;
  await nextTick();
//   optionsRef.focus();
}

function hideOptions() {
  optionsVisible.value = false;
}

async function reset() {
  hideOptions();
  await nextTick();
}

function setupFocus() {
  if (props.value) return;
  emit("update:modelValue", props.options[0]);
}
function selectPrevOption() {
    showOptions()
    emit("update:modelValue", props.options[prevOptionIndex.value]);
}
function selectNextOption() {
    showOptions()
    emit("update:modelValue", props.options[nextOptionIndex.value]);
}
</script>

<style lang="scss" scoped>
.FormSelect {
  &__control {

    position: relative;
    padding: 0;
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: transparent;
    border: none;
    outline: none;
  }

  &__placeholder {
    color: greenyellow;
  }

  &__icon {
    transition: transform 0.2s;

    &--rotate-180 {
      transform: rotate(180deg);
    }
  }

  &__options {
    margin: 0;
    padding: 0;
    list-style-type: none;
    outline: none;
  }

  &__option {
    padding: 10px;
    cursor: default;

    &.has-focus {
      background-color: rgba(#80bdff, 0.25);
    }
  }
  li:hover {
    background-color: greenyellow;
  }
}
</style>
