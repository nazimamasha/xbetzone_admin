<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <router-link
        to="/account/settings"
        class="btn btn-primary align-self-center"
        >Edit Profile</router-link
      >
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Full Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-900">Max Smith</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Company</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-semibold fs-6">Keenthemes</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">
          Contact Phone
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            v-tooltip
            title="Phone number must be active"
          ></i>
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">044 3276 454 935</span>

          <span class="badge badge-success">Verified</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Company Site</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <a href="#" class="fw-semibold fs-6 text-dark text-hover-primary"
            >back2bet.io</a
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">
          Country
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            v-tooltip
            title="Country of origination"
          ></i>
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-900">Germany</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Communication</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-900">Email, Phone</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-10">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">Allow Changes</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semibold fs-6">Yes</span>
        </div>
        <!--begin::Label-->
      </div>
      <!--end::Input group-->

      <div
        class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
      >
        <KTIcon
          icon-name="information-5"
          icon-class="fs-2tx text-warning me-4"
        />
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="fw-semibold">
            <h4 class="text-gray-800 fw-bold">We need your attention!</h4>

            <div class="fs-6 text-gray-600">
              Your payment was declined. To start using tools, please
              <a class="fw-bold" href="#">Add Payment Method</a>.
            </div>
          </div>
          <!--end::Content-->
        </div>
        <!--end::Wrapper-->
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->

  <!--begin::Row-->
  <div class="row gy-10 gx-xl-10">
    <!--begin::Col-->
    <div class="col-xl-6">
      <KTChartWidget1
        widget-classes="card-xxl-stretch mb-5 mb-xl-10"
      ></KTChartWidget1>
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-6">
      <KTListWidget1
        widget-classes="card-xxl-stretch mb-5 mb-xl-10'"
      ></KTListWidget1>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

  <!--begin::Row-->
  <div class="row gy-10 gx-xl-10">
    <!--begin::Col-->
    <div class="col-xl-6">
      <KTListWidget5
        widget-classes="card-xxl-stretch mb-5 mb-xl-10"
      ></KTListWidget5>
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-6">
      <KTTableWidget5
        widget-classes="card-xxl-stretch mb-5 mb-xl-10"
      ></KTTableWidget5>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import KTChartWidget1 from "@/components/widgets/charts/Widget1.vue";
import KTListWidget5 from "@/components/widgets/lists/Widget5.vue";
import KTTableWidget5 from "@/components/widgets/tables/Widget5.vue";
import KTListWidget1 from "@/components/widgets/lists/Widget1.vue";

export default defineComponent({
  name: "account-overview",
  components: {
    KTChartWidget1,
    KTListWidget5,
    KTTableWidget5,
    KTListWidget1,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
