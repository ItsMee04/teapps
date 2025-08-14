<template>
    <div class="page-wrapper">
        <div class="content">
            <div class="page-header">
                <div class="add-item d-flex">
                    <div class="page-title">
                        <h4>Product List</h4>
                        <h6>Manage your products</h6>
                    </div>
                </div>
                <ul class="table-top-head">
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i data-feather="rotate-ccw"
                                class="feather-rotate-ccw"></i></a>
                    </li>
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i
                                data-feather="chevron-up" class="feather-chevron-up"></i></a>
                    </li>
                </ul>
                <div class="page-btn import">
                    <a href="#" class="btn btn-added color" @click="openModalAdd()" data-bs-toggle="modal" data-bs-target="#view-notes"><i
                            data-feather="plus" class="me-2"></i> Tambah Jabatan</a>
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
                        <table class="table datanew text-nowrap table-hover" id="JabatanTable">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Jabatan</th>
                                    <th>Status</th>
                                    <th class="no-sort">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(jabatan, index) in jabatans" :key="jabatan.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ jabatan.jabatan }}</td>
                                    <td>
                                        <span class="badge" :class="jabatan.status ? 'bg-success' : 'bg-danger'">
                                            {{ jabatan.status ? 'Aktif' : 'Non-Aktif' }}
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
</template>

<script>
import { onMounted, onBeforeUnmount, nextTick, onUpdated } from 'vue';
import { initDataTable } from '@/utilities/datatable.js';
import { initTooltips } from '../utilities/tooltip';

export default {
    name: "Jabatan",
    props: {
        jabatans: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const tableSelector = '#JabatanTable';
        onMounted(() => {
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
            initTooltips();      // aktifkan tooltip
        });

        onBeforeUnmount(() => {
            feather.replace()
            initTooltips();      // aktifkan tooltip
        });
    }
}
</script>