<template>
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Latest Products</span>
        <span class="text-muted mt-1 fw-semibold fs-7"
          >More than 400 new products</span
        >
      </h3>
      <div class="card-toolbar">
        <ul class="nav">
          <li class="nav-item">
            <a
              class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4 me-1 active"
              data-bs-toggle="tab"
              href="#kt_table_widget_5_tab_1"
              >Month</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4 me-1"
              data-bs-toggle="tab"
              href="#kt_table_widget_5_tab_2"
              >Week</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
              data-bs-toggle="tab"
              href="#kt_table_widget_5_tab_3"
              >Day</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-3">
      <div class="tab-content">
        <!--begin::Tap pane-->
        <div class="tab-pane fade active show" id="kt_table_widget_5_tab_1">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table
              class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4"
            >
              <!--begin::Table head-->
              <thead>
                <tr class="border-0">
                  <th class="p-0 w-50px"></th>
                  <th class="p-0 min-w-150px"></th>
                  <th class="p-0 min-w-140px"></th>
                  <th class="p-0 min-w-110px"></th>
                  <th class="p-0 min-w-50px"></th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="getAssetPath('media/svg/brand-logos/plurk.svg')"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Brad Simmons</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Movie Creator</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">React, HTML</td>
                  <td class="text-end">
                    <span class="badge badge-light-success">Approved</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="
                            getAssetPath('media/svg/brand-logos/telegram.svg')
                          "
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Popular Authors</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Most Successful</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">Python, MySQL</td>
                  <td class="text-end">
                    <span class="badge badge-light-warning">In Progress</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: -->
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="getAssetPath('media/svg/brand-logos/vimeo.svg')"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >New Users</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Awesome Users</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">
                    Laravel,Back2Bet
                  </td>
                  <td class="text-end">
                    <span class="badge badge-light-primary">Success</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="getAssetPath('media/svg/brand-logos/bebo.svg')"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Active Customers</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Movie Creator</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">AngularJS, C#</td>
                  <td class="text-end">
                    <span class="badge badge-light-danger">Rejected</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="
                            getAssetPath(
                              '/media/svg/brand-logos/kickstarter.svg'
                            )
                          "
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Bestseller Theme</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Best Customers</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">ReactJS, Ruby</td>
                  <td class="text-end">
                    <span class="badge badge-light-warning">In Progress</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                    </a>
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
          </div>
          <!--end::Table-->
        </div>
        <!--end::Tap pane-->
        <!--begin::Tap pane-->
        <div class="tab-pane fade" id="kt_table_widget_5_tab_2">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table
              class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4"
            >
              <!--begin::Table head-->
              <thead>
                <tr class="border-0">
                  <th class="p-0 w-50px"></th>
                  <th class="p-0 min-w-150px"></th>
                  <th class="p-0 min-w-140px"></th>
                  <th class="p-0 min-w-110px"></th>
                  <th class="p-0 min-w-50px"></th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="getAssetPath('media/svg/brand-logos/plurk.svg')"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Brad Simmons</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Movie Creator</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">React, HTML</td>
                  <td class="text-end">
                    <span class="badge badge-light-success">Approved</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="
                            getAssetPath('media/svg/brand-logos/telegram.svg')
                          "
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Popular Authors</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Most Successful</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">Python, MySQL</td>
                  <td class="text-end">
                    <span class="badge badge-light-warning">In Progress</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="getAssetPath('media/svg/brand-logos/bebo.svg')"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Active Customers</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Movie Creator</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">AngularJS, C#</td>
                  <td class="text-end">
                    <span class="badge badge-light-danger">Rejected</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                    </a>
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
          </div>
          <!--end::Table-->
        </div>
        <!--end::Tap pane-->
        <!--begin::Tap pane-->
        <div class="tab-pane fade" id="kt_table_widget_5_tab_3">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table
              class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4"
            >
              <!--begin::Table head-->
              <thead>
                <tr class="border-0">
                  <th class="p-0 w-50px"></th>
                  <th class="p-0 min-w-150px"></th>
                  <th class="p-0 min-w-140px"></th>
                  <th class="p-0 min-w-110px"></th>
                  <th class="p-0 min-w-50px"></th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="
                            getAssetPath(
                              '/media/svg/brand-logos/kickstarter.svg'
                            )
                          "
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Bestseller Theme</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Best Customers</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">ReactJS, Ruby</td>
                  <td class="text-end">
                    <span class="badge badge-light-warning">In Progress</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="getAssetPath('media/svg/brand-logos/bebo.svg')"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Active Customers</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Movie Creator</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">AngularJS, C#</td>
                  <td class="text-end">
                    <span class="badge badge-light-danger">Rejected</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="getAssetPath('media/svg/brand-logos/vimeo.svg')"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >New Users</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Awesome Users</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">
                    Laravel,Back2Bet
                  </td>
                  <td class="text-end">
                    <span class="badge badge-light-primary">Success</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          :src="
                            getAssetPath('media/svg/brand-logos/telegram.svg')
                          "
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >Popular Authors</a
                    >
                    <span class="text-muted fw-semibold d-block"
                      >Most Successful</span
                    >
                  </td>
                  <td class="text-end text-muted fw-semibold">Python, MySQL</td>
                  <td class="text-end">
                    <span class="badge badge-light-warning">In Progress</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
          </div>
          <!--end::Table-->
        </div>
        <!--end::Tap pane-->
      </div>
    </div>
    <!--end::Body-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-widget-5",
  components: {},
  props: {
    widgetClasses: String,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
