<template>
  <div
    class="modal fade"
    id="kt_modal_add_partner"
    ref="modalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_partner_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add a Partner</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_partner_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_partner_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_partner_header"
              data-kt-scroll-wrappers="#kt_modal_add_partner_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2">User ID</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="user_id">
                  <el-input
                    v-model="formData.user_id"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2">Nickname</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="nickname">
                  <el-input
                    v-model="formData.nickname"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

               <!--begin::Input group-->
               <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2">Password</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="password">
                  <el-input
                    v-model="formData.password"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">Commission Type</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="comission_type">
                  <el-select v-model="formData.commission_type">
                    <el-option
                      label="Profit Share"
                      :value="PartnerComissionType.Profit"
                    />
                    <el-option
                      label="User Singup Pay"
                      :value="PartnerComissionType.Signup"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">Commission</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="comission">
                  <el-input-number v-model="formData.comission" class="w-100" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2"> Budget </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="comission">
                  <el-input-number v-model="formData.budget" class="w-100" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_partner_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/modal";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { PartnerComissionType } from "@/assets/ts/utils";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "add-customer-modal",
  emits: ["add"],
  components: {},
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      user_id: "",
      nickname: "",
      password: "",
      commission_type: PartnerComissionType.Profit,
      comission: 10,
      budget: 0,
    });

    const rules = ref({
      user_id: [
        {
          required: true,
          message: "Partner user ID is required",
          trigger: "change",
        },
      ],
      nickname: [
        {
          required: true,
          message: "Partner nickname is required",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "Partner password is required",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid: boolean) => {
        if (valid) {
          loading.value = true;

          ApiService.post("partners", formData.value)
            .then((res) => {
              emit("add", formData.value);
              formRef.value?.resetFields();
              hideModal(modalRef.value);
              loading.value = false;
            })
            .catch(({ response }) => {
              loading.value = false;
              Swal.fire({
                text: response.data.message,
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-secondary",
                },
              });
            });
        } else {
          return false;
        }
      });
    };
    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      modalRef,
      getAssetPath,
      countries,
      PartnerComissionType,
    };
  },
});
</script>
