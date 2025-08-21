<template>
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN BAKI</h4>
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
                            Baki
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
                            <table class="table datanew text-nowrap table-hover" id="BakiTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Baki</th>
                                        <th>Jenis</th>
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
                                        <b>TAMBAH BAKI</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeBaki">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitBaki">
                                    <div class="mb-3">
                                        <label class="form-label">BAKI</label>
                                        <input type="text" v-model="form.baki" class="form-control" />
                                        <div v-if="errors.baki" class="text-danger small">{{
                                            errors.baki }}</div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">JENIS<span class="text-danger ms-1">*</span></label>
                                        <select class="select" id="jenis" v-model="form.JenisSelect">
                                            <option value="">Pilih Jenis Produk</option>
                                            <option v-for="jenis in jenisList" :key="jenis.id" :value="jenis.id">
                                                {{ jenis.jenis_produk }}
                                            </option>
                                        </select>
                                        <div v-if="errors.JenisSelect" class="text-danger small">{{
                                            errors.JenisSelect }}</div>
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeBaki">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN BAKI
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
import { initSelect2 } from "../utilities/select.js";
import axios from "../utilities/axios.js";
export default {
    name: "Nampan",
    setup() {
        const { appContext } = getCurrentInstance();
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#BakiTable";
        const tambahModal = ref(null);
        // const editModal = ref(null);

        const nampanState = ref([]);
        const jenisList = ref([]);
        const form = reactive({ baki: "", JenisSelect: "" });

        const errors = reactive({ baki: "", JenisSelect: "" });

        let dataTableInstance = null;

        const fetchJenis = async () => {
            try {
                const res = await axios.get("/jenisproduk/getJenisProduk"); // ganti dengan endpoint kamu
                jenisList.value = res.data.Data; // misal [{id:1, jabatan:"Manager"}, ...]
                await nextTick(); // tunggu DOM update option
                initSelect2("#jenis", { placeholder: "Pilih jenis Produk", allowClear: true });

                // Tambahkan event agar v-model sinkron dengan Select2
                $('#jenis').on('change', function () {
                    form.JenisSelect = $(this).val();
                });
            } catch (err) {
                console.error("Gagal load jenis:", err);
            }
        };

        //FETCH DATA NAMPAN
        const fetchNampan = async () => {
            try {
                const response = await axios.get('/nampan/getNampan');
                nampanState.value = response.data.Data;
                return true;
            } catch (error) {
                toast("Gagal mengambil data", "error");
                console.error(error);
                return false;
            }
        };

        // Init DataTable sekali saja
        const initTable = () => {
            // Jika sudah ada instance sebelumnya, destroy dulu
            if ($.fn.DataTable.isDataTable(tableSelector)) {
                $(tableSelector).DataTable().clear().destroy();
            }

            dataTableInstance = $(tableSelector).DataTable({
                data: nampanState.value, // bind data awal
                columns: [
                    {
                        data: null,
                        render: (data, type, row, meta) => meta.row + 1 // nomor urut
                    },
                    { data: 'kodenampan' },
                    { data: 'jenis_produk.jenis_produk' },
                    {
                        data: 'status',
                        render: (data) => {
                            if (data == 1) {
                                return `<span class="badge bg-success fw-medium fs-10"><b>AKTIF</b></span>`;
                            } else if (data == 2) {
                                return `<span class="badge bg-danger fw-medium fs-10"><b>TIDAK AKTIF</b></span>`;
                            }
                        }
                    },
                    {
                        data: null,
                        orderable: false,
                        className: "action-table-data",
                        render: (data, type, row) => `
                            <div class="edit-delete-action">
                                <a class="me-2 edit-icon p-2 btn-view" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                    <i data-feather="eye" class="action-eye"></i>
                                </a>
                                <a class="me-2 p-2 btn-edit" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit">
                                    <i data-feather="edit" class="feather-edit"></i>
                                </a>
                                <a class="btn-delete p-2" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Final Baki">
                                    <i data-feather="check" class="feather-print"></i>
                                </a>
                            </div>
                        `
                    }
                ],
                responsive: true,
                autoWidth: false,
                bFilter: true,
                sDom: 'fBtlpi',
                ordering: true,
                language: {
                    search: ' ',
                    sLengthMenu: '_MENU_',
                    searchPlaceholder: "Search",
                    info: "_START_ - _END_ of _TOTAL_ items",
                    paginate: {
                        next: '<i class="fa fa-angle-right"></i>',
                        previous: '<i class="fa fa-angle-left"></i>'
                    }
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
        };

        const refreshTableInternal = async () => {
            const success = await fetchNampan();
            if (!success) return;

            await nextTick(); // tunggu DOM render

            dataTableInstance.clear();
            nampanState.value.forEach(role => {
                dataTableInstance.row.add(role);
            });
            dataTableInstance.draw();
        };

        // Fungsi yang dipanggil saat klik tombol refresh
        const refreshTable = async () => {
            await refreshTableInternal();
            toast("Data berhasil direfresh!", "success");
        };

        // FUNCTION TAMBAH NAMPAN //
        const openModalAdd = () => {
            const modalEl = tambahModal.value;
            fetchJenis(); // pastikan jenis produk sudah terisi sebelum modal dibuka
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl, {
                    backdrop: 'static',
                    keyboard: false
                });
                modal.show();
            }
        };

        const closeBaki = () => {
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
            form.baki = "";
            form.JenisSelect = "";

            // Reset error edit (langsung reassign biar reactive jalan)
            Object.assign(errors, {
                baki: "",
                JenisSelect: "",
            });
        };

        const validateForm = () => {
            errors.baki = form.baki.trim() ? "" : "Nama wajib diisi!";
            errors.JenisSelect = form.JenisSelect ? "" : "Jenis Produk wajib dipilih!";

            return !errors.baki && !errors.JenisSelect;
        };

        // SUBMIT DATA BAKI
        const submitBaki = async () => {
            if (!validateForm()) {
                toast("Mohon lengkapi data!", "error");
                return;
            }
            try {
                const fd = new FormData();
                fd.append('nampan', form.baki);
                fd.append('jenis', parseInt(form.JenisSelect));

                const response = await axios.post('/nampan/storeNampan', fd);

                toast(response.data.message || "Nampan berhasil disimpan!", "success");
                closeBaki();
                await refreshTableInternal();

            } catch (error) {
                const serverErrors = error.response?.data?.errors;
                if (serverErrors) {
                    Object.keys(errors).forEach(key => {
                        errors[key] = serverErrors[key]?.[0] || "";
                    });
                    let errorList = "<ul style='text-align:left;'>";
                    for (let key in serverErrors) {
                        errorList += `<li>${serverErrors[key][0]}</li>`;
                    }
                    errorList += "</ul>";
                    toast(errorList, "error");
                } else {
                    toast(error.response?.data?.message || "Gagal menyimpan nampan", "error");
                }
            }
        };

        onMounted(async () => {
            await fetchNampan();
            initTable();
            initTooltips();
            feather.replace();
        });

        return {
            nampanState,
            jenisList,
            form,
            errors,
            refreshTable,

            tambahModal,
            openModalAdd,
            closeBaki,
            submitBaki,
        };
    }
}
</script>