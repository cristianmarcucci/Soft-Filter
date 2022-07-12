//Make sure the slides are reseted when page loaded
let resetSlide = document.querySelectorAll(".slider")
resetSlide.forEach(function(item){
       if(item.classList.contains('sepia')){
            item.value=0;
       } else{
            item.value=100;
       }
})

//Upload the image
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
let imgCaller = document.querySelector('.imgCaller');

//Get image size
let imgWidth;
let imgHeight;

function widthFunction(){
    
    if(imgWidth>imgHeight){
        let paddingLeft = parseInt(window.getComputedStyle(imgDisplay).paddingLeft);
        let paddingRight = parseInt(window.getComputedStyle(imgDisplay).paddingRight);
        let scrollBar =  document.querySelector('main').clientWidth - document.body.offsetWidth;
        return (document.body.offsetWidth - document.querySelector('.toolsMenu').clientWidth - paddingLeft - paddingRight - scrollBar);
    }else{
        return (imgWidth*imgDisplay.clientHeight)/imgHeight;
    }
}

function heightFunction(){
    if(imgHeight>imgWidth){
        let menuMarginBottom = parseInt(window.getComputedStyle(document.querySelector('header')).marginBottom);
        let footerMarginTop = parseInt(window.getComputedStyle(document.querySelector('footer')).marginTop);
        return (document.body.offsetHeight - document.querySelector('header').clientHeight - menuMarginBottom - footerMarginTop - document.querySelector('footer').clientHeight);
    }else{
        return (imgHeight*imgDisplay.clientWidth)/imgWidth;
    }
}

function imgDisplayFunction(){//Display image properly
        imgWidth = uploadedImg.width;
        imgHeight = uploadedImg.height;
        imgHolder.width = widthFunction();//Ajust the image width to the screen size
        imgHolder.height = heightFunction();//Ajuste the image height to the screen size
        Filter();
        ctx.drawImage(uploadedImg, 0, 0, widthFunction(), heightFunction());

}

window.addEventListener('resize', imgDisplayFunction);//Avoid horizontal scroll bar

//Upload the image file
imgUploadInput.addEventListener('change', function(){
    let reader = new FileReader();

    reader.addEventListener('load', ()=> {
        if(reader.result){
        uploadedImg.src = reader.result;
        imgHolder.appendChild(uploadedImg);
        if(imgCaller.parentElement){
            imgDisplay.replaceChild(imgHolder, imgCaller);
        }
        imgDisplayFunction();
        console.log(uploadedImg.width)

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
    return ctx.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturationValue}%) sepia(${sepiaValue})`;
}

//Brightness ajustment
let brightnessSlider = document.querySelector('#brightnessSlider');
brightnessSlider.addEventListener('input', imgDisplayFunction);

//Contrast ajustment
let contrastSlider = document.querySelector('#contrastSlider');
contrastSlider.addEventListener('input', imgDisplayFunction);

//Saturation ajustment
let saturationSlider = document.querySelector('#saturationSlider');
saturationSlider.addEventListener('input', imgDisplayFunction);

//Sepia ajustment
let sepiaSlider = document.querySelector('#sepiaSlider');
sepiaSlider.addEventListener('input', imgDisplayFunction);

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
        resetSlide.forEach(function(item){
               if(item.classList.contains('sepia')){
                    item.value=0;
               } else{
                    item.value=100;
               }
        })
    }else{
        window.alert("No picture uploaded")
    }   
    
    imgDisplayFunction();
}

resetButton.addEventListener('click', resetImg)