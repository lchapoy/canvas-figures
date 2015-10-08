function Model(){
	
}
Model.protype.lastClicked=(function (){
	var clicked;
	setClicked:function(type){
		clicked=type;
	}
	getClicked:function(type){
		return clicked;
	}
	return{set:setClicked,
			get:getClicked
	}
})