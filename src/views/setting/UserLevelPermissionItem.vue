<template>
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      :data-bs-target="`#a2bet_ulperm_setting_${ulPermSetting.level}`"
      aria-expanded="true"
      :aria-controls="`a2bet_ulperm_setting_${ulPermSetting.level}`"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Level {{ ulPermSetting.level }}</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div
      :id="`a2bet_ulperm_setting_${ulPermSetting.level}`"
      class="collapse show"
    >
      <!--begin::Form-->
      <VForm
        :id="`a2bet_ulperm_setting_${ulPermSetting.level}_form`"
        class="form"
        novalidate
        @submit="onSave()"
        :validation-schema="ulPermSettingValidator"
        :initial-values="ulPerm"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->

            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-4 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Min Bet</label
                  >
                  <Field
                    type="number"
                    name="prematch_min_bet"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Prematch Min Bet"
                    v-model="ulPermSetting.min_bet"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="prematch_min_bet" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-4 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Max Win</label
                  >
                  <Field
                    type="number"
                    name="prematch_max_single_win"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Prematch Max Single Win"
                    v-model="ulPermSetting.max_win"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="prematch_max_single_win" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            type="submit"
            :id="`a2bet_ulperm_setting_${ulPermSetting.level}_submit`"
            ref="submitBtn"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, type PropType } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
interface IUserLevelPermSetting {
  level: number;
  min_bet: number;
  max_win: number;
}
export default defineComponent({
  name: "ulperm-item",
  props: {
    ulPerm: {
      type: Object as PropType<IUserLevelPermSetting>,
      required: true,
    },
  },
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup(props) {
    const submitBtn = ref<HTMLElement | null>(null);

    const ulPermSettingValidator = Yup.object().shape({
      prematch_min_bet: Yup.number().required().label("Min Bet"),
      prematch_max_single_win: Yup.number()
        .required()
        .label("Prematch Max Single Win"),
    });
    const ulPermSetting = ref();
    watch(
      () => props.ulPerm,
      () => {
        ulPermSetting.value = props.ulPerm;
      },
      { immediate: true }
    );
    const onSave = () => {
      if (submitBtn.value) {
        // Activate indicator
        submitBtn.value.setAttribute("data-kt-indicator", "on");

        ApiService.post("setting/ulperm", ulPermSetting.value)
          .then((res) => {
            Swal.fire({
              text: "User Level Permission setting has been successfully changed!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            submitBtn.value?.removeAttribute("data-kt-indicator");
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

    return {
      getAssetPath,
      submitBtn,
      onSave,
      ulPermSetting,
      ulPermSettingValidator,
    };
  },
});
</script>
