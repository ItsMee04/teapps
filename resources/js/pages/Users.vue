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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" ref="editModal">
            <div class="modal-dialog modal-dialog-centered custom-modal-two">
                <div class="modal-content">
                    <div class="page-wrapper-new p-0">
                        <div class="content">
                            <div class="modal-header border-0 custom-modal-header bg-secondary">
                                <div class="page-title">
                                    <h4 class="text-white">
                                        <b>EDIT USERS</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeEditUsers">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitEditUsers">
                                    <div class="mb-3">
                                        <label class="form-label">ID<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.editID" class="form-control" readonly />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">NAMA<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.editNama" class="form-control" readonly />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">EMAIL<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.editEmail" class="form-control" />
                                        <div v-if="errors.editEmail" class="text-danger small">{{ errors.editEmail }}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">PASSWORD<span
                                                class="text-danger ms-1">*</span></label>
                                        <div class="pass-group">
                                            <input type="password" v-model="form.editPassword"
                                                class="pass-input form-control">
                                            <span class="fas toggle-password fa-eye-slash"></span>
                                        </div>
                                        <div v-if="errors.editPassword" class="text-danger small">{{ errors.editPassword
                                        }}</div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">ROLE<span class="text-danger ms-1">*</span></label>
                                        <select class="select" id="roleEdit" v-model="form.editRoleSelect">
                                            <option value="">Pilih Role</option>
                                            <option v-for="role in roleList" :key="role.id" :value="role.id">
                                                {{ role.role }}
                                            </option>
                                        </select>
                                        <div v-if="errors.editRoleSelect" class="text-danger small">{{
                                            errors.editRoleSelect }}</div>
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeEditUsers">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN USERS
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
} from "vue";
import { initTooltips } from "../utilities/tooltip";
import { initSelect2 } from "../utilities/select.js";
import axios from "../utilities/axios.js";

export default {
    name: "Users",
    setup() {
        const { appContext } = getCurrentInstance(); // ambil global properties
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#UserTable"; // selector tabel
        const editModal = ref(null);
        const usersState = ref([]);
        const roleList = ref([]);
        const form = reactive({
            editID: "",
            editNama: "",
            editEmail: "",
            editPassword: "",
            editRoleSelect: ""
        });

        const errors = reactive({
            editEmail: "",
            editPassword: "",
            editRoleSelect: ""
        });

        let dataTableInstance = null;

        const fetchRoles = async () => {
            try {
                const res = await axios.get("/role/getRole"); // ganti dengan endpoint kamu
                roleList.value = res.data.Data; // misal [{id:1, jabatan:"Manager"}, ...]
                await nextTick(); // tunggu DOM update option
                initSelect2("#roleEdit", { placeholder: "Pilih Role", allowClear: true });

                // Tambahkan event agar v-model sinkron dengan Select2
                $('#roleEdit').on('change', function () {
                    form.editRoleSelect = $(this).val();
                });
            } catch (err) {
                console.error("Gagal load role:", err);
            }
        };

        //FETCH DATA USERS
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users/getUsers');
                usersState.value = response.data.Data;
                return true;
            } catch (error) {
                toast("Gagal mengambil data", "error");
                console.error(error);
                return false;
            }
        };

        // Init DataTable sekali saja
        const initTable = async () => {
            await nextTick(); // tunggu DOM render

            if (!dataTableInstance) {
                dataTableInstance = $(tableSelector).DataTable({
                    data: usersState.value, // bind data awal
                    columns: [
                        {
                            data: null,
                            render: (data, type, row, meta) => meta.row + 1 // nomor urut
                        },
                        { data: 'pegawai.nama' },
                        {
                            data: "role.role",
                            render: function (data, type, row) {
                                if (!data || data === null) {
                                    return `<span class="badge bg-secondary fw-medium fs-10"><b>Role Belum Di Pilih</b></span>`;
                                } else {
                                    return data; // Menampilkan email jika tidak null
                                }
                            }
                        },
                        {
                            data: "email",
                            render: function (data, type, row) {
                                if (!data || data === null) {
                                    return `<span class="badge bg-secondary fw-medium fs-10"><b>Email Belum Di Input</b></span>`;
                                } else {
                                    return data; // Menampilkan email jika tidak null
                                }
                            }
                        },
                        {
                            data: 'status',
                            render: (data) => data
                                ? `<span class="badge bg-success">Aktif</span>`
                                : `<span class="badge bg-danger">Non-Aktif</span>`
                        },
                        {
                            data: null,
                            orderable: false,
                            className: "action-table-data",
                            render: (data, type, row) => `
                                <div class="edit-delete-action">
                                    <a class="me-2 p-2 btn-edit" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit">
                                        <i data-feather="edit" class="feather-edit"></i>
                                    </a>
                                </div>
                            `
                        }
                    ],
                    responsive: true,   // ✅ aktifkan plugin responsive
                    autoWidth: false,   // ✅ biar kolom tidak ngunci width
                    bFilter: true,
                    sDom: 'fBtlpi',
                    ordering: true,
                    language: {
                        search: ' ',
                        sLengthMenu: '_MENU_',
                        searchPlaceholder: "Search",
                        info: "_START_ - _END_ of _TOTAL_ items",
                        paginate: { next: ' <i class="fa fa-angle-right"></i>', previous: '<i class="fa fa-angle-left"></i>' },
                    },
                    initComplete: () => {
                        $('.dataTables_filter').appendTo('.search-input');
                    }
                });

                // Feather icon & tooltip setelah draw
                dataTableInstance.on('draw', () => {
                    feather.replace();
                    initTooltips();
                });
            }
        };

        const refreshTableInternal = async () => {
            const success = await fetchUsers();
            if (!success) return;

            await nextTick(); // tunggu DOM render

            dataTableInstance.clear();
            usersState.value.forEach(users => {
                dataTableInstance.row.add(users);
            });
            dataTableInstance.draw();
        };

        // Fungsi yang dipanggil saat klik tombol refresh
        const refreshTable = async () => {
            await refreshTableInternal();
            toast("Data berhasil direfresh!", "success");
        };

        const openModalEdit = (users) => {
            form.editID = users.id;

            // Ambil dari relasi pegawai
            form.editNama = users.pegawai ? users.pegawai.nama : "";

            // Email bisa null
            form.editEmail = users.email || "";

            // Password selalu kosong kalau edit
            form.editPassword = "";

            // Role bisa null
            form.editRoleSelect = users.role ? users.role.id : null;

            const modalEl = editModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl, {
                    backdrop: 'static',
                    keyboard: false
                });
                modal.show();
            }

            // Sinkronkan select2 dengan v-model
            nextTick(() => {
                initSelect2("#roleEdit", { placeholder: "Pilih Role", allowClear: true });
                $('#roleEdit').val(form.editRoleSelect).trigger('change');
                $('#jabatanroleEditEdit').on('change', function () {
                    form.editRoleSelect = $(this).val();
                });
            });
        };

        function handleEditClick(e) {
            const btn = e.target.closest(".btn-edit");
            if (!btn) return;
            const id = btn.dataset.id;
            const users = usersState.value.find(p => p.id == id);
            if (!users) return;
            openModalEdit(users);
        }

        function bindEditClick() {
            const tableEl = document.querySelector(tableSelector);
            if (tableEl) {
                tableEl.addEventListener("click", handleEditClick);
            }
        }

        const closeEditUsers = () => {
            const modalEl = editModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
            form.editID = null;
            form.editNama = "";
            form.editEmail = "";
            form.editPassword = "";
            form.editRoleSelect = "";
        };

        // 🚀 SUBMIT EDIT USERS
        const submitEditUsers = async () => {
            errors.editEmail = "";
            errors.editPassword = "";
            errors.editRoleSelect = "";

            try {
                // request ke backend untuk update user
                const response = await axios.post(`/users/updateUsers/${form.editID}`, {
                    nama: form.editNama,          // dari relasi pegawai
                    email: form.editEmail,
                    password: form.editPassword,  // kosong = tidak update password
                    role: form.editRoleSelect
                });

                if (response.data.success) {
                    toast("User berhasil diperbarui!", "success");

                    // Refresh tabel agar data terbaru muncul
                    await refreshTableInternal();

                    // Tutup modal edit
                    closeEditUsers();
                } else {
                    toast(response.data.message || "Gagal update user", "error");
                }
            } catch (error) {
                // kalau backend kirim error validasi (422 Laravel biasanya)
                if (error.response && error.response.status === 422) {
                    const validationErrors = error.response.data.errors;
                    if (validationErrors.email) {
                        errors.editEmail = validationErrors.email[0];
                    }
                    if (validationErrors.password) {
                        errors.editPassword = validationErrors.password[0];
                    }
                    if (validationErrors.role_id) {
                        errors.editRoleSelect = validationErrors.role_id[0];
                    }
                    toast("Periksa kembali inputan Anda!", "error");
                } else {
                    console.error(error);
                    toast("Terjadi kesalahan saat update user", "error");
                }
            }
        };

        onMounted(async () => {
            await fetchUsers();
            await initTable();
            fetchRoles();
            bindEditClick();
            feather.replace();
            initTooltips();
        });

        onBeforeUnmount(() => {
            if (dataTableInstance) dataTableInstance.destroy();
        });

        return {
            editModal,
            closeEditUsers,
            submitEditUsers,
            roleList,
            form,
            errors,
            usersState,
            refreshTable
        };
    },
};
</script>
