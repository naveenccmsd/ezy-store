function sweetAnimation()
{
var els = document.getElementsByClassName("sweet");

Array.prototype.forEach.call(els, function(el) {
    // Do stuff here
    el.innerHTML="<div class='icon icon--order-success svg'><svg xmlns='http://www.w3.org/2000/svg' width='72px' height='72px'><g fill='none' stroke='#8EC343' stroke-width='2'><circle cx='36' cy='36' r='35' style='stroke-dasharray:240px, 240px; troke-dashoffset: 480px;'></circle><path d='M17.417,37.778l9.93,9.909l25.444-25.393' style='stroke-dasharray:50px, 0px; stroke-dashoffset: 0px;'></path></g></svg></div>";
});
}
function sweetAnimationByID(id)
{
	var els = document.getElementsById(id);
    els.innerHTML="<div class='icon icon--order-success svg'><svg xmlns='http://www.w3.org/2000/svg' width='72px' height='72px'><g fill='none' stroke='#8EC343' stroke-width='2'><circle cx='36' cy='36' r='35' style='stroke-dasharray:240px, 240px; troke-dashoffset: 480px;'></circle><path d='M17.417,37.778l9.93,9.909l25.444-25.393' style='stroke-dasharray:50px, 0px; stroke-dashoffset: 0px;'></path></g></svg></div>";
}