
function Figure(){
	var self=this;
	this.model= new Model();
	this.Shapes= new ShapeFactory(this.model);
	var buttons=document.getElementsByTagName('button');
	var   lastButton;
	for(var i=0;i<buttons.length;i++){
		if(buttons[i].innerText==this.model.lastClicked.get()){
			lastButton=buttons[i];
			break;
		}
	}
	var lastButtonColor=lastButton.style.border;
	lastButton.style.border="3px solid gold";
	var container=document.getElementsByClassName('container')[0];
	container.addEventListener('click',function(ev){
		if(ev.target.type=='button'){
			if(lastButton!=undefined){
				lastButton.style.border=lastButtonColor;
			}
			lastButton=ev.target;
			lastButtonColor=ev.target.style.border;
			ev.target.style.border="3px solid gold";
			self.model.lastClicked.set(ev.target.innerText);
			ev.target
		}	
	})

}

var app= new Figure();
