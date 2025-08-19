<template>
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN KONDISI</h4>
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
                            Diskon
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
                            <table class="table datanew text-nowrap table-hover" id="DiskonTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Diskon / Promo</th>
                                        <th>Nilai</th>
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
                                        <b>TAMBAH DISKON</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeDiskon">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitDiskon">
                                    <div class="mb-3">
                                        <label class="form-label">DISKON<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.diskon" class="form-control" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">NILAI<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.nilai" class="form-control" />
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeDiskon">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN DISKON
                                        </button>
                                    </div>
                                </form>
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
                                        <b>EDIT DISKON</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeEdit">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitEditDiskon">
                                    <div class="mb-3">
                                        <label class="form-label">DISKON<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.editDiskon" class="form-control" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">NILAI<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.editNilai" class="form-control" />
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeEdit">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN DISKON
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
    name: "Diskon",
    setup() {
        const { appContext } = getCurrentInstance();
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#DiskonTable";
        const tambahModal = ref(null);
        const editModal = ref(null);

        const diskonState = ref([]);
        const form = reactive({
            diskon: "",
            nilai: "",

            editDiskon: "",
            editNilai: "",
        });

        let dataTableInstance = null;

        //FETCH DATA DISKON
        const fetchDiskon = async () => {
            try {
                const response = await axios.get('/diskon/getDiskon');
                diskonState.value = response.data.Data;
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
                    data: diskonState.value, // bind data awal
                    columns: [
                        {
                            data: null,
                            render: (data, type, row, meta) => meta.row + 1 // nomor urut
                        },
                        { data: 'diskon' },
                        {
                            data: 'nilai',
                            render: function (data, type, row) {
                                return data + ' %';
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
            const success = await fetchDiskon();
            if (!success) return;

            await nextTick(); // tunggu DOM render

            dataTableInstance.clear();
            diskonState.value.forEach(diskon => {
                dataTableInstance.row.add(diskon);
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

        const closeDiskon = () => {
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
            form.diskon = "";
            form.nilai = "";
        };

        const submitDiskon = async () => {
            if (!form.diskon.trim()) {
                toast("Diskon wajib diisi!", "error");
                return;
            }

            if (!form.nilai.trim()) {
                toast("Nilai wajib diisi!", "error");
                return;
            }

            if (!/^\d+$/.test(form.nilai.trim())) {
                toast("Nilai harus berupa angka bulat tanpa koma atau titik!", "error");
                return;
            }

            try {
                const response = await axios.post('/diskon/storeDiskon', { diskon: form.diskon, nilai: form.nilai });

                toast(response.data.message || "Diskon berhasil disimpan!", "success");
                closeDiskon();
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
                    toast(error.response?.data?.message || "Gagal menyimpan diskon", "error");
                }
            }
        };

        const openModalEdit = (diskon) => {
            form.id = diskon.id; // simpan ID untuk update
            form.editDiskon = diskon.diskon;
            form.editNilai = diskon.nilai;

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
            const diskon = diskonState.value.find(j => j.id == id);
            if (!diskon) return;

            openModalEdit(diskon);
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
            form.editDiskon = "";
            form.editNilai = "";
        };

        const submitEditDiskon = async () => {
            if (!form.editDiskon.trim()) {
                toast("Diskon wajib diisi!", "error");
                return;
            }

            if (!form.editNilai.trim()) {
                toast("Nilai wajib diisi!", "error");
                return;
            }

            if (!/^\d+$/.test(form.editNilai.trim())) {
                toast("Nilai harus berupa angka bulat tanpa koma atau titik!", "error");
                return;
            }

            try {
                const response = await axios.post(`/diskon/updateDiskon/${form.id}`, {
                    diskon: form.editDiskon,
                    nilai: form.editNilai
                });

                toast(response.data.message || "Diskon berhasil diupdate!", "success");
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
                    toast(error.response?.data?.message || "Gagal mengupdate diskon", "error");
                }
            }
        };

        // FUNCTION DELETE //
        function handleDeleteClick(e) {
            const btn = e.target.closest(".btn-delete");
            if (!btn) return; // kalau bukan tombol delete, abaikan

            const id = btn.dataset.id;
            const diskon = diskonState.value.find(j => j.id == id);
            if (!diskon) return;

            Swal.fire({
                title: "Are you sure?",
                text: `Diskon "${diskon.nilai} %" akan dihapus!`,
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
                        await axios.delete(`/diskon/deleteDiskon/${diskon.id}`);

                        // refresh table setelah hapus
                        await refreshTableInternal();

                        toast("Diskon berhasil dihapus!", "success");
                    } catch (err) {
                        toast("Diskon berhasil disimpan!", "error");
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
            await fetchDiskon();
            await initTable();
            initTooltips();
            feather.replace();
            // // Bind event untuk tombol edit
            bindEditClick();
            bindDeleteClick();
        });

        onBeforeUnmount(() => {
            if (dataTableInstance) dataTableInstance.destroy();
        });

        return {
            diskonState,
            form,
            refreshTable,
            fetchDiskon,
            tambahModal,
            openModalAdd,
            closeDiskon,
            submitDiskon,
            editModal,
            openModalEdit,
            closeEdit,
            submitEditDiskon,
        };
    }
}
</script>