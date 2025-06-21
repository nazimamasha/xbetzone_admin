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
            data-bs-target="#kt_modal_add_partner"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Partner
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
        <template v-slot:userid="{ row: partner }">
          {{ partner.user_id }} ({{ partner.nickname }})
        </template>

        <template v-slot:comission="{ row: partner }">
          {{
            partner.commission_type === PartnerComissionType.Profit
              ? `${partner.comission} %`
              : currencyFormat(partner.comission)
          }}
        </template>
        <template v-slot:comission_type="{ row: partner }">
          <span
            class="badge badge-primary me-3"
            v-if="partner.commission_type === PartnerComissionType.Profit"
          >
            Profit
          </span>
          <span class="badge badge-success me-3" v-else>User Signup</span>
        </template>

        <template v-slot:userscount="{ row: partner }">
          {{ partner.userscount }}
        </template>

        <template v-slot:profit="{ row: partner }">
          <span :class="profitColor(partner.profit, 0)">
            {{ currencyFormat(partner.profit) }}
          </span>
        </template>
        <template v-slot:budget="{ row: partner }">
          {{ currencyFormat(partner.budget) }}
        </template>

        <template v-slot:registeredDate="{ row: partner }">
          {{ timeFormat(partner.createdAt) }}
        </template>
        <template v-slot:actions="{ row: partner }">
          <!-- <button
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3"
            data-bs-toggle="tooltip"
            title="View Partner Details"
          >
            <KTIcon icon-name="eye" icon-class="fs-3"></KTIcon>
          </button> -->
          <button
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_adjust_partner_budget"
            @click="adjustPartnerBudgetModalRef.setFormData(partner._id)"
          >
            <KTIcon icon-name="dollar" icon-class="fs-3"></KTIcon>
          </button>
          <el-popconfirm
            :width="300"
            title="Are you sure you want to delete?"
            @confirm="onDelete(partner._id)"
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
        </template>
      </Datatable>
    </div>
  </div>

  <AddPartnerModal @add="onAdd"></AddPartnerModal>
  <AdjustPatnerBudgetModal ref="adjustPartnerBudgetModalRef" @adjust="onAdjust"></AdjustPatnerBudgetModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddPartnerModal from "@/components/modals/forms/AddPartnerModal.vue";
import AdjustPatnerBudgetModal from "@/components/modals/forms/AdjustPatnerBudgetModal.vue";
import {
  currencyFormat,
  profitColor,
  timeFormat,
  type IFindQuery,
  PartnerComissionType,
} from "@/assets/ts/utils";
import ApiService from "@/core/services/ApiService";
import type { IPartner } from "@/assets/ts/utils/user.interface";

export default defineComponent({
  name: "partners-listing",
  components: {
    Datatable,
    AdjustPatnerBudgetModal,
    AddPartnerModal,
  },
  setup() {
    const adjustPartnerBudgetModalRef = ref();
    const tableHeader = ref([
      {
        columnName: "UserID",
        columnLabel: "userid",
      },
      {
        columnName: "Comission Type",
        columnLabel: "comission_type",
      },
      {
        columnName: "Comission",
        columnLabel: "comission",
      },
      // {
      //   columnName: "Users Count",
      //   columnLabel: "userscount",
      // },
      // {
      //   columnName: "Balance",
      //   columnLabel: "balance",
      // },
      // {
      //   columnName: "Deposit",
      //   columnLabel: "deposit",
      // },
      // {
      //   columnName: "Withdraw",
      //   columnLabel: "withdraw",
      // },
      // {
      //   columnName: "Bet",
      //   columnLabel: "bet",
      // },
      // {
      //   columnName: "Win",
      //   columnLabel: "win",
      // },

      {
        columnName: "Profit",
        columnLabel: "profit",
      },
      {
        columnName: "Budget",
        columnLabel: "budget",
      },
      {
        columnName: "Registerd Date",
        columnLabel: "registeredDate",
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
    const tableData = ref<Array<IPartner>>([]);
    const tableTotal = ref(0);

    onMounted(() => {
      getList();
    });
    const getList = () => {
      tableLoading.value = true;
      ApiService.query("partners", listQuery.value).then((res) => {
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

    const onDelete = (id) => {
      ApiService.delete(`partners/${id}`).then((res) => {
        getList();
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
      onAdjust,
      PartnerComissionType,
      adjustPartnerBudgetModalRef,
    };
  },
});
</script>
