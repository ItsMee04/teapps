<template lang="">
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN PEGAWAI</h4>
                        </div>
                    </div>
                    <ul class="table-top-head">
                        <li>
                            <a data-bs-toggle="tooltip" @click="refreshTable" data-bs-placement="top" title="Refresh">
                                <i data-feather="rotate-ccw" class="feather-rotate-ccw"></i>
                            </a>
                        </li>
                        <li>
                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header">
                                <i data-feather="chevron-up" class="feather-chevron-up"></i>
                            </a>
                        </li>
                    </ul>
                    <div class="page-btn import">
                        <a href="#" class="btn btn-added color" @click="openModalAdd()">
                            <i data-feather="plus" class="me-2"></i> Tambah Pegawai
                        </a>
                    </div>
                </div>

                <div class="card table-list-card">
                    <div class="card-body">
                        <div class="table-top">
                            <div class="search-set">
                                <div class="search-input">
                                    <a
                                        href="javascript:void(0);"
                                        class="btn btn-searchset"
                                    ></a>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive product-list">
                            <table class="table datanew text-nowrap table-hover" id="PegawaiTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>NIP</th>
                                        <th>Nama</th>
                                        <th>Jabatan</th>
                                        <th>Status</th>
                                        <th class="no-sort">Action</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
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
                                        <b>TAMBAH PEGAWAI</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closePegawai">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitPegawai">
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">NIP<span class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.nip" class="form-control"/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">NAMA<span class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.nama" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">ALAMAT<span class="text-danger ms-1">*</span></label>
                                        <textarea v-model="form.alamat" class="form-control" cols="30" rows="4"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">KONTAK<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.kontak" class="form-control"/>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">JABATAN<span class="text-danger ms-1">*</span></label>
                                        <select class="select" id="jabatan" v-model="form.jabatanSelect">
                                            <option value="">Pilih Jabatan</option>
                                            <option v-for="jabatan in jabatanList" :key="jabatan.id" :value="jabatan.id">
                                                {{ jabatan.jabatan }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="add-choosen">
                                        <div class="mb-3">
                                            <label class="form-label">AVATAR</label>
                                            <div class="image-upload">
                                                <input type="file" name="imagePegawai" id="imagePegawai"/>
                                                <div class="image-uploads">
                                                    <i data-feather="upload" class="plus-down-add me-0"></i>
                                                    <h4>UPLOAD AVATAR</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="phone-img" style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                            <div id="imagePegawaiPreview" alt="previewImage" style="width: 150px; height: 150px; display: block; overflow: hidden;"></div>
                                        </div>
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2" @click="closePegawai">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN PEGAWAI
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
import { getCurrentInstance, ref, reactive, onMounted, onBeforeUnmount, nextTick, onUpdated, } from "vue";
import { initTooltips } from "../utilities/tooltip";
import { initSelect2, destrySelect2 } from "../utilities/select.js";
import { uploadImage } from "../utilities/uploadImage.js";
import axios from "../utilities/axios.js";

export default {
    name: "Pegawai",
    setup() {
        const { appContext } = getCurrentInstance(); // ambil global properties
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#PegawaiTable";
        const tambahModal = ref(null);

        const pegawaiState = ref([]);
        const jabatanList = ref([]);
        const form = reactive({
            nip: "",
            nama: "",
            alamat: "",
            kontak: "",
            jabatanSelect: "",
            imagePegawai: null,
        });

        let dataTableInstance = null;
        let imageUploader = null;

        const fetchJabatan = async () => {
            try {
                const res = await axios.get("/jabatan/getJabatan"); // ganti dengan endpoint kamu
                jabatanList.value = res.data.Data; // misal [{id:1, jabatan:"Manager"}, ...]
                await nextTick(); // tunggu DOM update option
                initSelect2("#jabatan", { placeholder: "Pilih Jabatan", allowClear: true });
            } catch (err) {
                console.error("Gagal load jabatan:", err);
            }
        };

        //FETCH DATA PEGAWAI
        const fetchPegawais = async () => {
            try {
                const response = await axios.get('/pegawai/getPegawai');
                pegawaiState.value = response.data.Data;
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
                    data: pegawaiState.value, // bind data awal
                    columns: [
                        {
                            data: null,
                            render: (data, type, row, meta) => meta.row + 1 // nomor urut
                        },
                        { data: 'nip' },
                        { data: 'nama' },
                        { data: 'jabatan.jabatan' },
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
            const success = await fetchPegawais();
            if (!success) return;

            await nextTick(); // tunggu DOM render

            dataTableInstance.clear();
            pegawaiState.value.forEach(pegawai => {
                dataTableInstance.row.add(pegawai);
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

        const closePegawai = () => {
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

                if (imageUploader) {
                    imageUploader.clearPreview();
                }
                modal.hide();
            }
            form.nip = "";
            form.nama = "";
            form.alamat = "";
            form.kontak = "";
            form.jabatanSelect = "";
            form.imagePegawai = null;

            $('#jabatan').val("").trigger("change");
        };

        onMounted(async () => {
            await fetchPegawais();
            await initTable();
            feather.replace();
            initTooltips();
            fetchJabatan();

            imageUploader = uploadImage("imagePegawai", "imagePegawaiPreview");
        });

        return {
            tambahModal,
            openModalAdd,
            closePegawai,
            refreshTable,
            form,
            jabatanList,
            pegawaiState
        };
    },
};
</script>
