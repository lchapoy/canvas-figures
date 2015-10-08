function Model(){
	
}
Model.prototype.lastClicked=(function (){
	//var clicked;
	if(localStorage.getItem('type')==null){
		localStorage.setItem('type','Circle');
	}
	var setClicked=function(type){
		//clicked=type;
		localStorage.setItem('type',type);
	}
	var getClicked=function(type){
		return localStorage.getItem('type');
	}
	return{set:setClicked,
			get:getClicked
	}
})()