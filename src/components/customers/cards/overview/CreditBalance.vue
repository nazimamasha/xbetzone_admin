<template>
  <!--begin::Card-->
  <div :class="`card pt-4 ${cardClasses}`">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2 class="fw-bold">Balance</h2>
      </div>
      <!--end::Card title-->

      <!--begin::Card toolbar-->
      <!-- <div class="card-toolbar">
        <a
          href="#"
          class="btn btn-sm btn-flex btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_adjust_user_cash"
        >
          <KTIcon icon-name="pencil" icon-class="fs-3" />
          Adjust Balance
        </a>
      </div> -->
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <div class="fw-bold fs-2">
        ⚽ {{ currencyFormat(cash) }}, 🎰 {{ currencyFormat(casino) }}, 🎉
        {{ currencyFormat(point) }}

        <div class="fs-7 fw-normal text-muted">
          Balance will be added or deducted with adjust balance.
        </div>
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { currencyFormat } from "@/assets/ts/utils";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "credit-bilance",
  props: {
    cardClasses: String,
    cash: Number,
    casino: Number,
    point: Number,
  },
  components: {},
  setup() {
    return {
      getAssetPath,
      currencyFormat,
    };
  },
});
</script>
