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
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add User
          </button>
          <!--end::Add customer-->
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
        <template v-slot:userid="{ row: user }">
          <div class="w-175px">
            {{ user.user_id }} ({{ user.asaas_cpfCnpj }})
          </div>
        </template>
        <template v-slot:parent="{ row: user }">
          {{ user.refer.partner }}
        </template>

        <!-- <template v-slot:email="{ row: user }">
          {{ user.phone }}
        </template> -->
        <!-- <template v-slot:cpf="{ row: user }">
          {{ user.asaas_cpfCnpj }}
        </template> -->
        <template v-slot:balance="{ row: user }">
          <!-- {{ currencyFormat(user.cash, 2) }}, -->
          {{ currencyFormat(user.casino, 2) }}
        </template>
        <template v-slot:bonus="{ row: user }">
          {{ currencyFormat(user.point, 2) }}
          ({{ user.total_point }})
        </template>
        <template v-slot:deposit="{ row: user }">
          <span class="text-success">
            {{ currencyFormat(user.total_deposit.cash, 0) }}
          </span>
        </template>
        <template v-slot:withdraw="{ row: user }">
          <span class="text-danger">
            {{ currencyFormat(user.total_withdraw, 0) }}
          </span>
        </template>
        <template v-slot:rolling="{ row: user }">
          <div class="w-70px">
            <span>
              {{
                user.is_manual_rolling
                  ? 100
                  : rollingPercent(
                      user.rolling_single,
                      user.rolling_limit_single
                    )
              }}
              %,
            </span>
            <span>
              {{
                user.is_manual_rolling
                  ? 100
                  : rollingPercent(
                      user.rolling_single,
                      user.rolling_limit_single
                    )
              }}
              %,
            </span>
            <span>
              {{
                user.is_manual_rolling
                  ? 100
                  : rollingPercent(
                      user.rolling_single,
                      user.rolling_limit_single
                    )
              }}
              %
            </span>
          </div>
        </template>
        <template v-slot:bet="{ row: user }">
          <span class="text-success">
            {{
              currencyFormat(
                user.total_bet.sports_single_prematch +
                  user.total_bet.sports_single_inplay +
                  user.total_bet.esports_single_prematch +
                  user.total_bet.esports_single_inplay +
                  user.total_bet.multi
              )
            }}
            ({{
              user.total_bet.sports_single_prematch_count +
              user.total_bet.sports_single_inplay_count +
              user.total_bet.esports_single_prematch_count +
              user.total_bet.esports_single_inplay_count +
              user.total_bet.multi_count
            }})
          </span>
        </template>
        <template v-slot:win="{ row: user }">
          <span class="text-danger">
            {{
              currencyFormat(
                user.total_win.sports_single_prematch +
                  user.total_win.sports_single_inplay +
                  user.total_win.esports_single_prematch +
                  user.total_win.esports_single_inplay +
                  user.total_win.multi
              )
            }}
            ({{
              user.total_win.sports_single_prematch_count +
              user.total_win.sports_single_inplay_count +
              user.total_win.esports_single_prematch_count +
              user.total_win.esports_single_inplay_count +
              user.total_win.multi_count
            }})
          </span>
        </template>
        <template v-slot:profit="{ row: user }">
          <span
            :class="
              profitColor(
                user.total_bet.sports_single_prematch +
                  user.total_bet.sports_single_inplay +
                  user.total_bet.esports_single_prematch +
                  user.total_bet.esports_single_inplay +
                  user.total_bet.multi -
                  (user.total_win.sports_single_prematch +
                    user.total_win.sports_single_inplay +
                    user.total_win.esports_single_prematch +
                    user.total_win.esports_single_inplay +
                    user.total_win.multi),
                0
              )
            "
          >
            {{
              currencyFormat(
                user.total_bet.sports_single_prematch +
                  user.total_bet.sports_single_inplay +
                  user.total_bet.esports_single_prematch +
                  user.total_bet.esports_single_inplay +
                  user.total_bet.multi -
                  (user.total_win.sports_single_prematch +
                    user.total_win.sports_single_inplay +
                    user.total_win.esports_single_prematch +
                    user.total_win.esports_single_inplay +
                    user.total_win.multi)
              )
            }}
          </span>
        </template>
        <template v-slot:status="{ row: user }">
          <el-switch
            :value="user.status === UserStatus.ACTIVE"
            @change="(val) => onChangeStatus(user, val)"
            :loading="statusLoading.loading && statusLoading._id === user._id"
          />
        </template>
        <template v-slot:registeredDate="{ row: customer }">
          <div class="w-100px">
            {{ timeFormat(customer.createdAt) }}
          </div>
        </template>
        <template v-slot:loginDate="{ row: customer }">
          <div class="w-100px">
            {{ timeFormat(customer.lastlogin) }}
          </div>
        </template>
        <template v-slot:actions="{ row: user }">
          <div class="w-100px">
            <router-link
              :to="{
                name: 'user-details',
                params: { userId: user.user_id },
              }"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3 mb-2"
              data-bs-toggle="tooltip"
              title="View User Details"
            >
              <KTIcon icon-name="eye" icon-class="fs-3"></KTIcon
            ></router-link>

            <button
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3 mb-2"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_adjust_user_cash"
              @click="adjustUserCashModalRef.setFormData(user.user_id)"
            >
              <KTIcon icon-name="dollar" icon-class="fs-3"></KTIcon>
            </button>
            <el-popconfirm
              :width="350"
              title="Are you sure you want to complete this user's rolling?"
              @confirm="onCompleteRolling(user._id)"
              :confirm-button-text="'Yes, Complete rolling'"
              :cancel-button-text="'No'"
              confirm-button-type="primary"
            >
              <template v-slot:reference>
                <button
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3"
                >
                  <KTIcon icon-name="arrows-loop" icon-class="fs-3"></KTIcon>
                </button>
              </template>
            </el-popconfirm>
            <el-popconfirm
              :width="300"
              title="Are you sure you want to delete?"
              @confirm="onDelete(user._id)"
              :confirm-button-text="'Yes, Delete'"
              :cancel-button-text="'No'"
              confirm-button-type="danger"
            >
              <template v-slot:reference>
                <button
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3"
                >
                  <KTIcon icon-name="trash" icon-class="fs-3"></KTIcon>
                </button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </Datatable>
    </div>
  </div>

  <AddCustomerModal @add="onAdd"></AddCustomerModal>
  <AdjustUserCashModal
    @adjust="onAdjust"
    ref="adjustUserCashModalRef"
  ></AdjustUserCashModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import AdjustUserCashModal from "@/components/modals/forms/AdjustUserCashModal.vue";

import {
  currencyFormat,
  profitColor,
  type IFindQuery,
  timeFormat,
  UserStatus,
  rollingPercent,
} from "@/assets/ts/utils";
import type { IUser } from "@/assets/ts/utils/user.interface";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "users-listing",
  components: {
    Datatable,
    AddCustomerModal,
    AdjustUserCashModal,
  },
  setup() {
    const adjustUserCashModalRef = ref();
    const tableHeader = ref([
      {
        columnName: "Parent",
        columnLabel: "parent",
        columnWidth: 75,
      },
      {
        columnName: "UserID",
        columnLabel: "userid",
      },
      // {
      //   columnName: "Email",
      //   columnLabel: "email",
      // },
      // {
      //   columnName: "CPF",
      //   columnLabel: "cpf",
      // },
      {
        columnName: "Balance",
        columnLabel: "balance",
      },
      {
        columnName: "Bonus",
        columnLabel: "bonus",
      },
      {
        columnName: "Deposit",
        columnLabel: "deposit",
      },
      {
        columnName: "Withdraw",
        columnLabel: "withdraw",
      },
      {
        columnName: "Rolling",
        columnLabel: "rolling",
      },
      {
        columnName: "Bet",
        columnLabel: "bet",
      },
      {
        columnName: "Win",
        columnLabel: "win",
      },
      {
        columnName: "Profit",
        columnLabel: "profit",
      },
      {
        columnName: "Status",
        columnLabel: "status",
      },
      {
        columnName: "Registerd Date",
        columnLabel: "registeredDate",
      },
      {
        columnName: "Lastlogin Date",
        columnLabel: "loginDate",
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);
    const listQuery = ref<IFindQuery>({
      search: "",
      page: 1,
      size: 25,
    });

    const tableLoading = ref(false);
    const tableData = ref<Array<IUser>>([]);
    const tableTotal = ref(0);

    onMounted(() => {
      getList();
    });
    const getList = () => {
      tableLoading.value = true;
      ApiService.query("users", listQuery.value).then((res) => {
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
    const onAdd = () => {
      getList();
    };
    const onAdjust = () => {
      getList();
    };
    const onSearch = () => {
      getList();
    };
    const onCompleteRolling = (id) => {
      ApiService.post("users/rolling", {
        id: id,
      }).then((res) => {
        getList();
      });
    };
    const onDelete = (id) => {
      ApiService.delete(`users/${id}`).then((res) => {
        getList();
      });
    };
    const statusLoading = ref({
      _id: "",
      loading: true,
    });
    const onChangeStatus = (user: any, status: boolean) => {
      statusLoading.value._id = user._id;
      statusLoading.value.loading = true;
      ApiService.post("users/status", {
        id: user._id,
        status: status ? UserStatus.ACTIVE : UserStatus.BLOCK,
      })
        .then(() => {
          statusLoading.value = {
            _id: "",
            loading: false,
          };
          if (status) {
            user.status = UserStatus.ACTIVE;
          } else {
            user.status = UserStatus.BLOCK;
          }
        })
        .catch((e) => {
          if (status) {
            user.status = UserStatus.BLOCK;
          } else {
            user.status = UserStatus.ACTIVE;
          }
        });
    };
    return {
      tableLoading,
      tableTotal,
      tableData,
      tableHeader,
      getAssetPath,
      currencyFormat,
      timeFormat,
      profitColor,
      onDelete,
      listQuery,
      onPageChanged,
      onItemsPerPageChanged,
      onSearch,
      onAdd,
      adjustUserCashModalRef,
      onAdjust,
      UserStatus,
      statusLoading,
      onChangeStatus,
      onCompleteRolling,
      rollingPercent,
    };
  },
});
</script>
