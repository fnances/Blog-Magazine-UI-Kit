$(function () {

$(".social-list > ul > li > a").hover(function () {
    $(this).prev().toggleClass("hover-bg");
});

});
