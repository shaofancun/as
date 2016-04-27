
(function($) {
    $.fn.answer = function(settings) {
        var defaults = {
            questions: null,		//题库
            chance:2,		//机会
        };
        var config = $.extend(defaults, settings);
        var container = $(this),		//容器
        	contentBox = '',		//盒子
        	qs=config.questions,		//总题目
        	qLength = qs.length;		//总得题数
        	
        qs.forEach(function(v,i){
        	contentBox += '<div class="slide_container" data-page='+i+'><header><div class="title">第一关 选择题</div><div class="page">' + (i + 1) + '/' + qLength + '</div></header><div class="question">' + v.question + '</div><ul class="answers">';
			var as=v.answers;
			as.forEach(function(av,ai){
				contentBox += '<li class=i_'+(ai+1)+' data-answer='+(ai+1)+'>' + av + '</li>';
			})
            contentBox += '</ul><div class="nav-container">';
            contentBox += '</div></div>';
        })
        container.html(contentBox);
        var slidesList = container.find('.slide_container');		//获取所有列表
	    //第一题显示，其他隐藏
        slidesList.hide().first().fadeIn(200);
        //选择答案
        container.find('li').click(function(){
            var _this=$(this),
            	page=_this.parents(".slide_container").data('page'),		//获取当前页码
            	cAnswer=config.questions[page].correct,		//当前题目答案
            	answer=_this.data('answer');		//获取当前页选项
            if (_this.hasClass('selected')) {
                _this.removeClass('selected');
            } else {
                _this.parents('.answers').children('li').removeClass('selected');
                _this.addClass('selected');
            }
            if(config.chance>0){
            	//答题判断
				if(cAnswer==answer){
					if(page==qLength-1){
						//全部答对后执行向服务器发送请求方法
						allRight();
						mask('恭喜您，答对了所有题目！','分享朋友圈','share');
					}else{
						mask('恭喜您，答对啦！','下一题','next',page);
					}
				}else{
					config.chance--;
					if(config.chance==1){
						mask('抱歉，您答错了！','再来一次','again');
					}else if(config.chance==0){
						mask('抱歉，您答错了！','重新开始答题','reload');
					}
				}
            }else{
            	mask('你没有答题机会了！','重新开始答题','reload');
            }
        });
        //下一题
        $(document).on('click','#next',function(e) {
        	var _this=$(this),
        		page=_this.data("p")
        		curPage=$(".slide_container").eq(page),
        		nextPage=$(".slide_container").eq(page+1);
        	$(".mask").animate({opacity : 0},200,function(){
	            $(".mask").remove();
	        })
        	curPage.fadeOut(200,function(){
                nextPage.fadeIn(200);
            });
            return false;
        });
        //刷新重新开始答题
        $(document).on('click','#reload',function(e) {
        	window.location.reload();
        });
        //分享朋友圈
        $(document).on('click','#share',function(){
        	$(".mask").append("<div class='share'></div>");
        })
        //答题回调
		function mask(title,msg,type,page){
			var str='<div class="mask"><div class="box"><h2>'+title+'</h2><div class="btn" id="'+type+'" data-p="'+page+'">'+msg+'</div><div class="d"></div></div></div>';
			$("body").append($(str).hide().fadeIn(400));
			$(document).on("click","#again",function(){
				$(".mask").animate({opacity : 0},300,function(){
		            $(".mask").remove();
		        })
			})
		};
		//全部答对方法
		function allRight(){
			$.post("http://192.168.1.250/zzb_wap/testApi/success.php").done(function(data){
				if(data.Success){
					//返回正确，没什么好写
				}else{
					nAlert("");
				}
			}).fail(function(){
				nAlert("网络错误,确认网络是否已连接");
			})
		}
    };
})(jQuery);
$(function(){
	$('#answer').answer({
        questions: ques.questions
	});
})
//问题答案
var ques={
	 'questions': [ 
	  	{
	    	'question': 'AS是什么意思？卖什么的？',
	   		'answers': [
				'意大利文Accento squisito的缩写，原意为“极致的品味” AS品牌其主要客群为25到30岁追求时尚品味的都会男女性，穿上AS，如同唤醒双足的光芒、展现诱人曲线，行走间散发出优雅自信的风采。 主要销售 手包，皮鞋，箱包。',
				'就是一个名称，没有什么意思，卖女鞋的。',
				'是中文艾仕的缩写，卖男女鞋。'
	   		],
	      	'correct': 1
	   	},
	   	{
	       	'question': 'AS品牌为什么一直能做到全国最低价？',
	   		'answers': [
				'工厂直营没有中间环节赚差价。',
				'产品比较差所以便宜。',
				'新店开始便宜搞促销。'
	   		],
	      	'correct': 1
	   	},
	    {
	       	'question': 'AS品牌的品质承诺？',
	   		'answers': [
	   			'全场90%真皮，10%为特殊材质。三个月断底、断面、严重开胶换新鞋，人为损坏保修。',
	   			'全场50%真皮50%为人造革。三个月断底、断面包换，开胶保修。',
	   			'全场100%人造革。一个月断底、断面包换，开胶保修。'
	   		],
	      	'correct': 1
	   	},
	   	{
	   		'question': '买鞋享分红',
	   		'answers': [
	   			'AS品牌将您的正常消费视同对企业的投资、并按一定的时间间隔，把AS企业利润的一定比例返还给消费者，让消费者享受到这种消费利益，就能产生更大的消费热情，两者成为一体，合二为一，从面实现共享成果。',
	   			'AS品牌买鞋可以收到一个红包。',
	   			'AS买了鞋付了钱跟自己没有关系。'
	   		],
	      	'correct': 1
	   	},
	   	{
	   		'question': '如何通过AS品牌实现零元创业',
	   		'answers': [
	   			'购买AS品牌任意一款产品后点击公众号“我要加盟”里面的微店加盟就可以可以申请AS品牌微商代理。可以获取一个价值80万元的微商城，并可以获得专业团队的辅导，在家轻松赚取2-5万元。',
	   			'要投资五万，做微商需要铺货才可以代理。',
	   			'要介绍几个人买鞋 才可以申请代理。'
	   		],
	      	'correct': 1
	   	}
    ]
}