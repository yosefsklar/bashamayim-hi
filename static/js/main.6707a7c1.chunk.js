(this["webpackJsonpbashamayim-hi"]=this["webpackJsonpbashamayim-hi"]||[]).push([[0],{115:function(e,t,i){e.exports=i.p+"static/media/cloudbackgroundRed2.f597f276.png"},116:function(e,t,i){e.exports={Modal:"Modal_Modal__1Obd6"}},119:function(e,t,i){e.exports=i(319)},124:function(e,t,i){},125:function(e,t,i){e.exports=i.p+"static/media/logo.5d5d9eef.svg"},126:function(e,t,i){},313:function(e){e.exports=JSON.parse('{"general":{"screen":{"width":"","height":""}},"block":{"color":"","textColor":""},"easy":{"blockFreq":{},"powerUps":{"spring":40,"springBoots":120,"orbBack":30,"orbForward":35},"blockTypeFreq":{"sideways":5,"rising":5},"wordTypeFreq":{"spike":20}},"hard":{"blockTypeFreq":{"sideways":5,"rising":5},"powerUps":{"spring":40,"springBoots":120,"orbBack":30,"orbForward":35},"wordTypeFreq":{"spike":25}}}')},314:function(e,t,i){e.exports={scrollable_menu:"GameCustomText_scrollable_menu__2-jTm"}},319:function(e,t,i){"use strict";i.r(t);var a=i(0),s=i.n(a),r=i(114),o=i.n(r),n=(i(124),i(1)),d=(i(125),i(126),i(4)),l=i(22),h=i(43),c=i(42),u=function(){function e(){Object(d.a)(this,e),this.stripCantillation=function(e){return e.replace(/[\u0591-\u05AF\u05c0]|\(\u05e4\)|\(\u05e1\)|\[(.*?)]/g,"").split(/[\s\u05BE]+/)}}return Object(l.a)(e,[{key:"removeHTML",value:function(e){return e.map((function(e){return e.replace(/<\s*a[^>]*>(.*?)<\s*\/\s*a>/g,"").replace(/<[^>]*>/g,"")}))}},{key:"stripVowels",value:function(e){return e.replace(/[\u0591-\u05C7]/g,"")}},{key:"shuffleArray",value:function(e){for(var t=e.length-1;t>0;t--){var i=Math.floor(Math.random()*(t+1)),a=[e[i],e[t]];e[t]=a[0],e[i]=a[1]}}}]),e}(),p=function e(){var t=this;Object(d.a)(this,e),this.screenHeight=window.screen.height-125,this.screenWidth=this.screenHeight*(5/8),this.roundedRect=function(e,t,i,a,s,r){e.beginPath(),e.moveTo(t,i+r),e.lineTo(t,i+s-r),e.arcTo(t,i+s,t+r,i+s,r),e.lineTo(t+a-r,i+s),e.arcTo(t+a,i+s,t+a,i+s-r,r),e.lineTo(t+a,i+r),e.arcTo(t+a,i,t+a-r,i,r),e.lineTo(t+r,i),e.arcTo(t,i,t,i+r,r),e.fill(),e.stroke()},this.downwardTriangle=function(e,t,i,a,s){e.beginPath(),e.moveTo(t,i),e.lineTo(t+s,i+a),e.lineTo(t+2*s,i),e.fill()},this.adjustY=function(e){return e/800*t.screenHeight},this.adjustX=function(e){return e/600*t.screenWidth}},y=new p,g=function e(t,i,a,s,r,o,n,l){var h=this;Object(d.a)(this,e),this.width=y.adjustX(125),this.height=y.adjustY(25),this.directionH="right",this.directionV="down",this.riseCount=0,this.passedText=!1,this.highlight=!1,this.moveTime=10,this.broken=!1,this.color="#00bfff",this.killed=!1,this.draw=function(e){e.fillStyle=h.color,h.passedText?(h.color="#0a13ff",e.fillStyle=h.color):h.last?(h.color="#a38841",e.fillStyle=h.color):h.highlight&&(h.color="#5EFF16",e.fillStyle=h.color),y.roundedRect(e,h.x,h.y,h.width,h.height,y.adjustX(5),"black"),e.font="bold "+y.adjustX(22)+"px'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",e.fillStyle="white","#5EFF16"===h.color&&(e.fillStyle="#090524"),e.textAlign="center",e.fillText(h.word,h.x+h.width/2,h.y+h.height/4*3),"spring"===h.powerup?(e.fillStyle="grey",e.fillRect(h.x+y.adjustX(35),h.y-y.adjustY(10),y.adjustX(30),y.adjustY(10))):"springBoots"===h.powerup?(e.fillStyle="blue",e.fillRect(h.x+y.adjustX(55),h.y-y.adjustY(25),y.adjustX(15),y.adjustY(10)),e.fillRect(h.x+y.adjustX(35),h.y-y.adjustY(25),y.adjustX(15),y.adjustY(10)),e.fillStyle="grey",e.fillRect(h.x+y.adjustX(55),h.y-y.adjustY(15),y.adjustX(15),y.adjustY(15)),e.fillRect(h.x+y.adjustX(35),h.y-y.adjustY(15),y.adjustX(15),y.adjustY(15))):"orbBackward"==h.powerup?(e.beginPath(),e.arc(h.x+h.width/2,h.y-y.adjustY(15),10,0,2*Math.PI),e.fillStyle="white",e.fill(),e.stroke()):"orbForward"==h.powerup?(e.beginPath(),e.arc(h.x+h.width/2,h.y-y.adjustY(15),10,0,2*Math.PI),e.fillStyle="#5EFF16",e.fill(),e.stroke()):"spike"==h.wordType&&(e.fillStyle="grey",y.downwardTriangle(e,h.x+y.adjustX(.2*h.width),h.y+h.height,y.adjustY(15),y.adjustY(15)),y.downwardTriangle(e,h.x+y.adjustX(.6*h.width),h.y+h.height,y.adjustY(15),y.adjustY(15)),y.downwardTriangle(e,h.x+y.adjustX(1*h.width),h.y+h.height,y.adjustY(15),y.adjustY(15)))},this.update=function(){"sideways"===h.type?(h.x>=y.screenWidth-h.width?h.directionH="left":h.x<=0&&(h.directionH="right"),"right"===h.directionH?h.x+=y.adjustX(2.5):h.x-=y.adjustX(2.5)):"rising"===h.type&&("down"===h.directionV&&70===h.riseCount?(h.directionV="up",h.riseCount=0):"up"===h.directionV&&70===h.riseCount&&(h.directionV="down",h.riseCount=0),h.riseCount=h.riseCount+1,"down"===h.directionV?h.y+=y.adjustX(1.25):h.y-=y.adjustX(1.25)),"spike"===h.wordType&&("right"===h.directionH?(h.x+=y.adjustX(1),h.moveTime-=1,0===h.moveTime&&(h.directionH="left",h.moveTime=10)):(h.x-=y.adjustX(1),h.moveTime-=1,0===h.moveTime&&(h.directionH="right",h.moveTime=10)))},this.x=t,this.y=i,this.powerup=a,this.type=s,this.word=r,this.wordType=o,this.wordIndex=n,this.last=l},f=i(118),w=new p,x=new g,m=function e(t,i,a,s){var r=this;Object(d.a)(this,e),this.decoyIndex=0,this.textIndex=0,this.setIndex=function(e){r.textIndex=e},this.blockSpawner=function(e,t,i,a,s){var o;for(o=0===e?1:e;o<e+60;o++)if(o>=t.length){var n,d,l,h,c=0,u=void 0,p=void 0;u="decoyWord"===t[o-1].wordType||"spike"===t[o-1].wordType?"decoyWord"===t[o-2].wordType||"spike"===t[o-1].wordType?"textWord":r.spawnWordType(o):"textWord"===t[o-1].wordType&&null!=t[o-2]&&"textWord"===t[o-2].wordType&&null!=t[o-3]&&"textWord"===t[o-3].wordType?"decoyWord":r.spawnWordType(),n=r.spawnBlockType(),0!==c||"textWord"===u&&(c=r.spawnPowerup(r.level));var y=r.attributeWordToBlock(u),m=Object(f.a)(y,3);d=m[0],u=m[1],l=m[2],h=Math.random()*(w.screenWidth-x.width),p="decoyWord"===u||"decoyWord"===t[o-1].wordType?t[o-1].y-(Math.random()*(w.adjustY(50)+a*w.adjustY(10))+w.adjustY(30)+i)*(2/3):"spike"===u?t[o-1].y-(Math.random()*(w.adjustY(50)+a*w.adjustY(10))+w.adjustY(50)+i):"spike"===t[o-1].wordType?t[o-1].y-(Math.random()*(w.adjustY(20)+a*w.adjustY(10))+w.adjustY(10)+i):"sideways"===t[o-1].type||"rising"===t[o-1].type?t[o-1].y-(Math.random()*(w.adjustY(45)+a*w.adjustY(10))+w.adjustY(40)+i):"textWord"===t[o-1].wordType?t[o-1].y-(Math.random()*(w.adjustY(45)+a*w.adjustY(10))+w.adjustY(75)+i):t[o-1].y-(Math.random()*(w.adjustY(45)+a*w.adjustY(10))+w.adjustY(25)+i);var j=!1;if(r.textIndex===s.length){if("decoyWord"==u)break;j=!0}if(r.textIndex>s.length)break;console.log(l);var b=new g(h,p,c,n,d,u,l,j);t.push(b)}for(var k=0;k<e-2;k++)t.shift()},this.spawnPowerup=function(e){var t={easy:{spring:r.config.easy.spring,springBoots:r.config.easy.springBoots,orbBack:r.config.easy.orbBack,orbForward:r.config.easy.orbForward},hard:{spring:r.config.hard.spring,springBoots:r.config.hard.springBoots,orbBack:r.config.hard.orbBack,orbForward:r.config.hard.orbForward}};return 0===Math.round(Math.random()*t[e].spring)?"spring":0===Math.round(Math.random()*t[e].springBoots)?"springBoots":0===Math.round(Math.random()*t[e].orbBackward)?"orbBackward":0===Math.round(Math.random()*t[e].orbForward)?"orbForward":0},this.spawnBlockType=function(){var e=r.config.hard.blockTypeFreq.sideways,t=r.config.hard.blockTypeFreq.rising;return Math.round(Math.random()*e)===e?"sideways":Math.round(Math.random()*t)===t?(console.log("rising block created "+r.textIndex),"rising"):"regular"},this.spawnWordType=function(e){var t=r.config.hard.wordTypeFreq.spike,i=1;return e>5&&Math.round(Math.random()*t)===t?"spike":Math.round(Math.random()*i)===i?"textWord":"decoyWord"},this.attributeWordToBlock=function(e){var t,i;return"textWord"===e?(t=r.mainText[r.textIndex],i=r.textIndex,r.textIndex++):"decoyWord"===e?(t="hard"===r.level?r.decoyText[r.decoyIndex]:r.decoyIndex%2===0?"\u05d1\u05e9\u05de\u05d9\u05dd \u05d4\u05d9\u05d0":"",i=r.decoyIndex,r.decoyIndex++):(i=0,t=""),[t,e,i]},this.level=t,this.mainText=i,this.decoyText=a,this.config=s},j=i(44),b=i.n(j),k=new p,v=function e(t,i,a,s){var r=this;Object(d.a)(this,e),this.x=k.adjustX(300),this.y=k.adjustY(550),this.width=k.adjustX(80),this.height=k.adjustY(80),this.xSpeed=k.adjustX(6.7),this.ySpeed=0,this.springBootsDurability=0,this.orbDurability=0,this.yDistanceTravelled=0,this.direction="left",this.dead=!1,this.win=!1,this.highestWordIndex=0,this.update=function(e,t,i,a,s,o,n){if(r.dead)s.font="bold "+k.adjustX(54)+"px 'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",s.fillStyle="#090524",s.textAlign="center",s.strokeStyle="black",s.lineWidth=1,s.fillText("Game Over:",k.screenWidth/2,k.screenHeight/2),s.strokeText("Game Over:",k.screenWidth/2,k.screenHeight/2),s.font="bold "+k.adjustX(36)+"px 'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",s.fillStyle="#5EFF16",s.fillText("Press 'c' to Continue",k.screenWidth/2,k.screenHeight/2+50),s.strokeText("Press 'c' to Continue",k.screenWidth/2,k.screenHeight/2+50),s.fillText("Press 'n' to Start a New Game",k.screenWidth/2,k.screenHeight/2+100),s.strokeText("Press 'n' to Start a New Game",k.screenWidth/2,k.screenHeight/2+100);else if(r.win)r.ySpeed=0,r.xSpeed=0,s.font="bold "+k.adjustX(45)+"px 'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",s.fillStyle="#090524",s.textAlign="center",s.strokeStyle="black",s.lineWidth=1,s.fillText("Congradulations!",k.screenWidth/2,k.screenHeight/2),s.strokeText("Congradulations!",k.screenWidth/2,k.screenHeight/2),s.font="bold "+k.adjustX(36)+"px 'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",s.fillStyle="#5EFF16",s.fillText("Press 'n' to Start a New Game",k.screenWidth/2,k.screenHeight/2+100),s.strokeText("Press 'n' to Start a New Game",k.screenWidth/2,k.screenHeight/2+100);else{if(r.ySpeed+=r.gravity,r.y<=k.screenHeight/2-k.adjustY(100)&&r.ySpeed<=0)for(var d=0;d<i.length;d++)i[d].y-=r.ySpeed;else r.y+=r.ySpeed;r.yDistanceTravelled-=r.ySpeed}o&&(r.direction="left",r.img.src=b.a,r.moveLeft()),n&&(r.direction="right",r.img.src=b.a,r.moveRight());for(var l=0;l<i.length;l++)r.ySpeed>=0&&r.x>=i[l].x-r.width+k.adjustX(15)&&r.x<=i[l].x+i[l].width-k.adjustX(15)&&r.y>=i[l].y-r.height&&r.y<=i[l].y+i[l].height-r.height&&("decoyWord"===i[l].wordType?i[l].broken=!0:"spike"===i[l].wordType?(r.jump(i,l,e),i[l].wordType="wordText",i[l].word="",i[l].color="red"):(i[l].last&&(console.log("Win"),r.win=!0),r.jump(i,l,e))),r.y>i[l].y&&"spike"===i[l].wordType&&r.x>=i[l].x-r.width+k.adjustX(28)&&r.x<=i[l].x+i[l].width-k.adjustX(28)&&r.y>=i[l].y-i[l].height&&r.y<=i[l].y+i[l].height&&(r.dead=!0);for(var h=i.length-1;h>0;h--)if(i[h].y>k.screenHeight){r.setLowestBlock(h+1),e=h+1;break}(r.y>=i[e].y||r.y>=k.screenHeight)&&(r.dead=!0),e>=45&&(t<0&&(t+=1),r.BSpawn.blockSpawner(e,i,a,t,r.mainText))},this.jump=function(e,t,i){"textWord"===e[t].wordType&&(console.log("high "+r.highestWordIndex),r.highestWordIndex=Math.max(r.highestWordIndex,e[t].wordIndex),console.log("word "+e[t].wordIndex),console.log(Math.max(r.highestWordIndex,e[t].wordIndex)));var a=e[t],s=a.powerup,o=(a.type,a.wordType);if(r.ySpeed=k.adjustY(-11.5),"springBoots"===s&&(r.springBootsDurability=6),"orbBackward"===s&&(r.orbDurability=10),0!==r.orbDurability){for(var n=i;n<e.length;n++){if(e[n].y<=r.y+r.height-e[n].height){a.powerup=0;break}"decoyWord"!==e[n].wordType&&(e[n].passedText=!0)}r.orbDurability-=1}if("orbForward"===s){for(var d=t+1,l=0;l<5;){for(;"decoyWord"===e[d].wordType;)d++;e[d].highlight=!0,d++,l++}a.powerup=0}"textWord"===o&&"spring"===s&&(r.ySpeed=k.adjustY(-14)),0!==r.springBootsDurability&&(r.ySpeed=k.adjustY(-13),r.springBootsDurability-=1)},this.moveLeft=function(){r.x-=r.xSpeed,r.x<=-r.width&&(r.x=k.screenWidth)},this.moveRight=function(){r.x+=r.xSpeed,r.x>=k.screenWidth&&(r.x=-r.width)},this.draw=function(e){e.drawImage(r.img,r.x,r.y,r.width,r.height),0!==r.springBootsDurability&&("right"===r.direction?(e.fillStyle="blue",e.fillRect(r.x+k.adjustX(10),r.y+k.adjustY(66),k.adjustX(15),k.adjustY(10)),e.fillRect(r.x+k.adjustX(33),r.y+k.adjustY(66),k.adjustX(15),k.adjustY(10)),e.fillStyle="grey",e.fillRect(r.x+k.adjustX(10),r.y+k.adjustY(76),k.adjustX(15),k.adjustY(15)),e.fillRect(r.x+k.adjustX(33),r.y+k.adjustY(76),k.adjustX(15),k.adjustY(15))):(e.fillStyle="blue",e.fillRect(r.x+k.adjustX(30),r.y+k.adjustY(66),k.adjustX(15),k.adjustY(10)),e.fillRect(r.x+k.adjustX(53),r.y+k.adjustY(66),k.adjustX(15),k.adjustY(10)),e.fillStyle="grey",e.fillRect(r.x+k.adjustX(30),r.y+k.adjustY(76),k.adjustX(15),k.adjustY(15)),e.fillRect(r.x+k.adjustX(53),r.y+k.adjustY(76),k.adjustX(15),k.adjustY(15))))},this.img=new Image,this.img.src=b.a,this.gravity=t,this.setLowestBlock=i,this.BSpawn=a,this.mainText=s},S=i(115),T=i.n(S),B=new p,Y=function e(t,i,a,s,r,o,n,l,h){var c=this;Object(d.a)(this,e),this.holdingLeftKey=!1,this.holdingRightKey=!1,this.dead=!1,this.difficulty=0,this.score=0,this.gravity=B.adjustY(.25),this.lowestBlock=0,this.blocks=[],this.blockOffset=B.adjustY(50),this.fps=60,this.then=Date.now(),this.interval=1e3/this.fps,this.reported=!1,this.id="",this.keydown=function(e){37===e.keyCode?c.holdingLeftKey=!0:39===e.keyCode?c.holdingRightKey=!0:67===e.keyCode&&c.player.dead&&(c.blocks=[],c.lowestBlock=0,c.difficulty=0,c.score=0,c.player.springBootsDurability=0,c.blocks.push(new g),c.blocks[0].x=B.adjustX(300),c.blocks[0].y=B.adjustY(650),c.blocks[0].type=0,c.blocks[0].powerup=0,c.blocks[0].word="",c.reported=!1,c.BSpawn.setIndex(c.player.highestWordIndex),c.BSpawn.blockSpawner(c.lowestBlock,c.blocks,c.blockOffset,c.difficulty,c.mainText),c.player.yDistanceTravelled=0,c.player.x=B.adjustX(300),c.player.y=B.adjustY(550),c.player.dead=!1,c.continueGame()),78===e.keyCode&&(c.player.dead||c.player.win)&&c.newGame()},this.keyup=function(e){37===e.keyCode?c.holdingLeftKey=!1:39===e.keyCode&&(c.holdingRightKey=!1)},this.showScore=function(e,t,i){e>t&&(c.score=Math.round(e)),i.font="bold 36px Arial",i.fillStyle="black",i.textAlign="left",i.fillText(t,18,40)},this.setFirstBlock=function(e){var t=B.adjustX(300),i=B.adjustY(650);e.push(new g(t,i,0,0,""))},this.setLowestBlock=function(e){c.lowestBlock=e},this.exitGame=function(){c.playing=!1},this.loop=function(){if(c.playing&&requestAnimationFrame(c.loop),c.now=Date.now(),c.delta=c.now-c.then,c.delta>c.interval){var e=new Image;e.src=T.a,c.ctx.fillStyle="#ffefe4",c.ctx.fillRect(0,0,B.screenWidth,B.screenHeight),c.ctx.drawImage(e,0,0,B.screenWidth,B.screenHeight),c.ctx.fill();for(var t=0;t<c.blocks.length;t++)c.blocks[t].broken||(c.blocks[t].update(),c.blocks[t].draw(c.ctx));c.player.update(c.lowestBlock,c.difficulty,c.blocks,c.blockOffset,c.ctx,c.holdingLeftKey,c.holdingRightKey),c.player.dead||c.player.draw(c.ctx),c.setIndex(c.player.highestWordIndex),c.showScore(c.player.yDistanceTravelled,c.score,c.ctx),c.ctx.fill(),c.then=c.now-c.delta%c.interval}c.player.dead&&(c.reported,c.reported=!0)},console.log(a),this.mainText=a,this.ctx=t.getContext("2d"),t.width=B.screenWidth,t.height=B.screenHeight,window.addEventListener("keydown",this.keydown,!1),window.addEventListener("keyup",this.keyup,!1),this.config=h,this.BSpawn=new m(i,a,s,this.config),this.level=i,this.setFirstBlock(this.blocks),this.player=new v(this.gravity,this.setLowestBlock,this.BSpawn,this.mainText),this.BSpawn.blockSpawner(this.lowestBlock,this.blocks,this.blockOffset,this.difficulty,this.mainText),this.id=r,this.newGame=o,this.continueGame=n,this.setIndex=l,this.playing=!0,this.loop()},W={Genesis:50,Exodus:40,Leviticus:27,Numbers:36,Deuteronomy:34,Joshua:24,Judges:21,I_Samuel:31,II_Samuel:24,I_Kings:22,II_Kings:25,Isaiah:66,Jeremiah:52,Ezekiel:48,Hosea:14,Joel:4,Amos:9,Obadiah:1,Jonah:4,Micah:7,Nahum:3,Habakkuk:3,Zephaniah:3,Haggai:2,Zechariah:14,Malachi:3,Psalms:150,Proverbs:31,Job:42,Song_of_Songs:8,Ruth:4,Lamentations:5,Ecclesiastes:12,Esther:10,Daniel:12,Ezra:10,Nehemiah:13,I_Chronicles:29,II_Chronicles:36},X=(i(127),i(313)),I=new u,C=(a.Component,i(314),i(116)),M=i.n(C),F=function(e){return s.a.createElement("div",{className:M.a.Modal},e.children)},_=i(5),H=i.n(_),N=function(e){var t=s.a.createElement("h3",null,e.title);return s.a.createElement("div",{className:"col"},e.title&&t,s.a.createElement("button",{className:H.a.Btn+" "+H.a.Config+" "+H.a.Wide,onClick:function(){return e.setConfig(e.response)}},e.children))},E=function(e){var t=s.a.createElement("div",{className:"row"},s.a.createElement(N,{setConfig:e.setParsha,title:"Parshat Hashavua"},e.parsha.textName));return s.a.createElement(F,null,s.a.createElement("h1",null,"Game: \u05d1\u05e9\u05de\u05d9\u05dd \u05d4\u05d9\u05d0"),s.a.createElement("p",null,"Select a text"),t)},R=function(e){Object(h.a)(i,e);var t=Object(c.a)(i);function i(e){var a;return Object(d.a)(this,i),(a=t.call(this,e)).retrieveParsha=function(e,t){var i=e.calendar_items[t].url.split("-")[0].split("."),s=i[0],r=parseInt(i[1]),o=e.calendar_items[t].displayValue.en.split("-")[0],n=e.calendar_items[t].url.split("-")[0].split(".")[0]+e.calendar_items[t].url.split("-")[1];a.setState({parsha:new D(s,r,o,n)})},a.setParsha=function(){a.setState({textUrlName:a.state.parsha.textUrlName,startChapter:a.state.parsha.startChapter})},a.setGameDefault=function(){a.setState({textUrlName:"",startChapter:"Chapters",textName:"Sefarim",startVerse:0,endChapter:0,endVerse:0,level:"",gameNumber:a.state.gameNumber+1})},a.continueGame=function(){console.log("Continue game")},a.state={textUrlName:"",startChapter:"Chapters",startVerse:0,endChapter:0,endVerse:0,textName:"Sefarim",parsha:new D("",0,"",0),gameDefault:!0,gameStart:!1},a}return Object(l.a)(i,[{key:"componentDidMount",value:function(){var e=this;return fetch("https://www.sefaria.org/api/calendars").then((function(e){return e.json()})).then((function(t){e.retrieveParsha(t,t.calendar_items.findIndex((function(e){return"Parashat Hashavua"===e.title.en}))),e.setGameDefault()})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return s.a.createElement(E,{setParsha:this.setParsha,parsha:this.state.parsha,textUrlName:this.state.textUrlName,startChapter:this.state.startChapter})}}]),i}(a.Component),D=function e(t,i,a,s){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;Object(d.a)(this,e),this.textUrlName=t,this.startChapter=i,this.textName=a,this.endChapter=s,this.startVerse=r,this.endVerse=o};var O=function(){return s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"App"},s.a.createElement(n.c,null,s.a.createElement(n.a,{path:"/",component:R}))))},P=i(41);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(P.a,null,s.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},44:function(e,t,i){e.exports=i.p+"static/media/SRHirsch.0135d99e.png"},5:function(e,t,i){e.exports={Btn:"Buttons_Btn__1kwGj",Answer:"Buttons_Answer__3McP4",Big:"Buttons_Big__1yiXM",Config:"Buttons_Config__1lmL9",Small:"Buttons_Small__3mr-4",Wide:"Buttons_Wide__g8D7l"}}},[[119,1,2]]]);
//# sourceMappingURL=main.6707a7c1.chunk.js.map