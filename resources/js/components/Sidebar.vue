<template>
    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <div class="sidebar-inner slimscroll">
            <div id="sidebar-menu" class="sidebar-menu">
                <ul>
                    <li class="submenu-open">
                        <h6 class="submenu-hdr">Main</h6>
                        <ul>
                            <li :class="{ 'active': currentPath === '/dashboard' }">
                                <Link href="/dashboard">
                                <i data-feather="grid"></i>
                                <span>Dashboard</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li class="submenu-open">
                        <h6 class="submenu-hdr">Master</h6>
                        <ul>
                            <li class="submenu">
                                <a href="javascript:void(0);" :class="{ 'subdrop active': isUserManagementActive }">
                                    <i data-feather="users"></i>
                                    <span>User Management</span>
                                    <span class="menu-arrow"></span>
                                </a>
                                <ul>
                                    <li>
                                        <Link href="/jabatan" :class="{ 'active': currentPath === '/jabatan' }"> Jabatan
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/role" :class="{ 'active': currentPath === '/role' }"> Role</Link>
                                    </li>
                                    <li>
                                        <Link href="/pegawai" :class="{ 'active': currentPath === '/pegawai' }"> Pegawai
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/users" :class="{ 'active': currentPath === '/users' }"> Users
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li class="submenu">
                                <a href="javascript:void(0);" :class="{ 'subdrop active': isProdukActive }">
                                    <i data-feather="archive"></i>
                                    <span>Produk</span>
                                    <span class="menu-arrow"></span>
                                </a>
                                <ul>
                                    <li>
                                        <Link href="/kondisi" :class="{ 'active': currentPath === '/kondisi' }"> Kondisi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/diskon" :class="{ 'active': currentPath === '/diskon' }"> Diskon
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/jenisproduk"
                                            :class="{ 'active': currentPath === '/jenisproduk' }"> Jenis Produk</Link>
                                    </li>
                                    <li>
                                        <Link href="/produk" :class="{ 'active': currentPath === '/produk' }"> Produk
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/nampan" :class="{ 'active': currentPath === '/nampan' || currentPath.startsWith('/nampanproduk') }" > Nampan
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/print-barcode"
                                            :class="{ 'active': currentPath === '/print-barcode' }"> Print Barcode
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/scan-barcode"
                                            :class="{ 'active': currentPath === '/scan-barcode' }"> Scan Barcode</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- /Sidebar -->
</template>

<script>
import { onMounted, onBeforeUnmount, nextTick, ref, computed, watch } from 'vue';
import initSidebar, { destroySidebarScroll } from '@/utilities/sidebar.js'
import { Link, usePage } from '@inertiajs/vue3'

export default {
    name: "Sidebar",
    components: { Link },
    setup() {
        const page = usePage();
        const currentPath = ref('');

        // Fungsi untuk mendapatkan current path dengan aman
        const getCurrentPath = () => {
            try {
                if (page && page.url && typeof page.url === 'string') {
                    return page.url;
                } else if (page && page.url && page.url.value && typeof page.url.value === 'string') {
                    return page.url.value;
                } else if (typeof window !== 'undefined' && window.location) {
                    return window.location.pathname;
                }
                return '';
            } catch (error) {
                console.warn('Error getting current path:', error);
                return '';
            }
        };

        // Set initial path
        currentPath.value = getCurrentPath();

        // Watch untuk perubahan URL
        watch(() => {
            try {
                return page.url;
            } catch (error) {
                return '';
            }
        }, (newUrl) => {
            if (newUrl) {
                currentPath.value = typeof newUrl === 'string' ? newUrl : newUrl.value || '';
            }
        }, { immediate: true });

        // Computed untuk menentukan apakah submenu User Management aktif
        const isUserManagementActive = computed(() => {
            const path = currentPath.value;
            if (!path) return false;
            return path.includes('/jabatan') ||
                path.includes('/role') ||
                path.includes('/pegawai') ||
                path.includes('/users');
        });

        // Computed untuk menentukan apakah submenu Produk aktif
        const isProdukActive = computed(() => {
            const path = currentPath.value;
            if (!path) return false;
            return path.includes('/kondisi') ||
                path.includes('/diskon') ||
                path.includes('/jenisproduk') ||
                path.includes('/produk') ||
                path.includes('/nampan') ||
                path.includes('/print-barcode') ||
                path.includes('/scan-barcode');
        });

        onMounted(() => {
            nextTick(() => {
                // Update current path saat component dimount
                currentPath.value = getCurrentPath();

                initSidebar();
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            });
        });

        onBeforeUnmount(() => {
            destroySidebarScroll();
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });

        return {
            currentPath,
            isUserManagementActive,
            isProdukActive
        };
    }
};
</script>