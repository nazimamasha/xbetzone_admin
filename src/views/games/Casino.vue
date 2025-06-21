<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <select
          name="status"
          class="form-select form-control form-control-solid w-175px me-3"
          v-model="listQuery.provider"
        >
          <option value="All">All</option>
          <option :value="cp" v-for="(cp, cpi) in CasinoProviders" :key="cp">
            {{ cp }}
          </option>
        </select>
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
            placeholder="Search"
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
        <template v-slot:uuid="{ row: game }">
          <div class="w-175px">
            {{ game.uuid }}
          </div>
        </template>
        <template v-slot:provider="{ row: game }">
          {{ game.provider }}
        </template>
        <template v-slot:name="{ row: game }">
          {{ game.name }}
        </template>
        <template v-slot:image="{ row: game }">
          <img :src="game.image" :alt="game.name" width="180" />
        </template>
        <template v-slot:type="{ row: game }">
          <div class="badge badge-secondary">
            {{ game.type }}
          </div>
        </template>
        <template v-slot:has_lobby="{ row: game }">
          <div class="badge badge-light-primary" v-if="game.has_lobby == 1">
            Yes
          </div>
          <div class="badge badge-light-danger" v-else>No</div>
        </template>
        <template v-slot:is_mobile="{ row: game }">
          <div class="badge badge-light-primary" v-if="game.is_mobile == 1">
            Yes
          </div>
          <div class="badge badge-light-danger" v-else>No</div>
        </template>
        <template v-slot:has_freespins="{ row: game }">
          <div class="badge badge-light-primary" v-if="game.has_freespins == 1">
            Yes
          </div>
          <div class="badge badge-light-danger" v-else>No</div>
        </template>
        <template v-slot:has_tables="{ row: game }">
          <div class="badge badge-light-primary" v-if="game.has_tables == 1">
            Yes
          </div>
          <div class="badge badge-light-danger" v-else>No</div>
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
        columnName: "UUID",
        columnLabel: "uuid",
        columnWidth: 75,
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
        columnName: "Image",
        columnLabel: "image",
      },
      {
        columnName: "Type",
        columnLabel: "type",
      },

      {
        columnName: "Has Lobby",
        columnLabel: "has_lobby",
      },
      {
        columnName: "Is Mobile",
        columnLabel: "is_mobile",
      },
      {
        columnName: "Has Freespins",
        columnLabel: "has_freespins",
      },
      {
        columnName: "Has Tables",
        columnLabel: "has_tables",
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
      ApiService.query("games/casino", listQuery.value).then((res) => {
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
      CasinoProviders,
    };
  },
});
</script>
