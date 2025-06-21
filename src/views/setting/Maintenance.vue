<template>
  <div class="card-body pt-0">
    <!--begin::Connected Accounts-->
    <div class="card mb-5 mb-xl-8">
      <!--begin::Card header-->
      <div class="card-header border-0">
        <div class="card-title">
          <h3 class="fw-bold m-0">Maintenance</h3>
        </div>
      </div>
      <!--end::Card header-->

      <!--begin::Card body-->
      <div class="card-body pt-2">
        <!--begin::Items-->
        <div class="py-2">
          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <div class="d-flex">
              <div class="d-flex flex-column">
                <span class="fs-4 text-gray-900 fw-bold"> Back2bet </span>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <!--begin::Switch-->
              <label
                class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
              >
                <!--begin::Input-->
                <input
                  class="form-check-input"
                  name="back2bet"
                  type="checkbox"
                  v-model="maintenaceSetting.back2bet"
                />
                <!--end::Input-->

                <!--begin::Label-->
                <span
                  class="form-check-label fw-semibold text-muted"
                  for="kt_modal_connected_accounts_google"
                ></span>
                <!--end::Label-->
              </label>
              <!--end::Switch-->
            </div>
          </div>
          <!--end::Item-->
          <div class="separator separator-dashed my-5"></div>
          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <div class="d-flex">
              <div class="d-flex flex-column">
                <span class="fs-4 text-gray-900 fw-bold"
                  >Sports (Prematch)
                </span>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <!--begin::Switch-->
              <label
                class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
              >
                <!--begin::Input-->
                <input
                  class="form-check-input"
                  name="sports_prematch"
                  type="checkbox"
                  v-model="maintenaceSetting.sports_prematch"
                />
                <!--end::Input-->

                <!--begin::Label-->
                <span
                  class="form-check-label fw-semibold text-muted"
                  for="kt_modal_connected_accounts_google"
                ></span>
                <!--end::Label-->
              </label>
              <!--end::Switch-->
            </div>
          </div>
          <!--end::Item-->
          <!--end::Item-->
          <div class="separator separator-dashed my-5"></div>
          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <div class="d-flex">
              <div class="d-flex flex-column">
                <span class="fs-4 text-gray-900 fw-bold">Sports (Inplay) </span>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <!--begin::Switch-->
              <label
                class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
              >
                <!--begin::Input-->
                <input
                  class="form-check-input"
                  name="sports_inplay"
                  type="checkbox"
                  v-model="maintenaceSetting.sports_inplay"
                />
                <!--end::Input-->

                <!--begin::Label-->
                <span
                  class="form-check-label fw-semibold text-muted"
                  for="kt_modal_connected_accounts_google"
                ></span>
                <!--end::Label-->
              </label>
              <!--end::Switch-->
            </div>
          </div>
          <!--end::Item-->
          <!--end::Item-->
          <div class="separator separator-dashed my-5"></div>
          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <div class="d-flex">
              <div class="d-flex flex-column">
                <span class="fs-4 text-gray-900 fw-bold">
                  Esports (Prematch)
                </span>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <!--begin::Switch-->
              <label
                class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
              >
                <!--begin::Input-->
                <input
                  class="form-check-input"
                  name="esports_prematch"
                  type="checkbox"
                  v-model="maintenaceSetting.esports_prematch"
                />
                <!--end::Input-->

                <!--begin::Label-->
                <span
                  class="form-check-label fw-semibold text-muted"
                  for="kt_modal_connected_accounts_google"
                ></span>
                <!--end::Label-->
              </label>
              <!--end::Switch-->
            </div>
          </div>
          <!--end::Item-->
          <div class="separator separator-dashed my-5"></div>
          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <div class="d-flex">
              <div class="d-flex flex-column">
                <span class="fs-4 text-gray-900 fw-bold">
                  Esports (Inplay)
                </span>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <!--begin::Switch-->
              <label
                class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
              >
                <!--begin::Input-->
                <input
                  class="form-check-input"
                  name="esports_inplay"
                  type="checkbox"
                  v-model="maintenaceSetting.esports_inplay"
                />
                <!--end::Input-->

                <!--begin::Label-->
                <span
                  class="form-check-label fw-semibold text-muted"
                  for="kt_modal_connected_accounts_google"
                ></span>
                <!--end::Label-->
              </label>
              <!--end::Switch-->
            </div>
          </div>
          <!--end::Item-->
        </div>
        <!--end::Items-->
      </div>
      <!--end::Card body-->

      <!--begin::Card footer-->
      <div class="card-footer border-0 d-flex justify-content-end pt-0">
        <div
          class="btn btn-light btn-active-light-primary me-2"
          @click="onDiscard"
        >
          Discard
        </div>
        <button ref="submitBtn" class="btn btn-primary" @click="onSave">
          <span class="indicator-label"> Save Changes </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
      <!--end::Card footer-->
    </div>
    <!--end::Connected Accounts-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "maintenance",
  components: {},
  setup() {
    const submitBtn = ref<HTMLElement | null>(null);
    onMounted(() => {
      getMaintenanceSetting();
    });
    const maintenaceSetting = ref({
      back2bet: true,
      sports_prematch: true,
      sports_inplay: true,
      esports_prematch: true,
      esports_inplay: true,
    });
    let originalMaintenanceSetting;
    const getMaintenanceSetting = () => {
      ApiService.get("setting/maintenance").then((res) => {
        originalMaintenanceSetting = JSON.parse(
          JSON.stringify(res.data.maintenance)
        );
        maintenaceSetting.value = res.data.maintenance;
      });
    };
    const onSave = () => {
      if (submitBtn.value) {
        // Activate indicator
        submitBtn.value.setAttribute("data-kt-indicator", "on");

        ApiService.post("setting/maintenance", maintenaceSetting.value)
          .then((res) => {
            Swal.fire({
              text: "Maintenance setting has been successfully changed!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            submitBtn.value?.removeAttribute("data-kt-indicator");
            originalMaintenanceSetting = JSON.parse(
              JSON.stringify(maintenaceSetting.value)
            );
          })
          .catch(({ response }) => {
            Swal.fire({
              text: response.data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
            submitBtn.value?.removeAttribute("data-kt-indicator");
          });
      }
    };
    const onDiscard = () => {
      if (originalMaintenanceSetting) {
        const origin = JSON.parse(JSON.stringify(originalMaintenanceSetting));
        maintenaceSetting.value = origin;
      }
    };
    return { getAssetPath, maintenaceSetting, submitBtn, onSave, onDiscard };
  },
});
</script>
