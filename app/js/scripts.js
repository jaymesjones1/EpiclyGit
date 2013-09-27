$(document).ready(function(){

	$(function() {  
    var pull        = $('#pull');  
        menu        = $('.nav ul');  
        menuHeight  = menu.height();  
  
    $(pull).on('click', function(e) {  
        e.preventDefault();  
        menu.slideToggle();  
    });  
});  


	$(".block").hover(
		function(){
		var id = this.id;
		$("#" + id + "_overlay").slideDown(400);
	}, 
		function(){
		var id = this.id;
		$("#" + id + "_overlay").slideUp(400);
	});
	
	$(".block middle").hover(
		function(){
		var id = this.id;
		$("#" + id + "_overlay").slideDown(400);
	}, 
		function(){
		var id = this.id;
		$("#" + id + "_overlay").slideUp(400);
	});
});