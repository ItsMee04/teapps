<template>
    <div class="account-page">
        <div class="main-wrapper">
            <div class="account-content">
                <div class="login-wrapper login-new">
                    <div class="container">
                        <div class="login-content user-login">
                            <div class="login-logo">
                                <img src="/resources/assets/img/logo.png" alt="img" />
                                <a href="/" class="login-logo logo-white">
                                    <img src="/resources/assets/img/logo-white.png" alt />
                                </a>
                            </div>
                            <form @submit.prevent="submitLogin" novalidate>
                                <div class="login-userset">
                                    <div class="login-userheading">
                                        <h3>Sign In</h3>
                                        <h4>
                                            Access the Dreamspos panel using
                                            your email and passcode.
                                        </h4>
                                    </div>
                                    <div class="form-login">
                                        <label class="form-label">Email Address</label>
                                        <div class="form-addons">
                                            <input v-model.trim="form.email" type="text" class="form-control"
                                                @input="clearError('email')" />
                                            <img src="/resources/assets/img/icons/mail.svg" alt="img" />
                                        </div>
                                        <p v-if="errors.email" class="text-alert">{{ errors.email }}</p>
                                    </div>
                                    <div class="form-login">
                                        <label>Password</label>
                                        <div class="pass-group">
                                            <input v-model.trim="form.password" type="password"
                                                class="form-control pass-input" />
                                            <span class="fas toggle-password fa-eye-slash"></span>
                                        </div>
                                        <p v-if="errors.password" class="text-alert">{{ errors.password }}</p>
                                    </div>
                                    <div class="form-login authentication-check">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="custom-control custom-checkbox">
                                                    <label class="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                                        <input type="checkbox" />
                                                        <span class="checkmarks"></span>Remember me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-login">
                                        <button class="btn btn-login" type="submit">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="my-4 d-flex justify-content-center align-items-center copyright-text">
                            <p>
                                Copyright &copy; 2023 DreamsPOS. All rights
                                reserved
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '../services/auth';
export default {
    name: "Login",
    layout: null, // Tidak pakai layout
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            errors: {},
        };
    },
    mounted() {
        if ($('.toggle-password').length > 0) {
            $(document).on('click', '.toggle-password', function () {
                $(this).toggleClass("fa-eye fa-eye-slash");
                var input = $(".pass-input");
                if (input.attr("type") === "password") {
                    input.attr("type", "text");
                } else {
                    input.attr("type", "password");
                }
            });
        }
    },
    beforeUnmount() {
        $(this.$el).off('click', '.toggle-password');
    },
    methods: {
        clearError(field) {
            // Menghapus kesalahan untuk field tertentu
            if (this.errors[field]) {
                this.$delete(this.errors, field);
            }
        },
        async submitLogin() {
            // Validasi
            if (!this.form.email) {
                this.$toast("Email wajib diisi", "error")
                return
            }
            if (!this.form.password) {
                this.$toast("Password wajib diisi", "error")
                return
            }

            try {
                const response = await AuthService.login(this.form)

                this.$toast("Login berhasil!", "success")
                this.$inertia.visit('/dashboard')
            } catch (error) {
                if (error.response) {
                    // Handle error dari API
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                    this.$toast(error.response.data.message || 'Login gagal', "error")
                } else {
                    this.$toast("Terjadi kesalahan pada server", "error")
                }
            }
        }
    }
};
</script>
