$(function (){

//DOM
var $slider = $('#slider'),
    $sliderContent = $slider.find('.sliderContent'),
    $leftArrow = $slider.find('.arrowContainer > .fa-chevron-left '),
    $rightArrow = $slider.find('.arrowContainer > .fa-chevron-right '),
    circles = [];



//config
var width = 930,
    pause = 3000,
    animationSpeed = 700,
    interval,
    currentSlide = 1,
    len = $sliderContent.children().length ;

    // save all circles
        for( var i = 1 ; i <= len ; i++){

            circles[i] = $slider.find(" .sliderCircles > li[data-circle=\""+ i  +"\"]");
            circles[i].on('click', function () {
                var value = $(this).attr('data-circle');
                stopSlider();
                circleHighlighter(value,currentSlide);
                currentSlide = value;
                value = value * (-1);
                $sliderContent.css({'margin-left': (value * width) + width });
                
            });
        }


 function circleHighlighter (currentSlide, remove){
     circles[currentSlide].addClass('circle-hover');
     circles[remove || currentSlide - 1].removeClass('circle-hover');
 }

 function sliderReseter (){
    $sliderContent.css({'margin-left': 0});
     currentSlide = 1;
     circleHighlighter(currentSlide,len);
 }

function moveSlider (direction){
    if(currentSlide < len) {
   $sliderContent.animate({'margin-left': direction + '=' + width}, animationSpeed, function (){
       currentSlide++;
       circleHighlighter(currentSlide);
   });
   }else {
       stopSlider();
       setTimeout(sliderReseter, pause);
       setTimeout(startSlider, pause)

    }
}

function startSlider() {
        circles[currentSlide].addClass('circle-hover');
        interval = setInterval(moveSlider, pause , '-');
}

function stopSlider() {

    clearInterval(interval);
}

startSlider();


$slider.on('mouseenter',stopSlider).on('mouseleave',startSlider);

$leftArrow.on('click', function (){
    if(currentSlide === 1){
        stopSlider();
        currentSlide = len;
        $sliderContent.css({'margin-left': '-=' + width*(len-1)});
        circleHighlighter(currentSlide,1);
    }else{
        stopSlider();
        currentSlide--;
        circleHighlighter(currentSlide, currentSlide+1);
         $sliderContent.css({'margin-left': '+=' + width});
    }
});

$rightArrow.on('click', function (){
    if(currentSlide === 4){
        stopSlider();
        sliderReseter();
    }else{
        stopSlider();
        currentSlide++;
        circleHighlighter(currentSlide);
         $sliderContent.css({'margin-left': '-=' + width});
    }

});



});
