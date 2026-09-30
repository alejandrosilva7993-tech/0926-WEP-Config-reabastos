/**
 * WEP — Configuración de reabastos
 * Prototipo: bits Reabasto parcial / SubLPN parcial como InputSwitch (PrimeNG).
 */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const isEdit = params.get("mode") === "edit";

  const form = document.getElementById("reabastosForm");
  const pageTitle = document.getElementById("pageTitle");
  const btnCancel = document.getElementById("btnCancel");
  const parcial = document.getElementById("parcial");
  const sublpnParcial = document.getElementById("sublpnParcial");
  const parcialSwitch = document.getElementById("parcialSwitch");
  const sublpnSwitch = document.getElementById("sublpnSwitch");

  const fields = {
    cuenta: document.getElementById("cuenta"),
    area: document.getElementById("area"),
    localidad: document.getElementById("localidad"),
    sku: document.getElementById("sku"),
    parcial,
    sublpnParcial,
  };

  const EDIT_SAMPLE = {
    cuenta: "acc1",
    area: "almacenpz1",
    localidad: "1Loc1",
    sku: "11SKU1",
    parcial: true,
    sublpnParcial: false,
  };

  function syncSwitch(inputEl, shellEl) {
    const on = Boolean(inputEl.checked);
    shellEl.classList.toggle("p-inputswitch-checked", on);
    shellEl.setAttribute("data-p-checked", on ? "true" : "false");
    inputEl.setAttribute("aria-checked", on ? "true" : "false");
  }

  function setSwitch(inputEl, shellEl, on) {
    inputEl.checked = Boolean(on);
    syncSwitch(inputEl, shellEl);
  }

  function setFieldError(name, message) {
    const field = document.getElementById("field-" + (name === "sublpnParcial" ? "sublpn-parcial" : name));
    const error = document.getElementById("error-" + name);
    if (!field) return;
    field.classList.toggle("is-invalid", Boolean(message));
    if (error) {
      error.hidden = !message;
      error.textContent = message || "";
    }
  }

  function applyMode() {
    if (isEdit) {
      pageTitle.textContent = "Editar configuración de reabastos";
      document.title = "WEP — Editar configuración de reabastos";
      fields.cuenta.value = EDIT_SAMPLE.cuenta;
      fields.area.value = EDIT_SAMPLE.area;
      fields.localidad.value = EDIT_SAMPLE.localidad;
      fields.sku.value = EDIT_SAMPLE.sku;
      setSwitch(parcial, parcialSwitch, EDIT_SAMPLE.parcial);
      setSwitch(sublpnParcial, sublpnSwitch, EDIT_SAMPLE.sublpnParcial);
    } else {
      // HU: SubLPN parcial por defecto apagado
      setSwitch(sublpnParcial, sublpnSwitch, false);
      setSwitch(parcial, parcialSwitch, false);
    }
  }

  parcial.addEventListener("change", function () {
    syncSwitch(parcial, parcialSwitch);
  });

  sublpnParcial.addEventListener("change", function () {
    // Ambos bits operan en paralelo; no se bloquean entre sí.
    syncSwitch(sublpnParcial, sublpnSwitch);
  });

  ["localidad", "sku"].forEach(function (name) {
    fields[name].addEventListener("input", function () {
      setFieldError(name, "");
    });
  });

  ["cuenta", "area"].forEach(function (name) {
    fields[name].addEventListener("change", function () {
      setFieldError(name, "");
    });
  });

  btnCancel.addEventListener("click", function () {
    // Sin feedback visual (toast/modal)
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Sin feedback visual (toast/modal)
  });

  applyMode();
})();
