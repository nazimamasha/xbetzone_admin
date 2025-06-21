<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-xl-row">
    <!--begin::Sidebar-->
    <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
      <!--begin::Card-->
      <div class="card mb-5 mb-xl-8">
        <!--begin::Card body-->
        <div class="card-body pt-15">
          <!--begin::Summary-->
          <div class="d-flex flex-center flex-column mb-5">
            <!--begin::Avatar-->
            <div class="symbol symbol-100px symbol-circle mb-7">
              <img :src="getAssetPath('media/avatars/blank.png')" alt="image" />
            </div>
            <!--end::Avatar-->

            <!--begin::Name-->
            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ user?.nickname }}
            </a>
            <!--end::Name-->

            <!--begin::Position-->
            <div class="fs-5 fw-semibold text-muted mb-6">
              Lvl. {{ user?.level }}
            </div>
            <!--end::Position-->

            <!--begin::Info-->
            <div class="d-flex flex-wrap flex-center">
              <!--begin::Stats-->
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"
              >
                <div class="fs-4 fw-bold text-gray-700">
                  <span class="w-75px" v-if="user">
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
                </div>
                <div class="fw-semibold text-muted">Bet</div>
              </div>
              <!--end::Stats-->

              <!--begin::Stats-->
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3"
              >
                <div class="fs-4 fw-bold text-gray-700">
                  <span class="w-50px" v-if="user">
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
                  <!-- <KTIcon
                    icon-name="arrow-down"
                    icon-class="fs-3 text-danger"
                  /> -->
                </div>
                <div class="fw-semibold text-muted">Win</div>
              </div>
              <!--end::Stats-->

              <!--begin::Stats-->
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"
              >
                <div class="fs-4 fw-bold text-gray-700">
                  <span class="w-50px" v-if="user">
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
                  <!-- <KTIcon icon-name="arrow-up" icon-class="fs-3 text-success" /> -->
                </div>
                <div class="fw-semibold text-muted">Profit</div>
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Info-->
          </div>
          <!--end::Summary-->

          <!--begin::Details toggle-->
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_view_details"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_view_details"
            >
              Details
              <span class="ms-2 rotate-180">
                <KTIcon icon-name="down" icon-class="fs-3" />
              </span>
            </div>
          </div>
          <!--end::Details toggle-->

          <div class="separator separator-dashed my-3"></div>

          <!--begin::Details content-->
          <div id="kt_customer_view_details" class="collapse show">
            <div class="py-5 fs-6">
              <!--begin::Badge-->
              <div class="badge badge-light-info d-inline">Premium user</div>
              <!--begin::Badge-->
              <!--begin::Details item-->
              <div class="fw-bold mt-5">User ID</div>
              <div class="text-gray-600">{{ user?.user_id }}</div>
              <!--begin::Details item-->
              <!--begin::Details item-->
              <div class="fw-bold mt-5">Nickname</div>
              <div class="text-gray-600">{{ user?.nickname }}</div>
              <!--begin::Details item-->
              <!--begin::Details item-->
              <div class="fw-bold mt-5">CPF</div>
              <div class="text-gray-600">{{ user?.asaas_cpfCnpj }}</div>
              <!--begin::Details item-->
              <!--begin::Details item-->
              <div class="fw-bold mt-5">Asass ID</div>
              <div class="text-gray-600">{{ user?.asaas_id }}</div>
              <!--begin::Details item-->
              <!--begin::Details item-->
              <div class="fw-bold mt-5">Phone</div>
              <div class="text-gray-600">{{ user?.phone }}</div>
              <div class="fw-bold mt-5">Total Bonus</div>
              <div class="text-gray-600">
                {{ currencyFormat(user?.total_point) }}
              </div>
              <!--begin::Details item-->
            </div>
          </div>
          <!--end::Details content-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Sidebar-->

    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-15">
      <!--begin:::Tabs-->
      <ul
        class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8"
      >
        <!--begin:::Tab item-->
        <li class="nav-item">
          <a
            class="nav-link text-active-primary pb-4 active"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_statements"
            >Bet & Win Logs</a
          >
        </li>
        <!--end:::Tab item-->
        <!--begin:::Tab item-->
        <li class="nav-item">
          <a
            class="nav-link text-active-primary pb-4"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_tab"
            >Payments</a
          >
        </li>
        <!--end:::Tab item-->

        <!--begin:::Tab item-->
        <li class="nav-item">
          <a
            class="nav-link text-active-primary pb-4"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_events_and_logs_tab"
            >Banalce Logs</a
          >
        </li>
        <!--end:::Tab item-->
      </ul>
      <!--end:::Tabs-->

      <!--begin:::Tab content-->
      <div class="tab-content" id="myTabContent">
        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_tab"
          role="tabpanel"
        >
          <PaymentRecords
            card-classes="mb-6 mb-xl-9"
            :user_id="userId"
          ></PaymentRecords>

          <!-- <PaymentMethods card-classes="mb-6 mb-xl-9"></PaymentMethods> -->

          <!-- <Invoices card-classes="mb-6 mb-xl-9"></Invoices> -->
        </div>
        <!--end:::Tab pane-->

        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_events_and_logs_tab"
          role="tabpanel"
        >
          <Logs card-classes="mb-6 mb-xl-9" :user_id="userId"></Logs>
          <!-- <Events card-classes="mb-6 mb-xl-9"></Events> -->
        </div>
        <!--end:::Tab pane-->

        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade show active"
          id="kt_customer_view_overview_statements"
          role="tabpanel"
        >
          <CreditBalance
            card-classes="mb-6 mb-xl-9"
            :cash="user?.cash"
            :casino="user?.casino"
            :point="user?.point"
          ></CreditBalance>

          <!-- <Earnings card-classes="mb-6 mb-xl-9"></Earnings> -->
          <Statement card-classes="mb-6 mb-xl-9" :user_id="userId"></Statement>
        </div>
        <!--end:::Tab pane-->
      </div>
      <!--end:::Tab content-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Layout-->

  <NewCardModal></NewCardModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import NewCardModal from "@/components/modals/forms/NewCardModal.vue";
import PaymentRecords from "@/components/customers/cards/overview/PaymentRecords.vue";
import PaymentMethods from "@/components/customers/cards/overview/PaymentMethods.vue";
import CreditBalance from "@/components/customers/cards/overview/CreditBalance.vue";
import Invoices from "@/components/customers/cards/overview/Invoices.vue";

import Events from "@/components/customers/cards/events-and-logs/Events.vue";
import Logs from "@/components/customers/cards/events-and-logs/Logs.vue";

import Earnings from "@/components/customers/cards/statments/Earnings.vue";
import Statement from "@/components/customers/cards/statments/Statement.vue";
import type { IUser } from "@/assets/ts/utils/user.interface";
import ApiService from "@/core/services/ApiService";
import { useRoute } from "vue-router";
import { currencyFormat } from "@/assets/ts/utils";

export default defineComponent({
  name: "customer-details",
  components: {
    PaymentRecords,
    PaymentMethods,
    CreditBalance,
    Invoices,
    Events,
    Logs,
    Earnings,
    Statement,
    Dropdown3,
    NewCardModal,
  },
  setup() {
    const route = useRoute();
    const userId = computed<any>(() => route.params.userId);
    const user = ref<IUser>();
    onMounted(() => {
      ApiService.get(`/users/${userId.value}`).then((res) => {
        user.value = res.data;
      });
    });
    return {
      userId,
      getAssetPath,
      user,
      currencyFormat,
    };
  },
});
</script>
