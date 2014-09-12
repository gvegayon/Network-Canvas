"use strict";var Canvas=function e(t){function n(e,t,n){for(;1.1*e.width()<t.width()-2*n;)e.fontSize(1.1*e.fontSize()),e.y((t.height()-e.height())/2);e.setX(t.getX()-e.getWidth()/2),e.setY(t.getY()-e.getHeight()/1.8)}var o,i,r,d,a,s={},c=[],l=!1,g=!1,w,u={blue:"#0174DF",placidblue:"#83b5dd",violettulip:"#9B90C8",hemlock:"#9eccb3",paloma:"#aab1b0",freesia:"#ffd600",cayenne:"#c40000",celosiaorange:"#f47d44",sand:"#ceb48d",dazzlingblue:"#006bb6",edge:"#e85657",selected:"gold"},f={defaultNodeSize:35,defaultNodeColor:u.blue,defaultEdgeColor:u.edge,concentricCircleColor:"#ffffff",concentricCircleNumber:4,nodeTypes:[{name:"Person",color:u.blue},{name:"OnlinePerson",color:u.hemlock},{name:"Organisation",color:u.cayenne},{name:"Professional",color:u.violettulip}]},h=function(e){s.addNode(e.detail)},m=function(e){s.addEdge(e.detail)},v=function(e){s.removeNode(e.detail)},y=function(e){s.removeEdge(e.detail)},p=function(e){if(!g&&(l||($(".new-node-form").addClass("node-form-open"),$(".content").addClass("blurry"),l=!0,$(".name-box").focus()),8!==e.which||$(e.target).is("input, textarea, div")||e.preventDefault(),13===event.which)){$(".new-node-form").removeClass("node-form-open"),$(".content").removeClass("blurry"),l=!1;var t={label:$(".name-box").val()};network.addNode(t),$(".name-box").val("")}},k=function(){s.destroy()};return s.init=function(){notify("Canvas initialising.",1),s.initKinetic(),s.drawUIComponents(),extend(f,t),w=menu.addMenu("Canvas","hi-icon-user"),menu.addItem(w,"Load Network","icon-globe",null),menu.addItem(w,"Create Random Graph","icon-globe",null),menu.addItem(w,"Download Network Data","icon-globe",null),menu.addItem(w,"Clear Graph","icon-globe",null),window.addEventListener("nodeAdded",h,!1),window.addEventListener("edgeAdded",m,!1),window.addEventListener("nodeRemoved",v,!1),window.addEventListener("edgeRemoved",y,!1),window.addEventListener("changeStageStart",k,!1);for(var e=0;e<session.returnData("nodes").length;e++)s.addNode(session.returnData("nodes")[e]);for(var n=0;n<session.returnData("edges").length;n++)s.addEdge({from:session.returnData("edges")[n].from,to:session.returnData("edges")[n].to})},s.destroy=function(){menu.removeMenu(w),$(".new-node-form").remove(),window.removeEventListener("nodeAdded",h,!1),window.removeEventListener("edgeAdded",m,!1),window.removeEventListener("nodeRemoved",v,!1),window.removeEventListener("edgeRemoved",y,!1),window.removeEventListener("changeStageStart",k,!1),$(document).off("keypress",p)},s.addNode=function(e){notify("Canvas is creating a node.",2),console.log(e);var t,o=Math.round(randomBetween(0,f.nodeTypes.length-1)),i=network.getNodes().length,a={coords:[$(window).width()+50,100],id:i,label:"Undefined",size:f.defaultNodeSize,type:f.nodeTypes[o].name,color:"rgba(0,0,0,0.8)",strokeWidth:3};extend(a,e),a.id=parseInt(a.id,10),a.type="Person";var l=new Kinetic.Group({id:a.id,x:a.coords[0],y:a.coords[1],name:a.label,edges:[],type:a.type,draggable:!0,dragDistance:10});switch(a.type){case"Person":t=new Kinetic.Circle({radius:a.size,fill:a.color,stroke:"white",strokeWidth:a.strokeWidth});break;case"Organisation":t=new Kinetic.Rect({width:2*a.size,height:2*a.size,fill:a.color,stroke:s.calculateStrokeColor(a.color),strokeWidth:a.strokeWidth});break;case"OnlinePerson":t=new Kinetic.RegularPolygon({sides:3,fill:a.color,radius:1.2*a.size,stroke:s.calculateStrokeColor(a.color),strokeWidth:a.strokeWidth});break;case"Professional":t=new Kinetic.Star({numPoints:6,fill:a.color,innerRadius:a.size-a.size/3,outerRadius:a.size+a.size/3,stroke:s.calculateStrokeColor(a.color),strokeWidth:a.strokeWidth})}var g=new Kinetic.Text({text:a.label,fontFamily:"Lato",fill:"white",align:"center",fontStyle:500});if(notify("Putting node "+a.label+" at coordinates x:"+a.coords[0]+", y:"+a.coords[1],2),l.on("dragstart",function(){notify("dragstart",1),this.attrs.oldx=this.attrs.x,this.attrs.oldy=this.attrs.y,this.moveToTop(),d.draw()}),l.on("dragmove",function(){notify("Dragmove",0);var e=a.id;$.each(r.children,function(t,n){if(n.attrs.from.id===e||n.attrs.to.id===e){var o=[s.getNodeByID(n.attrs.from.id).getX(),s.getNodeByID(n.attrs.from.id).getY(),s.getNodeByID(n.attrs.to.id).getX(),s.getNodeByID(n.attrs.to.id).getY()];n.attrs.points=o}}),r.draw()}),l.on("tap click",function(){var e=new CustomEvent("log",{detail:{eventType:"nodeClick",eventObject:this.attrs.id}});window.dispatchEvent(e),this.moveToTop(),d.draw()}),l.on("dbltap dblclick",function(){notify("double tap",1),c.push(this),console.log(c),2===c.length?(console.log(c),c[1].children[0].stroke("white"),c[0].children[0].stroke("white"),network.addEdge({from:c[0].attrs.id,to:c[1].attrs.id})===!1&&(notify("Canvas removing edge.",2),network.removeEdge(network.getEdges({from:c[0].attrs.id,to:c[1].attrs.id}))),c=[],d.draw()):(this.children[0].stroke(u.selected),d.draw())}),l.on("dragend",function(){notify("dragend",1);var e={},t={};e.x=this.attrs.oldx,e.y=this.attrs.oldy,t.x=this.attrs.x,t.y=this.attrs.y;var n={from:e,to:t},o=this,i=new CustomEvent("log",{detail:{eventType:"nodeMove",eventObject:n}});window.dispatchEvent(i),network.setProperties(network.getNode(o.attrs.id),{coords:[o.attrs.x,o.attrs.y],type:o.attrs.type,color:o.attrs.color}),delete this.attrs.oldx,delete this.attrs.oldy}),n(g,t,10),l.add(t),l.add(g),d.add(l),console.log(l),d.draw(),!e.coords){var w=new Kinetic.Tween({node:l,x:$(window).width()-150,y:100,duration:.7,easing:Kinetic.Easings.EaseOut});w.play(),network.setProperties(network.getNode(a.id),{coords:[$(window).width()-150,100]})}return l},s.addEdge=function(e){notify("Canvas is adding an edge.",2);var t=network.getNode(e.from),n=network.getNode(e.to),o=[t.coords[0],t.coords[1],n.coords[0],n.coords[1]],i=new Kinetic.Line({strokeWidth:2,opacity:1,stroke:f.defaultEdgeColor,from:t,to:n,points:o});return r.add(i),r.draw(),d.draw(),notify("Created Edge between "+t.label+" and "+n.label,"success",2),!0},s.removeEdge=function(e){var t=network.getNode(e.from),n=network.getNode(e.to);notify("Removing edge."),$.each(s.getKineticEdges(),function(e,o){console.log(e),console.log(o),(o.attrs.from===t&&o.attrs.to===n||o.attrs.from===n&&o.attrs.to===t)&&(r.children[e].remove(),r.draw())})},s.clearGraph=function(){r.removeChildren(),r.clear(),d.removeChildren(),d.clear()},s.initKinetic=function(){o=new Kinetic.Stage({container:"kineticCanvas",width:window.innerWidth,height:window.innerHeight}),i=new Kinetic.Layer,d=new Kinetic.Layer,r=new Kinetic.Layer,a=new Kinetic.Layer,o.add(i),o.add(r),o.add(d),o.add(a),notify("Kinetic stage initialised.",1)},s.drawUIComponents=function(){for(var e,t,n=f.concentricCircleColor,o=window.innerHeight-2*f.defaultNodeSize,r=.1,d=0;d<f.concentricCircleNumber;d++){var c=1-d/f.concentricCircleNumber,l=o/2*c;t=new Kinetic.Circle({x:window.innerWidth/2,y:window.innerHeight/2,radius:l,stroke:"white",strokeWidth:1.5,opacity:0}),e=new Kinetic.Circle({x:window.innerWidth/2,y:window.innerHeight/2,radius:l,fill:n,opacity:r,strokeWidth:0}),r+=(.3-r)/f.concentricCircleNumber,i.add(e),i.add(t)}var g=new Kinetic.Circle({radius:50,stroke:"#666",strokeWidth:0,y:window.innerHeight-100,x:100});g.on("click tap",function(){}),a.add(g),i.draw(),a.draw(),s.initNewNodeForm(),notify("User interface initialised.",1)},s.initNewNodeForm=function(){var e=$('<div class="new-node-form"></div>'),t=$('<div class="new-node-inner"></div>');e.append(t),t.append("<h1>Add a new contact</h1>"),t.append("<p>Some text accompanying the node creation box.</p>"),t.append('<input type="text" class="form-control name-box"></input>'),$(".content").after(e),$(document).on("keypress",p)},s.getKineticNodes=function(){return d.children},s.getKineticEdges=function(){return r.children},s.getSimpleNodes=function(){var e={},t=s.getKineticNodes();return $.each(t,function(t,n){e[n.attrs.id]={},e[n.attrs.id].x=n.attrs.x,e[n.attrs.id].y=n.attrs.y,e[n.attrs.id].name=n.attrs.name,e[n.attrs.id].type=n.attrs.type,e[n.attrs.id].size=n.attrs.size,e[n.attrs.id].color=n.attrs.color}),e},s.getSimpleEdges=function(){var e={},t=0;return $.each(r.children,function(n,o){e[t]={},e[t].from=o.attrs.from.attrs.id,e[t].to=o.attrs.to.attrs.id,t++}),e},s.getSimpleEdge=function(e){var t=s.getSimpleEdges();if(!e)return!1;var n=t[e];return n},s.getEdgeLayer=function(){return r},s.getNodeByID=function(e){var t={},n=s.getKineticNodes();return $.each(n,function(n,o){o.attrs.id===e&&(t=o)}),t},s.getNodeColorByType=function(e){var t=null;return $.each(f.nodeTypes,function(n,o){o.name===e&&(t=o.color)}),t?t:!1},s.init(),s};