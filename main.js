
//https://qiita.com/teloppy_com/items/cd483807813af5a4a38aに感謝
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒
function marurect(size,ctx,x,y,sx,sy) {

  
  marusa=10*size/100
  if(sx==sy) {
    marusa=marusa/2
  }
  ctx.fillRect(x+marusa/2,y,sx-marusa,sy)
  ctx.fillRect(x,y+marusa/2,sx,sy-marusa)

  marusa=marusa/2
  ctx.beginPath();
  ctx.arc(x+marusa,y+marusa,marusa,0,6.3);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x+sx-marusa,y+marusa,marusa,0,6.3);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x+marusa,y+sy-marusa,marusa,0,6.3);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x+sx-marusa,y+sy-marusa,marusa,0,6.3);
  ctx.closePath();
  ctx.fill();
}
function Getcookie(name) {
  if(Checkcookie(name)){
    return (document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1]);
  }
  else{
    return -1
  }
}
function Removecookie(name) {
  document.cookie=name+"=-1; expires=0"
}
function Addcookie(name,item) {
  if(Checkcookie(name)) {
    Removecookie(name)
  }
  document.cookie=name+"="+item
}
function Checkcookie() {
  if (
    document.cookie.split(";").some((item) => item.trim().startsWith("reader="))
  ) {
    return true
  }else{
    return false
}
async function gamemain() {
    if(!Checkcookie("is_denwa_style")){
      Addcookie("is_denwa_style","no")
    }
    if(!Checkcookie("is_noenter")){
      Addcookie("is_noenter","no")
    }
  
    // 画面の大きさ = 750 x 1000
    let scene = "title";

    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.addEventListener('mousedown', (e) => {(touched=e)});
    var touched=false;
    ninnzuu=3;



    //setting
    denwa=false
    deleteenter=false
    if(Getcookie("is_denwa_style")=="yes") {
      denwa=true
    }
    if(Getcookie("is_noenter")=="yes") {
      deleteenter=true
    }
    while (true) {
      let begin = Date.now();
      //let zoom_value = window.devicePixelRatio;
      let w=window.innerWidth;
      let h=window.innerHeight;
      for(i=0;i<10000;i++) {
        if(i>w || i*1.5>h) {
          canvas.width=i-1;
          canvas.height=i*1.5-1.5;
          break;
        }
        
      }
      let size = i;
      ctx.fillStyle="rgb(27, 72, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (scene=="title") {
        ctx.textAlign="center";
        ctx.textBaseline="top";
        ctx.font = 24*size/100+"px sans-serif";
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.fillText("モルック", size/2, 0);


        ctx.fillStyle="rgb(175, 137, 0)";
        marurect(size,ctx, size*0.2,0.6*size,  size*0.6,0.15*size);
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.font = 12*size/100+"px sans-serif";
        ctx.fillText("開始", size/2, 0.6*size);

        ctx.fillStyle="rgb(175, 137, 0)";
        marurect(size,ctx, size*0.2,0.75*size,  size*0.6,0.15*size);
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.font = 12*size/100+"px sans-serif";
        ctx.fillText("設定", size/2, 0.75*size);
        
        //7 9 8 .
        //5 11126
        //3 104 .
        //. 1 2 .
        t = ["7","9","8",".","5","11","12","6","3","10","4",".",".","1","2","."];
        for(let i=0;i<4;i++) {
          for(let u=0;u<4;u++) {
            if(t[i+u*4]!="."){
              ctx.fillStyle="rgb(175, 137, 0)";
              x2=size/2+i*size/10+((1-u%2)*size/20)-size/6.5;
              y2=size+u*size/11;

              ctx.beginPath();
              ctx.arc(x2,y2,size/20,0,6.3);
              ctx.closePath();
              ctx.fill();
              ctx.fillStyle="rgb(255, 255, 255)";
              ctx.textBaseline="middle";
              ctx.font = 24*size/300+"px sans-serif";
              ctx.fillText(t[i+u*4], x2, y2);
            }
            
          }
        }
        
        if (touched!=false) {
          let y=touched.offsetY;
          if(0.6*size < y && y < 0.75*size) {
            scene="player";
          }
          if(0.75*size < y && y < 0.9*size) {
            scene="setting";
          }
          touched=false;
        }
      }
      else if (scene=="setting") {
        //////////////////////////////////////////////////////////////////////////////////////setting
        ctx.textBaseline="top";
        ctx.textAlign="center";

        text_=["電話","電卓","エンター使用切り替え","戻る"]
        for(i=0;i<text_.length;i++) {
          ctx.fillStyle="rgb(175, 137, 0)";
          marurect(size,ctx, size*0.2,    (i*0.15+0.75)*size,  size*0.6,0.15*size);
          ctx.fillStyle="rgb(255, 255, 255)";
          ctx.font = 12*size/100+"px sans-serif";
          if(i==2) {
            ctx.font = 6*size/100+"px sans-serif";
          }
          ctx.fillText(text_[i], size/2, (i*0.15+0.75)*size);
        }

        t=["10点","11点","12点","0点","7点","8点","9点","直す","4点","5点","6点","決定","1点","2点","3点",""]
        if(denwa) {
          t=["1点","2点","3点","0点","4点","5点","6点","直す","7点","8点","9点","決定","10点","11点","12点",""]
        }
        if(!deleteenter){
          x_  = 3*(size/4)
          y_  = 2*(size/6)
          sx_ = size/4-(size/100)
          sy_ = (size/6-(size/100))*2
          ctx.fillStyle="rgb(175, 137, 0)";
          marurect(size,ctx,x_,y_,sx_,sy_)
        }
        for(let i=0;i<4;i++) {
          for(let p=0;p<4;p++) {
            if(deleteenter) {
              if(i==3 && (p==2 || p==3)) {
                continue;
              }
            }
            ctx.fillStyle="rgb(175, 137, 0)";
            x_  = i*(size/4)
            y_  = p*(size/6)
            sx_ = size/4-(size/100)
            sy_ = size/6-(size/100)

            marurect(size,ctx,x_,y_,sx_,sy_)

            ctx.fillStyle="rgb(255, 255, 255)";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.font = 24*size/300+"px sans-serif";
            ctx.fillText(t[i+p*4], x_+sx_/2,y_+sy_/2);
          }
        }
        if (touched!=false) {
          let y=touched.offsetY;
          if(0.75*size < y && y < 0.9*size) {
            denwa=true
            Addcookie("is_denwa_style","yes")
          }
          if(0.9*size < y && y < 1.05*size) {
            denwa=false
            Addcookie("is_denwa_style","no")
          }
          if(1.05*size < y && y < 1.2*size) {
            if(deleteenter) {
              deleteenter=false
              Addcookie("is_noenter","no")
            }else{
              deleteenter=true
              Addcookie("is_noenter","yes")
            }
          }
          if(1.2*size < y && y < 1.35*size) {
            scene="title"
          }
          touched=false;
        }
        //////////////////////////////////////////////////////////////////////////////////////
      }
      else if (scene=="player") {
        ctx.textAlign="center";
        ctx.textBaseline="top";
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.font = 12*size/100+"px sans-serif";
        ctx.fillText("人数："+ninnzuu, size/2, 0*size);


        ctx.fillStyle="rgb(175, 137, 0)";
        marurect(size,ctx, 0,size*0.15,  size,size*0.15);
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.fillText("ふやす", size/2, 0.15*size);

        ctx.fillStyle="rgb(203, 159, 0)";
        marurect(size,ctx, 0,size*0.3,  size,size*0.15);
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.fillText("へらす", size/2, 0.3*size);


        ctx.font = 24*size/100+"px sans-serif";


        ctx.fillStyle="rgb(175, 137, 0)";
        marurect(size,ctx, 0,size,  size,size*0.5);
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.fillText("プレイ！", size/2, 1*size);
        if (touched!=false) {
          let y=touched.offsetY
          if(0.15*size < y && y < 0.3*size) {
            ninnzuu++;
          }
          if(0.3*size < y && y < 0.45*size) {
            ninnzuu--;
          }
          if(1*size < y && y < 1.5*size) {
            scene="playing";
            turn=""
            selected_action=-1
            player_scores=[]
            losed=[]
            no_hannnou=false;
            exit = -1;
            for(let i=0;i<ninnzuu;i++) {
              player_scores[player_scores.length]=[]
            }
            undo=[]
            
          }
          touched=false;
        }
        if(ninnzuu<3) {
          ninnzuu=2;
        }
        if(ninnzuu>5) {
          ninnzuu=5;
        }
        
      }
      else if (scene=="playing") {
        ctx.fillStyle="rgb(175, 35, 0)";
        marurect(size,ctx, size*0.9, 0, size*0.2,size*0.1)
        ctx.textAlign="right";
        ctx.textBaseline="top";
        ctx.font = 3*size/100+"px sans-serif";
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.fillText("やめる", size,0);



        ctx.textAlign="left";
        ctx.textBaseline="top";
        ctx.font = 6*size/100+"px sans-serif";
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.fillText("プレイヤー"+(turn%ninnzuu+1)+"の番です。ターン"+(turn+1), 0,0);
        
        let square_1=15;
        let square_2=10;
        start=0;
        l=Math.trunc((turn+ninnzuu)/ninnzuu);
        xhosei=0
        if(l>5) {
          start=Math.trunc((turn+ninnzuu)/ninnzuu)-5;
          xhosei=square_1*size/100*(l-5);
        }
        for(let i=start;i<l;i++) {
          for(let p=0;p<ninnzuu;p++) {
            
            ctx.fillStyle="rgb(175, 137, 0)";
            if(losed[ninnzuu-1-p]) {
              ctx.fillStyle="rgb(175, 58, 0)";
            }
            marurect(size,ctx, i*square_1*size/100-xhosei ,(-p)*square_1*size/100+size*1.5-size/100*square_2,square_2*size/100,square_2*size/100)
            xy=[i*square_1*size/100 + square_2*size/200  -xhosei,      (-p)*square_1*size/100+size*1.5-size/100*square_2 + square_2*size/200]
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.font = 8*size/100+"px sans-serif";
            ctx.fillStyle="rgb(255, 255, 255)";
            text=""
            if(i<=player_scores[ninnzuu-1-p].length-1) {
              text=player_scores[ninnzuu-1-p][i]
            } 
            ctx.fillText(text, xy[0],xy[1]);
          }
        }
        
        ctx.fillStyle="rgb(27, 72, 0)";
        marurect(size,ctx, canvas.width*0.8, canvas.height*0.5, canvas.width*0.2, canvas.height*0.5);
        losed=[];
        break_ok=false;
        for(let i=0;i<ninnzuu;i++) {
          losed[losed.length]=false
        }
        for(let p=0;p<ninnzuu;p++) {
          //スコア計算
          let score=0;
          let batu =0;
          
          for(let i=0;i<player_scores[ninnzuu-1-p].length;i++) {
            if(player_scores[ninnzuu-1-p][i]=="X") {
              batu++;
            }
            else{
              batu=0;
              score+=player_scores[ninnzuu-1-p][i]
            }
            if(batu==3) {
              losed[ninnzuu-1-p]=true;
              break;
            }
            if(score>50) {
              score=25
            }
            if(score==50) {
              for(let player_lose=0;player_lose<ninnzuu;player_lose++) {
                if(player_lose!=ninnzuu-1-p) {
                  losed[player_lose]=true
                }
              }
              break_ok=true;
              break;
            }
          }
          if(break_ok) {
            break;
          }
          ctx.textAlign="left";
          ctx.textBaseline="middle";
          ctx.font = 6*size/100+"px sans-serif";
          ctx.fillStyle="rgb(255, 255, 255)";


          //y_only=(-(ninnzuu-1-p))*square_1*size/100+size*1.5-size/100*square_2 + square_2*size/200
          y_only=(-p)*square_1*size/100+size*1.5-size/100*square_2 + square_2*size/200
          ctx.fillText("="+score+"点",canvas.width*0.8,y_only-size/30);
          ctx.font = 6*size/100+"px sans-serif";
          ctx.fillText(["","x","xx","xxx"][batu],canvas.width*0.8,y_only);
        }

        ctx.fillStyle="rgb(175, 137, 0)";
        x_  = 3*(size/4)
        y_  = 2*(size/6)+size/10
        sx_ = size/4-(size/100)
        sy_ = (size/6-(size/100))*2
        
        t=["10点","11点","12点","0点","7点","8点","9点","直す","4点","5点","6点","決定","1点","2点","3点",""]
        keyaction=[10,11,12,"X",7,8,9,"undo",4,5,6,"enter",1,2,3,"enter"]
        if(denwa) {
          t=["1点","2点","3点","0点","4点","5点","6点","直す","7点","8点","9点","決定","10点","11点","12点",""]
          keyaction=[1,2,3,"X",4,5,6,"undo",7,8,9,"enter",10,11,12,"enter"]
        }
        if(!deleteenter) {
          marurect(size,ctx,x_,y_,sx_,sy_)
        }
        for(let i=0;i<4;i++) {
          for(let p=0;p<4;p++) {
            if(deleteenter) {
              if(i==3 && (p==2 || p==3)) {
                continue;
              }
            }
            ctx.fillStyle="rgb(175, 137, 0)";
            if (selected_action==keyaction[i+p*4]) {
              ctx.fillStyle="rgb(242, 190, 0)";
            }
            x_  = i*(size/4)
            y_  = p*(size/6)+size/10
            sx_ = size/4-(size/100)
            sy_ = size/6-(size/100)
            marurect(size,ctx,x_,y_,sx_,sy_)

            ctx.fillStyle="rgb(255, 255, 255)";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.font = 24*size/300+"px sans-serif";
            ctx.fillText(t[i+p*4], x_+sx_/2,y_+sy_/2);
            if (touched!=false) {
              let x=touched.offsetX;
              let y=touched.offsetY;
              if(x_ < x && x < x_+sx_) {
                if(y_ < y && y < y_+sy_) {
                  if(!no_hannnou) {

                    if(deleteenter) {
                      if(keyaction[i+p*4]=="undo") {
                        if(turn!=0) {
                          player_scores=undo[undo.length-1][0]
                          turn     =    undo[undo.length-1][1]
                          undo.pop()
                          player_scores[turn%ninnzuu].pop();
                        } 
                      }else{
                        undo[undo.length]=[player_scores.concat(),turn+1-1 ]

                        a=player_scores[turn%ninnzuu]
                        player_scores[turn%ninnzuu][a.length]=keyaction[i+p*4];
                        turn++;
                        while(losed[turn%ninnzuu]) {
                          turn++;
                        }
                      }
                    }
                    else{
                      if (keyaction[i+p*4]=="enter") {
                        if(selected_action!=-1) {
                          if(selected_action=="undo") {
                            if(turn!=0) {
                              player_scores=undo[undo.length-1][0]
                              turn     =    undo[undo.length-1][1]
                              undo.pop()
                              player_scores[turn%ninnzuu].pop();
                            }
                            
                          }
                          else{
                            undo[undo.length]=[player_scores.concat(),turn+1-1 ]

                            a=player_scores[turn%ninnzuu]
                            player_scores[turn%ninnzuu][a.length]=selected_action;
                            turn++;
                            while(losed[turn%ninnzuu]) {
                              turn++;
                            }
                          }
                        }
                        selected_action=-1
                      }
                      else{
                        selected_action=keyaction[i+p*4]
                      }
                      touched=false;
                    }
                  }
                }
              }
            }
          }
        }
        
        a=[]
        for(let i=0;i<ninnzuu;i++) {
          if (!losed[i]) {
            a[a.length]=i
          }
        }
        no_hannnou=false
        if(a.length==1) {
          no_hannnou=true
          //勝利
          ctx.fillStyle="rgb(83, 65, 0)";
          marurect(size,ctx, canvas.width*0.2,canvas.height*0.2,canvas.width*0.6,canvas.height*0.6);
          ctx.textAlign="center";
          ctx.textBaseline="middle";
          ctx.font = 6*size/100+"px sans-serif";
          ctx.fillStyle="rgb(255, 255, 255)";
          ctx.fillText("勝者:プレイヤー"+(a[0]+1)+"！！",canvas.width*0.5,canvas.height*0.5);

          ctx.fillText("終了",canvas.width*0.5,canvas.height*0.6);
          ctx.fillText("直す",canvas.width*0.5,canvas.height*0.7);
          if (touched!=false) {
            x=touched.offsetX
            y=touched.offsetY
            if(canvas.height*0.55<y && y<canvas.height*0.65) {
              scene="title";
            }
            if(canvas.height*0.65<y && y<canvas.height*0.75) {
              player_scores=undo[undo.length-1][0]
              turn     =    undo[undo.length-1][1]
              undo.pop()
              player_scores[turn%ninnzuu].pop();
            }
          }
          
          
        }
        if(touched!=false && (!no_hannnou)) {
          let x=touched.offsetX;
          let y=touched.offsetY;
          if (size*0.9<x && x<size) {
            if (y<size*0.1) {
              //やめる？
              no_hannnou=true;
              exit = 0;
            }
          }
        }
        if(exit!=-1) {
          ctx.fillStyle="rgb(83, 65, 0)";
          marurect(size,ctx, canvas.width*0.2,canvas.height*0.2,canvas.width*0.6,canvas.height*0.6);
          ctx.textAlign="center";
          ctx.textBaseline="middle";
          ctx.font = 6*size/100+"px sans-serif";
          ctx.fillStyle="rgb(255, 255, 255)";
          ctx.fillText(["やめる？","本当にやめる？","りありー？"][exit],canvas.width*0.5,canvas.height*0.3);
          
          
          ctx.fillText("はい",canvas.width*0.35,canvas.height*0.7);
          ctx.fillText("いいえ",canvas.width*0.65,canvas.height*0.7);

          
          no_hannnou=true

          let x=touched.offsetX;
          let y=touched.offsetY;
          if (size*0<x && x<size*0.5) {
            if (canvas.height*0.6<y && y<canvas.height*0.8) {
              exit++;
            }
          }
          if (size*0.5<x && x<size*1) {
            if (canvas.height*0.6<y && y<canvas.height*0.8) {
              exit=-1;
            }
          }
          if(exit==3) {
            scene="title";
          }
        }

        if (touched!=false) {
          touched=false;
        }
        
      }
      
      let end = Date.now();
      await sleep(33-(end-begin));
    }
}
window.onload = function(){
  gamemain();
}
