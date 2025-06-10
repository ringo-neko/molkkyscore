//https://qiita.com/teloppy_com/items/cd483807813af5a4a38aに感謝
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒

async function gamemain() {
    // 画面の大きさ = 750 x 1000
    let scene = "title";
    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.addEventListener('mousedown', (e) => {(touched=e)});
    var touched=false;
    let ninnzuu=3;
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
        ctx.font = 12*size/100+"px sans-serif";
        ctx.fillText("開始", size/2, 0.6*size);
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
          touched=false;
        }
      }
      else if (scene=="player") {
        ctx.textAlign="center";
        ctx.textBaseline="top";
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.font = 12*size/100+"px sans-serif";
        ctx.fillText("人数："+ninnzuu, size/2, 0*size);

        ctx.fillText("ふやす", size/2, 0.15*size);
        ctx.fillText("へらす", size/2, 0.3*size);
        ctx.font = 24*size/100+"px sans-serif";
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
            for(let i=0;i<ninnzuu;i++) {
              player_scores[player_scores.length]=[]
              losed[losed.length]=false
            }
            
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
        ctx.textAlign="left";
        ctx.textBaseline="top";
        ctx.font = 6*size/100+"px sans-serif";
        ctx.fillStyle="rgb(255, 255, 255)";
        ctx.fillText("プレイヤー"+(turn%ninnzuu+1)+"の番です。ターン"+(turn+1), 0,0);
        keyaction=[10,11,12,"X",7,8,9,"undo",4,5,6,"enter",1,2,3,"enter"]
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
            if(losed[p]) {
              ctx.fillStyle="rgb(175, 58, 0)";
            }
            ctx.fillRect(i*square_1*size/100-xhosei ,(-p)*square_1*size/100+size*1.5-size/100*square_2,square_2*size/100,square_2*size/100)
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
        ctx.fillRect(canvas.width*0.8, canvas.height*0.5, canvas.width*0.2, canvas.height*0.5);
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
              losed[p]=true;
              break;
            }
            if(score>50) {
              score=25
            }
            if(score==50) {
              for(let player_lose=0;player_lose<ninnzuu;player_lose++) {
                if(player_lose!=p) {
                  losed[player_lose]=true
                }
              }
            }
          }
          ctx.textAlign="left";
          ctx.textBaseline="middle";
          ctx.font = 6*size/100+"px sans-serif";
          ctx.fillStyle="rgb(255, 255, 255)";
          y_only=(-p)*square_1*size/100+size*1.5-size/100*square_2 + square_2*size/200
          ctx.fillText("="+score,canvas.width*0.8,y_only-size/30);
          ctx.font = 6*size/100+"px sans-serif";
          ctx.fillText(["","x","xx","xxx"][batu],canvas.width*0.8,y_only);
        }
        

        ctx.fillStyle="rgb(175, 137, 0)";
        ctx.fillRect(size*3/4+2,2.5*size/6+size*0.1+2,size/4-4,size/6-4)
        t=["10","11","12","x","7","8","9","undo","4","5","6","enter","1","2","3",""]
        
        for(let i=0;i<4;i++) {
          for(let p=0;p<4;p++) {
            ctx.fillStyle="rgb(175, 137, 0)";
            if (selected_action==keyaction[i+p*4]) {
              ctx.fillStyle="rgb(242, 190, 0)";
            }
            ctx.fillRect(i*size/4+2,  p*size/6+size*0.1+2,size/4-4,size/6-4)

            ctx.fillStyle="rgb(255, 255, 255)";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.font = 24*size/300+"px sans-serif";
            ctx.fillText(t[i+p*4], i*size/4+2+ (size/4-4)/2, p*size/6+size*0.1+2+ (size/6-4)/2);
            if (touched!=false) {
              let x=touched.offsetX;
              let y=touched.offsetY;
              if(i*size/4+2 < x && x < (i+1)*size/4+2) {
                if(p*size/6+size*0.1+2 < y && y < (p+1)*size/6+size*0.1+2) {
                  if(!no_hannnou) {
                    if (keyaction[i+p*4]=="enter") {
                      if(selected_action!=-1) {
                        if(selected_action=="undo") {
                          if(turn!=0) {
                            turn--;
                            while(losed[turn%ninnzuu]) {
                              turn--;
                            }
                            player_scores[turn%ninnzuu].pop();
                          }
                          
                        }
                        else{
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
        
        a=[]
        for(let i=0;i<ninnzuu;i++) {
          if (!losed[i]) {
            a[a.length]=ninnzuu-i
          }
        }
        no_hannnou=false
        if(a.length==1) {
          no_hannnou=true
          //勝利
          ctx.fillStyle="rgb(83, 65, 0)";
          ctx.fillRect(canvas.width*0.2,canvas.height*0.2,canvas.width*0.6,canvas.height*0.6);
          ctx.textAlign="center";
          ctx.textBaseline="middle";
          ctx.font = 6*size/100+"px sans-serif";
          ctx.fillStyle="rgb(255, 255, 255)";
          ctx.fillText("勝者:プレイヤー"+a[0]+"！！",canvas.width*0.5,canvas.height*0.5);
          if (touched!=false) {
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
