//Make sure the slides are reseted when page loaded
let resetSlide = document.querySelectorAll(".slider")
resetSlide.forEach(function(item){
       if(item.classList.contains('sepia')){
            item.value=0;//only sepia's default value is equal 0
       } else{
            item.value=100;//Brightness, Contrast and Saturation starts from 100
       }
})

//Manipulate DOM to upload the image
let imgDisplay = document.querySelector('#imgDisplay');
let inputButton = document.querySelectorAll('.uploadButton');

inputButton.forEach((item) => {
    item.addEventListener('click', uploadPicture);//By clicking the Upload Button, an file input is 'clicked'
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
let widthProportion;
let heightProportion;
let availableWidth;
let availableHeight;

//Display canvas image properly, avoiding horizontal scroll 
function widthFunction(){

    if(screen.width<720){//Width rules the display in small devices
        imgDisplay.style.padding = 0;
        return window.innerWidth;
    }else if(availableHeight<300){
        return (imgWidth*imgDisplay.clientHeight)/imgHeight;
    } else{
        if(widthProportion>=heightProportion){//The less space available rules the size
            return availableWidth;
        }else{
            return (imgWidth*imgDisplay.clientHeight)/imgHeight;
        }
    }

}

//Display canvas image properly, avoiding vertical scroll on big screens
function heightFunction(){

    if(screen.width<720){
        return (imgHeight*imgDisplay.clientWidth)/imgWidth;
    }else if(availableHeight<300){//Minimum height
        return 300;
    } else{
        if(widthProportion>=heightProportion){//The less space available rules the size
            return (imgHeight*imgDisplay.clientWidth)/imgWidth;           
        }else{
            return availableHeight;
        } 
    }
}

function imgDisplayFunction(){//Display image properly
        imgWidth = uploadedImg.width;
        imgHeight = uploadedImg.height;

        let paddingLeft = parseInt(window.getComputedStyle(imgDisplay).paddingLeft);
        let paddingRight = parseInt(window.getComputedStyle(imgDisplay).paddingRight);
        availableWidth = (window.innerWidth - document.querySelector('.toolsMenu').clientWidth - paddingLeft - paddingRight)
        widthProportion = imgWidth/availableWidth;
        
        let menuMarginBottom = parseInt(window.getComputedStyle(document.querySelector('header')).marginBottom);
        availableHeight =  window.innerHeight - document.querySelector('header').clientHeight - menuMarginBottom;
        heightProportion = imgHeight/availableHeight

        imgHolder.width = widthFunction();//Ajust the image width to the screen size
        imgHolder.height = heightFunction();//Ajuste the image height to the screen size
        Filter();
        ctx.drawImage(uploadedImg, 0, 0, widthFunction(), heightFunction());

}

//Ajust the image size, when the screen is resized
window.addEventListener('resize', imgDisplayFunction);

//Upload the image file
imgUploadInput.addEventListener('change', function(){
    let reader = new FileReader();
    
    reader.addEventListener('load', event=> {
        if(event.target.result){
            uploadedImg.src = event.target.result;
            setTimeout(function(){     //ensure that there was enough time to render the image   
                imgHolder.appendChild(uploadedImg);
                if(imgCaller.parentElement){
                    imgDisplay.replaceChild(imgHolder, imgCaller);
                }
                imgDisplayFunction();
            }, 500);

        } else{
            window.alert("Load unsuccessful! Try again.")
        }
    })
    reader.readAsDataURL(this.files[0]);
 });


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