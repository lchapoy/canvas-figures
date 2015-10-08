var	canvas = document.getElementById('canvas');
var	ctx = canvas.getContext('2d');
var drag=false;
var ShapeFactory=function(model){
	var self=this;
	var canWidth=90;
	var canHeight=120;
	this.model=model;
	this.perimeter=document.getElementsByClassName('text')[0];
	
	canvas.addEventListener('mousedown',function(ev){
		
	observer.check(ev.pageX-canWidth,ev.pageY-canHeight)
		if(!drag){
			if(!isNaN(parseInt(self.perimeter.value))){
				self.createShape(self.perimeter.value,ev.pageX-canWidth,ev.pageY-canHeight);
			}else{

				throw 'Error Perimeter not a Number';
			}
		}

	});
	document.body.addEventListener('mouseup',function(ev){
		drag=false;
	});

	canvas.onmousemove=function(ev){
			
				if(drag){
					ctx.clearRect(0,0,750,1000);
					observer.notify(ev.pageX-canWidth,ev.pageY-canHeight);
				}

	}
}
ShapeFactory.prototype.createShape=function(per,x,y){
	var shape;
	var option=this.model.lastClicked.get();
	if(option=='Triangle'){
		shape= new Triangle(per,x,y);
	}else if(option=='Square'){
		shape=new Square(per,x,y);
	}else{
		shape= new Circle(per,x,y);
	}
	shape.draw();
	observer.subscribe(shape);
}

var Circle=function(perimeter,x,y){
		this.rad=perimeter/(2*Math.PI);
		this.x=x;
		this.y=y;
		this.type="circle";
		this.drag=false;
}
Circle.prototype.draw=function(x,y){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';
      ctx.stroke();
}
var Square=function(perimeter,x,y){
		this.side=perimeter/4;
		this.x=x;
		this.y=y;
		this.type="square";
		this.drag=false;
}
Square.prototype.draw=function(x,y){
		var path=new Path2D();
		var x0=this.x-this.side/2;
		var y0=this.y-this.side/2;
		path.moveTo(x0,y0);
		path.lineTo(x0+this.side,y0);
		path.lineTo(x0+this.side,y0+this.side);
		path.lineTo(x0,y0+this.side);
		path.closePath();
		ctx.fillStyle = "blue";
		ctx.fill(path);	
		ctx.strokeStyle = '#003300';
		ctx.lineWidth =5;
		ctx.stroke(path);

		
}
var Triangle=function(perimeter,x,y){
		this.side=perimeter/3;
		this.x=x;
		this.y=y;
		this.type="triangle";
		this.drag=false;
	
}

Triangle.prototype.draw=function(x,y){
		var path=new Path2D();
		var x0=this.x-this.side/2;
		var y0=this.y-(this.side/2)*Math.tan(30/180*Math.PI);
		path.moveTo(x0,y0);
		path.lineTo(x0+this.side,y0);
		path.lineTo(x0+this.side/2,y0+Math.sqrt(Math.pow(this.side,2)-Math.pow(this.side/2,2)));
		path.closePath();
		ctx.fillStyle = "green";
		ctx.fill(path);	
		ctx.strokeStyle = '#003300';
		ctx.lineWidth =5;
		ctx.stroke(path);	
		
}
var observer=(function(){
	var callback=[];
	var index;
	var obj={
		subscribe:function(recall){
			callback.push(recall);
		},
		check:function(offX,offY){
			drag=false;
			index=0;
			var len=callback.length;
			if(len!=0)
			for(var i=(len-1);i>-1;i--){
				switch (callback[i].type){
					case 'square':
						if(callback[i].x-callback[i].side/2-2.5<=offX&&callback[i].x+callback[i].side/2+2.5>=offX&&callback[i].y-callback[i].side/2-2.5<=offY&&callback[i].y+callback[i].side/2+2.5>=offY)
						{
							drag=true;
							index=i;
						}break;
					case 'triangle':
						var x0=callback[i].x+callback[i].side/2;
						var y0=callback[i].y-(callback[i].side/2)*Math.tan(30/180*Math.PI);
						if(pointInTriangle(x0+5, y0-2.5, x0-callback[i].side/2, y0+6+Math.sqrt(Math.pow(callback[i].side,2)-Math.pow(callback[i].side/2,2)), x0-callback[i].side-5, y0-2.5, offX, offY))
						{
							drag=true;
							index=i;
						}break;
					case 'circle':
						if(Math.sqrt(Math.pow(callback[i].x-offX,2)+Math.pow(callback[i].y-offY,2))<=callback[i].rad+5)
						{
							drag=true;	
							index=i;
						}break;
					
				}
				if(drag)break;

			}
		
			if(drag){
				callback=callback.concat(callback.splice(index,1));
			}

		},
		notify:function(x,y){
			if(drag)
				for(var i=0;i<callback.length;i++){
					
					if(i==(callback.length-1)){
						callback[i].x=x;
						callback[i].y=y;
						
					}
					callback[i].draw();
				}
			
		}
		
	}
	
	return obj;
})()
function pointInTriangle(x1, y1, x2, y2, x3, y3, x, y)
{
 var denominator= (x1*(y2 - y3) + y1*(x3 - x2) + x2*y3 - y2*x3);
 var t1= (x*(y3 - y1) + y*(x1 - x3) - x1*y3 + y1*x3) / denominator;
 var t2 = (x*(y2 - y1) + y*(x1 - x2) - x1*y2 + y1*x2) / -denominator;
 var s = t1 + t2;
 
 return 0 <= t1 && t1 <= 1 && 0 <= t2 && t2 <= 1 && s <= 1;
}