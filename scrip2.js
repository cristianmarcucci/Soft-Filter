
//Uploading picture
const imgDisplay = document.querySelector('#imgDisplay');
const uploadButton = imgDisplay.querySelector("#menuInputButton");

let imageUploaded = document.createElement('img');
imageUploaded.setAttribute('id', 'imgUploadedDisplay')

uploadButton.addEventListener('change', function() {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        imageUploaded.value = `url(${reader.result})`;
        imgDisplay.replaceChild(imageUploaded, uploadButton);
    });
    reader.readAsDataURL(this.files[0]);
})