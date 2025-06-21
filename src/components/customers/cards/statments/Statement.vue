<template>
  <!--begin::Statements-->
  <div :class="`card ${cardClasses}`">
    <!--begin::Header-->
    <div class="card-header">
      <!--begin::Title-->
      <div class="card-title">
        <h2>Bet Win Histories</h2>
      </div>
      <!--end::Title-->

      <!--begin::Toolbar-->
      <div class="card-toolbar"></div>
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Card body-->
    <div class="card-body pb-5">
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
    <!--end::Card body-->
  </div>
  <!--end::Statements-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/bet-datatable/BetDataTable.vue";
import {
  SportsBetStatus,
  type IBetFindQuery,
  SportsBetLogSortKey,
  getSportsBetStatusColor,
  getSportsBetStatusLabel,
  getBack2betImage,
  ImageType,
  SportsType,
  currencyFormat,
  betTimeFormat,
  floorNumber,
  profitColor,
} from "@/assets/ts/utils";
import type { ISportsBet } from "@/assets/ts/utils/bet.interface";
import ApiService from "@/core/services/ApiService";
import { getAssetPath } from "@/core/helpers/assets";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "statement-card",
  props: {
    cardClasses: String,
    user_id: String
  },
  components: {
    Datatable,
  },
  setup(props) {
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
      user_id: props.user_id,
      sort: SportsBetLogSortKey.CreatedAt,
      isesports: false,
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
      onPageChanged,
      onItemsPerPageChanged,
      betTimeFormat,
      getBack2betImage,
      ImageType,
      getSportsBetStatusLabel,
      getSportsBetStatusColor,
      floorNumber,
      onCancel,
      cancelLoading,
      SportsBetLogSortKey,
    };
  },
});
</script>
