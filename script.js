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

//Functio that determines the size of the image displayed
/*function imgSize(image){
    if(image.width<500){
        imgWidth = image.width;
    } else {
        imgWidth = 500;
    }
    imgHeight = image.height * Number(imgWidth/image.width);
    console.log(imgWidth, imgHeight);
}*/

function imgDisplayFunction(){
        //Display image properly
        /*imgSize(uploadedImg);
        imgHolder.width=imgWidth;
        imgHolder.height=imgHeight;*/
        ctx.drawImage(uploadedImg, 0, 0, 500, 500);
}

//Upload the image file
imgUploadInput.addEventListener('change', function(){
    let reader = new FileReader();

    reader.addEventListener('load', ()=> {
        if(reader.result){
        uploadedImg.src = reader.result;
        imgHolder.appendChild(uploadedImg);
        imgDisplay.appendChild(imgHolder);
        console.log(uploadedImg);
        imgDisplayFunction()

        } else{
            window.alert("Load unsuccessful! Try again.")
        }
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
    //imgSize(uploadedImg);
    ctx.drawImage(uploadedImg, 0, 0, 500, 500);
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

//Download modified image
let downloadButton = document.querySelector('.downloadButton');

function downloadImg(){
    
    if(imgHolder.hasChildNodes()){//Checks if there is an image uploaded
        if(window.navigator.msSaveBlob){//Method for IE
            window.navigator.msSaveBlob(imgHolder.msBlob(), "sof-filter.jpg");
        } else{
            const a  = document.createElement('a');//Method for Mozila and Chrome
            a.href = imgHolder.toDataURL();
            a.download = 'soft-filter.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }else{
        window.alert("No picture uploaded")
    }        
}

downloadButton.addEventListener('click', downloadImg)

//Reset the modified image
let resetButton = document.querySelector('.resetButton');

function resetImg(){
    
    if(imgHolder.hasChildNodes()){//Checks if there is an image uploaded
        ctx.filter = `brightness(100%) contrast(100%) saturate(100%) sepia(0)`;
        //imgSize(uploadedImg);
        ctx.drawImage(uploadedImg, 0, 0, 500, 500);

        let resetSlide = document.querySelectorAll(".slider")
        resetSlide.forEach(function(item){
               if(item.classList.contains('sepia')){
                    item.value=0;
               } else if(item.classList.contains('contrast')) {
                item.value=200;
               } else{
                item.value=100;
               }
        })
    }else{
        window.alert("No picture uploaded")
    }        
}

resetButton.addEventListener('click', resetImg)