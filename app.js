"use strict";

// Akun publik untuk simulasi antarmuka. Bukan sistem autentikasi produksi.
const DEMO_ACCOUNT = Object.freeze({
  email: "demo@example.com",
  password: "Demo123!",
});

const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");
const loginError = document.getElementById("login-error");
const loginView = document.getElementById("login-view");
const successView = document.getElementById("success-view");

function setFieldError(input, message) {
  document.getElementById(`${input.id}-error`).textContent = message;
  if (message) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
}

function clearLoginError() {
  loginError.textContent = "";
  loginError.hidden = true;
}

function hidePassword() {
  password.type = "password";
  togglePassword.setAttribute("aria-pressed", "false");
  togglePassword.setAttribute("aria-label", "Tampilkan kata sandi");
}

togglePassword.addEventListener("click", () => {
  const showPassword = password.type === "password";
  password.type = showPassword ? "text" : "password";
  togglePassword.setAttribute("aria-pressed", String(showPassword));
  togglePassword.setAttribute("aria-label", showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
});

for (const input of [email, password]) {
  input.addEventListener("input", () => {
    setFieldError(input, "");
    clearLoginError();
    document.getElementById("demo-status").textContent = "";
  });
}

document.getElementById("fill-demo").addEventListener("click", () => {
  email.value = DEMO_ACCOUNT.email;
  password.value = DEMO_ACCOUNT.password;
  setFieldError(email, "");
  setFieldError(password, "");
  clearLoginError();
  hidePassword();
  document.getElementById("demo-status").textContent = "Akun demo sudah diisi. Tekan Masuk untuk melanjutkan.";
  form.querySelector('[type="submit"]').focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearLoginError();
  email.value = email.value.trim();

  const emailMessage = !email.value
    ? "Masukkan alamat email terlebih dahulu."
    : email.validity.typeMismatch
      ? "Gunakan alamat email yang valid."
      : "";
  const passwordMessage = password.value ? "" : "Masukkan kata sandi terlebih dahulu.";

  setFieldError(email, emailMessage);
  setFieldError(password, passwordMessage);

  if (emailMessage || passwordMessage) {
    (emailMessage ? email : password).focus();
    return;
  }

  if (email.value.toLowerCase() !== DEMO_ACCOUNT.email || password.value !== DEMO_ACCOUNT.password) {
    loginError.textContent = "Email atau kata sandi belum sesuai. Coba gunakan akun demo di bawah.";
    loginError.hidden = false;
    password.focus();
    return;
  }

  document.getElementById("account-email").textContent = DEMO_ACCOUNT.email;
  password.value = "";
  hidePassword();
  loginView.hidden = true;
  successView.hidden = false;
  document.title = "Selamat datang · Ruang";
  document.getElementById("success-heading").focus();
});

document.getElementById("logout").addEventListener("click", () => {
  form.reset();
  hidePassword();
  clearLoginError();
  setFieldError(email, "");
  setFieldError(password, "");
  document.getElementById("demo-status").textContent = "";
  document.getElementById("account-email").textContent = "";
  successView.hidden = true;
  loginView.hidden = false;
  document.title = "Masuk · Ruang";
  email.focus();
});
