<template>
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN NAMPAN PRODUK</h4>
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
                            Produk
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
                            <table class="table datanew text-nowrap table-hover" id="NampanProdukTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Kode Produk</th>
                                        <th>Nama</th>
                                        <th>Berat</th>
                                        <th>Karat</th>
                                        <th>Harga</th>
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
            <div class="modal-dialog modal-lg modal-dialog-centered custom-modal-two">
                <div class="modal-content">
                    <div class="page-wrapper-new p-0">
                        <div class="content">
                            <div class="modal-header border-0 custom-modal-header bg-secondary">
                                <div class="page-title">
                                    <h4 class="text-white">
                                        <b>TAMBAH PRODUK</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeProduk">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitProduk">
                                    <div class="table-responsive product-list">
                                        <table id="produkTable" class="table table-hover" style="width: 100%">
                                            <thead class="thead-secondary">
                                                <tr>
                                                    <th class="no-sort">
                                                        <label class="checkboxs">
                                                            <input type="checkbox" id="select-all">
                                                            <span class="checkmarks"></span>
                                                        </label>
                                                    </th>
                                                    <th>No.</th>
                                                    <th>Kode Produk</th>
                                                    <th>Nama</th>
                                                    <th>Berat</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeProduk">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN PRODUK
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
import { usePage } from '@inertiajs/vue3'
import { initSelectAllDataTable } from "../utilities/selectall.js";
import axios from "../utilities/axios.js";
export default {
    name: "NampanProduk",
    setup() {
        const { appContext } = getCurrentInstance();
        const toast = appContext.config.globalProperties.$toast;
        const page = usePage()
        const idParam = page.props.id ?? null

        const tableSelector = "#NampanProdukTable";
        const tableSelectorProduk = "#produkTable";
        const tambahModal = ref(null);

        const nampanProdukState = ref([]);
        const ProdukState = ref([]);

        let dataTableInstance = null;
        let produkTableInstance = null;

        //FETCH DATA ROLE
        const fetchNampanProduk = async () => {
            try {
                const response = await axios.get(`/nampanproduk/getNampanProduk/${idParam}`);
                nampanProdukState.value = response.data.Data;
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
                    data: nampanProdukState.value, // bind data awal
                    columns: [
                        {
                            data: null,
                            render: (data, type, row, meta) => meta.row + 1 // nomor urut
                        },
                        { data: '' },
                        { data: '' },
                        { data: '' },
                        { data: '' },
                        {
                            data: '',
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
            const success = await fetchNampanProduk();
            if (!success) return;

            await nextTick(); // tunggu DOM render

            dataTableInstance.clear();
            nampanProdukState.value.forEach(nampanproduk => {
                dataTableInstance.row.add(nampanproduk);
            });
            dataTableInstance.draw();
        };

        // Fungsi yang dipanggil saat klik tombol refresh
        const refreshTable = async () => {
            await refreshTableInternal();
            toast("Data berhasil direfresh!", "success");
        };

        //FETCH DATA ROLE
        const fetchProduk = async () => {
            try {
                const response = await axios.get(`/nampanroduk/getProdukNampan/${idParam}`);
                ProdukState.value = response.data.Data;
                return true;
            } catch (error) {
                toast("Gagal mengambil data", "error");
                console.error(error);
                return false;
            }
        };

        // Init DataTable sekali saja
        const initTableProduk = async () => {
            await nextTick(); // tunggu DOM render
            if (!produkTableInstance) {
                produkTableInstance = $(tableSelectorProduk).DataTable({
                    data: ProdukState.value, // bind data awal
                    columns: [
                        {
                            data: 'id',
                            render: (data) => `
                                <label class="checkboxs">
                                    <input type="checkbox" name="items[]" value="${data}">
                                    <span class="checkmarks"></span>
                                </label>
                            `
                        },
                        {
                            data: null,
                            render: function (data, type, row, meta) {
                                return meta.row + 1;
                            },
                            orderable: false,
                        },
                        { data: "kodeproduk" },
                        { data: "nama" },
                        {
                            data: "berat",
                            render: function (data, type, row) {
                                return parseFloat(data).toFixed(1) + " gram"; // Menampilkan 1 angka desimal
                            }
                        },
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
                        initSelectAllDataTable("#produkTable", "#select-all");
                    }
                });
            }
        };

        // FUNCTION TAMBAH ROLE //
        const openModalAdd = async () => {
            const modalEl = tambahModal.value;

            // Tunggu fetch selesai
            const success = await fetchProduk();
            if (!success) return;

            // Jika DataTable sudah ada → refresh datanya
            if (produkTableInstance) {
                produkTableInstance.clear();
                produkTableInstance.rows.add(ProdukState.value);
                produkTableInstance.draw();
            } else {
                await initTableProduk();
            }

            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl, {
                    backdrop: 'static',
                    keyboard: false
                });
                modal.show();
            }
        };

        const closeProduk = () => {
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
        };

        onMounted(async () => {
            await fetchNampanProduk();
            initTable();
            initTooltips();
            feather.replace();
        });

        return {
            nampanProdukState,
            refreshTable,

            tambahModal,
            openModalAdd,
            closeProduk,
        };
    }
}
</script>