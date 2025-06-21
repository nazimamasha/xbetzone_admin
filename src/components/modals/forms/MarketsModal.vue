<template>
  <div
    class="modal fade"
    id="kt_modal_markets"
    ref="modalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-4" id="kt_modal_markets_header">
          <!--begin::Modal title-->
          <div>
            <h2 class="fw-bold mb-4">Markets</h2>
            <!--end::Modal title-->

            <div
              class="d-flex justify-content-between min-w-600px fs-6 fw-semibold"
            >
              <div class="d-flex align-items-center">
                <img
                  :src="
                    getBack2betImage(
                      ImageType.Sports,
                      game?.Fixture?.Sport?.logo
                    )
                  "
                  alt="Football"
                  width="20"
                  class="me-2"
                />
                <span>{{ game?.Fixture.Sport.Name.en }}</span>
              </div>
              <div class="d-flex align-items-center mx-3">
                <img
                  :src="
                    getBack2betImage(
                      ImageType.Locations,
                      game?.Fixture?.Location?.flag
                    )
                  "
                  class="me-2"
                  width="35"
                />
                <span> {{ game?.Fixture?.Location?.Name.en }}</span>
              </div>
              <div class="mx-6">{{ timeFormat(game?.Fixture?.StartDate) }}</div>
              <div class="d-flex align-items-center me-3">
                <div class="d-flex me-3">
                  <img
                    :src="
                      getBack2betImage(
                        ImageType.Teams,
                        game?.Fixture?.Participants[0]?.logo
                      )
                    "
                    class="me-2"
                    height="20"
                  />
                  <span>{{ game?.Fixture?.Participants[0]?.Name.en }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <img
                    :src="
                      getBack2betImage(
                        ImageType.Teams,
                        game?.Fixture?.Participants[1]?.logo
                      )
                    "
                    class="me-2"
                    height="20"
                  />
                  <span>{{ game?.Fixture?.Participants[1]?.Name.en }}</span>
                </div>
              </div>
            </div>
          </div>
          <!--begin::Close-->
          <div
            id="kt_modal_markets_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <div class="px-6 py-4">
          <Datatable
            :loading="tableLoading"
            :data="tableData"
            :header="tableHeader"
            :enable-items-per-page-dropdown="true"
            :checkbox-enabled="false"
            checkbox-label="id"
            :gy="'gy-2'"
          >
            <template v-slot:name="{ row: betline }">
              {{ betline.MarketName.en }}
            </template>
            <template v-slot:option="{ row: betline }">
              {{ betline.Name }}
            </template>
            <template v-slot:line="{ row: betline }">
              {{ betline.BaseLine || "-" }}
            </template>
            <template v-slot:odds="{ row: betline }">
              {{ betline.Price }}
            </template>
            <template v-slot:status="{ row: betline }">
              <span class="badge badge-success" v-if="betline.Status === 1"
                >Active</span
              >
              <span class="badge badge-danger" v-else>Stopped</span>
            </template>
            <template v-slot:bet_amount="{ row: betline }">
              {{ currencyFormat(betline.bet_amount || 0) }}
            </template>
            <template v-slot:updatedAt="{ row: betline }">
              {{ timeFormat(betline.LastUpdate) }}
            </template>
          </Datatable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/modal";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import {
  ImageType,
  SportsType,
  currencyFormat,
  getBack2betImage,
  timeFormat,
} from "@/assets/ts/utils";
import { Check, Close } from "@element-plus/icons-vue";
import type {
  IBetMarket,
  IFixture,
  IPrematch,
} from "@/assets/ts/utils/games.interface";
import ApiService from "@/core/services/ApiService";
export default defineComponent({
  name: "sports-markets-modal",
  components: { Datatable },
  setup() {
    const modalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const tableHeader = ref([
      {
        columnName: "Name",
        columnLabel: "name",
      },
      {
        columnName: "Betting Option",
        columnLabel: "option",
      },
      {
        columnName: "Line",
        columnLabel: "line",
      },
      {
        columnName: "Odds",
        columnLabel: "odds",
      },
      {
        columnName: "Status",
        columnLabel: "status",
      },
      {
        columnName: "Bet Amount",
        columnLabel: "bet_amount",
      },
      {
        columnName: "Updated Date",
        columnLabel: "updatedAt",
      },
    ]);
    const game = ref<IFixture | null>(null);

    const tableData = ref<IBetMarket[]>([]);
    const tableLoading = ref(false);
    // const tableRefresh = ref(new Date().getTime());

    const setGame = (type: SportsType, sport: IFixture) => {
      game.value = sport;
      tableData.value = [];
      tableLoading.value = true;

      ApiService.get(
        type === SportsType.PREMATCH
          ? "games/prematchmarkets"
          : "games/inplaymarkets",
        sport._id
      ).then((res) => {
        let betlines: IBetMarket[] = [];
        for (const market of res.data.Markets) {
          for (const betline of market.Bets) {
            betlines.push({
              MarketName: market.Name,
              MarketId: market.Id,
              ...betline,
            });
          }
        }
        tableLoading.value = false;
        tableData.value = betlines;
        // tableRefresh.value = new Date().getTime();
      });
    };

    return {
      loading,
      modalRef,
      getAssetPath,
      countries,
      tableHeader,
      currencyFormat,
      tableData,
      Check,
      Close,
      setGame,
      game,
      getBack2betImage,
      ImageType,
      timeFormat,
      tableLoading,
    };
  },
});
</script>
