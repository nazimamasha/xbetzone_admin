<template>
  <!--begin::Tables Widget 10-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">New Products</span>

        <span class="text-muted mt-1 fw-semibold fs-7"
          >Over 500 new products</span
        >
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <KTIcon icon-name="category" icon-class="fs-2" />
        </button>
        <Dropdown2></Dropdown2>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="border-0">
              <th class="p-0"></th>
              <th class="p-0 min-w-150px"></th>
              <th class="p-0 min-w-200px"></th>
              <th class="p-0 min-w-150px"></th>
              <th class="p-0 min-w-100px text-end"></th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in list" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <!--begin::Avatar-->
                    <div class="symbol symbol-45px me-5">
                      <img
                        v-if="item.user.avatar"
                        alt="Pic"
                        :src="item.user.avatar"
                      />
                      <span
                        v-else-if="item.user.state"
                        :class="`bg-light-${item.user.state} text-${item.user.state}`"
                        class="symbol-label fw-bold"
                      >
                        {{ item.user.name.charAt(0) }}
                      </span>
                    </div>
                    <!--end::Avatar-->

                    <!--begin::Name-->
                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >{{ item.user.name }}</a
                      >

                      <a
                        href="#"
                        class="text-muted text-hover-primary fw-semibold text-muted d-block fs-7"
                      >
                        <span class="text-gray-900">Email</span>:
                        {{ item.user.email }}
                      </a>
                    </div>
                    <!--end::Name-->
                  </div>
                </td>

                <td class="text-end">
                  <a
                    href="#"
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.price }}</a
                  >
                  <span class="text-muted fw-semibold text-muted d-block fs-7"
                    >Paid</span
                  >
                </td>

                <td class="text-muted fw-semibold text-end">
                  {{ item.technologies }}
                </td>

                <td class="text-end">
                  <span
                    :class="`badge-light-${item.status.color}`"
                    class="badge"
                    >{{ item.status.label }}</span
                  >
                </td>

                <td class="text-end">
                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="switch" icon-class="fs-3" />
                  </a>

                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </a>

                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 10-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";

export default defineComponent({
  name: "kt-widget-10",
  components: {
    Dropdown2,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const list = [
      {
        user: {
          avatar: getAssetPath("media/avatars/300-6.jpg"),
          name: "Emma Smith",
          email: "e.smith@kpmg.com.au",
        },
        price: "$560,000",
        technologies: "Laravel, Back2Bet",
        status: {
          label: "Approved",
          color: "success",
        },
      },
      {
        user: {
          state: "danger",
          name: "Melody Macy",
          email: "melody@altbox.com",
        },
        price: "$2,000,000",
        technologies: "ReactJs, HTML",
        status: {
          label: "In Progress",
          color: "warning",
        },
      },
      {
        user: {
          avatar: getAssetPath("media/avatars/300-1.jpg"),
          name: "Max Smith",
          email: "max@kt.com",
        },
        price: "$760,000",
        technologies: "Python, MySQL",
        status: {
          label: "Success",
          color: "danger",
        },
      },
      {
        user: {
          avatar: getAssetPath("media/avatars/300-5.jpg"),
          name: "Sean Bean",
          email: "sean@dellito.com",
        },
        price: "$257,000",
        technologies: "ReactJS, Ruby",
        status: {
          label: "Rejected",
          color: "info",
        },
      },
      {
        user: {
          avatar: getAssetPath("media/avatars/300-25.jpg"),
          name: "Brian Cox",
          email: "brian@exchange.com",
        },
        price: "$560,000",
        technologies: "AngularJS, C#",
        status: {
          label: "In Progress",
          color: "primary",
        },
      },
    ];

    return {
      list,
      getAssetPath,
    };
  },
});
</script>
