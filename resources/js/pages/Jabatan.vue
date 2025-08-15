<template>
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN JABATAN</h4>
                        </div>
                    </div>
                    <ul class="table-top-head">
                        <li>
                            <a data-bs-toggle="tooltip" @click="refreshTable" data-bs-placement="top" title="Refresh"><i
                                    data-feather="rotate-ccw" class="feather-rotate-ccw"></i></a>
                        </li>
                        <li>
                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i
                                    data-feather="chevron-up" class="feather-chevron-up"></i></a>
                        </li>
                    </ul>
                    <div class="page-btn import">
                        <a href="#" class="btn btn-added color" @click="openModalAdd()">
                            <i data-feather="plus" class="me-2"></i> Tambah
                            Jabatan
                        </a>
                    </div>
                </div>

                <div class="card table-list-card">
                    <div class="card-body">
                        <div class="table-top">
                            <div class="search-set">
                                <div class="search-input">
                                    <a href="javascript:void(0);" class="btn btn-searchset"></a>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive product-list">
                            <table class="table datanew text-nowrap table-hover" id="JabatanTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Jabatan</th>
                                        <th>Status</th>
                                        <th class="no-sort">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(jabatan, index) in jabatans" :key="jabatan.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ jabatan.jabatan }}</td>
                                        <td>
                                            <span class="badge" :class="jabatan.status
                                                ? 'bg-success'
                                                : 'bg-danger'
                                                ">
                                                {{
                                                    jabatan.status
                                                        ? "Aktif"
                                                        : "Non-Aktif"
                                                }}
                                            </span>
                                        </td>
                                        <td class="action-table-data">
                                            <div class="edit-delete-action">
                                                <a class="me-2 edit-icon p-2" href="product-details.html"
                                                    data-bs-toggle="tooltip" title="View Product">
                                                    <i data-feather="eye" class="feather-eye"></i>
                                                </a>
                                                <a class="me-2 p-2" href="edit-product.html" data-bs-toggle="tooltip"
                                                    title="Edit Product">
                                                    <i data-feather="edit" class="feather-edit"></i>
                                                </a>
                                                <a class="confirm-text p-2" href="javascript:void(0);"
                                                    data-bs-toggle="tooltip" title="Delete Product">
                                                    <i data-feather="trash-2" class="feather-trash-2"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" ref="tambahModal">
            <div class="modal-dialog modal-dialog-centered custom-modal-two">
                <div class="modal-content">
                    <div class="page-wrapper-new p-0">
                        <div class="content">
                            <div class="modal-header border-0 custom-modal-header bg-secondary">
                                <div class="page-title">
                                    <h4 class="text-white">
                                        <b>TAMBAH JABATAN</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeJabatan">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitJabatan">
                                    <div class="mb-3">
                                        <label class="form-label">JABATAN</label>
                                        <input type="text" v-model="form.jabatan" class="form-control" />
                                    </div>
                                    <!-- <div class="mb-3">
                                        <label class="form-label">Category Slug</label>
                                        <input type="text" class="form-control">
                                    </div>
                                    <div class="mb-0">
                                        <div
                                            class="status-toggle modal-status d-flex justify-content-between align-items-center">
                                            <span class="status-label">Status</span>
                                            <input type="checkbox" id="user2" class="check" checked>
                                            <label for="user2" class="checktoggle"></label>
                                        </div>
                                    </div> -->
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeJabatan">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN JABATAN
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getCurrentInstance,
    ref,
    reactive,
    onMounted,
    onBeforeUnmount,
    nextTick,
    onUpdated,
} from "vue";
import { initDataTable } from "@/utilities/datatable.js";
import { initTooltips } from "../utilities/tooltip";
import axios from "../utilities/axios.js";

export default {
    name: "Jabatan",
    props: {
        jabatans: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const { appContext } = getCurrentInstance(); // ambil global properties
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#JabatanTable";
        const tambahModal = ref(null);
        const form = reactive({
            jabatan: "",
        });


        // Fetch data dari API
        const fetchJabatans = async () => {
            try {
                const response = await axios.get('/api/jabatan/getJabatan'); // ganti URL sesuai API
                jabatans.value = response.data;
            } catch (error) {
                toast("Gagal mengambil data", "error");
                console.error(error);
            }
        };

        // Refresh tabel: ambil data baru + re-init DataTable
        const refreshTable = async () => {
            await fetchJabatans(); // ambil data terbaru

            // Hapus DataTable lama
            const tableEl = document.querySelector(tableSelector);
            if (tableEl && $.fn.DataTable.isDataTable(tableEl)) {
                $(tableEl).DataTable().destroy();
            }

            // Re-init DataTable dan tooltips
            nextTick(() => {
                initDataTable(tableSelector);
                feather.replace();
                initTooltips();
            });

            toast("Berhasil merefresh data", "success");
        };

        const openModalAdd = () => {
            // pakai Bootstrap global
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.show();
            }
        };

        const closeJabatan = () => {
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
            form.jabatan = ""; // reset form
        };

        const submitJabatan = () => {
            if (!form.jabatan.trim()) {
                toast("Jabatan wajib diisi!", "error");
                return;
            }

            console.log("Submit Jabatan:", form.jabatan);
            closeJabatan();
            toast("Jabatan berhasil disimpan!", "success");
        };

        onMounted(async () => {
            await fetchJabatans();
            nextTick(() => {
                feather.replace();
                initDataTable(tableSelector); // selector tabel
                initTooltips();
            });
        });
        // Re-init DataTable & Feather jika halaman diperbarui (SPA)
        onUpdated(() => {
            feather.replace();
            initDataTable(tableSelector);
            initTooltips(); // aktifkan tooltip
        });

        onBeforeUnmount(() => {
            feather.replace();
            initTooltips(); // aktifkan tooltip
        });

        return { tambahModal, refreshTable, form, openModalAdd, closeJabatan, submitJabatan };
    },
};
</script>
