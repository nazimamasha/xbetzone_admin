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
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <div
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <!--begin::Export-->
            <button
              type="button"
              class="btn me-3"
              :class="{
                'btn-light': listQuery.status === ActivityState.All,
              }"
              @click="onStatus(ActivityState.All)"
            >
              All
            </button>
            <button
              type="button"
              class="btn me-3"
              :class="{
                'btn-secondary':
                  listQuery.status === ActivityState.WITHDRAW_CREATED,
              }"
              @click="onStatus(ActivityState.WITHDRAW_CREATED)"
            >
              Created
            </button>
            <button
              type="button"
              class="btn me-3"
              :class="{
                'btn-warning':
                  listQuery.status === ActivityState.WITHDRAW_PENDING,
              }"
              @click="onStatus(ActivityState.WITHDRAW_PENDING)"
            >
              Pending
            </button>
            <button
              type="button"
              class="btn me-3"
              :class="{
                'btn-success':
                  listQuery.status === ActivityState.WITHDRAW_COMPLETED,
              }"
              @click="onStatus(ActivityState.WITHDRAW_COMPLETED)"
            >
              Completed
            </button>
            <button
              type="button"
              class="btn me-3"
              :class="{
                'btn-danger':
                  listQuery.status === ActivityState.WITHDRAW_CANCELLED,
              }"
              @click="onStatus(ActivityState.WITHDRAW_CANCELLED)"
            >
              Cancelled
            </button>
          </div>
        </div>
        <!--end::Toolbar-->
      </div>
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
        <template v-slot:partner="{ row: activity }">
          {{ activity.partner }}
        </template>
        <template v-slot:user_id="{ row: activity }">
          {{ activity.user_id }} ({{ activity.user.nickname }})
        </template>
        <template v-slot:asaas_user_id="{ row: activity }">
          {{ activity.user.asaas_id }}
        </template>

        <template v-slot:asaas_payment_id="{ row: activity }">
          {{ activity.asaas_payment_id }}
        </template>

        <template v-slot:amount="{ row: activity }">
          {{ currencyFormat(activity.withdraw_value) }}
        </template>
        <template v-slot:type="{ row: activity }">
          <span
            class="badge badge-light-primary"
            v-if="activity.withdraw_type === WithdrawType.PIX"
          >
            PIX
          </span>
          <span class="badge badge-secondary" v-else> BANK </span>
        </template>
        <template v-slot:bank="{ row: activity }">
          <div v-if="activity.withdraw_type === WithdrawType.PIX">
            {{ activity.withdraw_pix.pixAddressKey }} ({{
              activity.withdraw_pix.pixAddressKeyType
            }})
          </div>
          <div v-else class="mw-350px">
            Code: {{ activity.withdraw_bank.bankAccount.bank.code }} | Owner
            Name: {{ activity.withdraw_bank.bankAccount.bank.code }} | cpfCnpj:
            {{ activity.withdraw_bank.bankAccount.cpfCnpj }} | Agency:
            {{ activity.withdraw_bank.bankAccount.agency }}
            Account: {{ activity.withdraw_bank.bankAccount.account }} |
            AccountDigit:
            {{ activity.withdraw_bank.bankAccount.accountDigit }}
          </div>
        </template>

        <template v-slot:createdAt="{ row: activity }">
          {{ timeFormat(activity.createdAt) }}
        </template>

        <template v-slot:updatedAt="{ row: activity }">
          {{ timeFormat(activity.updatedAt) }}
        </template>
        <template v-slot:actions="{ row: activty }">
          <span
            class="badge"
            v-if="activty.state !== ActivityState.WITHDRAW_CREATED"
            :class="{
              'badge-secondary':
                activty.state === ActivityState.WITHDRAW_CREATED,
              'badge-light-warning':
                activty.state === ActivityState.WITHDRAW_PENDING,
              'badge-light-success':
                activty.state === ActivityState.WITHDRAW_COMPLETED,
              'badge-light-danger':
                activty.state === ActivityState.WITHDRAW_CANCELLED,
            }"
          >
            {{ activty.state }}</span
          >
          <el-popconfirm
            v-if="activty.state === ActivityState.WITHDRAW_CREATED"
            :width="300"
            title="Are you sure you want to approve?"
            :confirm-button-text="'Yes, Approve'"
            :cancel-button-text="'No'"
            confirm-button-type="success"
            @confirm="onAction(activty, ActivityState.WITHDRAW_PENDING)"
          >
            <template v-slot:reference>
              <button
                class="btn btn-icon btn-light-success btn-sm me-3"
                :disabled="actionLoading.id === activty._id"
                :data-kt-indicator="
                  actionLoading.id === activty._id &&
                  actionLoading.action === ActivityState.WITHDRAW_PENDING
                    ? 'on'
                    : null
                "
              >
                <span
                  v-if="
                    actionLoading.id === activty._id &&
                    actionLoading.action === ActivityState.WITHDRAW_PENDING
                  "
                  class="indicator-progress"
                >
                  <span
                    class="spinner-border spinner-border-sm align-middle"
                  ></span>
                </span>
                <KTIcon v-else icon-name="check" icon-class="fs-3"></KTIcon>
              </button>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="activty.state === ActivityState.WITHDRAW_CREATED"
            :width="300"
            title="Are you sure you want to cancel?"
            :confirm-button-text="'Yes, Cancel'"
            :cancel-button-text="'No'"
            confirm-button-type="danger"
            @confirm="onAction(activty, ActivityState.WITHDRAW_CANCELLED)"
          >
            <template v-slot:reference>
              <button
                class="btn btn-icon btn-light-danger btn-sm"
                :disabled="actionLoading.id === activty._id"
                :data-kt-indicator="
                  actionLoading.id === activty._id &&
                  actionLoading.action === ActivityState.WITHDRAW_CANCELLED
                    ? 'on'
                    : null
                "
              >
                <span
                  v-if="
                    actionLoading.id === activty._id &&
                    actionLoading.action === ActivityState.WITHDRAW_CANCELLED
                  "
                  class="indicator-progress"
                >
                  <span
                    class="spinner-border spinner-border-sm align-middle"
                  ></span>
                </span>
                <KTIcon v-else icon-name="cross" icon-class="fs-3"></KTIcon>
              </button>
            </template>
          </el-popconfirm>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddPartnerModal from "@/components/modals/forms/AddPartnerModal.vue";

import {
  ActivityState,
  ActivityType,
  PaymentStatus,
  currencyFormat,
  profitColor,
  type IActivityFindQuery,
  timeFormat,
  WithdrawType,
} from "@/assets/ts/utils";
import type { IActivity } from "@/assets/ts/utils/activity.interface";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "widthraws-listing",
  components: {
    Datatable,
    AddPartnerModal,
  },
  setup() {
    const tableHeader = ref([
      // {
      //   columnName: "Partner",
      //   columnLabel: "partner",
      // },
      {
        columnName: "UserID(Nickname)",
        columnLabel: "user_id",
      },
      {
        columnName: "As UserID",
        columnLabel: "asaas_user_id",
      },
      {
        columnName: "As PaymentID",
        columnLabel: "asaas_payment_id",
        columnWidth: 120,
      },

      {
        columnName: "Amount",
        columnLabel: "amount",
      },
      {
        columnName: "Type",
        columnLabel: "type",
      },
      {
        columnName: "Bank",
        columnLabel: "bank",
      },

      {
        columnName: "Created Date",
        columnLabel: "createdAt",
      },
      {
        columnName: "Updated Date",
        columnLabel: "updatedAt",
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        columnWidth: 100,
      },
    ]);

    const listQuery = ref<IActivityFindQuery>({
      type: ActivityType.WITHDRAW,
      status: ActivityState.All,
      search: "",
      page: 1,
      size: 25,
    });

    const tableLoading = ref(false);
    const tableData = ref<Array<IActivity>>([]);
    const tableTotal = ref(0);

    onMounted(() => {
      getList();
    });
    const getList = () => {
      tableLoading.value = true;
      ApiService.query("activities", listQuery.value).then((res) => {
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

    const onStatus = (status: ActivityState) => {
      listQuery.value.status = status;
      getList();
    };
    const actionLoading = ref({
      id: "",
      action: ActivityState.WITHDRAW_PENDING,
    });
    const onAction = (activity, action: ActivityState) => {
      if (actionLoading.value.id === activity._id) {
        return;
      }
      actionLoading.value = { id: activity._id, action };
      ApiService.post("activities/waction", {
        id: activity._id,
        action,
      })
        .then((res) => {
          actionLoading.value.id = "";
          activity.state = action;
        })
        .catch(({ response }) => {
          actionLoading.value.id = "";
          Swal.fire({
            text: response.data.errors[0].description,
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
      onPageChanged,
      onItemsPerPageChanged,
      tableHeader,
      getAssetPath,
      currencyFormat,
      profitColor,
      PaymentStatus,
      ActivityState,
      listQuery,
      onStatus,
      onSearch,
      timeFormat,
      WithdrawType,
      onAction,
      actionLoading,
    };
  },
});
</script>
