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

        onMounted(async () => {
            await fetchJenis();
            await fetchKondisi();
            await fetchProduk();
            await initTable();
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
        };
    },

}
</script>