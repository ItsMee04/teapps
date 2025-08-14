// utilities/tooltip.js
import * as bootstrap from 'bootstrap';

export function initTooltips() {
    document
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach((el) => new bootstrap.Tooltip(el));
}
