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

        <button
          type="button"
          class="btn me-3 ms-3"
          :class="{
            'btn-light-primary':
              listQuery.status === FixtureFilterStatus.NOTSTARTEDYET,
          }"
          @click="onStatus(FixtureFilterStatus.NOTSTARTEDYET)"
        >
          Waiting
        </button>
        <button
          type="button"
          class="btn me-3"
          :class="{
            'btn-light-primary ':
              listQuery.status === FixtureFilterStatus.PROGRESS,
          }"
          @click="onStatus(FixtureFilterStatus.PROGRESS)"
        >
          Ongoing
        </button>
        <button
          type="button"
          class="btn me-3"
          :class="{
            'btn-light-primary':
              listQuery.status === FixtureFilterStatus.FINISHED,
          }"
          @click="onStatus(FixtureFilterStatus.FINISHED)"
        >
          Finished
        </button>
        <button
          type="button"
          class="btn"
          :class="{
            'btn-light-primary':
              listQuery.status === FixtureFilterStatus.CANCELLED,
          }"
          @click="onStatus(FixtureFilterStatus.CANCELLED)"
        >
          Cancelled
        </button>
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar"></div>
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
        <template v-slot:game="{ row: game }">
          <div class="d-flex align-items-center">
            <img
              :src="
                getBack2betImage(ImageType.Sports, game.Fixture.Sport?.logo)
              "
              class="me-3"
              alt=""
              width="20"
            />
            {{ game.Fixture.Sport?.Name.en }}
          </div>
        </template>
        <template v-slot:country="{ row: game }">
          {{ game.Fixture.Location?.Name.en }}
        </template>
        <template v-slot:league="{ row: game }">
          {{ game.Fixture.League?.Name.en }}
        </template>
        <template v-slot:time="{ row: game }">
          {{ timeFormat(game.Fixture.StartDate) }}
        </template>
        <template v-slot:team1="{ row: game }">
          {{ game.Fixture.Participants[0]?.Name.en }}
        </template>
        <template v-slot:team2="{ row: game }">
          {{ game.Fixture.Participants[1]?.Name.en }}
        </template>
        <template v-slot:betCount="{ row: game }">
          {{ game.bet_count }}
        </template>
        <template v-slot:betAmount="{ row: game }">
          {{ currencyFormat(game.bet_amount) }}
        </template>

        <template v-slot:actions="{ row: game }">
          <button
            class="btn btn-sm btn-light btn-active-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_markets"
            @click="marketsModalRef.setGame(SportsType.INPLAY, game)"
          >
            Markets
            <!-- <KTIcon icon-name="right" icon-class="fs-5 m-0" /> -->
          </button>
          <!--begin::Menu-->
        </template>
      </Datatable>
    </div>
  </div>

  <MarketsModal ref="marketsModalRef"></MarketsModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import MarketsModal from "@/components/modals/forms/MarketsModal.vue";
import {
  PaymentStatus,
  SportsType,
  currencyFormat,
  profitColor,
  type IGameFindQuery,
  SportsIDs,
  FixtureFilterStatus,
  timeFormat,
  getBack2betImage,
  ImageType,
} from "@/assets/ts/utils";
import type { IPrematch } from "@/assets/ts/utils/games.interface";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "esports-listing",
  components: {
    Datatable,
    MarketsModal,
  },
  setup() {
    const marketsModalRef = ref();
    const tableHeader = ref([
      {
        columnName: "Game",
        columnLabel: "game",
        sortEnabled: true,
      },
      {
        columnName: "Country",
        columnLabel: "country",
        sortEnabled: true,
      },
      {
        columnName: "League",
        columnLabel: "league",
        sortEnabled: true,
      },
      {
        columnName: "Time",
        columnLabel: "time",
      },
      {
        columnName: "Home Team",
        columnLabel: "team1",
        sortEnabled: true,
      },
      {
        columnName: "Away Team",
        columnLabel: "team2",
        sortEnabled: true,
      },
      {
        columnName: "Bet Count",
        columnLabel: "betCount",
        sortEnabled: true,
      },
      {
        columnName: "Bet Amount",
        columnLabel: "betAmount",
        sortEnabled: true,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);

    const tableLoading = ref(false);
    const tableData = ref<IPrematch[]>([]);
    const tableTotal = ref(0);

    onMounted(() => {
      getList();
    });

    const listQuery = ref<IGameFindQuery>({
      type: SportsType.INPLAY,
      esports: true,
      status: FixtureFilterStatus.NOTSTARTEDYET,
      search: "",
      page: 1,
      size: 25,
    });
    const onPageChanged = (page: number) => {
      listQuery.value.page = page;
      getList();
    };

    const onItemsPerPageChanged = (size: number) => {
      listQuery.value.size = size;
      getList();
    };

    const getList = () => {
      tableLoading.value = true;
      ApiService.query("games/prematches", listQuery.value).then((res) => {
        tableData.value = res.data[0];
        tableTotal.value = res.data[1];
        tableLoading.value = false;
      });
    };

    const onStatus = (status: FixtureFilterStatus) => {
      listQuery.value.status = status;
      getList();
    };

    const onSearch = () => {
      getList();
    };
    return {
      tableLoading,
      tableData,
      tableTotal,
      tableHeader,
      onSearch,
      getAssetPath,
      currencyFormat,
      profitColor,
      PaymentStatus,
      listQuery,
      onStatus,
      SportsType,
      FixtureFilterStatus,
      SportsIDs,
      onPageChanged,
      onItemsPerPageChanged,
      timeFormat,
      getBack2betImage,
      ImageType,
      marketsModalRef,
    };
  },
});
</script>
