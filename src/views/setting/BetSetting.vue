<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#a2bet_bet_setting"
      aria-expanded="true"
      aria-controls="a2bet_bet_setting"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Bet Setting</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="a2bet_bet_setting" class="collapse show">      
      <!--begin::Form-->
      <VForm
        id="a2bet_bet_setting_form"
        class="form"
        novalidate
        @submit="onSave()"
        :validation-schema="betSettingValidator"        
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >Min Odds</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-12 fv-row">
                  <Field
                    type="number"
                    name="prohibited_dividend"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.prohibited_dividend"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="prohibited_dividend" />
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
          <div class="separator separator-dashed separator-content mb-10 mt-18">
            <span class="w-300px fs-5 fw-semibold"
              >Bonuses for multiple game bets</span
            >
          </div>
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->

            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >2 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds2"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[0]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds2" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >3 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds3"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[1]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds3" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >4 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds4"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[2]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds4" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >5 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds5"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[3]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds5" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >6 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds6"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[4]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds6" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >7 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds7"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[5]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds7" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >8 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds8"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[6]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds8" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >9 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds9"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[7]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds9" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-2 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >10 Games</label
                  >
                  <Field
                    type="number"
                    name="bonus_odds10"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Min Odds"
                    v-model="betSetting.bonus_odds[8]"
                    :step="0.01"
                    :min="1"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bonus_odds10" />
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
            @click="onDiscard"
            type="button"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            type="submit"
            id="a2bet_bet_setting_submit"
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
  <!--end::Basic info-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "bet-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitBtn = ref<HTMLElement | null>(null);

    const betSettingValidator = Yup.object().shape({
      prohibited_dividend: Yup.number().required().label("Min Odds"),
    });

    const betSetting = ref({
      prohibited_dividend: null,
      bonus_odds: [],
    });

    const onSave = () => {
      if (submitBtn.value) {
        // Activate indicator
        submitBtn.value.setAttribute("data-kt-indicator", "on");

        ApiService.post("setting/bet", betSetting.value)
          .then((res) => {
            Swal.fire({
              text: "Bet setting has been successfully changed!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            submitBtn.value?.removeAttribute("data-kt-indicator");
            originalBetSetting.value = JSON.parse(JSON.stringify(res.data.sports_bet));
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
    onMounted(() => {
      getBetSetting();
    });
    let originalBetSetting = ref();
    const getBetSetting = () => {
      ApiService.get("setting/bet").then((res) => {
        originalBetSetting.value = JSON.parse(JSON.stringify(res.data.sports_bet));
        betSetting.value.prohibited_dividend =
          res.data.sports_bet.prohibited_dividend;
        betSetting.value.bonus_odds = res.data.sports_bet.bonus_odds;
      });
    };
    const onDiscard = () => {

      if (originalBetSetting.value) {
        const origin = JSON.parse(JSON.stringify(originalBetSetting.value))
        betSetting.value.prohibited_dividend =
          origin.prohibited_dividend;
        betSetting.value.bonus_odds = origin.bonus_odds;
      }
    };

    return {
      getAssetPath,
      submitBtn,
      onSave,
      betSetting,
      originalBetSetting,
      betSettingValidator,
      onDiscard,
    };
  },
});
</script>
