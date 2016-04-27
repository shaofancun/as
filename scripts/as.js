"use srtict";
$(function(){
	if($(".first_bg").length>0){
		var w=$(window).width(),
			h=$(window).height();
		$('body').css({"width":w,"height":h});
		$('img').width(w-90);
		$('.title img').width(w-60);
	}
})
//ajax动画
$.ajaxSetup({
    dataType: 'json',
    type: 'post',
	beforeSend : function() {
		loading.show();
	},
	complete : function() {
		loading.hide();
	}
});
//loading
var loading={
    dom: '<div class="loadingbox"><div class="loadecenter"><div class="loadrgb"><div class="loader"></div><p>请稍等...</p></div></div></div>',
	show:function(){
		$('body').append(loading.dom);
	},
	hide:function(){
		$('.loadingbox').remove();
	}
}

//alert
function nAlert(msg,callBack){
    var box=$(".alert_box");
    var str='<div class="alert_box"><span class="alert_msg">'+msg+'</span></div>';
    if(box) box.remove();
    $("body").append(str);
    setTimeout(function(){
        $(".alert_box").animate({opacity : 0},500,function(){
            $(".alert_box").remove();
            if(callBack) callBack();
        })
    },1000)
}
$("header .share").click(function(){
	$("#zz").show();
})
$(document).on('touchstart','.mask',function(){
	$("#zz").animate({opacity : 0},300,function(){
        $("#zz").remove();
    })
})
//发放奖品
$("#get").click(function(){
	var _this=$(this);
	$.ajax({
		url:"http://192.168.1.250/zzb_wap/testApi/success.php",
		data:{}
	}).done(function(data){
		if(data.Success){
			nAlert('奖品已发放！');
			_this.prop('disabled',true);
			_this.parent().addClass('disabled');
			_this.parent().next().html('<span class="zcolor">已发放该奖品</span>');
		}
	});
})
//地址相关
$('.address').click(function(){
	$(".address_list").fadeIn(300);
})
$(".close").click(function(){
	$(".address_list").fadeOut(300);
})
