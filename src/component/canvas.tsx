import styles from '../styles/canvas.module.css'
import React, { useContext, useEffect, useRef } from 'react';
type gameInfo = {
  rows: number
  cols: number
  board: Square[][]
}

let tileSize = 0
let rows = 0;
let cols = 0;
let board:Square[][];
const canvasRef = useRef<HTMLCanvasElement>(null);
const canvas = canvasRef.current;
const ctx = canvas?.getContext('2d');
const unitSize = 0.6 //Square is 1


const colors = ['rgb(255, 105, 180)','rgb(203, 114, 244)','rgb(255, 215, 0)','rgb(44, 237, 236)'];

//Provisional
const drawerColors =  ['rgb(255, 43, 127)','rgb(161, 50, 233)','rgb(255, 180, 0)','rgb(0, 180, 180)'];
const abilityColors = ['rgb(255, 43, 127)','rgb(161, 50, 233)','rgb(255, 180, 0)','rgb(0, 180, 180)'];
const unitColors = ['rgb(151, 0, 58)','rgb(97, 0, 148)','rgb(188, 86, 0)','rgb(0, 122, 123)'];
//Provisional
const upgradedColors = ['rgb(151, 0, 58)','rgb(97, 0, 148)','rgb(188, 86, 0)','rgb(0, 122, 123)'];
const squareDefaultColor = 'rgb(30,30,30)';
const bonusColor = 'rgb(200,0,0)';

export function Canvas({rows, cols, board}: gameInfo) {
  rows = rows
  cols = cols
  board = board
  window.addEventListener('resize', onWindowResize, false);
  onWindowResize(); //llama a paint();

  return (
    <div className={styles.container}>
      {/* <canvas className={styles.canvas}></canvas> */}
    </div>
  )
}

type Square = {
  painter:  number,
  drawer :  number,
  unit   :  number,
  ability:  boolean
}

function paint()
{
  if(!canvas || !ctx) return;
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,tileSize*cols,tileSize*rows);
  for(let i = 0; i < rows; ++i)
  {
    for(let j = 0; j < cols; ++j)
    {
      paintTile(board[i][j],i,j);
    }
  }
}

function paintTile(sq:Square, x:number,y:number)
{
  let sqColor = squareDefaultColor;
  if(sq.painter >= 0)
    sqColor = colors[sq.painter];
  if(sq.ability)
    sqColor = abilityColors[sq.painter];
  if(sq.drawer >= 0)
    sqColor = drawerColors[sq.drawer];

  paintSquare(sqColor,x,y);

  let uColor;
  let type:String = "";
  
  if(sq.unit >= UnitCodes.OWN0 && sq.unit <= UnitCodes.OWN3)
  {
    uColor = unitColors[sq.unit-UnitCodes.OWN0];
    type = "unit";
    paintUnit(uColor,x,y);
  }
  else if(sq.unit >= UnitCodes.OWN0UP && sq.unit <= UnitCodes.OWN3UP)
  {
    uColor = upgradedColors[sq.unit-UnitCodes.OWN0UP];
    type = "unit";
    paintUnit(uColor,x,y);
  }
  else if(sq.unit >= UnitCodes.BUBBLE0 && sq.unit <= UnitCodes.BUBBLE3)
  {
    uColor = upgradedColors[sq.unit-UnitCodes.BUBBLE0];
    type = "bubble";
    paintBubble(uColor,x,y);
  }
  else if(sq.unit === UnitCodes.BONUS)
  {
    uColor = bonusColor;
    type = "bonus";
    paintBonus(uColor,x,y);
  }
}


function paintSquare(col:string,x:number,y:number)
{ 
  let i = x*tileSize;
  let j = y*tileSize;
  if(!ctx) return;
  ctx.fillStyle = col;
  ctx.fillRect(j,i,tileSize-0.5,tileSize-0.5);
}

function paintUnit(color:string,x:number,y:number)
{
  if(!ctx)return;
  ctx.fillStyle = color;
  let size = unitSize*tileSize*0.7;
  ctx.fillRect(y,x,unitSize,unitSize);
}

function paintBonus(color:string,x:number,y:number)
{
  paintUnit(color,x,y);
}

function paintBubble(color:string,x:number,y:number)
{
  if(!ctx) return;
  let size = unitSize * tileSize * 0.7;
  let offset = (tileSize - size) / 2;    
  ctx.beginPath();
  ctx.arc(y*tileSize + size/2 + offset, x*tileSize + size/2 + offset, size/2, 0, 2*Math.PI, false);
  ctx.fill();
  //ctx.stroke();
}

const UnitCodes = {
  OWN0:0,     OWN1:1,     OWN2:2,     OWN3:3,
  OWN0UP:4,   OWN1UP:5,   OWN2UP:6,   OWN3UP:7,
  BUBBLE0:8,  BUBBLE1:9,  BUBBLE2:10,  BUBBLE3:11,
  BONUS:12,
  NOTHING:13,

  ERRUNIT:14
};

function onWindowResize () {
  let size = Math.min(document.body.offsetWidth, document.body.offsetHeight);
  if(!canvas) return;
  canvas.width = size;
  canvas.height = size;

  let max = Math.max(cols,rows);
  tileSize = size/max;
  paint();
}