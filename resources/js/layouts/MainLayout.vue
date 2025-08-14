<template>
    <div class="main-wrapper">
        <Header />
        <Sidebar />

        <slot />
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: "MainLayout",
    components: {
        Header,
        Sidebar,
    }
}
</script>