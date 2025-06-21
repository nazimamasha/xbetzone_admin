<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <a
          class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1"
          id="kt_charts_widget_2_month_btn"
          :class="[listQuery.type === StatisticsType.Daily && 'active']"
          @click="onType(StatisticsType.Daily)"
        >
          Daily
        </a>
        <a
          class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-3"
          id="kt_charts_widget_2_year_btn"
          :class="[listQuery.type === StatisticsType.Monthly && 'active']"
          @click="onType(StatisticsType.Monthly)"
        >
          Monthly
        </a>

        <el-date-picker
          v-if="listQuery.type === StatisticsType.Daily"
          v-model="listQuery.range"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          size="large"
          class="bg-gray-100 me-3"
        />

        <el-date-picker
          v-if="listQuery.type === StatisticsType.Monthly"
          v-model="listQuery.monthrange"
          type="monthrange"
          range-separator="To"
          start-placeholder="Start month"
          end-placeholder="End month"
          size="large"
          class="bg-gray-100 me-3"
        />
        <button class="btn btn-secondary ms-3" @click="onSearch()">
          Search
        </button>
      </div>
      <!--begin::Card title-->
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
        <template v-slot:date="{ row: log }">
          {{ log.date }}
        </template>
        <template v-slot:new_user="{ row: log }">
          {{ log.new_user }}
        </template>
        <template v-slot:deposit="{ row: log }">
          {{ currencyFormat(log.user_deposit) }}
        </template>
        <template v-slot:withdraw="{ row: log }">
          {{ currencyFormat(log.user_withdraw) }}
        </template>
        <template v-slot:winrate="{ row: log }">
          <span :class="profitColor(log.deposit, log.withdraw)">
            {{ currencyFormat(log.deposit - log.withdraw) }}
          </span>
        </template>
        <template v-slot:bet="{ row: log }">
          {{ currencyFormat(log.sports_bet) }}
        </template>
        <template v-slot:win="{ row: log }">
          {{ currencyFormat(log.sports_win) }}
        </template>
        <template v-slot:profit="{ row: log }">
          <span :class="profitColor(log.sports_bet, log.sports.win)">
            {{ currencyFormat(log.sports_bet - log.sports.win) }}
          </span>
        </template>
      </Datatable>
    </div>
  </div>

  <MarketsModal></MarketsModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";

import MarketsModal from "@/components/modals/forms/MarketsModal.vue";
import type { ICustomer } from "@/core/data/customers";
import customers from "@/core/data/customers";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import {
  PaymentStatus,
  SportsType,
  UserCashLogType,
  currencyFormat,
  profitColor,
  type IFindQuery,
  type IUserCashlogFindQuery,
  timeFormat,
  UserCashLogTypeLabel,
  type IStatsFindQuery,
  StatisticsType,
} from "@/assets/ts/utils";
import type { IUserCashLog } from "@/assets/ts/utils/log.interface";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "stats-listing",
  components: {
    Datatable,
    MarketsModal,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Date",
        columnLabel: "date",
      },
      {
        columnName: "New Users",
        columnLabel: "new_user",
      },
      {
        columnName: "Deposit",
        columnLabel: "deposit",
      },
      {
        columnName: "Withdraw",
        columnLabel: "withdraw",
      },
      {
        columnName: "Win Rate",
        columnLabel: "winrate",
      },
      {
        columnName: "Bet",
        columnLabel: "bet",
      },
      {
        columnName: "Win",
        columnLabel: "win",
      },
    ]);
    const listQuery = ref<IStatsFindQuery>({
      type: StatisticsType.Daily,
      search: "",
      page: 1,
      size: 25,
      monthrange: null,
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
      if (
        listQuery.value.type === StatisticsType.Daily &&
        listQuery.value.range
      ) {
        listQuery.value.from = listQuery.value.range[0];
        listQuery.value.to = listQuery.value.range[1];
      }
      if (
        listQuery.value.type === StatisticsType.Monthly &&
        listQuery.value.monthrange
      ) {
        listQuery.value.from = listQuery.value.monthrange[0];
        listQuery.value.to = listQuery.value.monthrange[1];
      }
      ApiService.query("stats", listQuery.value).then((res) => {
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
    const onType = (type) => {
      listQuery.value.type = type;
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
      onSearch,
      UserCashLogType,
      timeFormat,
      UserCashLogTypeLabel,
      StatisticsType,
      onType,
    };
  },
});
</script>
