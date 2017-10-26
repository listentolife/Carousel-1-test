// JavaScript Document

var eg = {};//声明一个对象，当做命名空间来使用

eg.$ = function(id){//定义一个公共函数来获取id名称的元素集合
	return document.getElementById(id);
};

eg.getElementsByClassName = function(className,element){//定义一个公共函数来获取class名称的元素集合，并兼容IE
	if(document.getElementsByClassName){//检测getElementsByClassName是否有效
		return (element || document).getElementsByClassName(className);
		}
	var children = (element || document).getElementsByTagName("*");//获取html中所有标签
	var elements =[];//新建一个数组
	for(var i = 0; i < children.length; i++){//遍历所有标签
		var child = children[i];//获取当前标签
		var classNames = child.className.split(" ");//分离当前标签的所有class类
		for(var j = 0; j < classNames.length; j++){//遍历所有class类
			if(classNames[j] == className){//如果当前class类跟传参一致，说明当前标签有该class类
				elements.push(child);//增加当前标签到数组中
				break;//跳出循环
				}
			}
		}
	return elements;//返回标签数组
	};
	
eg.addListener = function(target, type, handler){//定义一个公共函数来解决事件监听的兼容IE问题
	if(target.addEventListener){//如果支持addEventListener，则直接使用
		target.addEventListener(type, handler, false);
		}else if(target.attachEvent){//如果支持attachEvent，则直接使用
			target.attachEvent("on" + type, handler);
			}else{
				target["on" + type] = handler;
				}
	};

eg.data = [
	["eg3img/photo01.jpg","eg3img/thumb01.jpg"],
	["eg3img/photo02.jpg","eg3img/thumb02.jpg"],
	["eg3img/photo03.jpg","eg3img/thumb03.jpg"],
	["eg3img/photo04.jpg","eg3img/thumb04.jpg"],
	["eg3img/photo05.jpg","eg3img/thumb05.jpg"],
	["eg3img/photo06.jpg","eg3img/thumb06.jpg"],
	["eg3img/photo07.jpg","eg3img/thumb07.jpg"],
	["eg3img/photo01.jpg","eg3img/thumb01.jpg"],
	["eg3img/photo02.jpg","eg3img/thumb02.jpg"],
	["eg3img/photo03.jpg","eg3img/thumb03.jpg"],
	["eg3img/photo04.jpg","eg3img/thumb04.jpg"],
	["eg3img/photo05.jpg","eg3img/thumb05.jpg"],
	["eg3img/photo06.jpg","eg3img/thumb06.jpg"],
	["eg3img/photo07.jpg","eg3img/thumb07.jpg"],
];


eg.showNumber = 0;//当前显示图片的序列数
eg.groupNumber = 1;//当前显示图片组
eg.groupSize = 6;//每一组显示图片的数量

eg.showThumb = function(group){//显示当前图片组
	var ul = eg.$("smallPhotosList");//获取页面显示图片组的ul元素
	ul.innerHTML = ' ';//清空ul元素内容
	var start = (group - 1) * eg.groupSize;//计算图片组的第一张图片的序列数=（图片组数-1）*显示图片的数量，如第2组的第一张图的序列数=（2-1）*6 = 6【第七张图】
	var end = group * eg.groupSize - 1;//计算图片组的最后一张图片的序列数=图片组数*显示图片的数量-1，如第1组的最后一张图片的序列数=1*6-1=5
	for(var i = start; (i<=end && i<eg.data.length); i++){//循环开始到结束的图片的序列数
		var li = document.createElement("li");//声明一个参数赋予html中新建的li元素
		li.innerHTML = '<img src = "' + eg.data[i][1] + '" id="thumb' + i + '" width="80" height="40" />';//添加图片
		
		(function(i){
			eg.addListener(li, "click", function(){
				eg.showNumber = i;
				eg.showBig();
				});
			})(i);
		
		ul.appendChild(li);
		}
};


eg.showBig = function(){
	//=后面是找出id为thmub x的图片链接名，然后把名字中thumb根成photo。再赋值到=前面bigPhotoSrc的链接
	eg.$("bigPhotoSrc").src = eg.$("thumb" + eg.showNumber).src.replace("thumb", "photo");
	};//

eg.init = function(){
	eg.showThumb(1);
	eg.addListener(eg.$("next"), "click", function(){
		eg.nextThumb();
		});
	eg.addListener(eg.$("prve"), "click", function(){
		eg.prveThumb();
		});
	eg.addListener(document, "keyup", function(e){
		e = e || event;
		if(e.keyCode == 37){
			eg.prvePhoto();
			}
		if(e.keyCode == 39){
			eg.nextPhoto();
			}
		});
	};

eg.nextThumb = function(){
	if((eg.groupNumber * eg.groupSize) + 1 <= eg.data.length){
		eg.showThumb(eg.groupNumber + 1);
		eg.showNumber = eg.groupNumber * eg.groupSize;
		eg.showBig();
		eg.groupNumber++;
		}
	};
	
eg.prveThumb = function(){
	if(eg.groupNumber - 1 >= 1){
		eg.showThumb(eg.groupNumber - 1);
		eg.groupNumber--;
		eg.showNumber = eg.groupNumber * eg.groupSize - eg.groupSize;
		eg.showBig();
		}
	};
	
eg.nextPhoto = function(){
	if(eg.showNumber % eg.groupSize == (eg.groupSize - 1)){
		eg.nextThumb();
		}else if(eg.showNumber < eg.data.length - 1){
			eg.showNumber++;
			eg.showBig();
			}
	};
	
eg.prvePhoto = function(){
	if(eg.showNumber == (eg.groupNumber - 1) * eg.groupSize){
		eg.prveThumb();
		}else if(eg.showNumber > 0){
			eg.showNumber--;
			eg.showBig();
			}
	};


eg.init();
