<template>
  <!--begin::Documents toolbar-->
  <div class="d-flex flex-wrap flex-stack mb-6">
    <!--begin::Title-->
    <h3 class="fw-bold my-2">
      My Documents
      <span class="fs-6 text-gray-400 fw-semibold ms-1">100+ resources</span>
    </h3>
    <!--end::Title-->

    <!--begin::Controls-->
    <div class="d-flex my-2">
      <!--begin::Search-->
      <div class="d-flex align-items-center position-relative me-4">
        <KTIcon
          icon-name="magnifier"
          icon-class="fs-3 position-absolute ms-3"
        />
        <input
          type="text"
          id="kt_filter_search"
          class="form-control form-control-white form-control-sm w-150px ps-9"
          placeholder="Search"
        />
      </div>
      <!--end::Search-->

      <a
        href="#"
        class="btn btn-primary btn-sm"
        data-bs-toggle="tooltip"
        title="Coming soon"
      >
        File Manager
      </a>
    </div>
    <!--end::Controls-->
  </div>
  <!--end::Documents toolbar-->

  <div class="row g-6 g-xl-9 mb-6 mb-xl-9">
    <KTFolder folder-name="Finance" files="7"></KTFolder>

    <KTFolder folder-name="Customers" files="3"></KTFolder>

    <KTFolder folder-name="CRM Project" files="25"></KTFolder>

    <div class="col d-none d-xl-block"></div>

    <div class="col d-none d-xl-block"></div>
  </div>

  <div class="row g-6 g-xl-9 mb-6 mb-xl-9">
    <KTFile
      file-title="Project Reqs.."
      file-type="pdf"
      created-at="3 days ago"
    ></KTFile>

    <KTFile
      file-title="CRM App Docs.."
      file-type="doc"
      created-at="3 days ago"
    ></KTFile>

    <KTFile
      file-title="User CRUD Styles"
      file-type="css"
      created-at="4 days ago"
    ></KTFile>

    <KTFile
      file-title="Back2Bet Logo"
      file-type="ai"
      created-at="5 days ago"
    ></KTFile>

    <KTFile
      file-title="Orders backup"
      file-type="sql"
      created-at="1 week ago"
    ></KTFile>
  </div>

  <div class="row g-6 g-xl-9 mb-6 mb-xl-9">
    <KTFile
      file-title="UTAIR CRM API Co.."
      file-type="xml"
      created-at="2 weeks ago"
    ></KTFile>

    <KTFile
      file-title="Tower Hill App.."
      file-type="tif"
      created-at="3 weeks ago"
    ></KTFile>

    <div class="col d-none d-xl-block"></div>

    <div class="col d-none d-xl-block"></div>

    <div class="col d-none d-xl-block"></div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import KTFolder from "@/components/files/Folder.vue";
import KTFile from "@/components/files/File.vue";

export default defineComponent({
  name: "profile-documents",
  components: {
    KTFolder,
    KTFile,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
