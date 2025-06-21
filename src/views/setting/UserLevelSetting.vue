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
        <h3 class="fw-bold m-0">Level Up</h3>
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
        :validation-schema="ulSettingValidator"
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
              <h5 class="text-muted fw-semibold">- Level 1</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bet Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv1_bet"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv1.bet"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv1_bet" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Deposit Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv1_deposit"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv1.deposit"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv1_deposit" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <h5 class="text-muted fw-semibold">- Level 2</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bet Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv2_bet"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv2.bet"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv2_bet" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Deposit Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv2_deposit"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv2.deposit"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv2_deposit" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <h5 class="text-muted fw-semibold">- Level 3</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bet Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv3_bet"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv3.bet"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv3_bet" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Deposit Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv3_deposit"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv3.deposit"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv3_deposit" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <h5 class="text-muted fw-semibold">- Level 4</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bet Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv4_bet"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv4.bet"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv4_bet" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Deposit Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv4_deposit"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv4.deposit"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv4_deposit" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <h5 class="text-muted fw-semibold">- Level 5</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bet Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv5_bet"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv5.bet"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv5_bet" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Deposit Amount</label
                  >
                  <Field
                    type="number"
                    name="ul_lv5_deposit"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Bet Amount"
                    v-model="ulSetting.lv5.deposit"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ul_lv5_deposit" />
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
            type="button"
            @click="onDiscard"
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

  <UserLevelPermissionItem
    :ul-perm="{ level: 1, ...ulPermSetting?.lv1 }"
  ></UserLevelPermissionItem>
  <UserLevelPermissionItem
    :ul-perm="{ level: 2, ...ulPermSetting?.lv2 }"
  ></UserLevelPermissionItem>
  <UserLevelPermissionItem
    :ul-perm="{ level: 3, ...ulPermSetting?.lv3 }"
  ></UserLevelPermissionItem>
  <UserLevelPermissionItem
    :ul-perm="{ level: 4, ...ulPermSetting?.lv4 }"
  ></UserLevelPermissionItem>
  <UserLevelPermissionItem
    :ul-perm="{ level: 5, ...ulPermSetting?.lv5 }"
  ></UserLevelPermissionItem>
  <UserLevelPermissionItem
    :ul-perm="{ level: 6, ...ulPermSetting?.lv6 }"
  ></UserLevelPermissionItem>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import UserLevelPermissionItem from "./UserLevelPermissionItem.vue";
export default defineComponent({
  name: "ulevel-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
    UserLevelPermissionItem,
  },
  setup() {
    const submitBtn = ref<HTMLElement | null>(null);

    const ulSettingValidator = Yup.object().shape({
      ul_lv1_bet: Yup.number().required().label("Bet Amount"),
      ul_lv1_deposit: Yup.number().required().label("Deposit Amount"),
      ul_lv2_bet: Yup.number().required().label("Bet Amount"),
      ul_lv2_deposit: Yup.number().required().label("Deposit Amount"),
      ul_lv3_bet: Yup.number().required().label("Bet Amount"),
      ul_lv3_deposit: Yup.number().required().label("Deposit Amount"),
      ul_lv4_bet: Yup.number().required().label("Bet Amount"),
      ul_lv4_deposit: Yup.number().required().label("Deposit Amount"),
      ul_lv5_bet: Yup.number().required().label("Bet Amount"),
      ul_lv5_deposit: Yup.number().required().label("Deposit Amount"),
    });

    const ulSetting = ref({
      lv1: {
        deposit: null,
        bet: null,
      },
      lv2: {
        deposit: null,
        bet: null,
      },
      lv3: {
        deposit: null,
        bet: null,
      },
      lv4: {
        deposit: null,
        bet: null,
      },
      lv5: {
        deposit: null,
        bet: null,
      },
    });
    let originUlSetting;
    const ulPermSetting = ref();

    onMounted(() => {
      getBetSetting();
    });

    const getBetSetting = () => {
      ApiService.get("setting/ulperm").then((res) => {
        ulSetting.value = res.data.user_levelup_rule;
        originUlSetting = JSON.parse(
          JSON.stringify(res.data.user_levelup_rule)
        );
        ulPermSetting.value = res.data.user_sports_level_permission;
      });
    };
    const onSave = () => {
      if (submitBtn.value) {
        // Activate indicator
        submitBtn.value.setAttribute("data-kt-indicator", "on");

        ApiService.post("setting/ulup", ulSetting.value)
          .then((res) => {
            Swal.fire({
              text: "User Level Up setting has been successfully changed!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            submitBtn.value?.removeAttribute("data-kt-indicator");
            originUlSetting = JSON.parse(
              JSON.stringify(res.data.user_levelup_rule)
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
      if (originUlSetting) {      
        const origin = JSON.parse(JSON.stringify(originUlSetting));
        ulSetting.value = origin;
      }
    };

    return {
      getAssetPath,
      submitBtn,
      ulPermSetting,
      ulSetting,
      ulSettingValidator,
      onSave,
      onDiscard,
    };
  },
});
</script>
