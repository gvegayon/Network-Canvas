var Menu=function n(t){function e(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}var o={},i=[],s=!1,a=$(".menu-container");return o.options={onBeforeOpen:function(){$(".menu-btn").transition({opacity:0}),$(".menu-btn").hide(),$(".black").hide(),$(".arrow-right").transition({right:-550}),$(".arrow-left").transition({left:-550}),$(".content").addClass("pushed")},onAfterOpen:function(){return!1},onBeforeClose:function(){$(".content").removeClass("pushed")},onAfterClose:function(){$(".black").show(),$(".arrow-right").transition({right:0},1e3),$(".arrow-left").transition({left:0},1e3)}},o.getMenus=function(){return i},o.closeMenu=function(n){n.items.find(".icon-close").trigger("click")},o.toggle=function(n){var t=n.button[0].getBoundingClientRect(),e=$("."+n.name+"-menu"),i=$("."+n.name+"-menu-container");return e.addClass("no-transition"),e[0].style.left="auto",e[0].style.top="auto",s===!0?!1:(s=!0,n.expanded===!0?(o.options.onBeforeClose(),i.removeClass("active"),setTimeout(o.options.onAfterClose,500),s=!1):(o.options.onBeforeOpen(),i.addClass("active"),setTimeout(o.options.onAfterOpen,500),s=!1),void setTimeout(function(){e[0].style.left=t.left+"px",e[0].style.top=t.top+"px",n.expanded===!0?(e.removeClass("no-transition"),i.removeClass("open"),n.expanded=!1,$(".menu-btn").transition({opacity:1})):setTimeout(function(){e.removeClass("no-transition"),i.addClass("open"),n.expanded=!0},25)},25))},o.addMenu=function(n,t){var e={};e.name=n,e.expanded=!1,e.button=$('<span class="hi-icon menu-btn '+n+'" style="opacity:0"></span>'),e.button.addClass(t).html(n),a.append(e.button),e.button.css({top:-300});var s=n+"-menu",r=n+"-menu-container";return e.items=$('<div class="morph-button morph-button-sidebar morph-button-fixed '+r+'"><div class="morph-content '+s+'"><div><div class="content-style-sidebar"><span class="icon icon-close">Close the overlay</span><h2>'+n+"</h2><ul></ul></div></div></div></div>"),e.button.after(e.items),e.button.on("click",function(){o.toggle(e)}),e.items.find(".icon-close").on("click",function(){$(".menu-btn").show(),o.toggle(e)}),i.push(e),e.button.transition({top:0,opacity:1},1e3),e},o.removeMenu=function(n){n.button.transition({top:-300,opacity:0},1e3,function(){$(n.button).remove(),$(n.items).remove()})},o.addItem=function(n,t,e,i){var s=$('<li><a class="icon icon-server '+e+'" href="#">'+t+"</a></li>");n.items.find("ul").append(s),s.on("click",function(){i(),o.closeMenu(n)})},o.init=function(){notify("Menu initialising.",1),e(o.options,t)},o.init(),o};
//# sourceMappingURL=./menu-min.js.map