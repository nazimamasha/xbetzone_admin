<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <select
          name="status"
          class="form-control form-control-solid form-select form-select-white w-250px me-3"
          v-model="listQuery.t_type"
        >
          <option value="All">All</option>
          <option :value="TransactionType.Sports">Sports</option>
          <option :value="TransactionType.Casino">Casino</option>
        </select>
        <el-date-picker
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          v-model="listQuery.range"
          size="large"
          class="bg-gray-100 me-3"
        />
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

        <button class="btn btn-secondary ms-3" @click="onSearch()">
          Search
        </button>
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <button
          type="button"
          class="btn me-3 ms-3"
          :class="{
            'btn-light-primary': listQuery.type === UserCashLogType.All,
          }"
          @click="onStatus(UserCashLogType.All)"
        >
          All
        </button>
        <button
          type="button"
          class="btn me-3 ms-3"
          :class="{
            'btn-light-primary': listQuery.type === UserCashLogType.Deposit,
          }"
          @click="onStatus(UserCashLogType.Deposit)"
        >
          Deposit
        </button>
        <button
          type="button"
          class="btn me-3 ms-3"
          :class="{
            'btn-light-primary': listQuery.type === UserCashLogType.SportsBet,
          }"
          @click="onStatus(UserCashLogType.SportsBet)"
        >
          Bet
        </button>
        <button
          type="button"
          class="btn me-3 ms-3"
          :class="{
            'btn-light-primary': listQuery.type === UserCashLogType.SportsWin,
          }"
          @click="onStatus(UserCashLogType.SportsWin)"
        >
          Win
        </button>
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
        <template v-slot:date="{ row: log }">
          {{ timeFormat(log.createdAt) }}
        </template>
        <template v-slot:partner="{ row: log }">
          {{ log.user.refer.partner }}
        </template>
        <template v-slot:userId="{ row: log }">
          {{ log.user.user_id }} ({{ log.user.nickname }})
        </template>
        <template v-slot:wallet="{ row: log }">
          <span
            class="badge badge-primary text-capitalize"
            v-if="log.t_type === 'sports'"
            >{{ log.t_type }}</span
          >
          <span
            class="badge badge-success text-capitalize"
            v-if="log.t_type === 'casino'"
            >{{ log.t_type }}</span
          >
          <span
            class="badge badge-primary text-capitalize"
            v-else-if="[5].includes(log.type)"
            >{{ 'Sports' }}</span
          >
          <span
            class="badge badge-primary text-capitalize"
            v-else-if="[1].includes(log.type)"
            >{{ 'Deposit' }}</span
          >
          <span
            class="badge badge-primary text-capitalize"
            v-else-if="[2].includes(log.type)"
            >{{ 'Withdraw' }}</span
          >
          <span
            class="badge badge-success text-capitalize"
            v-else-if="[15, 16,17 ].includes(log.type)"
            >{{ 'Casino' }}</span
          > 
          <span
            class="badge badge-danger text-capitalize"
            v-else-if="[20].includes(log.type)"
            >{{ 'Admin' }}</span
          >
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
  TransactionType,
} from "@/assets/ts/utils";
import type { IUserCashLog } from "@/assets/ts/utils/log.interface";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "usermoneylog-listing",
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
        columnName: "Partner",
        columnLabel: "partner",
      },
      {
        columnName: "UserID(Nickname)",
        columnLabel: "userId",
      },
      {
        columnName: "Wallet",
        columnLabel: "wallet",
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
      search: "",
      page: 1,
      size: 25,
      t_type: "All",
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
    const onStatus = (type: UserCashLogType) => {
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
      onStatus,
      onPageChanged,
      onItemsPerPageChanged,
      onSearch,
      UserCashLogType,
      timeFormat,
      UserCashLogTypeLabel,
      TransactionType,
    };
  },
});
</script>
