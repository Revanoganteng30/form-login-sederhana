"use strict";

// Sesi ini hanya mengatur navigasi demo, bukan autentikasi produksi.
window.RuangSession = (() => {
  const key = "ruang.demo.session";

  return Object.freeze({
    isActive() {
      try {
        return sessionStorage.getItem(key) === "active";
      } catch {
        return false;
      }
    },
    begin() {
      try {
        sessionStorage.setItem(key, "active");
        return sessionStorage.getItem(key) === "active";
      } catch {
        return false;
      }
    },
    end() {
      try {
        sessionStorage.removeItem(key);
      } catch {
        // Jika penyimpanan dinonaktifkan, sesi tidak dapat dibaca lagi.
      }
    },
  });
})();
