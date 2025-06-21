<template>
  <div class="card card-flush" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-900">Deposit & Withdraw</span>
      </h3>

      <!--end::Title-->
    </div>
    <!--end::Header-->
    <!--begin::Card body-->
    <div class="card-body d-flex align-items-end p-0">
      <!--begin::Chart-->

      <apexchart
        class="min-h-auto w-100 ps-4 pe-6"
        ref="chartRef"
        :options="chart"
        :series="series"
        :height="height"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import { useThemeStore } from "@/stores/theme";
import moment from "moment";
import { currencyFormat, getCurrentMonthDateColors, getDay } from "@/assets/ts/utils/General";

export default defineComponent({
  name: "default-dashboard-widget-9",
  components: {},
  props: {
    className: { type: String, required: false },
    height: { type: Number, required: true },
    series: { tppe: Array<any>, required: true },
  },
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const chart = ref<ApexOptions>({});
    const store = useThemeStore();

    // const series = props.series;

    const themeMode = computed(() => {
      return store.mode;
    });

    onMounted(() => {
      Object.assign(chart.value, chartOptions(props.height));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      chartRef.value.updateOptions(chartOptions(props.height));
    };

    watch(themeMode, () => {
      refreshChart();
    });
    // watch(
    //   () => props.series,
    //   () => {
    //     refreshChart();
    //   }
    // );

    return {
      chart,
      chartRef,
      getAssetPath,
    };
  },
});

const chartOptions = (height: number): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const borderColor = getCSSVariableValue("--bs-border-dashed-color");
  const baseprimaryColor = getCSSVariableValue("--bs-primary");
  const lightprimaryColor = getCSSVariableValue("--bs-primary");
  const basesuccessColor = getCSSVariableValue("--bs-success");
  const lightsuccessColor = getCSSVariableValue("--bs-success");
  const lightdangerColor = getCSSVariableValue("--bs-danger");
  const xCategories: string[] = [];

  for (let i = 1; i <= moment().get("date"); i++) {
    xCategories.push(`${moment().get("month") + 1}/${i}`);
  }
  return {
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: xCategories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 6,
      labels: {
        rotate: 0,
        rotateAlways: true,
        style: {
          colors: getCurrentMonthDateColors(),
          fontSize: "12px",
        },
      },
      crosshairs: {
        position: "front",
        stroke: {
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      tickAmount: 6,
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },

    colors: [lightsuccessColor, lightdangerColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeWidth: 3,
    },

    tooltip: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      x: {
        formatter: function (val) {
          return moment().format("D-MMM") + ` (${getDay(moment().get("day"))})`;
        },
      },
      y: {
        formatter: function (val) {
          return currencyFormat(val);
        },
      },
    },
  };
};
</script>
