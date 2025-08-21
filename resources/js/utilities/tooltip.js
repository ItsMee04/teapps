// utilities/tooltip.js
export function initTooltips() {
    document
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach((el) => new bootstrap.Tooltip(el));
}

export function disposeAllTooltips() {
    document
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach((el) => {
            const tooltip = bootstrap.Tooltip.getInstance(el);
            if (tooltip) {
                tooltip.dispose();
            }
        });
}
