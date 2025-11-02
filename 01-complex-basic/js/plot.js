
/**
 * 画面設定
 */
const ScreenWidth = 400;
const ScreenHeight = 400;

/**
 * 座標の表示範囲
 */
let MaxGridValue = 10;
let MinGridValueY = -MaxGridValue;
let MaxGridValueY = MaxGridValue;
let MinGridValueX = -MaxGridValue;
let MaxGridValueX = MaxGridValue;
let OffsetGridValueY = 0;
let OffsetGridValueX = 0;

function UpdateMaxGridValue() {
  MinGridValueY = -MaxGridValue + OffsetGridValueY;
  MaxGridValueY = MaxGridValue + OffsetGridValueY;
  MinGridValueX = -MaxGridValue + OffsetGridValueX;
  MaxGridValueX = MaxGridValue + OffsetGridValueX;
}

function AddMaxGridValue(addValue) {
  MaxGridValue += addValue;
  UpdateMaxGridValue();
}

function OffsetGridValue(offsetX, offsetY) {
  OffsetGridValueX += offsetX;
  OffsetGridValueY += offsetY;
  UpdateMaxGridValue();
}

/**
 * グリッドの描画
 */
function drawGrid() {
  strokeWeight(2);

  console.log(MinGridValueX + ', ' + MaxGridValueX);
  const GridScale = 1; // 線を引く間隔
  let dx = GridScale;
  let dy = GridScale;
  for (let x = Math.floor(MinGridValueX); x < MaxGridValueX; x+=dx) {
    for (let y = Math.floor(MinGridValueY); y < MaxGridValueY; y+=dy) {
      // 縦線
      stroke(180, 180, 180);
      drawLineCanvas(x+dx, y, x+dx, y+dy);
      // 横線
      stroke(180, 180, 180);
      drawLineCanvas(x, y+dy, x+dx, y+dy);
    }
  }

  // 中央線
  stroke(120, 120, 120);
  let centerGridY = (MinGridValueY+MaxGridValueY)/2;
  let centerGridX = (MinGridValueX+MaxGridValueX)/2;
  drawLineCanvas(MinGridValueX, 0, MaxGridValueX, 0);
  drawLineCanvas(0, MinGridValueY, 0, MaxGridValueY);
}

/**
 * 関数の描画
 * @param {(t: number) => number} func 関数 
 */
function drawFunc(func) {
  let dx = MaxGridValueX / 100;
  for (let x = 0; x < MaxGridValueX; x+=dx) {
    drawLineCanvas(x, func(x), (x+dx), func(x+dx));
  }
}

/**
 * 受け取った座標位置で線を繋げて表示する
 * @param {number} fromX 
 * @param {number} fromY 
 * @param {number} toX 
 * @param {number} toY 
 */
function drawLineCanvas(fromX, fromY, toX, toY) {
  const scaleX = ScreenWidth/(MaxGridValueX-MinGridValueX);
  const scaleY = ScreenHeight/(MaxGridValueY-MinGridValueY);
  fromX *= scaleX;
  fromY *= scaleY;
  toX *= ScreenWidth/(MaxGridValueX-MinGridValueX)
  toY *= ScreenHeight/(MaxGridValueY-MinGridValueY);
  let offset = [ScreenWidth/2, ScreenHeight/2-OffsetGridValueY];
  offset[0] -= OffsetGridValueX * scaleX;
  offset[1] -= OffsetGridValueY * scaleY;
  line(fromX+offset[0], ScreenHeight-(fromY+offset[1]), toX+offset[0], ScreenHeight-(toY+offset[1]));
}

/**
 * 受け取った座標位置に点を表示する
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 */
function drawPoint(x, y, radius) {
  const scaleX = ScreenWidth/(MaxGridValueX-MinGridValueX);
  const scaleY = ScreenHeight/(MaxGridValueY-MinGridValueY);
  x *= scaleX;
  y *= scaleY;
  let offset = [ScreenWidth/2, ScreenHeight/2];
  offset[0] -= OffsetGridValueX * scaleX;
  offset[1] -= OffsetGridValueY * scaleY;
  circle(x+offset[0], ScreenHeight-(y+offset[1]), radius);
}
