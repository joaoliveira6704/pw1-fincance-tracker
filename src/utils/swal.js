import Swal from "sweetalert2";

// Icon SVG
const alertIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
`;

// Configuração base
const baseConfig = {
  buttonsStyling: false,
  customClass: {
    popup: "stackr-swal-popup",
    title: "stackr-swal-title",
    htmlContainer: "stackr-swal-text",
    icon: "stackr-swal-icon",
    confirmButton: "stackr-swal-confirm",
    cancelButton: "stackr-swal-cancel",
    actions: "stackr-swal-actions",
    input: "stackr-swal-input",
  },
};

// Toast Mixin
export const toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: "var(--navbar-bg)",
  color: "var(--primary-text)",
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

/**
 * Alerta de Confirmação (Sim/Não)
 */
export const confirmAction = async (title, text) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    iconHtml: alertIcon,
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Cancelar",
  });
};

/**
 * Alerta de Input de Quantia (Depósito/Levantamento)
 */
export const inputAmountAlert = async (moveType, actionText) => {
  return Swal.fire({
    ...baseConfig,
    title: moveType === "deposit" ? "Depósito" : "Levantamento",
    text: `Insira a quantia a ${actionText}`,
    input: "number",
    inputAttributes: {
      min: "0",
      step: "0.01",
    },
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  });
};
