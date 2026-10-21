"use strict";

(() => {
  function requireSession() {
    if (window.RuangSession.isActive()) return true;
    document.getElementById("dashboard-shell").hidden = true;
    window.location.replace("index.html");
    return false;
  }

  if (!requireSession()) return;
  window.addEventListener("pageshow", requireSession);

  const storageKey = "ruang.tasks.v1";
  const starterTasks = [
    { id: "welcome", title: "Mulai hari dengan satu tujuan kecil", completed: true },
    { id: "plan", title: "Susun rencana untuk hari ini", completed: true },
    { id: "learn", title: "Luangkan 20 menit untuk belajar", completed: false },
    { id: "focus", title: "Selesaikan satu hal yang paling penting", completed: false },
    { id: "reflect", title: "Catat hal baik yang terjadi hari ini", completed: false },
  ];
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const list = document.getElementById("task-list");
  const error = document.getElementById("task-error");
  const status = document.getElementById("task-status");
  const filters = [...document.querySelectorAll("[data-filter]")];
  let filter = "all";
  let storageAvailable = true;

  function loadTasks() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === null) return starterTasks.map((task) => ({ ...task }));
      const parsed = JSON.parse(saved);
      const ids = new Set();
      if (!Array.isArray(parsed) || !parsed.every((task) => {
        if (!task || typeof task.id !== "string" || !task.id || ids.has(task.id)
          || typeof task.title !== "string" || !task.title.trim() || task.title.length > 120
          || typeof task.completed !== "boolean") return false;
        ids.add(task.id);
        return true;
      })) throw new Error("Invalid saved tasks");
      return parsed.map(({ id, title, completed }) => ({ id, title, completed }));
    } catch {
      return starterTasks.map((task) => ({ ...task }));
    }
  }

  let tasks = loadTasks();

  function saveTasks() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      storageAvailable = true;
    } catch {
      storageAvailable = false;
    }
    document.getElementById("storage-note").textContent = storageAvailable
      ? "Tugas tersimpan di browser ini. Langkah kecilmu bisa dilanjutkan kapan saja."
      : "Penyimpanan browser tidak tersedia. Perubahan tugas hanya bertahan selama halaman ini terbuka.";
  }

  function announce(message) {
    status.textContent = message;
  }

  function renderTasks() {
    const visible = tasks.filter((task) => filter === "all"
      || (filter === "completed" ? task.completed : !task.completed));
    list.replaceChildren();

    for (const task of visible) {
      const row = document.createElement("li");
      row.className = `task-row${task.completed ? " is-complete" : ""}`;
      const label = document.createElement("label");
      label.className = "task-check";
      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = task.completed;
      check.dataset.taskId = task.id;

      const text = document.createElement("span");
      text.className = "task-label";
      const title = document.createElement("span");
      title.className = "task-title";
      title.textContent = task.title;
      const meta = document.createElement("span");
      meta.className = "task-meta";
      meta.textContent = task.completed ? "Selesai" : "Belum selesai";
      text.append(title, meta);
      label.append(check, text);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "task-delete";
      remove.dataset.deleteId = task.id;
      remove.setAttribute("aria-label", `Hapus tugas: ${task.title}`);
      remove.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7M14 10v7"/></svg>';
      row.append(label, remove);
      list.append(row);
    }

    const empty = document.getElementById("task-empty");
    empty.hidden = visible.length > 0;
    empty.textContent = tasks.length === 0
      ? "Ruangmu masih kosong. Tambahkan langkah pertamamu di atas."
      : filter === "active"
        ? "Semua tugas selesai. Saatnya menikmati jeda kecil!"
        : "Belum ada tugas yang selesai. Mulai dari satu langkah kecil, yuk.";

    const completed = tasks.filter((task) => task.completed).length;
    const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
    document.getElementById("total-tasks").textContent = tasks.length;
    document.getElementById("completed-tasks").textContent = completed;
    document.getElementById("pending-tasks").textContent = tasks.length - completed;
    document.getElementById("task-progress").value = percent;
    document.getElementById("progress-percent").textContent = `${percent}%`;
    document.getElementById("progress-ring").style.setProperty("--progress", percent);
    document.getElementById("progress-summary").textContent = `${completed} dari ${tasks.length} tugas selesai`;
  }

  function restoreFocus(id, control = "checkbox", fallbackIndex = 0) {
    const controls = [...list.querySelectorAll(control === "checkbox" ? "input" : "button")];
    const previous = controls.find((element) => (element.dataset.taskId || element.dataset.deleteId) === id);
    const next = previous || controls[Math.min(fallbackIndex, controls.length - 1)] || input;
    next.focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if (!title || title.length > 120) {
      error.textContent = title ? "Gunakan maksimal 120 karakter untuk satu tugas." : "Tuliskan tugas yang ingin kamu kerjakan.";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }

    const id = typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `task-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    tasks.unshift({ id, title, completed: false });
    input.value = "";
    error.textContent = "";
    input.removeAttribute("aria-invalid");
    if (filter === "completed") setFilter("all");
    saveTasks();
    renderTasks();
    input.focus();
    announce(`Tugas “${title}” ditambahkan.`);
  });

  input.addEventListener("input", () => {
    error.textContent = "";
    input.removeAttribute("aria-invalid");
  });

  list.addEventListener("change", (event) => {
    const check = event.target.closest("input[data-task-id]");
    if (!check) return;
    const task = tasks.find((item) => item.id === check.dataset.taskId);
    if (!task) return;
    const index = [...list.querySelectorAll("input")].indexOf(check);
    task.completed = check.checked;
    saveTasks();
    renderTasks();
    restoreFocus(task.id, "checkbox", index);
    announce(`Tugas “${task.title}” ${task.completed ? "selesai" : "ditandai belum selesai"}.`);
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-delete-id]");
    if (!button) return;
    const task = tasks.find((item) => item.id === button.dataset.deleteId);
    if (!task) return;
    const index = [...list.querySelectorAll("button")].indexOf(button);
    tasks = tasks.filter((item) => item.id !== task.id);
    saveTasks();
    renderTasks();
    restoreFocus("", "button", index);
    announce(`Tugas “${task.title}” dihapus.`);
  });

  function setFilter(value) {
    filter = value;
    for (const button of filters) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === value));
    }
  }

  for (const button of filters) {
    button.addEventListener("click", () => {
      setFilter(button.dataset.filter);
      renderTasks();
      announce(`Filter ${button.textContent.trim()}. ${list.children.length} tugas ditampilkan.`);
    });
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    const focused = document.activeElement;
    const id = focused.dataset.taskId || focused.dataset.deleteId;
    const control = focused.matches("button") ? "button" : "checkbox";
    tasks = loadTasks();
    renderTasks();
    if (id) restoreFocus(id, control);
    announce("Daftar tugas diperbarui dari tab lain.");
  });

  document.getElementById("logout").addEventListener("click", () => {
    window.RuangSession.end();
    document.getElementById("dashboard-shell").hidden = true;
    window.location.replace("index.html");
  });

  function updateNavigation() {
    const section = window.location.hash === "#tugas" ? "#tugas" : "#ringkasan";
    for (const link of document.querySelectorAll(".sidebar-nav a")) {
      if (link.getAttribute("href") === section) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }

  window.addEventListener("hashchange", updateNavigation);
  updateNavigation();

  document.getElementById("account-email").textContent = "demo@example.com";
  document.getElementById("dashboard-date").textContent = new Intl.DateTimeFormat("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).format(new Date());
  saveTasks();
  renderTasks();
  document.getElementById("dashboard-shell").hidden = false;
})();
