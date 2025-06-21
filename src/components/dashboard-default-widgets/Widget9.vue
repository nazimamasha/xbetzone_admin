<template>
  <div class="card card-flush" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-900">Depost & Withdraw</span>
        <span class="text-gray-500 mt-1 fw-semibold fs-6"
          >1,046 deposits this month</span
        >
      </h3>
      <!--end::Title-->
      <!--begin::Toolbar-->
      <div class="card-toolbar">
        <div class="btn btn-sm btn-light d-flex align-items-center px-4">
          <div class="text-gray-600 fw-bold">1 Jul 2024 - 31 Jul 2024</div>
          <KTIcon icon-name="calendar-8" icon-class="fs-1 ms-2 me-0" />
        </div>
      </div>
      <!--end::Toolbar-->
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

export default defineComponent({
  name: "default-dashboard-widget-9",
  components: {},
  props: {
    className: { type: String, required: false },
    height: { type: Number, required: true },
  },
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const chart = ref<ApexOptions>({});
    const store = useThemeStore();

    const series = [
      {
        name: "Deposits",
        data: [
          90, 110, 110, 95, 95, 85, 85, 95, 95, 115, 115, 100, 100, 115, 115,
          95, 95, 85, 85,
        ],
      },
      {
        name: "Withdraws",
        data: [
          65, 80, 80, 60, 60, 45, 45, 80, 80, 70, 70, 90, 90, 80, 80, 80, 60,
          60, 50,
        ],
      },
    ];

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

    return {
      chart,
      chartRef,
      series,
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

  return {
    chart: {
      fontFamily: "inherit",
      type: "area",
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
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.2,
        stops: [15, 120, 100],
      },
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseprimaryColor, basesuccessColor],
    },
    xaxis: {
      categories: [
        "1-Jan",
        "2-Jan",
        "3-Jan",
        "4-Jan",
        "5-Jan",
        "6-Jan",
        "7-Jan",
        "8-Jan",
        "9-Jan",
        "10-Jan",
        "11-Jan",
        "12-Jan",
        "13-Jan",
        "14-Jan",
        "15-Jan",
        "16-Jan",
        "17-Jan",
        "18-Jan",
        "19-Jan",
        "20-Jan",
        "21-Jan",
        "22-Jan",
        "23-Jan",
        "24-Jan",
        "25-Jan",
        "26-Jan",
        "27-Jan",
      ],
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
          colors: labelColor,
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
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      max: 120,
      min: 30,
      tickAmount: 6,
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
    },
    colors: [lightprimaryColor, lightsuccessColor],
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
  };
};
</script>
