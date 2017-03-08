//Common Binds
ZCJ('a[data-hide]').on('click', function(){
    ZCJ( ZCJ(this).attr('data-hide') ).hide();
});
//ZCJ('a[data-toggle-display]').on('click', function(){
//	var elem = ZCJ(this).attr('data-hide');
//	if (ZCJ(elem).hasClass('display-none')) {
 //   	ZCJ( elem ).show();
//	} else {
//		ZCJ( elem ).hide();
//	}
//});
ZCJ('a[data-toggle]').on('click', function(){
    ZCJ( ZCJ(this).attr('data-toggle') ).toggleClass('display-none');
});
ZCJ('input[data-check-all]').on('change', function(){
	var name = ZCJ(this).attr('data-check-all');
	if(this.checked === true) {
		ZCJ('input[name="' + name + '"]').forEach(function(){
			this.checked = true;
		});
	} else {
		ZCJ('input[name="' + name + '"]').forEach(function(){
			this.checked = false;
		});
	}
});
ZCJ('input[data-check-toggle]').on('change', function(){
	var elem = ZCJ(this).attr('data-check-toggle');
	if(this.checked === true) {
		ZCJ(elem).show();
	} else {
		if(ZCJ('input[name="' + ZCJ(this).attr('name') + '"]:checked').length === 0){
			ZCJ(elem).hide();
		}
	}
});