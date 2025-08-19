<template>
    <div>
        <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="add-item d-flex">
                        <div class="page-title">
                            <h4>HALAMAN JENIS PRODUK</h4>
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
                            Jenis
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
                            <table class="table datanew text-nowrap table-hover" id="JenisProdukTable">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Jenis Produk</th>
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
                                        <b>TAMBAH JENIS PRODUK</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeJenisProduk">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitJenisProduk">
                                    <div class="mb-3">
                                        <label class="form-label">JENIS PRODUK</label>
                                        <input type="text" v-model="form.jenis" class="form-control" />
                                    </div>
                                    <div class="add-choosen">
                                        <div class="mb-3">
                                            <label class="form-label">ICON</label>
                                            <div class="image-upload ">
                                                <input type="file" name="imagejenisproduk" id="imageJenisProduk"
                                                    @change="handleIconChange">
                                                <div class="image-uploads">
                                                    <i data-feather="upload" class="plus-down-add me-0"></i>
                                                    <h4>UPLOAD ICON</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="phone-img"
                                            style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                            <div id="imageJenisProdukPreview" alt="previewImage"
                                                style="width: 150px; height: 150px; display: block; overflow: hidden;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeJenisProduk">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN JENIS PRODUK
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
                                        <b>EDIT JENIS PRODUK</b>
                                    </h4>
                                </div>
                                <button type="button" class="close text-white" @click="closeEditJenisProduk">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body custom-modal-body">
                                <form @submit.prevent="submitEditJenisProduk">
                                    <div class="mb-3">
                                        <label class="form-label">JENIS PRODUK</label>
                                        <input type="text" v-model="form.editJenis" class="form-control" />
                                    </div>
                                    <div class="add-choosen">
                                        <div class="mb-3">
                                            <label class="form-label">ICON</label>
                                            <div class="image-upload ">
                                                <input type="file" name="imagejenisproduk" id="imageJenisProduk"
                                                    @change="handleEditIconChange">
                                                <div class="image-uploads">
                                                    <i data-feather="upload" class="plus-down-add me-0"></i>
                                                    <h4>UPLOAD ICON</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="phone-img"
                                            style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                            <div id="imageEditJenisProdukPreview" alt="previewImage"
                                                style="width: 150px; height: 150px; display: block; overflow: hidden;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer-btn">
                                        <button type="button" class="btn btn-cancel btn-warning me-2"
                                            @click="closeEditJenisProduk">
                                            CANCEL
                                        </button>
                                        <button type="submit" class="btn btn-submit btn-secondary">
                                            SIMPAN JENIS PRODUK
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
import { uploadImage } from "../utilities/uploadImage.js";
import axios from "../utilities/axios.js";
export default {
    name: "JenisProduk",
    setup() {
        const { appContext } = getCurrentInstance();
        const toast = appContext.config.globalProperties.$toast;

        const tableSelector = "#JenisProdukTable";
        const tambahModal = ref(null);
        const editModal = ref(null);

        const jenisprodukState = ref([]);
        const form = reactive({
            jenis: "",
            editJenis: "",
            iconFile: null,
            editIconFile: null
        });

        let dataTableInstance = null;
        let iconUploader = null;

        //FETCH DATA ROLE
        const fetchJenisProduk = async () => {
            try {
                const response = await axios.get('/jenisproduk/getJenisProduk');
                jenisprodukState.value = response.data.Data;
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
                    data: jenisprodukState.value, // bind data awal
                    columns: [
                        {
                            data: null,
                            render: (data, type, row, meta) => meta.row + 1 // nomor urut
                        },
                        {
                            data: "image_jenis_produk", // Nama field dari API
                            render: function (data, type, row) {
                                let timestamp = new Date().getTime(); // Gunakan timestamp untuk cache busting
                                return `
                                    <div class="d-flex align-items-center">
                                        <a href="javascript:void(0);" class="avatar avatar-sm me-2">
                                            <img src="/storage/icon/${data}?t=${timestamp}" alt="user">
                                        </a>
                                        <a href="javascript:void(0);">${row.jenis_produk}</a>
                                    </div>
                                `;
                            },
                            orderable: false,
                            searchable: false
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
            const success = await fetchJenisProduk();
            if (!success) return;

            await nextTick(); // tunggu DOM render

            dataTableInstance.clear();
            jenisprodukState.value.forEach(jenisproduk => {
                dataTableInstance.row.add(jenisproduk);
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

        const closeJenisProduk = () => {
            const modalEl = tambahModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                if (iconUploader) {
                    iconUploader.clearPreview();
                }
                modal.hide();
            }
            form.jenis = "";
            form.iconFile = null;
        };

        // Submit data pegawai
        const submitJenisProduk = async () => {
            if (!form.jenis.trim()) {
                toast("Jenis wajib diisi!", "error");
                return;
            }
            try {
                const fd = new FormData();
                fd.append('jenisproduk', form.jenis);
                if (form.iconFile) fd.append('imagejenisproduk', form.iconFile);

                const response = await axios.post('/jenisproduk/storeJenisProduk', fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                toast(response.data.message || "Jenis Produk berhasil disimpan!", "success");
                closeJenisProduk();
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
                    toast(error.response?.data?.message || "Gagal menyimpan jenis produk", "error");
                }
            }
        };

        function handleIconChange(event) {
            const file = event.target.files[0];
            form.iconFile = file || null;
        }

        //FUNCTION EDIT //
        const openModalEdit = (jenis) => {
            form.id = jenis.id; // simpan ID untuk update
            form.editJenis = jenis.jenis_produk;

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
                // Tampilkan gambar lama di preview
                const previewDiv = document.getElementById('imageEditJenisProdukPreview');
                if (previewDiv) {
                    let timestamp = new Date().getTime();
                    let imageUrl = "";

                    if (jenis.image_jenis_produk) {
                        imageUrl = `/storage/icon/${jenis.image_jenis_produk}?t=${timestamp}`;
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
            const jenis = jenisprodukState.value.find(p => p.id == id);
            if (!jenis) return;
            openModalEdit(jenis);
        }

        function bindEditClick() {
            const tableEl = document.querySelector(tableSelector);
            if (tableEl) {
                tableEl.addEventListener("click", handleEditClick);
            }
        }

        const closeEditJenisProduk = () => {
            const modalEl = editModal.value;
            if (modalEl) {
                const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.hide();
            }
            form.id = null;
            form.editJenis = "";
            form.editIconFile = null;
        };

        function handleEditIconChange(event) {
            const file = event.target.files[0];
            form.editIconFile = file || null;

            // Update preview
            const previewDiv = document.getElementById('imageEditJenisProdukPreview');
            if (previewDiv && file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewDiv.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;" />`;
                };
                reader.readAsDataURL(file);
            }
        }

        const submitEditJenisProduk = async () => {
            // Validasi sesuai kebutuhan
            if (!form.editJenis.trim()) {
                toast("Jenis wajib diisi!", "error");
                return;
            }

            try {
                const fd = new FormData();
                fd.append('id', form.id);
                fd.append('jenisproduk', form.editJenis);
                if (form.editIconFile) fd.append('imagejenisproduk', form.editIconFile);

                // KODE YANG BENAR UNTUK ENDPOINT DENGAN PARAMETER ID
                const response = await axios.post(`/jenisproduk/updateJenisProduk/${form.id}`, fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                toast(response.data.message || "Jenis Produk berhasil diupdate!", "success");
                closeEditJenisProduk();
                await refreshTableInternal();

            } catch (error) {
                toast(error.response?.data?.message || "Gagal update jenis produk", "error");
            }
        };

        // FUNCTION DELETE //
        function handleDeleteClick(e) {
            const btn = e.target.closest(".btn-delete");
            if (!btn) return; // kalau bukan tombol delete, abaikan

            const id = btn.dataset.id;
            const jenis = jenisprodukState.value.find(j => j.id == id);
            if (!jenis) return;

            Swal.fire({
                title: "Are you sure?",
                text: `Jenis "${jenis.jenis}" akan dihapus!`,
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
                        await axios.delete(`/jenisproduk/deleteJenisProduk/${jenis.id}`);

                        // refresh table setelah hapus
                        await refreshTableInternal();

                        toast("Jenis berhasil dihapus!", "success");
                    } catch (err) {
                        toast("Jenis gagal dihapus!", "error");
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

        onMounted(async () => {
            await fetchJenisProduk();
            await initTable();
            feather.replace();
            initTooltips();
            bindEditClick();
            bindDeleteClick();
            iconUploader = uploadImage("imageJenisProduk", "imageJenisProdukPreview");
        });

        onBeforeUnmount(() => {
            if (dataTableInstance) dataTableInstance.destroy();
        });

        return {
            form,
            tambahModal,
            openModalAdd,
            closeJenisProduk,
            handleIconChange,
            submitJenisProduk,
            editModal,
            openModalEdit,
            closeEditJenisProduk,
            handleEditIconChange,
            submitEditJenisProduk,
            jenisprodukState,
            refreshTable
        };
    }
}
</script>