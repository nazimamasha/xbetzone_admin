<template>
  <!--begin::Menu wrapper-->
  <div class="align-items-stretch">
    <div class="d-flex align-items-center h-100 py-2">
      <div class="text-center lh-lg me-6">
        <div class="fw-bold fs-5 fw-semibold text-gray-500">Today Info:</div>
      </div>

      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-success">Deposit</div>
        <div class="badge badge-light-secondary fw-semibold">
          <span class="text-success">{{
            currencyFormat(mainInfo?.deposit)
          }}</span>
        </div>
      </div>
      <div class="row-separator mx-5"></div>
      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-danger">Withdraw</div>
        <div class="badge badge-light-danger fw-semibold">
          <span class="text-danger">{{
            currencyFormat(mainInfo?.withdraw)
          }}</span>
        </div>
      </div>
      <div class="row-separator mx-5"></div>
      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-warning">Ongoing Bet</div>
        <div class="badge badge-light-secondary fw-semibold">
          <span class="text-warning"
            >{{ currencyFormat(mainInfo?.ongoingbet) }} &nbsp;({{
              mainInfo?.ongoingbetcount
            }})</span
          >
        </div>
      </div>
      <div class="row-separator mx-5"></div>
      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-success">Bet</div>
        <div class="badge badge-light-secondary fw-semibold">
          <span class="text-success"
            >{{ currencyFormat(mainInfo?.bet) }} &nbsp;({{
              mainInfo?.betcount
            }})</span
          >
        </div>
      </div>
      <div class="row-separator mx-5"></div>
      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-danger">Win</div>
        <div class="badge badge-light-danger fw-semibold">
          <span class="text-danger"
            >{{ currencyFormat(mainInfo?.win) }} &nbsp;({{
              mainInfo?.wincount
            }})</span
          >
        </div>
      </div>
      <div class="row-separator mx-5"></div>
      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-primary">Prfit</div>
        <div class="badge badge-light-primary fw-semibold">
          <span class="text-primary">{{
            currencyFormat(mainInfo?.profit)
          }}</span>
        </div>
      </div>
      <div class="row-separator mx-5"></div>
      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-info">Users Balance</div>
        <div class="badge badge-light-info fw-semibold">
          <span class="text-info"
            >{{ currencyFormat(mainInfo?.usersbalance) }} &nbsp;({{
              mainInfo?.usersbalancecount
            }})</span
          >
        </div>
      </div>

      <div class="row-separator mx-5"></div>
      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-info">New Users</div>
        <div class="badge badge-light-info fw-semibold">
          <span class="text-info">{{ mainInfo?.newusers }}</span>
        </div>
      </div>

      <div class="row-separator mx-5"></div>
      <div class="text-center lh-lg">
        <div class="fw-bold fs-6 text-info">Online Users</div>
        <div class="badge badge-light-info fw-semibold">
          <span class="text-info">{{ mainInfo?.onlineusers }}</span>
        </div>
      </div>
    </div>
  </div>
  <!--end::Menu wrapper-->
</template>
<style lang="scss" scoped>
.row-separator {
  width: 1px;
  height: 100%;
  border-right: 1px solid var(--bs-border-color);
}
</style>
<script lang="ts">
import { currencyFormat, type IMainInfo } from "@/assets/ts/utils";
import { getAssetPath } from "@/core/helpers/assets";
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "header-stats",
  components: {},
  setup() {
    const mainInfo = ref<IMainInfo>();
    let intervalid;
    onMounted(() => {
      getMainInfo();
      intervalid = setInterval(getMainInfo, 60000);
    });
    onUnmounted(() => {
      clearInterval(intervalid);
    });
    const getMainInfo = () => {
      ApiService.get("/dash/maininfo").then((res) => {
        mainInfo.value = res.data;
      });
    };
    return {
      getAssetPath,
      mainInfo,
      currencyFormat,
    };
  },
});
</script>
