<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="listQuery.search"
            v-on:keyup.enter="onSearch"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <div
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <!--begin::Export-->
            <button
              type="button"
              class="btn me-3"
              :class="{
                'btn-light': listQuery.status === PaymentStatus.All,
              }"
              @click="onStatus(PaymentStatus.All)"
            >
              All
            </button>
            <button
              type="button"
              class="btn me-3"
              :class="{
                'btn-success ': listQuery.status === PaymentStatus.Completed,
              }"
              @click="onStatus(PaymentStatus.Completed)"
            >
              Completed
            </button>
            <button
              type="button"
              class="btn me-3"
              :class="{
                'btn-warning': listQuery.status === PaymentStatus.Pending,
              }"
              @click="onStatus(PaymentStatus.Pending)"
            >
              Pending
            </button>
            <button
              type="button"
              class="btn"
              :class="{
                'btn-danger': listQuery.status === PaymentStatus.Refunded,
              }"
              @click="onStatus(PaymentStatus.Refunded)"
            >
              Refunded
            </button>
          </div>
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :loading="tableLoading"
        :data="tableData"
        :header="tableHeader"
        :total="tableTotal"
        :enable-items-per-page-dropdown="true"
        :items-per-page="listQuery.size"
        :current-page="listQuery.page"
        @page-change="onPageChanged"
        @on-items-per-page-change="onItemsPerPageChanged"
      >
        <template v-slot:partner="{ row: deposit }">
          {{ deposit.user?.refer?.partner }}
        </template>
        <template v-slot:user_id="{ row: deposit }">
          {{ deposit.user_id }} ({{ deposit.user.nickname }})
        </template>
        <template v-slot:asaas_user_id="{ row: deposit }">
          {{ deposit.user.asaas_id }}
        </template>

        <template v-slot:asaas_payment_id="{ row: deposit }">
          {{ deposit.asaas_payment_id }}
        </template>

        <template v-slot:amount="{ row: deposit }">
          {{ currencyFormat(deposit.asaas_value) }}
        </template>

        <template v-slot:net="{ row: deposit }">
          {{ currencyFormat(deposit.asaas_netValue) }}
        </template>
        <template v-slot:status="{ row: payment }">
          <span
            class="badge"
            :class="{
              'badge-light-warning':
                payment.state === ActivityState.PAYMENT_CREATED,
              'badge-light-success':
                payment.state === ActivityState.PAYMENT_RECEIVED,
              'badge-light-danger':
                payment.state === ActivityState.PAYMENT_REFUNDED,
            }"
          >
            {{ payment.state }}</span
          >
        </template>

        <template v-slot:createdAt="{ row: partner }">
          {{ timeFormat(partner.createdAt) }}
        </template>

        <template v-slot:updatedAt="{ row: partner }">
          {{ timeFormat(partner.updatedAt) }}
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddPartnerModal from "@/components/modals/forms/AddPartnerModal.vue";

import {
  ActivityState,
  ActivityType,
  PaymentStatus,
  currencyFormat,
  profitColor,
  type IActivityFindQuery,
  timeFormat,
} from "@/assets/ts/utils";
import type { IActivity } from "@/assets/ts/utils/activity.interface";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "deposits-listing",
  components: {
    Datatable,
    AddPartnerModal,
  },
  setup() {
    const tableHeader = ref([
      // {
      //   columnName: "Partner",
      //   columnLabel: "partner",
      // },
      {
        columnName: "UserID(Nickname)",
        columnLabel: "user_id",
      },
      {
        columnName: "Asaas UserID",
        columnLabel: "asaas_user_id",
      },
      {
        columnName: "Asaas PaymentID",
        columnLabel: "asaas_payment_id",
      },

      {
        columnName: "Amount",
        columnLabel: "amount",
      },
      {
        columnName: "Net",
        columnLabel: "net",
      },
      {
        columnName: "Stauts",
        columnLabel: "status",
      },
      {
        columnName: "Created Date",
        columnLabel: "createdAt",
      },
      {
        columnName: "Updated Date",
        columnLabel: "updatedAt",
      },
      // {
      //   columnName: "Actions",
      //   columnLabel: "actions",
      //   sortEnabled: false,
      // },
    ]);

    const listQuery = ref<any>({
      type: ActivityType.DEPOSIT,
      status: PaymentStatus.All,
      search: "",
      page: 1,
      size: 25,
    });

    const tableLoading = ref(false);
    const tableData = ref<Array<IActivity>>([]);
    const tableTotal = ref(0);

    onMounted(() => {
      getList();
    });
    const getList = () => {
      tableLoading.value = true;
      ApiService.query("activities", listQuery.value).then((res) => {
        tableData.value = res.data[0];
        tableTotal.value = res.data[1];
        tableLoading.value = false;
      });
    };
    const onPageChanged = (page: number) => {
      listQuery.value.page = page;
      getList();
    };

    const onItemsPerPageChanged = (size: number) => {
      listQuery.value.size = size;
      getList();
    };

    const onSearch = () => {
      getList();
    };

    const onStatus = (status: PaymentStatus) => {
      listQuery.value.status = status;
      getList();
    };
    return {
      tableTotal,
      tableLoading,
      tableData,
      onPageChanged,
      onItemsPerPageChanged,
      tableHeader,
      getAssetPath,
      currencyFormat,
      profitColor,
      PaymentStatus,
      ActivityState,
      listQuery,
      onStatus,
      onSearch,
      timeFormat,
    };
  },
});
</script>
