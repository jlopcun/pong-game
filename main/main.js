const $id = (element) => document.getElementById(element);



const $rightPaddle = $id('right-paddle');
const $leftPaddle = $id('left-paddle');
const $ball = $id('ball');
const $counterOne = $id('counterOne'),
$counterTwo = $id('counterTwo');

const $body = document.body;
const RootStyles = (prop,value) => document.documentElement.style.setProperty(prop,value);
let rightPaddleTop = 0;
let  leftPaddleTop = 0;

const ballMechaninc = {
    positionX:355,
    positionY:180,
    directionX:"front",
    directionY:"bottom"
}

window.addEventListener('keydown',(e)=>{

    const key = e.key;
    const movements = {
        'ArrowUp':()=>{
            if(rightPaddleTop-20>=0){
                rightPaddleTop-=20;
                RootStyles('--topRightPaddle',`${rightPaddleTop}px`);
            }
            
        },
        'ArrowDown':()=>{
            if(rightPaddleTop+20<=300){
                rightPaddleTop+=20;
                RootStyles('--topRightPaddle',`${rightPaddleTop}px`);
            }
            
        },    
        'w':()=>{
            if(leftPaddleTop-20>=0){
                leftPaddleTop-=20;
                RootStyles('--topLeftPaddle',`${leftPaddleTop}px`);
            }
           
        },    
        's':()=>{
            if(leftPaddleTop+20<=300){
                leftPaddleTop+=20;
                RootStyles('--topLeftPaddle',`${leftPaddleTop}px`);
            }
            
        }        
        
    }
    if(movements[`${key}`]()) movements[`${key}`]();

    
})

const BallMove = ({positionX,positionY,directionX,directionY}) =>{

    const directions = {
        "X700":()=>{
            if(positionY>rightPaddleTop-20 && positionY<rightPaddleTop+120) ballMechaninc.directionX="back"
             
            else {
                $counterOne.textContent = Number($counterOne.textContent)+1;
                setTimeout(()=>{
                    ballMechaninc.positionX=355;
                    ballMechaninc.positionY=180;
                    ballMechaninc.directionX='back';
                    ballMechaninc.directionY='bottom';
                },2000)
            }
        },
        "X30":()=>{
            if(positionY>leftPaddleTop-20 && positionY<leftPaddleTop+120) ballMechaninc.directionX="front"
            else {
                $counterTwo.textContent = Number($counterTwo.textContent)+1;
                setTimeout(()=>{
                    ballMechaninc.positionX=355;
                    ballMechaninc.positionY=180;
                    ballMechaninc.directionX='front';
                    ballMechaninc.directionY='bottom';
                },2000)
            }
            
        },
        "Y380":()=>ballMechaninc.directionY="top",
        "Y0":()=>ballMechaninc.directionY="bottom"
    }
    if(directions[`X${positionX}`]) directions[`X${positionX}`]() 
    if(directions[`Y${positionY}`]) directions[`Y${positionY}`]() 

    const moveBall = {
        "front":()=>ballMechaninc.positionX+=5,
        "bottom":()=>ballMechaninc.positionY+=5,
        "back":()=>ballMechaninc.positionX-=5,
        "top":()=>ballMechaninc.positionY-=5
    }
    moveBall[directionX]()
    moveBall[directionY]()

 
    RootStyles('--ballTop',`${ballMechaninc.positionY}px`)
    RootStyles('--ballLeft',`${ballMechaninc.positionX}px`)

}


setInterval(()=>{
    BallMove(ballMechaninc)
},10)