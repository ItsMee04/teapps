<template>
    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <div class="sidebar-inner slimscroll">
            <div id="sidebar-menu" class="sidebar-menu">
                <ul>
                    <li class="submenu-open">
                        <h6 class="submenu-hdr">Main</h6>
                        <ul>
                            <li :class="{ active: isActive('/dashboard') }">
                                <Link href="/dashboard" >
                                    <i data-feather="grid"></i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li class="submenu-open">
                        <h6 class="submenu-hdr">Master</h6>
                        <ul>
                            <li class="submenu" >
                                <a href="javascript:void(0);" :class="{ 'subdrop active': isGroupActive(['/jabatan', '/role', '/pegawai', '/users']) }"><i
                                        data-feather="users"></i><span>User Management</span><span
                                        class="menu-arrow"></span></a>
                                <ul>
                                    <li><Link href="/jabatan" :class="{ active: isActive('/jabatan') }"> Jabatan</Link></li>
                                    <li><Link href="/role" :class="{ active: isActive('/role') }"> Role</Link></li>
                                    <li><Link href="/pegawai" :class="{ active: isActive('/pegawai') }"> Pegawai</Link></li>
                                    <li><Link href="/users" :class="{ active: isActive('/users') }"> Users</Link></li>
                                </ul>
                            </li>
                            <li class="submenu">
                                <a href="javascript:void(0);"><i data-feather="archive"></i><span>Produk</span><span
                                        class="menu-arrow"></span></a>
                                <ul>
                                    <li><a href="chat.html"> Kondisi</a></li>
                                    <li><a href="calendar.html"> Diskon</a></li>
                                    <li><a href="email.html"> Jenis Produk</a></li>
                                    <li><a href="todo.html"> Produk</a></li>
                                    <li><a href="notes.html"> Nampan</a></li>
                                    <li><a href="file-manager.html"> Print Barcode</a></li>
                                    <li><a href="file-manager.html"> Scan Barcode</a></li>
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
import { onMounted, onBeforeUnmount, nextTick, watch  } from 'vue';
import initSidebar, { destroySidebarScroll } from '@/utilities/sidebar.js'
import { Link, usePage  } from '@inertiajs/vue3'

export default {
    name: "Sidebar",
    components: { Link },
    setup() {
        const page = usePage();

        const isActive = (path) => page.url.startsWith(path);
        const isGroupActive = (paths) => paths.some(p => page.url.startsWith(p));

        const resetSubmenus = () => {
            // Tutup semua submenu
            document.querySelectorAll('.submenu > a').forEach(a => {
                a.classList.remove('subdrop');
                const nextUl = a.nextElementSibling;
                if (nextUl && nextUl.tagName === 'UL') {
                    nextUl.style.display = 'none';
                }
            });
        };

        onMounted(() => {
            nextTick(() => {
                initSidebar();
                feather.replace()
                updateSidebarActive(); // set pertama
            });
        });

        // Pantau perubahan URL halaman (Inertia)
        watch(() => page.url, () => {
            resetSubmenus();
            nextTick(() => {
                initSidebar();
                feather.replace();
            });
        });

        onBeforeUnmount(() => {
            destroySidebarScroll();
            feather.replace()
        });

        return { isActive, isGroupActive };
    }
};
</script>