<template>
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN PRODUK</h4>
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
                            <i data-feather="plus" class="me-2"></i> Tambah Produk
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
                            <table class="table datanew text-nowrap table-hover" id="ProdukTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Kode Produk</th>
                                        <th>Nama</th>
                                        <th>Berat</th>
                                        <th>Karat</th>
                                        <th>Harga @Gram</th>
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
                                        <b>TAMBAH PRODUK</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeProduk">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitProduk">
                                    <div class="mb-3">
                                        <label class="form-label">NAMA<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.nama" class="form-control" />
                                        <div v-if="errors.nama" class="text-danger small">{{ errors.nama }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">JENIS<span
                                                    class="text-danger ms-1">*</span></label>
                                            <select class="select" id="jenis" v-model="form.jenisSelect">
                                                <option value="">Pilih Jenis Produk</option>
                                                <option v-for="jenis in jenisList" :key="jenis.id" :value="jenis.id">
                                                    {{ jenis.jenis_produk }}
                                                </option>
                                            </select>
                                            <div v-if="errors.jenisSelect" class="text-danger small">{{
                                                errors.jenisSelect }}</div>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">KONDISI<span
                                                    class="text-danger ms-1">*</span></label>
                                            <select class="select" id="kondisi" v-model="form.kondisiSelect">
                                                <option value="">Pilih Kondisi Produk</option>
                                                <option v-for="kondisi in kondisiList" :key="kondisi.id"
                                                    :value="kondisi.id">
                                                    {{ kondisi.kondisi }}
                                                </option>
                                            </select>
                                            <div v-if="errors.kondisiSelect" class="text-danger small">{{
                                                errors.kondisiSelect }}</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">BERAT<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.berat" class="form-control" />
                                            <div v-if="errors.berat" class="text-danger small">{{ errors.berat }}
                                            </div>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">KARAT<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.karat" class="form-control" />
                                            <div v-if="errors.karat" class="text-danger small">{{ errors.karat }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">LINGKAR<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.lingkar" class="form-control" />
                                            <div v-if="errors.lingkar" class="text-danger small">{{ errors.lingkar }}
                                            </div>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">PANJANG<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.panjang" class="form-control" />
                                            <div v-if="errors.panjang" class="text-danger small">{{ errors.panjang }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">HARGA JUAL<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.hargajual" class="form-control" />
                                            <div v-if="errors.hargajual" class="text-danger small">{{ errors.hargajual
                                            }}
                                            </div>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">HARGA BELI<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.hargabeli" class="form-control" />
                                            <div v-if="errors.hargabeli" class="text-danger small">{{ errors.hargabeli
                                            }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">KETERANGAN<span
                                                class="text-danger ms-1">*</span></label>
                                        <textarea v-model="form.keterangan" class="form-control" cols="30"
                                            rows="4"></textarea>
                                        <div v-if="errors.keterangan" class="text-danger small">{{ errors.keterangan }}
                                        </div>
                                    </div>
                                    <div class="add-choosen">
                                        <div class="mb-3">
                                            <label class="form-label">IMAGE PRODUK</label>
                                            <div class="image-upload">
                                                <input type="file" name="imageProduk" id="imageProduk"
                                                    @change="handleImageProdukChange" />
                                                <div class="image-uploads">
                                                    <i data-feather="upload" class="plus-down-add me-0"></i>
                                                    <h4>UPLOAD IAMGE</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="phone-img"
                                            style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                            <div id="imageProdukPreview" alt="previewImage"
                                                style="width: 150px; height: 150px; display: block; overflow: hidden;">
                                            </div>
                                        </div>
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

        <div class="modal fade" ref="editModal">
            <div class="modal-dialog modal-dialog-centered custom-modal-two">
                <div class="modal-content">
                    <div class="page-wrapper-new p-0">
                        <div class="content">
                            <div class="modal-header border-0 custom-modal-header bg-secondary">
                                <div class="page-title">
                                    <h4 class="text-white">
                                        <b>EDIT PRODUK</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeEditProduk">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitEditProduk">
                                    <div class="mb-3">
                                        <label class="form-label">NAMA<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="form.editNama" class="form-control" />
                                        <div v-if="errors.editNama" class="text-danger small">{{ errors.editNama }}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">JENIS<span
                                                    class="text-danger ms-1">*</span></label>
                                            <select class="select" id="editJenis" v-model="form.editJenisSelect">
                                                <option value="">Pilih Jenis Produk</option>
                                                <option v-for="jenis in jenisList" :key="jenis.id" :value="jenis.id">
                                                    {{ jenis.jenis_produk }}
                                                </option>
                                            </select>
                                            <div v-if="errors.editJenisSelect" class="text-danger small">{{
                                                errors.editJenisSelect }}</div>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">KONDISI<span
                                                    class="text-danger ms-1">*</span></label>
                                            <select class="select" id="editKondisi" v-model="form.editKondisiSelect">
                                                <option value="">Pilih Kondisi Produk</option>
                                                <option v-for="kondisi in kondisiList" :key="kondisi.id"
                                                    :value="kondisi.id">
                                                    {{ kondisi.kondisi }}
                                                </option>
                                            </select>
                                            <div v-if="errors.editKondisiSelect" class="text-danger small">{{
                                                errors.editKondisiSelect }}</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">BERAT<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.editBerat" class="form-control" />
                                            <div v-if="errors.editBerat" class="text-danger small">{{ errors.editBerat
                                            }}
                                            </div>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">KARAT<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.editKarat" class="form-control" />
                                            <div v-if="errors.editKarat" class="text-danger small">{{ errors.editKarat
                                            }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">LINGKAR<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.editLingkar" class="form-control" />
                                            <div v-if="errors.editLingkar" class="text-danger small">{{
                                                errors.editLingkar }}
                                            </div>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">PANJANG<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.editPanjang" class="form-control" />
                                            <div v-if="errors.editPanjang" class="text-danger small">{{
                                                errors.editPanjang }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">HARGA JUAL<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.editHargaJual" class="form-control" />
                                            <div v-if="errors.editHargaJual" class="text-danger small">{{
                                                errors.editHargaJual
                                            }}
                                            </div>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">HARGA BELI<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.editHargaBeli" class="form-control" />
                                            <div v-if="errors.editHargaBeli" class="text-danger small">{{
                                                errors.editHargaBeli
                                            }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">KETERANGAN<span
                                                class="text-danger ms-1">*</span></label>
                                        <textarea v-model="form.editKeterangan" class="form-control" cols="30"
                                            rows="4"></textarea>
                                        <div v-if="errors.editKeterangan" class="text-danger small">{{
                                            errors.editKeterangan }}
                                        </div>
                                    </div>
                                    <div class="add-choosen">
                                        <div class="mb-3">
                                            <label class="form-label">IMAGE PRODUK</label>
                                            <div class="image-upload">
                                                <input type="file" name="imageProduk" id="EditImageProduk"
                                                    @change="handleEditImageProdukChange" />
                                                <div class="image-uploads">
                                                    <i data-feather="upload" class="plus-down-add me-0"></i>
                                                    <h4>UPLOAD IAMGE</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="phone-img"
                                            style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                            <div id="imageEditProdukPreview" alt="previewImage"
                                                style="width: 150px; height: 150px; display: block; overflow: hidden;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeEditProduk">
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
import { getCurrentInstance, ref, reactive, onMounted, onBeforeUnmount, nextTick, onUpdated, } from "vue";
import { initTooltips } from "../utilities/tooltip";
import { initSelect2 } from "../utilities/select.js";
import { uploadImage } from "../utilities/uploadImage.js";
import axios from "../utilities/axios.js";
export default {
    name: 'Produk',
    setup() {
        const { appContext } = getCurrentInstance(); // ambil global properties
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#ProdukTable";
        const tambahModal = ref(null);
        const editModal = ref(null);

        const produkState = ref([]);
        const jenisList = ref([]);
        const kondisiList = ref([]);

        const form = reactive({
            nama: "",
            jenisSelect: "",
            kondisiSelect: "",
            berat: "",
            karat: "",
            lingkar: "",
            panjang: "",
            hargajual: "",
            hargabeli: "",
            keterangan: "",
            imageProduk: null,

            editNama: "",
            editJenisSelect: "",
            editKondisiSelect: "",
            editBerat: "",
            editKarat: "",
            editLingkar: "",
            editPanjang: "",
            editHargaJual: "",
            editHargaBeli: "",
            editKeterangan: "",
            editImageProduk: null,
        });

        const errors = reactive({
            nama: "",
            jenisSelect: "",
            kondisiSelect: "",
            berat: "",
            karat: "",
            lingkar: "",
            panjang: "",
            hargajual: "",
            hargabeli: "",
            keterangan: "",
            imageProduk: null,

            editNama: "",
            editJenisSelect: "",
            editKondisiSelect: "",
            editBerat: "",
            editKarat: "",
            editLingkar: "",
            editPanjang: "",
            editHargaJual: "",
            editHargaBeli: "",
            editKeterangan: "",
            editImageProduk: null,
        });

        let dataTableInstance = null;
        let imageUploader = null;

        const fetchJenis = async () => {
            try {
                const res = await axios.get("/jenisproduk/getJenisProduk"); // ganti dengan endpoint kamu
                jenisList.value = res.data.Data; // misal [{id:1, jabatan:"Manager"}, ...]
                await nextTick(); // tunggu DOM update option
                initSelect2("#jenis", { placeholder: "Pilih jenis Produk", allowClear: true });

                // Tambahkan event agar v-model sinkron dengan Select2
                $('#jenis').on('change', function () {
                    form.jenisSelect = $(this).val();
                });
            } catch (err) {
                console.error("Gagal load jenis:", err);
            }
        };

        const fetchKondisi = async () => {
            try {
                const res = await axios.get("/kondisi/getKondisi"); // ganti dengan endpoint kamu
                kondisiList.value = res.data.Data; // misal [{id:1, jabatan:"Manager"}, ...]
                await nextTick(); // tunggu DOM update option
                initSelect2("#kondisi", { placeholder: "Pilih Kondisi Produk", allowClear: true });

                // Tambahkan event agar v-model sinkron dengan Select2
                $('#kondisi').on('change', function () {
                    form.kondisiSelect = $(this).val();
                });
            } catch (err) {
                console.error("Gagal load kondisi:", err);
            }
        };

        //FETCH DATA PRODUK
        const fetchProduk = async () => {
            try {
                const response = await axios.get('/produk/getProduk');
                produkState.value = response.data.Data;
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
                data: produkState.value, // bind data awal
                columns: [
                    {
                        data: null,
                        render: (data, type, row, meta) => meta.row + 1 // nomor urut
                    },
                    { data: 'kodeproduk' },
                    { data: 'nama' },
                    {
                        data: "berat",
                        render: (data) => `${parseFloat(data).toFixed(1)} gram`
                    },
                    { data: 'karat' },
                    {
                        data: "harga_jual",
                        render: (data) =>
                            new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0
                            }).format(data)
                    },
                    {
                        data: 'status',
                        render: (data) => {
                            if (data == 1) {
                                return `<span class="badge bg-success fw-medium fs-10"><b>IN STOCK</b></span>`;
                            } else if (data == 2) {
                                return `<span class="badge bg-danger fw-medium fs-10"><b>SOLD</b></span>`;
                            } else {
                                return `<span class="badge bg-secondary fw-medium fs-10"><b>TIDAK AKTIF</b></span>`;
                            }
                        }
                    },
                    {
                        data: null,
                        orderable: false,
                        className: "action-table-data",
                        render: (data, type, row) => `
                            <div class="edit-delete-action">
                                <a class="me-2 edit-icon p-2 btn-detail" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                    <i data-feather="eye" class="action-eye"></i>
                                </a>
                                <a class="me-2 p-2 btn-edit" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit">
                                    <i data-feather="edit" class="feather-edit"></i>
                                </a>
                                <a class="btn-delete p-2" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Delete">
                                    <i data-feather="trash-2" class="feather-trash-2"></i>
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
            const success = await fetchProduk();
            if (!success) return;

            await nextTick(); // tunggu DOM render

            dataTableInstance.clear();
            produkState.value.forEach(produk => {
                dataTableInstance.row.add(produk);
            });
            dataTableInstance.draw();
        };

        // Fungsi yang dipanggil saat klik tombol refresh
        const refreshTable = async () => {
            await refreshTableInternal();
            toast("Data berhasil direfresh!", "success");
        };

        // FUNCTION TAMBAH PRODUK //
        const openModalAdd = () => {
            const modalEl = tambahModal.value;
            fetchJenis();
            fetchKondisi();
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

                if (imageUploader) {
                    imageUploader.clearPreview();
                }
                modal.hide();
            }
            form.nama = "";
            form.jenisSelect = "";
            form.kondisiSelect = "";
            form.berat = "";
            form.karat = "";
            form.lingkar = "";
            form.panjang = "";
            form.hargajual = "";
            form.hargabeli = "";
            form.keterangan = "";
            form.imageProduk = null;

            $('#jenis').val("").trigger("change");
            $('#kondisi').val("").trigger("change");
        };

        const validateForm = () => {
            const numberRegex = /^\d+(\.\d+)?$/; // hanya angka bulat atau desimal dengan titik

            errors.nama = form.nama.trim() ? "" : "Nama wajib diisi!";
            errors.jenisSelect = form.jenisSelect ? "" : "Jenis Produk wajib dipilih!";
            errors.kondisiSelect = form.kondisiSelect ? "" : "Kondisi wajib dipilih!";

            // Validasi berat
            if (!form.berat.trim()) {
                errors.berat = "Berat wajib diisi!";
            } else if (!numberRegex.test(form.berat.trim())) {
                errors.berat = "Berat harus berupa angka, gunakan '.' untuk desimal!";
            } else {
                errors.berat = "";
            }

            errors.karat = form.karat.trim() ? "" : "Karat wajib diisi!";
            errors.lingkar = form.lingkar.trim() ? "" : "Lingkar wajib diisi!";
            errors.panjang = form.panjang.trim() ? "" : "Panjang wajib diisi!";

            // Validasi harga jual
            if (!form.hargajual.trim()) {
                errors.hargajual = "Harga jual wajib diisi!";
            } else if (!/^\d+$/.test(form.hargajual.trim())) {
                errors.hargajual = "Harga jual harus berupa angka!";
            } else {
                errors.hargajual = "";
            }

            // Validasi harga beli
            if (!form.hargabeli.trim()) {
                errors.hargabeli = "Harga beli wajib diisi!";
            } else if (!/^\d+$/.test(form.hargabeli.trim())) {
                errors.hargabeli = "Harga beli harus berupa angka bulat (tanpa titik/koma)!";
            } else {
                errors.hargabeli = "";
            }

            return !errors.nama && !errors.jenisSelect && !errors.kondisiSelect &&
                !errors.berat && !errors.karat && !errors.lingkar &&
                !errors.panjang && !errors.hargajual && !errors.hargabeli;
        };

        function handleImageProdukChange(event) {
            const file = event.target.files[0];
            form.imageProduk = file || null;
        }

        // SUBMIT DATA PRODUK
        const submitProduk = async () => {
            if (!validateForm()) {
                toast("Mohon lengkapi data!", "error");
                return;
            }
            try {
                const fd = new FormData();
                fd.append('nama', form.nama);
                fd.append('jenis', parseInt(form.jenisSelect));
                fd.append('kondisi', parseInt(form.kondisiSelect));

                // Convert berat: kalau integer → ubah jadi "x.0", kalau desimal → tetap
                let beratValue = form.berat.trim();
                if (beratValue && !beratValue.includes('.')) {
                    beratValue = beratValue + ".0";
                }
                fd.append('berat', beratValue);

                fd.append('karat', form.karat);
                fd.append('lingkar', form.lingkar);
                fd.append('panjang', form.panjang);
                fd.append('hargajual', form.hargajual);
                fd.append('hargabeli', form.hargabeli);
                fd.append('keterangan', form.keterangan);
                if (form.imageProduk) fd.append('imageProduk', form.imageProduk);

                const response = await axios.post('/produk/storeProduk', fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                toast(response.data.message || "Produk berhasil disimpan!", "success");
                closeProduk();
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
                    toast(error.response?.data?.message || "Gagal menyimpan produk", "error");
                }
            }
        };

        const openModalEdit = (produk) => {
            fetchJenis();
            fetchKondisi();
            form.id = produk.id;
            form.editNama = produk.nama;
            form.editJenisSelect = produk.jenisproduk.id;
            form.editKondisiSelect = produk.kondisi.id;
            form.editBerat = produk.berat;
            form.editKarat = produk.karat;
            form.editLingkar = produk.lingkar;
            form.editPanjang = produk.panjang;
            form.editHargaJual = produk.harga_jual;
            form.editHargaBeli = produk.harga_beli;
            form.editKeterangan = produk.keterangan;
            form.editImageProduk = null;

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
                initSelect2("#editJenis", { placeholder: "Pilih Jenis Produk", allowClear: true });
                $('#editJenis').val(form.editJenisSelect).trigger('change');
                $('#editJenis').on('change', function () {
                    form.editJenisSelect = $(this).val();
                });

                initSelect2("#editKondisi", { placeholder: "Pilih Kondisi Produk", allowClear: true });
                $('#editKondisi').val(form.editKondisiSelect).trigger('change');
                $('#editKondisi').on('change', function () {
                    form.editKondisiSelect = $(this).val();
                });
                // Tampilkan gambar lama di preview
                const previewDiv = document.getElementById('imageEditProdukPreview');
                if (previewDiv) {
                    let timestamp = new Date().getTime();
                    let imageUrl = "";

                    if (produk.image_produk) {
                        imageUrl = `/storage/produk/${produk.image_produk}?t=${timestamp}`;
                    } else {
                        // 👇 fallback ke default avatar
                        imageUrl = "defaultavatarman.png";
                    }

                    previewDiv.innerHTML = `
                        <img src="${imageUrl}" style="width:100%;height:100%;object-fit:cover;" />
                    `;
                }

            });
        };

        function handleEditClick(e) {
            const btn = e.target.closest(".btn-edit");
            if (!btn) return;
            const id = btn.dataset.id;
            const produk = produkState.value.find(p => p.id == id);
            if (!produk) return;
            openModalEdit(produk);
        }

        function bindEditClick() {
            const tableEl = document.querySelector(tableSelector);
            if (tableEl) {
                tableEl.addEventListener("click", handleEditClick);
            }
        }

        function handleEditImageProdukChange(event) {
            const file = event.target.files[0];
            form.editImageProduk = file || null;

            // Update preview
            const previewDiv = document.getElementById('imageEditProdukPreview');
            if (previewDiv && file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewDiv.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;" />`;
                };
                reader.readAsDataURL(file);
            }
        }

        const closeEditProduk = () => {
            const modalEl = editModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
            form.id = null;
            form.editNama = "";
            form.editJenisSelect = "";
            form.editKondisiSelect = "";
            form.editBerat = "";
            form.editKarat = "";
            form.editLingkar = "";
            form.editPanjang = "";
            form.editHargaJual = "";
            form.editHargaBeli = "";
            form.editKeterangan = "";
            form.editImageProduk = null;

            // Reset error edit (langsung reassign biar reactive jalan)
            Object.assign(errors, {
                editNama: "",
                editJenisSelect: "",
                editKondisiSelect: "",
                editBerat: "",
                editKarat: "",
                editLingkar: "",
                editPanjang: "",
                editHargaJual: "",
                editHargaBeli: ""
            });
        };

        const validateEditForm = () => {
            const decimalRegex = /^\d+(\.\d+)?$/; // angka bulat atau desimal
            const integerRegex = /^\d+$/; // hanya angka bulat

            errors.editNama = form.editNama?.toString().trim() ? "" : "Nama wajib diisi!";
            errors.editJenisSelect = form.editJenisSelect ? "" : "Jenis Produk wajib dipilih!";
            errors.editKondisiSelect = form.editKondisiSelect ? "" : "Kondisi wajib dipilih!";

            // Validasi berat (boleh desimal)
            if (!form.editBerat?.toString().trim()) {
                errors.editBerat = "Berat wajib diisi!";
            } else if (!decimalRegex.test(form.editBerat.toString().trim())) {
                errors.editBerat = "Berat harus berupa angka (gunakan '.' untuk desimal)!";
            } else {
                errors.editBerat = "";
            }

            // Validasi karat (hanya integer)
            if (!form.editKarat?.toString().trim()) {
                errors.editKarat = "Karat wajib diisi!";
            } else if (!integerRegex.test(form.editKarat.toString().trim())) {
                errors.editKarat = "Karat harus berupa angka bulat!";
            } else {
                errors.editKarat = "";
            }

            errors.editLingkar = form.editLingkar?.toString().trim() ? "" : "Lingkar wajib diisi!";
            errors.editPanjang = form.editPanjang?.toString().trim() ? "" : "Panjang wajib diisi!";

            // Validasi harga jual
            if (!form.editHargaJual?.toString().trim()) {
                errors.editHargaJual = "Harga jual wajib diisi!";
            } else if (!integerRegex.test(form.editHargaJual.toString().trim())) {
                errors.editHargaJual = "Harga jual harus berupa angka bulat!";
            } else {
                errors.editHargaJual = "";
            }

            // Validasi harga beli
            if (!form.editHargaBeli?.toString().trim()) {
                errors.editHargaBeli = "Harga beli wajib diisi!";
            } else if (!integerRegex.test(form.editHargaBeli.toString().trim())) {
                errors.editHargaBeli = "Harga beli harus berupa angka bulat!";
            } else {
                errors.editHargaBeli = "";
            }

            return !errors.editNama && !errors.editJenisSelect && !errors.editKondisiSelect &&
                !errors.editBerat && !errors.editKarat && !errors.editLingkar &&
                !errors.editPanjang && !errors.editHargaJual && !errors.editHargaBeli;
        };

        const submitEditProduk = async () => {
            // Validasi sesuai kebutuhan
            if (!validateEditForm()) {
                toast("Mohon lengkapi data!", "error");
                return;
            }
            try {
                const fd = new FormData();
                fd.append('id', form.id);
                fd.append('nama', form.editNama);
                fd.append('jenis', parseInt(form.editJenisSelect));
                fd.append('kondisi', parseInt(form.editKondisiSelect));

                // Convert berat: kalau integer → ubah jadi "x.0", kalau desimal → tetap
                let beratValue = form.editBerat.trim();
                if (beratValue && !beratValue.includes('.')) {
                    beratValue = beratValue + ".0";
                }
                fd.append('berat', beratValue);

                fd.append('karat', form.editKarat);
                fd.append('lingkar', form.editLingkar);
                fd.append('panjang', form.editPanjang);
                fd.append('hargajual', form.editHargaJual);
                fd.append('hargabeli', form.editHargaBeli);
                fd.append('keterangan', form.editKeterangan);
                if (form.editImageProduk) fd.append('imageProduk', form.editImageProduk);

                const response = await axios.post(`/produk/updateProduk/${form.id}`, fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                toast(response.data.message || "Produk berhasil diupdate!", "success");
                closeEditProduk();
                await refreshTableInternal();

            } catch (error) {
                toast(error.response?.data?.message || "Gagal update produk", "error");
            }
        };

        // FUNCTION DELETE //
        function handleDeleteClick(e) {
            const btn = e.target.closest(".btn-delete");
            if (!btn) return; // kalau bukan tombol delete, abaikan

            const id = btn.dataset.id;
            const produk = produkState.value.find(j => j.id == id);
            if (!produk) return;

            Swal.fire({
                title: "Are you sure?",
                text: `Produk "${produk.nama}" akan dihapus!`,
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
                        await axios.delete(`/produk/deleteProduk/${produk.id}`);

                        // refresh table setelah hapus
                        await refreshTableInternal();

                        toast("Produk berhasil dihapus!", "success");
                    } catch (err) {
                        toast("Produk gagal dihapus!", "error");
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
            // 1. fetch produk dulu
            await fetchProduk();

            // 2. baru init table
            initTable();

            // 3. bind event edit
            bindEditClick();

            // 4. bind event delete
            bindDeleteClick();

            // 4. sisanya
            feather.replace();
            initTooltips();
            imageUploader = uploadImage("imageProduk", "imageProdukPreview");
        });

        return {
            produkState,
            jenisList,
            kondisiList,
            form,
            errors,
            refreshTable,

            tambahModal,
            openModalAdd,
            closeProduk,
            handleImageProdukChange,
            submitProduk,

            editModal,
            openModalEdit,
            closeEditProduk,
            handleEditImageProdukChange,
            submitEditProduk,
        };
    },

}
</script>