<template>
  <!--begin::Card-->
  <div :class="`card pt-4 ${cardClasses}`">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Logs</h2>
      </div>
      <!--end::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Button-->
        <!-- <button type="button" class="btn btn-sm btn-light-primary">
          <KTIcon icon-name="cloud-change" icon-class="fs-3" />
          Download Report
        </button> -->
        <!--end::Button-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body py-0">
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
        <template v-slot:date="{ row: log }">
          {{ timeFormat(log.createdAt) }}
        </template>
        <template v-slot:partner="{ row: log }">
          {{ log.user.refer.partner }}
        </template>
        <template v-slot:userId="{ row: log }">
          {{ log.user.user_id }} ({{ log.user.nickname }})
        </template>
        <template v-slot:type="{ row: log }">
          <span class="badge badge-secondary">{{
            UserCashLogTypeLabel[log.type]
          }}</span>
        </template>
        <template v-slot:amount="{ row: log }">
          <span :class="profitColor(log.amount, 0)">
            {{ currencyFormat(log.amount) }}
          </span>
        </template>
        <template v-slot:beforeAmount="{ row: log }">
          {{ currencyFormat(log.before) }}
        </template>
        <template v-slot:afterAmount="{ row: log }">
          {{ currencyFormat(log.after) }}
        </template>
        <template v-slot:memo="{ row: log }">
          {{ log.memo }}
        </template>
      </Datatable>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import {
  UserCashLogType,
  type IUserCashlogFindQuery,
  currencyFormat,
  profitColor,
  timeFormat,
  UserCashLogTypeLabel,
} from "@/assets/ts/utils";
import type { IUserCashLog } from "@/assets/ts/utils/log.interface";
import { getAssetPath } from "@/core/helpers/assets";
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
export default defineComponent({
  name: "logs-card",
  components: { Datatable },
  props: {
    cardClasses: String,
    user_id: String,
  },
  setup(props) {
    const tableHeader = ref([
      {
        columnName: "Date",
        columnLabel: "date",
      },

      {
        columnName: "Type",
        columnLabel: "type",
      },
      {
        columnName: "Before Balance",
        columnLabel: "beforeAmount",
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
      },
      {
        columnName: "After Balance",
        columnLabel: "afterAmount",
      },
      {
        columnName: "Memo",
        columnLabel: "memo",
      },
    ]);
    const listQuery = ref<IUserCashlogFindQuery>({
      search: props.user_id || "",
      page: 1,
      size: 25,
      type: UserCashLogType.All,
      range: null,
    });

    const tableLoading = ref(false);
    const tableData = ref<IUserCashLog[]>([]);
    const tableTotal = ref(0);

    onMounted(() => {
      getList();
    });

    const getList = () => {
      tableLoading.value = true;
      if (listQuery.value.range) {
        listQuery.value.from = listQuery.value.range[0].getTime();
        listQuery.value.to = listQuery.value.range[1].getTime();
      }
      ApiService.query("logs/usercash", listQuery.value).then((res) => {
        console.log(res.data);
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
      tableLoading,
      tableTotal,
      tableData,
      tableHeader,
      getAssetPath,
      currencyFormat,
      profitColor,
      listQuery,
      onPageChanged,
      onItemsPerPageChanged,
      UserCashLogType,
      timeFormat,
      UserCashLogTypeLabel,
    };
  },
});
</script>
