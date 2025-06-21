<template>
  <div class="row g-5 g-xl-8">
    <div class="col-xl-3">
      <ProgressStatsWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-class="fa-solid fa-user-check text-primary"
        :value="dashbordStats?.onlineUsers"
        :prev-value="dashbordStats?.totalUsers"
        description="Online Users"
      >
      </ProgressStatsWidget>
    </div>
    <div class="col-xl-3">
      <StatsWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-class="fas fa-hand-holding-usd text-success"
        :value="dashbordStats?.todayInfos.profit"
        :prevValue="dashbordStats?.yesterdayInfos.profit"
        updownEnable
        description="Today Profit"
        prev-description="from last day"
      ></StatsWidget>
    </div>

    <div class="col-xl-3">
      <StatsWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-class="fas fa-sack-dollar text-danger"
        :value="dashbordStats?.monthInfos.profit"
        :prevValue="dashbordStats?.prevMonthInfos.profit"
        updownEnable
        description="Month Profit"
        prev-description="from last month"
      ></StatsWidget>
    </div>
    <div class="col-xl-3">
      <StatsWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-class="fas fa-landmark text-warning"
        :value="dashbordStats?.totalInfos.profit"
        description="Total Profit"
      ></StatsWidget>
    </div>
  </div>
  <!--begin::Insights toolbar-->
  <div class="d-flex flex-wrap flex-stack my-5">
    <!--begin::Title-->
    <h2 class="fw-semobold my-2 text-gray-800">
      <span v-if="dsSalesType === StatsType.Daily"> Today </span>
      <span v-else-if="dsSalesType === StatsType.Monthly"> Month </span>
      <span v-else-if="dsSalesType === StatsType.Total"> Total </span>
      <span class="fs-4 text-gray-400 ms-1">Insights</span>
    </h2>
    <!--end::Title-->
    <!--begin::Controls-->
    <div class="d-flex align-items-center my-2">
      <!--begin::Select wrapper-->
      <div class="w-100px me-5">
        <!--begin::Select-->
        <select
          name="statsType"
          v-model="dsSalesType"
          data-control="select2"
          data-hide-search="true"
          class="form-select form-select-white form-select-sm"
        >
          <option :value="StatsType.Daily">Today</option>
          <option :value="StatsType.Monthly">Month</option>
          <option :value="StatsType.Total">Total</option>
        </select>
        <!--end::Select-->
      </div>
      <!--end::Select wrapper-->

      <!-- <button
          class="btn btn-primary btn-sm"                
        >
          Hide
        </button> -->
    </div>
    <!--end::Controls-->
  </div>
  <!--end::Insights toolbar-->
  <div class="row g-5 g-xl-10">
    <div class="col mb-md-5 mb-xl-10">
      <SalesWidget
        card-classes="h-100"
        title="New Users"
        icon="fas fa-user-plus text-info"
        value-color="text-info"
        :is-currency="false"
        :value="salesValue.userscount.value"
        :prevValue="salesValue.userscount.prevValue"
        :footer-text="salesValue.footerText"
      ></SalesWidget>
    </div>
    <!-- <div class="col mb-md-5 mb-xl-10">
      <SalesWidget
        card-classes="h-100"
        title="Ongoing Bets"
        icon="fas fa-dollar-sign text-warning"
        value-color="text-warning"
        :value="salesValue.userscount.value"
        :prevValue="salesValue.userscount.prevValue"
        :footer-text="salesValue.footerText"
      ></SalesWidget>
    </div> -->
    <div class="col mb-md-5 mb-xl-10">
      <SalesWidget
        card-classes="h-100"
        title="Bet"
        icon="fas fa-dollar-sign text-success"
        value-color="text-success"
        :value="salesValue.bet.value"
        :prevValue="salesValue.bet.prevValue"
        :footer-text="salesValue.footerText"
      >
      </SalesWidget>
    </div>
    <div class="col mb-md-5 mb-xl-10">
      <SalesWidget
        card-classes="h-100"
        title="Win"
        icon="fas fa-dollar-sign text-danger"
        value-color="text-danger"
        :value="salesValue.win.value"
        :prevValue="salesValue.win.prevValue"
        :footer-text="salesValue.footerText"
        :isOpposite="true"
      ></SalesWidget>
    </div>
    <div class="col mb-md-5 mb-xl-10">
      <SalesWidget
        card-classes="h-100"
        title="Deposit"
        icon="fas fa-credit-card text-success"
        value-color="text-success"
        :value="salesValue.deposit.value"
        :prevValue="salesValue.deposit.prevValue"
        :footer-text="salesValue.footerText"
      >
      </SalesWidget>
    </div>
    <div class="col mb-md-5 mb-xl-10">
      <SalesWidget
        card-classes="h-100"
        title="Withdraw"
        icon="fas fa-credit-card text-danger"
        value-color="text-danger"
        :value="salesValue.withdraw.value"
        :prevValue="salesValue.withdraw.prevValue"
        :footer-text="salesValue.footerText"
        :isOpposite="true"
      ></SalesWidget>
    </div>
  </div>

  <!--begin::Seperator-->
  <div class="separator separator-dashed mb-7 mb-xl-12"></div>
  <!--end::Seperator-->

  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="col-xl-6">
      <ListWidget
        title="Earning on Users Ranking"
        className="h-md-100"
        :table="earnRanks"
      />
    </div>

    <div class="col-xl-6">
      <ListWidget
        className="h-md-100"
        title="Losing on Users Ranking"
        :table="loseRanks"
      />
    </div>
  </div>
  <!--end::Row-->

  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <!--begin::Col-->
    <div class="col-xl-12">
      <DWGraph className="h-lg-100" :height="450" :series="dwSeries" />
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <!--begin::Col-->
    <div class="col-xl-12">
      <ProfitGraph className="h-lg-100" :height="450" :series="profitSeries" />
    </div>
    <!--end::Col-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";

import ProgressStatsWidget from "@/components/widgets/dashboard/ProgressStatsWidget.vue";
import StatsWidget from "@/components/widgets/dashboard/StatsWidget.vue";
import SalesWidget from "@/components/widgets/dashboard/SalesWidget.vue";
import ListWidget from "@/components/widgets/dashboard/ListWidget.vue";
import ProfitGraph from "@/components/widgets/dashboard/ProfitGraph.vue";
import DWGraph from "@/components/widgets/dashboard/DWGraph.vue";
import {
  StatsType,
  type IDashboardSalesValue,
  getCurrentMonthDates,
} from "@/assets/ts/utils";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "main-dashboard",
  components: {
    ProgressStatsWidget,
    StatsWidget,
    SalesWidget,
    ListWidget,
    ProfitGraph,
    DWGraph,
  },
  setup() {
    const dashbordStats = ref<any>(null);
    const dsSalesType = ref(StatsType.Daily);
    const salesValue = computed<IDashboardSalesValue>(() => {
      if (dsSalesType.value === StatsType.Daily) {
        return {
          isPrev: true,
          footerText: "from last day",
          userscount: {
            value: dashbordStats.value?.todayInfos.userscount,
            prevValue: dashbordStats.value?.yesterdayInfos.userscount,
          },
          bet: {
            value: dashbordStats.value?.todayInfos.bet,
            prevValue: dashbordStats.value?.yesterdayInfos.bet,
          },
          win: {
            value: dashbordStats.value?.todayInfos.win,
            prevValue: dashbordStats.value?.yesterdayInfos.win,
          },
          deposit: {
            value: dashbordStats.value?.todayInfos.deposit,
            prevValue: dashbordStats.value?.yesterdayInfos.deposit,
          },
          withdraw: {
            value: dashbordStats.value?.todayInfos.withdraw,
            prevValue: dashbordStats.value?.yesterdayInfos.withdraw,
          },
        };
      } else if (dsSalesType.value === StatsType.Monthly) {
        return {
          isPrev: true,
          footerText: "from last month",
          userscount: {
            value: dashbordStats.value?.monthInfos.userscount,
            prevValue: dashbordStats.value?.prevMonthInfos.userscount,
          },
          bet: {
            value: dashbordStats.value?.monthInfos.bet,
            prevValue: dashbordStats.value?.prevMonthInfos.bet,
          },
          win: {
            value: dashbordStats.value?.monthInfos.win,
            prevValue: dashbordStats.value?.prevMonthInfos.win,
          },
          deposit: {
            value: dashbordStats.value?.monthInfos.deposit,
            prevValue: dashbordStats.value?.prevMonthInfos.deposit,
          },
          withdraw: {
            value: dashbordStats.value?.monthInfos.withdraw,
            prevValue: dashbordStats.value?.prevMonthInfos.withdraw,
          },
        };
      } else {
        return {
          isPrev: false,
          footerText: "total",
          userscount: {
            value: dashbordStats.value?.totalInfos.userscount,
          },
          bet: {
            value: dashbordStats.value?.totalInfos.bet,
          },
          win: {
            value: dashbordStats.value?.totalInfos.win,
          },
          deposit: {
            value: dashbordStats.value?.totalInfos.deposit,
          },
          withdraw: {
            value: dashbordStats.value?.totalInfos.withdraw,
          },
        };
      }
    });
    const earnRanks = ref([]);
    const loseRanks = ref([]);
    const dwSeries = ref<any[]>([
      {
        name: "Deposit",
        data: [],
      },
      {
        name: "Withdraw",
        data: [],
      },
    ]);
    const profitSeries = ref<any[]>([
      {
        name: "Profit",
        data: [],
      },
    ]);
    onMounted(() => {
      ApiService.get("/dash/stats").then((res) => {
        dashbordStats.value = res.data;
        ApiService.get("/dash/dwprofits").then((res) => {
          const dates = getCurrentMonthDates("YYYY-MM-DD");
          console.log(dates);
          dates.pop();
          for (const date of dates) {
            const report = res.data.find((p) => p.date === date);
            if (report) {
              dwSeries.value[0].data.push(report.user_deposit);
              dwSeries.value[1].data.push(report.user_withdraw);
              profitSeries.value[0].data.push(report.sports_profit);
            } else {
              dwSeries.value[0].data.push(0);
              dwSeries.value[1].data.push(0);
              profitSeries.value[0].data.push(0);
            }
          }
       
          dwSeries.value[0].data.push(dashbordStats.value.todayInfos.deposit);
          dwSeries.value[1].data.push(dashbordStats.value.todayInfos.withdraw);
           profitSeries.value[0].data.push(dashbordStats.value.todayInfos.profit);
        });
      });
      ApiService.get("/dash/ranks").then((res) => {
        earnRanks.value = res.data.earnRanks;
        loseRanks.value = res.data.loseRanks;
      });
    });
    return {
      getAssetPath,
      dashbordStats,
      dsSalesType,
      salesValue,
      StatsType,
      earnRanks,
      loseRanks,
      dwSeries,
      profitSeries,
    };
  },
});
</script>
