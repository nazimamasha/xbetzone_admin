<template>
  <!--begin::Statistics Widget 2-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body d-flex align-items-center py-0">
      <div class="d-flex flex-column flex-grow-1 py-2 py-lg-10 me-2 h-100">
        <span class="fw-semobold text-gray-800 fs-1">{{ description }}</span>
        <div class="pt-3" v-if="value != null">
          <span class="fw-bold text-dark lh-sm fs-3x">
            {{ dashCurrencyFormat(value) }}
          </span>
          <div
            v-if="updownEnable && prevValue != null"
            class="d-flex align-items-center pt-7"
          >
            <span
              v-if="value > prevValue"
              class="svg-icon svg-icon-1 svg-icon-success me-1"
            >
              <inline-svg
                :src="getAssetPath('media/icons/duotune/arrows/arr094.svg')"
              />
            </span>
            <span
              v-if="value < prevValue"
              class="svg-icon svg-icon-1 svg-icon-danger me-1"
            >
              <inline-svg
                :src="getAssetPath('media/icons/duotune/arrows/arr093.svg')"
              />
            </span>

            <span class="text-gray-600 fs-2 lh-1">
              <span
                class="fw-bold me-2"
                :class="getMoreClass(value, prevValue)"
                >{{ calcMore(value, prevValue) }}</span
              >
              <span class="fs-5">{{ prevDescription }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- <img :src="avatar" alt="" class="align-self-end h-100px" /> -->
      <i class="fs-5x" :class="iconClass"></i>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Statistics Widget 2-->
</template>

<script lang="ts">
import { dashCurrencyFormat } from "@/assets/ts/utils";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "stats-widget",
  props: {
    widgetClasses: String,
    value: Number,
    prevValue: Number,
    description: String,
    prevDescription: String,
    iconClass: String,
    updownEnable: Boolean,
  },
  components: {},
  setup() {
    const calcMore = (value, prevValue) => {
      if (value === prevValue) {
        return "0";
      }
      if (value > prevValue) {
        return "+" + dashCurrencyFormat(value - prevValue);
      } else {
        return "-" + dashCurrencyFormat(prevValue - value);
      }
    };
    const getMoreClass = (value, prevValue) => {
      if (value === prevValue) {
        return "text-warning";
      }
      if (value > prevValue) {
        return "text-success";
      } else {
        return "text-danger";
      }
    };
    return {
      getAssetPath,
      dashCurrencyFormat,
      calcMore,
      getMoreClass,
    };
  },
});
</script>
