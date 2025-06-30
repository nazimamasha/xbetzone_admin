<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1 me-3">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="listQuery.search"
            v-on:keyup.enter="onSearch"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="User ID"
          />
        </div>

        <button type="button" class="btn btn-secondary" @click="onSearch">
          Search
        </button>
        <!--end::Add customer-->
        <!--end::Search-->
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
        <template v-slot:partner="{ row: game }">
          {{ game.user.refer.partner }}
        </template>
        <template v-slot:user="{ row: game }">
          {{ game.user.user_id }} ({{ game.user.nickname }})
        </template>
        <template v-slot:provider="{ row: game }">
          {{ game.game_provider }}
        </template>
        <template v-slot:name="{ row: game }">
          {{ game.game_name }}
        </template>

        <template v-slot:type="{ row: game }">
          <div class="badge badge-secondary">
            {{ game.game_type }}
          </div>
        </template>
        <template v-slot:amount="{ row: game }">
          {{ currencyFormat(game.amount) }}
        </template>

        <template v-slot:action="{ row: game }">
          <div
            class="badge badge-light-success"
            v-if="game.action == CasinoAction.Bet"
          >
            Bet
          </div>
          <div
            class="badge badge-light-danger"
            v-if="game.action == CasinoAction.Win"
          >
            Win
          </div>
          <div
            class="badge badge-light-warning"
            v-if="game.action == CasinoAction.Refund"
          >
            Refund
          </div>
          <div
            class="badge badge-light-info"
            v-if="game.action == CasinoAction.Rollback"
          >
            Rollback
          </div>
        </template>
        <template v-slot:updatedAt="{ row: game }">
          {{ timeFormat(game.updatedAt) }}
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";

import {
  currencyFormat,
  profitColor,
  type IFindQuery,
  timeFormat,
  UserStatus,
  CasinoProviders,
  type ICasinoGameFindQuery,
  CasinoAction,
} from "@/assets/ts/utils";
import type { IUser } from "@/assets/ts/utils/user.interface";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "casino-games-listing",
  components: {
    Datatable,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Partner",
        columnLabel: "partner",
      },
      {
        columnName: "User",
        columnLabel: "user",
      },
      {
        columnName: "Provider",
        columnLabel: "provider",
        columnWidth: 75,
      },

      {
        columnName: "Name",
        columnLabel: "name",
      },

      {
        columnName: "Type",
        columnLabel: "type",
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
      },
      {
        columnName: "Action",
        columnLabel: "action",
      },

      {
        columnName: "Updated Date",
        columnLabel: "updatedAt",
      },
    ]);
    const listQuery = ref<ICasinoGameFindQuery>({
      search: "",
      page: 1,
      size: 25,
      provider: "All",
    });

    const tableLoading = ref(false);
    const tableData = ref<Array<IUser>>([]);
    const tableTotal = ref(0);

    onMounted(() => {
      getList();
    });
    const getList = () => {
      tableLoading.value = true;
      ApiService.query("bets/slot", listQuery.value).then((res) => {
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

    return {
      tableLoading,
      tableTotal,
      tableData,
      tableHeader,
      getAssetPath,
      currencyFormat,
      timeFormat,
      profitColor,
      listQuery,
      onPageChanged,
      onItemsPerPageChanged,
      onSearch,
      CasinoAction,
    };
  },
});
</script>
