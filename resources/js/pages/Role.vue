<template>
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN ROLE</h4>
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
                            Role
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
                            <table class="table datanew text-nowrap table-hover" id="RoleTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Role</th>
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

        <div class="modal fade" ref="tambahModal">
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
        </div>

        <div class="modal fade" ref="viewModal">
            <div class="modal-dialog modal-dialog-centered custom-modal-two">
                <div class="modal-content">
                    <div class="page-wrapper-new p-0">
                        <div class="content">
                            <div class="modal-header border-0 custom-modal-header bg-secondary">
                                <div class="page-title">
                                    <h4 class="text-white">
                                        <b>VIEW ROLE</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeView">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <div class="mb-3">
                                    <label class="form-label">ROLE</label>
                                    <input type="text" v-model="form.roleView" class="form-control" readonly />
                                </div>
                                <div class="modal-footer-btn">
                                    <button type="button" class="btn btn-cancel btn-warning me-2" @click="closeView">
                                        CANCEL
                                    </button>
                                </div>
                            </div>
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
                                        <b>EDIT ROLE</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeEdit">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitEditRole">
                                    <div class="mb-3">
                                        <label class="form-label">ROLE</label>
                                        <input type="text" v-model="form.roleEdit" class="form-control" />
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeEdit">
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
import { getCurrentInstance, ref, reactive, onMounted, onBeforeUnmount, nextTick } from "vue";
import { initTooltips } from "../utilities/tooltip";
import axios from "../utilities/axios.js";

export default {
    name: "Role",
    setup() {
        const { appContext } = getCurrentInstance();
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#RoleTable";
        const tambahModal = ref(null);
        const viewModal = ref(null);
        const editModal = ref(null);

        const roleState = ref([]);
        const form = reactive({ role: "", roleView: "", roleEdit: "" });

        let dataTableInstance = null;

        //FETCH DATA ROLE
        const fetchRoles = async () => {
            try {
                const response = await axios.get('/role/getRole');
                roleState.value = response.data.Data;
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
                    data: roleState.value, // bind data awal
                    columns: [
                        {
                            data: null,
                            render: (data, type, row, meta) => meta.row + 1 // nomor urut
                        },
                        { data: 'role' },
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
                                    <a class="btn-view me-2 edit-icon p-2" data-bs-toggle="tooltip" title="View" data-id="${row.id}">
                                        <i data-feather="eye"></i>
                                    </a>
                                    <a class="btn-edit me-2 p-2" data-bs-toggle="tooltip" title="Edit" data-id="${row.id}">
                                        <i data-feather="edit"></i>
                                    </a>
                                    <a class="btn-delete p-2" data-bs-toggle="tooltip" title="Delete" data-id="${row.id}">
                                        <i data-feather="trash-2"></i>
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
            const success = await fetchRoles();
            if (!success) return;

            await nextTick(); // tunggu DOM render

            dataTableInstance.clear();
            roleState.value.forEach(role => {
                dataTableInstance.row.add(role);
            });
            dataTableInstance.draw();
        };

        // Fungsi yang dipanggil saat klik tombol refresh
        const refreshTable = async () => {
            await refreshTableInternal();
            toast("Data berhasil direfresh!", "success");
        };

        // FUNCTION TAMBAH ROLE //
        const openModalAdd = () => {
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl, {
                    backdrop: 'static',
                    keyboard: false
                });
                modal.show();
            }
        };

        const closeRole = () => {
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
            form.role = "";
        };

        const submitRole = async () => {
            if (!form.role.trim()) {
                toast("Role wajib diisi!", "error");
                return;
            }

            try {
                const response = await axios.post('/role/storeRole', { role: form.role });

                toast(response.data.message || "Role berhasil disimpan!", "success");
                closeRole();
                await refreshTableInternal();

            } catch (error) {
                const errors = error.response?.data?.errors;
                if (errors) {
                    let errorList = "<ul style='text-align:left;'>";
                    for (let key in errors) {
                        errorList += `<li>${errors[key][0]}</li>`;
                    }
                    errorList += "</ul>";
                    toast(errorList, "error");
                } else {
                    toast(error.response?.data?.message || "Gagal menyimpan role", "error");
                }
            }
        };
        // FUNCTION TAMBAH ROLE //

        // FUNCTION VIEW //
        const openModalView = (role) => {
            form.roleView = role.role;

            nextTick(() => { // tunggu DOM update dulu
                const modalEl = viewModal.value;
                if (modalEl) {
                    const modal = bootstrap.Modal.getOrCreateInstance(modalEl, { backdrop: "static", keyboard: false });
                    modal.show();
                }
            });
        };

        // handler klik tombol view
        function handleViewClick(e) {
            const btn = e.target.closest(".btn-view");
            if (!btn) return;

            const id = btn.dataset.id;
            const role = roleState.value.find(j => j.id == id);
            if (!role) return;

            openModalView(role);
        }

        // 👉 bikin function khusus untuk bind event
        function bindViewClick() {
            const tableEl = document.querySelector(tableSelector);
            if (tableEl) {
                tableEl.addEventListener("click", handleViewClick);
            }
        }

        const closeView = () => {
            const modalEl = viewModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
        };
        // FUNCTION VIEW //

        //FUNCTION EDIT //
        const openModalEdit = (role) => {
            form.id = role.id; // simpan ID untuk update
            form.roleEdit = role.role;

            nextTick(() => { // tunggu DOM update dulu
                const modalEl = editModal.value;
                if (modalEl) {
                    const modal = bootstrap.Modal.getOrCreateInstance(modalEl, { backdrop: "static", keyboard: false });
                    modal.show();
                }
            });
        };
        // handler klik tombol edit
        function handleEditClick(e) {
            const btn = e.target.closest(".btn-edit");
            if (!btn) return;

            const id = btn.dataset.id;
            const role = roleState.value.find(j => j.id == id);
            if (!role) return;

            openModalEdit(role);
        }

        // 👉 bikin function khusus untuk bind event
        function bindEditClick() {
            const tableEl = document.querySelector(tableSelector);
            if (tableEl) {
                tableEl.addEventListener("click", handleEditClick);
            }
        }

        const closeEdit = () => {
            const modalEl = editModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
            form.id = null; // reset ID
            form.roleEdit = "";
        };

        const submitEditRole = async () => {
            if (!form.roleEdit.trim()) {
                toast("Role wajib diisi!", "error");
                return;
            }

            try {
                const response = await axios.post(`/role/updateRole/${form.id}`, {
                    role: form.roleEdit
                });

                toast(response.data.message || "Role berhasil diupdate!", "success");
                closeEdit();
                await refreshTableInternal();

            } catch (error) {
                const errors = error.response?.data?.errors;
                if (errors) {
                    let errorList = "<ul style='text-align:left;'>";
                    for (let key in errors) {
                        errorList += `<li>${errors[key][0]}</li>`;
                    }
                    errorList += "</ul>";
                    toast(errorList, "error");
                } else {
                    toast(error.response?.data?.message || "Gagal mengupdate role", "error");
                }
            }
        };
        // FUNCTION EDIT //

        // FUNCTION DELETE //
        function handleDeleteClick(e) {
            const btn = e.target.closest(".btn-delete");
            if (!btn) return; // kalau bukan tombol delete, abaikan

            const id = btn.dataset.id;
            const role = roleState.value.find(j => j.id == id);
            if (!role) return;

            Swal.fire({
                title: "Are you sure?",
                text: `Role "${role.role}" akan dihapus!`,
                type: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-danger ml-1",
                },
                buttonsStyling: !1,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // ✅ API hapus
                        await axios.delete(`/role/deleteRole/${role.id}`);

                        // refresh table setelah hapus
                        await refreshTableInternal();

                        toast("Role berhasil dihapus!", "success");
                    } catch (err) {
                        toast("Role berhasil disimpan!", "error");
                    }
                }
            });
        }

        function bindDeleteClick() {
            const tableEl = document.querySelector(tableSelector);
            if (tableEl) {
                tableEl.addEventListener("click", handleDeleteClick);
            }
        }
        // FUNCTION DELETE //

        onMounted(async () => {
            await fetchRoles();
            await initTable();
            feather.replace();
            initTooltips();
            bindViewClick();
            closeView();
            bindEditClick();
            bindDeleteClick();
        });

        onBeforeUnmount(() => {
            if (dataTableInstance) dataTableInstance.destroy();
        });

        return {
            tambahModal,
            viewModal,
            editModal,
            form,
            openModalAdd,
            openModalView,
            openModalEdit,
            closeRole,
            closeView,
            closeEdit,
            submitRole,
            submitEditRole,
            roleState,
            refreshTable
        };
    },
};
</script>
