<template>
  <!--begin::Earnings-->
  <div :class="`card ${cardClasses}`">
    <!--begin::Header-->
    <div class="card-header border-0">
      <div class="card-title">
        <h2>Bet & Win</h2>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-0">
      <div class="fs-5 fw-semibold text-gray-500 mb-4">
        Last 30 day bet earnings calculated.
      </div>

      <!--begin::Left Section-->
      <div class="d-flex flex-wrap flex-stack mb-5">
        <!--begin::Row-->
        <div class="d-flex flex-wrap">
          <!--begin::Col-->
          <div
            class="border border-dashed border-gray-300 w-150px rounded my-3 p-4 me-6"
          >
            <span class="fs-1 fw-bold text-gray-800 lh-1">
              <span
                data-kt-countup="true"
                data-kt-countup-value="6,840"
                data-kt-countup-prefix="$"
                >6,840$</span
              >
              <KTIcon icon-name="arrow-up" icon-class="fs-1 text-success" />
            </span>
            <span class="fs-6 fw-semibold text-muted d-block lh-1 pt-2"
              >Bet</span
            >
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div
            class="border border-dashed border-gray-300 w-125px rounded my-3 p-4 me-6"
          >
            <span class="fs-1 fw-bold text-gray-800 lh-1">
              <span class="" data-kt-countup="true" data-kt-countup-value="16"
                >$1006</span
              >
              <KTIcon icon-name="arrow-down" icon-class="fs-1 text-danger" />
            </span>
            <span class="fs-6 fw-semibold text-muted d-block lh-1 pt-2"
              >Win</span
            >
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div
            class="border border-dashed border-gray-300 w-150px rounded my-3 p-4 me-6"
          >
            <span class="fs-1 fw-bold text-gray-800 lh-1">
              <span
                data-kt-countup="true"
                data-kt-countup-value="1,240"
                data-kt-countup-prefix="$"
                >1,240$</span
              >
              <span class="text-primary">--</span>
            </span>
            <span class="fs-6 fw-semibold text-muted d-block lh-1 pt-2"
              >Prefit</span
            >
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
      </div>
      <!--end::Left Section-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Earnings-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "earnings-card",
  props: {
    cardClasses: String,
  },
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
