<template>
  <div class="card card-flush" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-7">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-800">{{ title }}</span>

        <!-- <span class="text-gray-400 mt-1 fw-semibold fs-6"
          >Updated 37 minutes ago</span
        > -->
      </h3>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-6">
      <!--begin::Table container-->
      <div class="table-responsive" style="overflow-y: hidden">
        <!--begin::Table-->
        <table
          class="table table-row-dashed align-middle gs-0 gy-3 my-0"
          :class="[table == null && 'overlay overlay-block']"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
              <th class="p-0 pb-3 min-w-30px text-start">#</th>
              <th class="p-0 pb-3 min-w-150px text-start">USER ID</th>
              <th class="p-0 pb-3 min-w-100px text-end">BET</th>
              <th class="p-0 pb-3 min-w-100px text-end">WIN</th>
              <th class="p-0 pb-3 min-w-100px text-end">PROFIT</th>
              <!-- <th class="p-0 pb-3 min-w-150px text-end pe-12">ONLINE</th> -->
              <th class="p-0 pb-3 w-50px text-end">VIEW</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(row, i) in table" :key="i">
              <tr>
                <td>
                  <span class="text-dark">{{ i + 1 }}.</span>
                </td>
                <td class="ps-0">
                  <div class="d-flex align-items-center">
                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                        >{{ row.user_id }} ({{ row.nickname }})</a
                      >
                    </div>
                  </div>
                </td>

                <td class="text-end pe-0">
                  <span class="text-gray-600 fw-bold fs-6">
                    {{
                      currencyFormat(
                        row.month_bet.sports_single_prematch +
                          row.month_bet.sports_single_inplay +
                          row.month_bet.esports_single_prematch +
                          row.month_bet.esports_single_inplay +
                          row.month_bet.multi
                      )
                    }}
                  </span>
                </td>
                <td class="text-end pe-0">
                  <span class="text-gray-600 fw-bold fs-6">
                    {{
                      currencyFormat(
                        row.month_win.sports_single_prematch +
                          row.month_win.sports_single_inplay +
                          row.month_win.esports_single_premach +
                          row.month_win.esports_single_inplay +
                          row.month_win.multi
                      )
                    }}
                  </span>
                </td>

                <td class="text-end pe-0">
                  <!--begin::Label-->
                  <span
                    v-if="row.profit >= 0"
                    class="badge badge-light-success fs-base"
                  >
                    <span class="svg-icon svg-icon-5 svg-icon-success ms-n1">
                      <inline-svg
                        :src="
                          getAssetPath('media/icons/duotune/arrows/arr066.svg')
                        "
                      />
                    </span>
                    {{ currencyFormat(row.profit) }}
                  </span>
                  <!--end::Label-->
                  <!--begin::Label-->
                  <span v-else class="badge badge-light-danger fs-base">
                    <span class="svg-icon svg-icon-5 svg-icon-danger ms-n1">
                      <inline-svg
                        :src="
                          getAssetPath('media/icons/duotune/arrows/arr065.svg')
                        "
                      />
                    </span>
                    {{ currencyFormat(row.profit) }}
                  </span>
                  <!--end::Label-->
                </td>

                <!-- <td class="text-end pe-12">
                  <span
                    :class="`badge py-3 px-4 fs-7 badge-light-${row.status.state}`"
                    >{{ row.status.label }}</span
                  >
                </td> -->

                <td class="text-end">
                  <router-link
                    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px ms-3"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="View Gamelog"
                    :to="'Bets'"
                  >
                    <span class="svg-icon svg-icon-5 svg-icon-gray-700">
                      <inline-svg
                        :src="
                          getAssetPath('media/icons/duotune/arrows/arr001.svg')
                        "
                      />
                    </span>
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->

          <Loading v-if="table == null" />
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end: Card Body-->
  </div>
</template>

<script lang="ts">
import { currencyFormat } from "@/assets/ts/utils";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";

export default defineComponent({
  name: "list-widget",
  components: { Loading },
  props: {
    className: { type: String, required: false },
    title: { type: String, required: true },
    table: { type: Array<any> },
  },
  setup() {
    return {
      getAssetPath,
      currencyFormat,
    };
  },
});
</script>
