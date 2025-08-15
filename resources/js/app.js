// =========================
// CSS
// =========================
import '../assets/css/bootstrap.min.css'
import '../assets/css/bootstrap-datetimepicker.min.css'
import '../assets/css/dataTables.bootstrap5.min.css'
import '../assets/css/animate.css'
import '../assets/plugins/select2/css/select2.min.css'
import '../assets/plugins/fontawesome/css/fontawesome.min.css'
import '../assets/plugins/fontawesome/css/all.min.css'
import '../assets/css/style.css'

// =========================
// JS Plugins (urutan penting!)
// =========================
await import('../assets/js/jquery-3.7.1.min.js') 
import '../assets/js/bootstrap.bundle.min.js'
await import('../assets/js/jquery.slimscroll.min.js')
await import('../assets/js/jquery.dataTables.min.js')
await import('../assets/js/dataTables.bootstrap5.min.js')
import '../assets/js/feather.min.js'
import '../assets/plugins/sweetalert/sweetalert2.all.min.js'
await import('../assets/plugins/sweetalert/sweetalerts.min.js')
await import('../assets/js/script.js')

// =========================
// Vue & Inertia
// =========================
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import toastfy from './utilities/toastfy.js'
import { initTooltips } from './utilities/tooltip.js';
import { Inertia } from '@inertiajs/inertia'

// Layout Global
import MainLayout from '@/Layouts/MainLayout.vue'

createInertiaApp({
    resolve: async name => {
        const page = await resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        )

        // Set default layout jika belum ada
        if (page.default.layout === undefined) {
            page.default.layout = MainLayout
        }

        return page
    },
    setup({ el, App, props, plugin }) {
        const vueApp = createApp({ render: () => h(App, props) })
        vueApp.use(plugin)
        vueApp.use(toastfy)
        vueApp.mount(el)

        // Jalankan Feather icons & Tooltip setelah mount
        feather.replace()
        initTooltips()
    },
    progress: { color: '#4B5563' },
})

// =========================
// Aktifkan Tooltip & Feather setelah navigasi
// =========================
Inertia.on('navigate', () => {
    feather.replace()
    initTooltips()
})