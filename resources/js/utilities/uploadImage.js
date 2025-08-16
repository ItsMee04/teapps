// utilities/uploadImage.js
export function uploadImage(inputId, previewId) {
    const inputFile = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewId);
    let currentFile = null;

    const clearPreview = () => {
        previewContainer.innerHTML = "";
        inputFile.value = ""; // Reset input file
        currentFile = null;
    };

    const handler = () => {
        const file = inputFile.files[0];
        if (!file) return;

        currentFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            previewContainer.innerHTML = "";
            const img = document.createElement("img");
            img.src = reader.result;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    };

    inputFile.addEventListener("change", handler);

    // Return fungsi clear untuk bisa dipanggil dari komponen
    return {
        clearPreview
    };
}
