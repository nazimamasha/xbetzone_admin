<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <div class="d-flex align-items-center">
          <el-date-picker
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            size="large"
            class="bg-gray-100"
            v-model="listQuery.range"
          />
          <!--begin::Search-->
          <div class="d-flex align-items-center position-relative my-1 ms-3">
            <KTIcon
              icon-name="magnifier"
              icon-class="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              class="form-control form-control-solid w-250px ps-15"
              placeholder="User ID"
              v-on:keyup.enter="onSearch"
              v-model="listQuery.user_id"
            />
          </div>

          <!--end::Search-->
          <button class="btn btn-secondary ms-3" @click="onSearch()">
            Search
          </button>
        </div>
      </div>
      <div class="card-toolbar">
        <div class="d-flex align-items-center position-relative me-3 ms-6">
          <select
            placeholder="Search Type"
            class="form-control form-control-solid w-200px pe-8"
            v-model="listQuery.sort"
            @change="onSort()"
          >
            <option :value="SportsBetLogSortKey.CreatedAt">
              Order By Bet Time
            </option>
            <option :value="SportsBetLogSortKey.BetAmount">
              Order By Bet Amount
            </option>
            <option :value="SportsBetLogSortKey.WinAmount">
              Ordery By Win Amount
            </option>
          </select>
          <KTIcon
            icon-name="down"
            icon-class="fs-1 position-absolute me-5 end-0 "
          />
        </div>
        <button
          type="button"
          class="btn me-3 ms-3"
          :class="{
            'btn-light-primary': listQuery.status === SportsBetStatus.All,
          }"
          @click="onStatus(SportsBetStatus.All)"
        >
          All
        </button>

        <button
          type="button"
          class="btn me-3"
          :class="{
            'btn-light-primary': listQuery.status === SportsBetStatus.PENDING,
          }"
          @click="onStatus(SportsBetStatus.PENDING)"
        >
          Waiting
        </button>

        <button
          type="button"
          class="btn me-3"
          :class="{
            'btn-light-primary ': listQuery.status === SportsBetStatus.WIN,
          }"
          @click="onStatus(SportsBetStatus.WIN)"
        >
          Win
        </button>
        <button
          type="button"
          class="btn me-3"
          :class="{
            'btn-light-primary': listQuery.status === SportsBetStatus.LOSE,
          }"
          @click="onStatus(SportsBetStatus.LOSE)"
        >
          Lose
        </button>
        <button
          type="button"
          class="btn"
          :class="{
            'btn-light-primary': listQuery.status === SportsBetStatus.CANCELED,
          }"
          @click="onStatus(SportsBetStatus.CANCELED)"
        >
          Cancelled
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
        <template v-slot:bet="{ row: bet }">
          <div class="my-5">
            <table
              class="table align-middle w-100 text-center table-bordered gy-2 border-gray-500"
            >
              <thead>
                <!-- <tr class="border-0">
                  <td
                    class="bg-primary text-white border-bottom border-gray-500 w-175px"
                  >
                    Prematch
                  </td>
                </tr> -->
                <tr>
                  <th>Type</th>
                  <th>Start Time</th>
                  <th class="w-250px">League</th>
                  <th width="10%">Market</th>
                  <th>Home</th>
                  <th>Away</th>
                  <th>Bet Type</th>
                  <th>Odds</th>
                  <th>Score</th>
                  <th class="w-125px">Status</th>
                  <!-- <th class="w-250px">Action</th> -->
                </tr>
              </thead>
              <tbody class="lh-1">
                <tr v-for="(betItem, bi) in bet.bets" :key="bi">
                  <td
                    class="text-dark w-150px"
                    :class="
                      betItem.SportType === SportsType.PREMATCH
                        ? 'bg-light-success'
                        : 'bg-light-danger'
                    "
                  >
                    {{
                      betItem.SportType === SportsType.PREMATCH
                        ? "Prematch"
                        : "Inplay"
                    }}
                  </td>
                  <td>{{ betTimeFormat(betItem.Fixture.StartDate) }}</td>
                  <td>
                    <img
                      :src="
                        getBack2betImage(
                          ImageType.Sports,
                          betItem.Fixture.Sport?.logo
                        )
                      "
                      class="me-3"
                      alt=""
                      width="20"
                    />
                    {{ betItem.Fixture.Sport?.Name.en }} /
                    {{ betItem.Fixture.League?.Name.en }}
                  </td>
                  <td>{{ betItem.MarketName }}</td>
                  <td>{{ betItem.Fixture.Participants[0]?.Name.en }}</td>
                  <td>{{ betItem.Fixture.Participants[1]?.Name.en }}</td>
                  <td>{{ betItem.BetName }}</td>
                  <td>
                    <span class="fw-bolder">{{ betItem.Price }}</span>
                  </td>

                  <td>
                    <div class="text-danger">
                      {{ betItem.Livescore?.Scoreboard?.Results[0].Value }} :
                      {{ betItem.Livescore?.Scoreboard?.Results[1]?.Value }}
                    </div>
                  </td>
                  <td>
                    <span :class="getSportsBetStatusColor(betItem.status)">
                      {{ getSportsBetStatusLabel(betItem.status) }}
                    </span>
                  </td>
                  <!-- <td>
                    <button class="btn btn-sm btn-light-warning me-3">
                      Return
                    </button>
                    <button class="btn btn-sm btn-light-success me-3">
                      Win
                    </button>
                    <button class="btn btn-sm btn-light-danger">Lose</button>
                  </td> -->
                </tr>
              </tbody>
            </table>

            <table
              class="table align-middle w-100 text-center table-bordered gy-2 border-gray-500 mt-2"
            >
              <tbody class="border border-gray-500 lh-1">
                <tr>
                  <td class="bg-light-info w-150px">
                    {{ bet.user.refer.partner }} / {{ bet.user.user_id }} ({{
                      bet.user.nickname
                    }})
                  </td>
                  <td>
                    <span class="fw-bold">Bet Time</span>:
                    {{ betTimeFormat(bet.createdAt) }}
                  </td>

                  <td>
                    <div>
                      <span class="text-danger fw-bolder text-uppercase">
                        {{ bet.bet_type }}
                      </span>
                      <span> / </span>Odds: {{ bet.price }}
                    </div>
                  </td>
                  <td>
                    <div>
                      <span class="text-success fw-bolder"> Bonus </span>
                      <span> / </span>Odds: {{ bet.bonus_dividend }}
                    </div>
                  </td>
                  <td>Bet Amount: {{ currencyFormat(bet.amount) }}</td>
                  <td>
                    Estimated Win Amount:
                    {{
                      currencyFormat(
                        floorNumber(bet.amount * bet.price * bet.bonus_dividend)
                      )
                    }}
                  </td>

                  <td class="w-125px">
                    <div
                      class="fw-bolder"
                      :class="getSportsBetStatusColor(bet.status)"
                    >
                      {{ getSportsBetStatusLabel(bet.status) }}
                    </div>
                  </td>
                  <td class="red-bg width70 cursor p-0 w-250px">
                    <el-popconfirm
                      :width="300"
                      title="Are you sure you want to cancel?"
                      @confirm="onCancel(bet._id)"
                      :confirm-button-text="'Yes, Cancel'"
                      :cancel-button-text="'No'"
                      confirm-button-type="danger"
                    >
                      <template v-slot:reference>
                        <button
                          :data-kt-indicator="
                            cancelLoading === bet._id ? 'on' : null
                          "
                          :disabled="
                            cancelLoading === bet._id ||
                            bet.status === SportsBetStatus.CANCELED
                          "
                          class="btn btn-danger m-0 w-100 rounded-0 fw-bold"
                        >
                          <span
                            v-if="cancelLoading !== bet._id"
                            class="indicator-label"
                          >
                            Cancel
                          </span>
                          <span
                            v-if="cancelLoading === bet._id"
                            class="indicator-progress"
                          >
                            Please wait...
                            <span
                              class="spinner-border spinner-border-sm align-middle ms-2"
                            ></span>
                          </span>
                        </button>
                      </template>
                    </el-popconfirm>

                    <!-- <button
                      class="btn btn-danger m-0 w-100 rounded-0 fw-bold"
                      v-if="bet.status !== SportsBetStatus.PENDING"
                    >
                      RollBack
                    </button> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/bet-datatable/BetDataTable.vue";
import {
  SportsType,
  currencyFormat,
  profitColor,
  type IBetFindQuery,
  SportsBetStatus,
  betTimeFormat,
  getBack2betImage,
  ImageType,
  getSportsBetStatusLabel,
  getSportsBetStatusColor,
  floorNumber,
  SportsBetLogSortKey,
} from "@/assets/ts/utils";
import type { ISportsBet } from "@/assets/ts/utils/bet.interface";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "betsports-listing",
  components: {
    Datatable,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Bet",
        columnLabel: "bet",
      },
    ]);

    const listQuery = ref<IBetFindQuery>({
      search: "",
      page: 1,
      size: 25,
      status: SportsBetStatus.All,
      range: null,
      user_id: "",
      sort: SportsBetLogSortKey.CreatedAt,
      isesports: true
    });
    const tableLoading = ref(false);
    const tableData = ref<ISportsBet[]>([]);
    const tableTotal = ref(0);

    onMounted(() => {
      getList();
    });
    const getList = () => {
      tableLoading.value = true;
      ApiService.query("bets", listQuery.value).then((res) => {
        tableData.value = res.data[0];
        tableTotal.value = res.data[1];
        tableLoading.value = false;
      });
    };
    const onSort = () => {
      getList();
    };

    const onStatus = (status) => {
      listQuery.value.status = status;
      getList();
    };
    const onPageChanged = (page: number) => {
      listQuery.value.page = page;
      getList();
    };

    const onItemsPerPageChanged = (size: number) => {
      listQuery.value.size = size;
      getList();
    };
    const cancelLoading = ref();
    const onCancel = (id) => {
      if (cancelLoading.value === id) {
        return;
      }
      cancelLoading.value = id;
      ApiService.post("bets/cancel/" + id, {})
        .then((res) => {
          cancelLoading.value = "";
        })
        .catch(({ response }) => {
          cancelLoading.value = "";
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
    };
    const onSearch = () => {
      if (listQuery.value.range) {
        listQuery.value.from = listQuery.value.range[0].getTime();
        listQuery.value.to = listQuery.value.range[1].getTime();
      }

      getList();
    };
    return {
      tableTotal,
      tableLoading,
      tableData,
      tableHeader,
      getAssetPath,
      currencyFormat,
      profitColor,
      SportsBetStatus,
      listQuery,
      SportsType,
      onStatus,
      onPageChanged,
      onItemsPerPageChanged,
      betTimeFormat,
      getBack2betImage,
      ImageType,
      getSportsBetStatusLabel,
      getSportsBetStatusColor,
      floorNumber,
      onSort,
      onCancel,
      cancelLoading,
      SportsBetLogSortKey,
      onSearch,
    };
  },
});
</script>
