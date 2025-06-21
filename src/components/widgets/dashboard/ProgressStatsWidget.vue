<template>
  <!--begin::Statistics Widget 2-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body d-flex align-items-center py-0">
      <div class="d-flex flex-column flex-grow-1 py-2 py-lg-10 me-2">
        <span class="fw-semobold text-gray-800 fs-1">{{ description }}</span>
        <div class="pt-3">
          <span class="fs-3x fw-bold text-dark mb-2">
            {{ value }}
          </span>
        </div>
        <div class="d-flex align-items-center flex-column mt-5 w-100 pe-10">
          <div
            class="d-flex justify-content-between fw-bold fs-6 text-dark opacity-50 w-100 mt-auto mb-2"
          >
            <span>{{ prevValue }} Total Users</span>
            <span>{{ calcProgress(value, prevValue) }}%</span>
          </div>

          <div class="h-8px mx-3 w-100 bg-dark bg-opacity-50 rounded">
            <div
              class="bg-success rounded h-8px"
              role="progressbar"
              :style="`width: ${calcProgress(value, prevValue)}%`"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>

      <!-- <img :src="avatar" alt="" class="align-self-end h-100px" /> -->
      <i class="fs-4x" :class="iconClass"></i>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Statistics Widget 2-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "stats-widget",
  props: {
    widgetClasses: String,
    value: Number,
    prevValue: Number,
    description: String,
    iconClass: String,
  },
  components: {},
  setup() {
    const calcProgress = (value, total) => {
      let progress = 0;
      if (!total) {
        progress = 0;
      } else {
        progress = Math.ceil((value / total) * 100);
      }
      return progress;
    };
    return {
      getAssetPath,
      calcProgress,
    };
  },
});
</script>
