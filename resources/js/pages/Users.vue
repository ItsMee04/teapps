<template>
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN USERS</h4>
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
                            <table class="table datanew text-nowrap table-hover" id="UserTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Pegawai</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th class="no-sort">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(user, index) in users" :key="role.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ user.pegawai.nama }}</td>
                                        <td>{{ user.role.role }}</td>
                                        <td>
                                            <span v-if="!user.email || user.email === null"
                                                class="badge bg-secondary fw-medium fs-10">
                                                <b>Email Belum Di Input</b>
                                            </span>
                                            <span v-else>
                                                {{ user.email }} <!-- Menampilkan email jika tidak null -->
                                            </span>
                                        </td>
                                        <td>
                                            <span class="badge" :class="user.status
                                                ? 'bg-success'
                                                : 'bg-danger'
                                                ">
                                                {{
                                                    user.status
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

        <!-- <div class="modal fade" ref="tambahModal">
            <div class="modal-dialog modal-dialog-centered custom-modal-two">
                <div class="modal-content">
                    <div class="page-wrapper-new p-0">
                        <div class="content">
                            <div class="modal-header border-0 custom-modal-header bg-secondary">
                                <div class="page-title">
                                    <h4 class="text-white">
                                        <b>TAMBAH ROLE</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeRole">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitRole">
                                    <div class="mb-3">
                                        <label class="form-label">ROLE</label>
                                        <input type="text" v-model="form.role" class="form-control" />
                                    </div>
                                    <div class="mb-3">
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
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeRole">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN ROLE
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
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
    name: "Users",
    props: {
        users: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const { appContext } = getCurrentInstance(); // ambil global properties
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#UserTable"; // selector tabel
        const tambahModal = ref(null);
        const form = reactive({
            user: "",
        });


        // Fetch data dari API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users/getUsers'); // ganti URL sesuai API
                users.value = response.data;
            } catch (error) {
                toast("Gagal mengambil data", "error");
                console.error(error);
            }
        };

        // Refresh tabel: ambil data baru + re-init DataTable
        const refreshTable = async () => {
            if (await fetchUsers()) {
                // ambil data terbaru
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
                // Tampilkan toast hanya jika berhasil mengambil data
                toast("Berhasil merefresh data", "success");
            };
        };

        // const openModalAdd = () => {
        //     // pakai Bootstrap global
        //     const modalEl = tambahModal.value;
        //     if (modalEl) {
        //         const modal = bootstrap.Modal.getOrCreateInstance(modalEl, {
        //             backdrop: 'static', // Modal tidak akan tertutup saat klik overlay
        //             keyboard: false     // Modal tidak bisa ditutup dengan ESC
        //         });
        //         modal.show();
        //     }
        // };

        // const closeRole = () => {
        //     const modalEl = tambahModal.value;
        //     if (modalEl) {
        //         const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        //         modal.hide();
        //     }
        //     form.role = ""; // reset form
        // };

        // const submitRole = () => {
        //     if (!form.role.trim()) {
        //         toast("Role wajib diisi!", "error");
        //         return;
        //     }

        //     console.log("Submit Role:", form.role);
        //     closeRole();
        //     toast("Role berhasil disimpan!", "success");
        // };

        onMounted(async () => {
            await fetchUsers();
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

        return { tambahModal, refreshTable, form };
    },
};
</script>
