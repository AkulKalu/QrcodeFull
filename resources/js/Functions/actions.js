export function downloadFile(file, name, ext) {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name}.${ext}`); 
    link.click();
}