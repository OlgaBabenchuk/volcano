$(document).ready(function() {

	//---toggle menu---//
	$(".toggle-menu").click(function() {
		$(this).toggleClass("on");
		$(".top-menu").slideToggle();
	});
		
});