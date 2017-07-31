
// 將陣列塞入選單
var ARRY_select = [
		'--請選擇行政區域--','中正區','大同區','中山區','松山區','大安區','萬華區','信義區','士林區','北投區','內湖區','南港區','文山區',
	]

var selectlist = document.querySelector('.selectlist');

	str="";
	for(var i=0; i<ARRY_select.length; i++){
		str+= '<option>'+ARRY_select[i]+'</option>';

	}
	selectlist.innerHTML = str;



// 讀取json
var areaDATE = new XMLHttpRequest();
areaDATE.open('get','https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json',true);
areaDATE.send();


 areaDATE.onload = function(){
	var ARRYdate = JSON.parse(areaDATE.responseText);
    data=ARRYdate.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
    showList();   // showList();  -->初始值，顯示所有的內容
   
   
    //電力停電
	var newARRY=[];
	for(var i=0; i<data.length;i++){
		if( data[i].Name == "電力停電"){
	 		newARRY.push(data[i]);  
	 	}
	}
	document.querySelector('.num').textContent=newARRY.length;
	// console.log(newARRY);
   
   
   
    function initMap(){
	//顯示地圖
	var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 15,
	    center: {lat:25.0388162, lng:121.516674}
	  });
	  
	 
	  //跑迴圈依序將值塞入到 marker
	  for(var i=1; i<newARRY.length; i++){
	    var str ={};
	    var place = {};
	  
	    place.lat = parseFloat(newARRY[i].Wgs84X);
	    place.lng = parseFloat(newARRY[i].Wgs84Y);

	    
	    str.map = map;
	    str.title= newARRY[i].CaseLocationDistrict;
	    str.position = place;
		console.log(str);
	    new google.maps.Marker(str);
	   
	  }
 		
    }
     initMap();
     
 }



	

// 初始值，顯示所有的內容
function showList(){
  var html='';
  var len = data.length;
  for(var i = 0;len>i;i++){
   		
  	html+='<tr><td data-th="發生時間"><span>'+data[i].CaseTime+'</span></td>';
	html+='<td data-th="區域"><span class="label label-primary">'+data[i].CaseLocationDistrict+'</span></td>';
	html+='<td data-th="詳細位置"><span>'+data[i].CaseLocationDescription+'</span></td>';
	html+='<td data-th="描述"><span>'+data[i].CaseDescription+'</span></td></tr>';
  }
 
  document.querySelector('.list').innerHTML=html;
}


// 使用 下拉選單更新內容
selectlist.addEventListener('change',SEL_change,true);

function SEL_change(e){
	var html='';
	var len = data.length;
	for(var i=0; i<len;i++){
		if(e.target.value == data[i].CaseLocationDistrict){
			html+='<tr><td data-th="發生時間"><span>'+data[i].CaseTime+'</span></td>';
			html+='<td data-th="區域"><span class="label label-primary">'+data[i].CaseLocationDistrict+'</span></td>';
			html+='<td data-th="詳細位置"><span>'+data[i].CaseLocationDescription+'</span></td>';
			html+='<td data-th="描述"><span>'+data[i].CaseDescription+'</span></td></tr>';
		}
		document.querySelector('.list').innerHTML=html;
	}
}


var NEWS = document.getElementById('b1-news');
var POWER = document.getElementById('b2-power');
var B1 = document.getElementById('b1');
var B2 = document.getElementById('b2');

NEWS.addEventListener('click',b1,false);
POWER.addEventListener('click',b2,false);

function b1(){
	B1.style.display = "block";
	B2.style.display = "none"; 
	
	NEWS.setAttribute('class','btn btn-lg act');
	POWER.setAttribute('class','btn btn-lg');

}

function b2(){
	B1.style.display = "none";
	B2.style.display = "block";    

	NEWS.setAttribute('class','btn btn-lg');
	POWER.setAttribute('class','btn btn-lg act');
	
}




