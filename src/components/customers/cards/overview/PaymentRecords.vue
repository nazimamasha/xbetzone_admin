<template>
  <!--begin::Card-->
  <div :class="`card pt-4 ${cardClasses}`">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Payment Records</h2>
      </div>
      <!--end::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Filter-->
        <!-- <button
          type="button"
          class="btn btn-sm btn-flex btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_payment"
        >
          <KTIcon icon-name="plus-square" icon-class="fs-3" />
          Add payment
        </button> -->
        <!--end::Filter-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0 pb-5">
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
          {{ deposit.partner }}
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
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import {
  ActivityType,
  PaymentStatus,
  type IActivityFindQuery,
  currencyFormat,
  profitColor,
  ActivityState,
  timeFormat,
} from "@/assets/ts/utils";
import type { IActivity } from "@/assets/ts/utils/activity.interface";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "payment-records",
  props: {
    cardClasses: String,
    user_id: String,
  },
  components: {
    Datatable,
  },
  setup(props) {
    const tableHeader = ref([
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

    const listQuery = ref<IActivityFindQuery>({
      type: ActivityType.DEPOSIT,
      status: ActivityState.All,
      search: props.user_id || "",
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

      timeFormat,
    };
  },
});
</script>
