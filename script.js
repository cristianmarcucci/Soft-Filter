let imgDisplay = document.querySelector('#imgDisplay');
let inputButton = document.querySelectorAll('.uploadButton');

inputButton.forEach((item) => {
    item.addEventListener('click', uploadPicture);
});

//Creating a file input
let imgUploadInput = document.createElement('input');
imgUploadInput.type = 'file';
imgUploadInput.accept = 'image/jpeg, image/png';

//Creating a Canvas, so the changes from the filters can be permanently applied on the uploaded image
let imgHolder = document.createElement('canvas');
let ctx = imgHolder.getContext('2d');
let uploadedImg = document.createElement('img');

//Get image size
let imgWidth;
let imgHeight;

function imgSize(image){
    if(image.width<500){
        imgWidth = image.width;
    } else {
        imgWidth = 500;
    }
    imgHeight = image.height * Number(imgWidth/image.width);
    console.log(imgWidth, imgHeight);
}

//Upload the image file
imgUploadInput.addEventListener('change', function(){
    let reader = new FileReader();
    reader.addEventListener('load', ()=> {
        uploadedImg.src = reader.result;
        imgHolder.appendChild(uploadedImg);
        imgDisplay.appendChild(imgHolder);

        //Display image properly
        imgSize(uploadedImg);
        imgHolder.width=imgWidth;
        imgHolder.height=imgHeight;
        ctx.drawImage(uploadedImg, 0, 0, imgWidth, imgHeight);
    })
    reader.readAsDataURL(this.files[0]);
})


//Upload button calls the file input
function uploadPicture() {
    imgUploadInput.click();
}

//Filter function
function Filter(){
    let brightnessValue = brightnessSlider.value;
    let contrastValue = contrastSlider.value;
    let saturationValue = saturationSlider.value;
    let sepiaValue = sepiaSlider.value;
    ctx.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturationValue}%) sepia(${sepiaValue})`;
    imgSize(uploadedImg);
    ctx.drawImage(uploadedImg, 0, 0, imgWidth, imgHeight);
}

//Brightness ajustment
let brightnessSlider = document.querySelector('#brightnessSlider');
brightnessSlider.addEventListener('input', Filter);

//Contrast ajustment
let contrastSlider = document.querySelector('#contrastSlider');
contrastSlider.addEventListener('input', Filter);

//Saturation ajustment
let saturationSlider = document.querySelector('#saturationSlider');
saturationSlider.addEventListener('input', Filter);

//Sepia ajustment
let sepiaSlider = document.querySelector('#sepiaSlider');
sepiaSlider.addEventListener('input', Filter);