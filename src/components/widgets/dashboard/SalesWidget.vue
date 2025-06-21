<template>
  <!--begin::Card-->
  <div class="card h-100" :class="cardClasses">
    <!--begin::Card header-->
    <div class="card-header flex-nowrap border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <!--begin::Icon-->
        <div class="w-45px bg-light h-45px me-5 rounded d-flex flex-center">
          <!-- <img :src="icon" alt="image" class="p-3" /> -->
          <i class="fs-2x" :class="icon"></i>
        </div>
        <!--end::Icon-->

        <!--begin::Title-->
        <span class="fs-4 fw-semobold text-gray-600 m-0">
          {{ title }}
        </span>
        <!--end::Title-->
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body d-flex flex-column px-9 pt-5 pb-6">
      <!--begin::Heading-->
      <!-- <div class="fs-2tx fw-bold mb-3"> -->
      <div class="fw-semibold fs-2hx" :class="valueColor" v-if="value != null">
        <span class="fs-2" v-if="isCurrency">$</span>
        {{ dashCurrencyFormat(value) }}
      </div>
      <!--end::Heading-->

      <!--begin::Stats-->
      <div
        class="d-flex align-items-center flex-wrap mb-5 mt-auto fs-6"
        v-if="value != null && prevValue != null"
      >
        <span
          v-if="value > prevValue"
          class="svg-icon svg-icon-3 svg-icon-success me-1"
          :class="isOpposite ? 'svg-icon-danger' : 'svg-icon-success'"
        >
          <inline-svg
            :src="getAssetPath('media/icons/duotune/arrows/arr094.svg')"
          />
        </span>
        <span
          v-if="value < prevValue"
          class="svg-icon svg-icon-3 me-1"
          :class="isOpposite ? 'svg-icon-success' : 'svg-icon-danger'"
        >
          <inline-svg
            :src="getAssetPath('media/icons/duotune/arrows/arr093.svg')"
          />
        </span>

        <!--begin::Number-->
        <div :class="getMoreClass(value, prevValue)" class="fw-bold me-2">
          {{ calcMore(value, prevValue) }}
        </div>
        <!--end::Number-->

        <!--begin::Label-->
        <div class="fw-semobold text-gray-400">
          {{ footerText }}
        </div>
        <!--end::Label-->
      </div>
      <!--end::Stats-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { dashCurrencyFormat } from "@/assets/ts/utils";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "sales-widget",
  components: {},
  props: {
    cardClasses: String,
    icon: String,
    title: String,
    value: Number,
    isOpposite: { type: Boolean, default: false },
    isCurrency: { type: Boolean, default: true },
    valueColor: { type: String, default: "text-dark" },
    prevValue: Number,
    color: String,
    arrow: String,
    footerText: String,
  },
  setup(props) {
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
        return props.isOpposite ? "text-danger" : "text-success";
      } else {
        return props.isOpposite ? "text-success" : "text-danger";
      }
    };
    return {
      getAssetPath,
      calcMore,
      getMoreClass,
      dashCurrencyFormat,
    };
  },
});
</script>
