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
        <h3 class="fw-bold m-0">Deposit, Withdraw and Bonus</h3>
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
        :validation-schema="depSettingValidator"
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
              <h5 class="text-muted fw-semibold">- Deposit</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Min Deposit Amount</label
                  >
                  <Field
                    type="number"
                    name="min_deposit"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.min_deposit"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="min_deposit" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Min Deposit Bonus Amount</label
                  >
                  <Field
                    type="number"
                    name="min_deposit_bonus"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.min_deposit_bonus"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="min_deposit_bonus" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Min Cash Exchange</label
                  >
                  <Field
                    type="number"
                    name="min_cash_exchange"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.min_cash_exchange"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="min_cash_exchange" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Min Pointe Convert</label
                  >
                  <Field
                    type="number"
                    name="min_point_convert"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.min_point_convert"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="min_point_convert" />
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
              <h5 class="text-muted fw-semibold">- Withdraw</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Min Withdraw Amount</label
                  >
                  <Field
                    type="number"
                    name="min_withdraw"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.min_withdraw"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="min_withdraw" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <!-- <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Daily Withdraw Amount</label
                  >
                  <Field
                    type="number"
                    name="daily_withdraw_amount"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.daily_withdraw_amount"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="daily_withdraw_amount" />
                    </div>
                  </div>
                </div> -->
                <!--end::Col-->
                <!--begin::Col-->
                <!-- <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Daily Withdraw Count</label
                  >
                  <Field
                    type="number"
                    name="daily_withdraw_count"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.daily_withdraw_count"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="daily_withdraw_count" />
                    </div>
                  </div>
                </div> -->
                <!--end::Col-->
                <!--begin::Col-->
                <!-- <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Withdraw Request Distance</label
                  >
                  <Field
                    type="number"
                    name="withdraw_request_distance"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.withdraw_request_distance"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="withdraw_request_distance" />
                    </div>
                  </div>
                </div> -->
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <h5 class="text-muted fw-semibold">- Bonus (Frist Deposit)</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bonus</label
                  >
                  <Field
                    type="number"
                    name="bf_bonus"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.first.bonus"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bf_bonus" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Sports Single</label
                  >
                  <Field
                    type="number"
                    name="bf_sports_single"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.first.sports_single"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bf_sports_single" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Sports Multi</label
                  >
                  <Field
                    type="number"
                    name="bf_sports_multi"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.first.sports_multi"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bf_sports_multi" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Casino</label
                  >
                  <Field
                    type="number"
                    name="bf_casino"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.first.casino"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bf_casino" />
                    </div>
                  </div>
                </div>
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Title</label
                  >
                  <Field
                    name="bf_title"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.first.title"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bf_title" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Desc</label
                  >
                  <Field
                    as="textarea"
                    name="bf_desc"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.first.description"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bf_desc" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6">
                    Enable
                  </label>
                  <div class="d-flex mt-2">
                    <!--begin::Switch-->
                    <label
                      class="form-check form-switch form-check-custom form-check-solid"
                    >
                      <!--begin::Input-->
                      <input
                        class="form-check-input"
                        name="back2bet"
                        type="checkbox"
                        v-model="depSetting.deposit_bonus.first.active"
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
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <h5 class="text-muted fw-semibold">
                - Bonus (Daily Frist Deposit)
              </h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bonus</label
                  >
                  <Field
                    type="number"
                    name="bdf_bonus"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.daily_first.bonus"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bdf_bonus" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Sports Single</label
                  >
                  <Field
                    type="number"
                    name="bdf_sports_single"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.daily_first.sports_single"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bdf_sports_single" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Sports Multi</label
                  >
                  <Field
                    type="number"
                    name="bdf_sports_multi"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.daily_first.sports_multi"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bdf_sports_multi" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Casino</label
                  >
                  <Field
                    type="number"
                    name="bdf_casino"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.daily_first.casino"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bdf_casino" />
                    </div>
                  </div>
                </div>
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Title</label
                  >
                  <Field
                    name="bdf_title"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.daily_first.title"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bdf_title" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Desc</label
                  >
                  <Field
                    as="textarea"
                    name="bdf_desc"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.daily_first.description"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bdf_desc" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6">
                    Enable
                  </label>
                  <div class="d-flex mt-2">
                    <!--begin::Switch-->
                    <label
                      class="form-check form-switch form-check-custom form-check-solid"
                    >
                      <!--begin::Input-->
                      <input
                        class="form-check-input"
                        name="back2bet"
                        type="checkbox"
                        v-model="depSetting.deposit_bonus.daily_first.active"
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
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <h5 class="text-muted fw-semibold">- Bonus (Recharge)</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bonus</label
                  >
                  <Field
                    type="number"
                    name="br_bonus"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.recharge.bonus"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="br_bonus" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Sports Single</label
                  >
                  <Field
                    type="number"
                    name="br_sports_single"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.recharge.sports_single"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="br_sports_single" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Sports Multi</label
                  >
                  <Field
                    type="number"
                    name="br_sports_multi"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.recharge.sports_multi"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="br_sports_multi" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Casino</label
                  >
                  <Field
                    type="number"
                    name="br_casino"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.recharge.casino"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="br_casino" />
                    </div>
                  </div>
                </div>
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Title</label
                  >
                  <Field
                    name="br_title"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.recharge.title"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="br_title" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Desc</label
                  >
                  <Field
                    as="textarea"
                    name="br_desc"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.recharge.description"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="br_desc" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6">
                    Enable
                  </label>
                  <div class="d-flex mt-2">
                    <!--begin::Switch-->
                    <label
                      class="form-check form-switch form-check-custom form-check-solid"
                    >
                      <!--begin::Input-->
                      <input
                        class="form-check-input"
                        name="back2bet"
                        type="checkbox"
                        v-model="depSetting.deposit_bonus.recharge.active"
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
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-lg-12">
              <!--begin::Row-->
              <h5 class="text-muted fw-semibold">- Bonus (None)</h5>
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Bonus</label
                  >
                  <Field
                    type="number"
                    name="bn_bonus"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.none.bonus"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bn_bonus" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Sports Single</label
                  >
                  <Field
                    type="number"
                    name="bn_sports_single"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.none.sports_single"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bn_sports_single" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Sports Multi</label
                  >
                  <Field
                    type="number"
                    name="bn_sports_multi"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.none.sports_multi"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bn_sports_multi" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Casino</label
                  >
                  <Field
                    type="number"
                    name="bn_casino"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.none.casino"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bn_casino" />
                    </div>
                  </div>
                </div>

                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Title</label
                  >
                  <Field
                    name="bn_title"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.none.title"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bn_title" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6"
                    >Desc</label
                  >
                  <Field
                    as="textarea"
                    name="bn_desc"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    v-model="depSetting.deposit_bonus.none.description"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bn_desc" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <div class="col-md-3 fv-row mb-5">
                  <label class="col-form-label required fw-semibold fs-6">
                    Enable
                  </label>
                  <div class="d-flex mt-2">
                    <!--begin::Switch-->
                    <label
                      class="form-check form-switch form-check-custom form-check-solid"
                    >
                      <!--begin::Input-->
                      <input
                        class="form-check-input"
                        name="back2bet"
                        type="checkbox"
                        v-model="depSetting.deposit_bonus.none.active"
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
            id="a2bet_bonus_setting_submit"
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
import UserLevelPermissionItem from "./UserLevelPermissionItem.vue";
export default defineComponent({
  name: "bonus-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
    UserLevelPermissionItem,
  },
  setup() {
    const submitBtn = ref<HTMLElement | null>(null);

    const depSettingValidator = Yup.object().shape({
      min_deposit: Yup.number().required().label("Min Deposit"),
      min_deposit_bonus: Yup.number().required().label("Min Deposit Bonus"),
      min_cash_exchange: Yup.number().required().label("Min Cash Exchange"),
      min_point_convert: Yup.number().required().label("Min Point Convert"),
      min_withdraw: Yup.number().required().label("Min Withdraw"),
      bn_bonus: Yup.number().required().label("Bonus"),
      bn_sports_single: Yup.number().required().label("Sports Single Rolling"),
      bn_sports_multi: Yup.number().required().label("Sports Multi Rolling"),
      bn_casino: Yup.number().required().label("Casino Rolling"),
      bn_title: Yup.string().required().label("Title"),
      bn_desc: Yup.string().required().label("Description"),
      bf_bonus: Yup.number().required().label("Bonus"),
      bf_sports_single: Yup.number().required().label("Sports Single Rolling"),
      bf_sports_multi: Yup.number().required().label("Sports Multi Rolling"),
      bf_casino: Yup.number().required().label("Casino Rolling"),
      bf_title: Yup.string().required().label("Title"),
      bf_desc: Yup.string().required().label("Description"),
      bdf_bonus: Yup.number().required().label("Bonus"),
      bdf_sports_single: Yup.number().required().label("Sports Single Rolling"),
      bdf_sports_multi: Yup.number().required().label("Sports Multi Rolling"),
      bdf_casino: Yup.number().required().label("Casino Rolling"),
      bdf_title: Yup.string().required().label("Title"),
      bdf_desc: Yup.string().required().label("Description"),
      br_bonus: Yup.number().required().label("Bonus"),
      br_sports_single: Yup.number().required().label("Sports Single Rolling"),
      br_sports_multi: Yup.number().required().label("Sports Multi Rolling"),
      br_casino: Yup.number().required().label("Casino Rolling"),
      br_title: Yup.string().required().label("Title"),
      br_desc: Yup.string().required().label("Description"),
    });
    const depSetting = ref({
      min_deposit: null,
      min_deposit_bonus: null,
      min_cash_exchange: null,
      min_point_convert: null,
      min_withdraw: null,
      deposit_bonus: {
        none: {
          bonus: null,
          sports_single: null,
          sports_multi: null,
          casino: null,
          active: true,
          title: "",
          description: "",
        },
        first: {
          bonus: null,
          sports_single: null,
          sports_multi: null,
          casino: null,
          active: true,
          title: "",
          description: "",
        },
        daily_first: {
          bonus: null,
          sports_single: null,
          sports_multi: null,
          casino: null,
          active: true,
          title: "",
          description: "",
        },
        recharge: {
          bonus: null,
          sports_single: null,
          sports_multi: null,
          casino: null,
          active: true,
          title: "",
          description: "",
        },
      },
    });

    let originalSetting;

    onMounted(() => {
      getBetSetting();
    });

    const getBetSetting = () => {
      ApiService.get("setting/bonus").then((res) => {
        depSetting.value = res.data.finance;
        originalSetting = JSON.parse(JSON.stringify(res.data.finance));
      });
    };
    const onSave = () => {
      if (submitBtn.value) {
        // Activate indicator
        submitBtn.value.setAttribute("data-kt-indicator", "on");

        ApiService.post("setting/bonus", depSetting.value)
          .then((res) => {
            Swal.fire({
              text: "Setting has been successfully changed!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            submitBtn.value?.removeAttribute("data-kt-indicator");
            originalSetting = JSON.parse(JSON.stringify(res.data.finance));
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
      depSetting.value = JSON.parse(JSON.stringify(originalSetting));
    };

    return {
      getAssetPath,
      submitBtn,
      depSetting,
      depSettingValidator,
      onSave,
      onDiscard,
    };
  },
});
</script>
