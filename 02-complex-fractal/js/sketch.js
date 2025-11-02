
/**
 * 渦巻きの描画
 */
function drawSpiral() {
  let z = new Complex(1.0, 0.0);
  const offset = new Complex(0.01, 0.25);
  for (let i = 0; i < 100; i++) {
    let nextZ = z.add(z.mul(offset));
    stroke(0);
    drawLineCanvas(z.re, z.im, nextZ.re, nextZ.im);
    z = nextZ;
  }
}

/**
 * マンデルブロ集合のチェック
 * zを0+i0、cを複素平面の座標として収束/発散のチェックを行う
 * @param {Complex} c 
 * @returns true: 収束 false: 発散
 */
function checkMandelbrot(c) {
  // 発散とみなす最大長さ
  const arrowMaxLength = 10;

  // 漸化式を計算し、許容値を超えたら発散とみなす
  let z = new Complex(0.0, 0.0);
  for (let i = 0; i < 100; i++) {
    z = z.mul(z).add(c);
    if (z.sqlMagnitude() > arrowMaxLength) {
      return false;
    }
  }
  return true;
}

/**
 * マンデルブロ集合の描画
 */
function drawMandelbrot() {
  fill(0);
  noStroke();
  const dx = MaxGridValue / 100;
  const dy = MaxGridValue / 100;
  const pointRadius = Math.max(MaxGridValue * 2.0, 2.5);

  // 画面の座標についてマンデルブロ集合のチェックを行う
  for (let x = MinGridValueX; x <= MaxGridValueX; x+=dx) {
    for (let y = MinGridValueY; y <= MaxGridValueY; y+=dy) {
      if (!checkMandelbrot(new Complex(x, y))) {
        continue;
      }
      drawPoint(x, y, pointRadius);
    }
  }
}

/**
 * ジュリア集合のチェック
 * zを複素平面の座標、cを定数として収束/発散のチェックを行う
 * 参考: https://jun-networks.hatenablog.com/entry/2021/06/12/170030
 * @param {Complex} z 
 * @returns true: 収束 false: 発散
 */
function checkJulia(z) {
  // 発散とみなす最大長さ
  const arrowMaxLength = 10;

  // 漸化式を計算し、許容値を超えたら発散とみなす
  // 模様を決める定数を仮で設定
  let c = new Complex(-0.8, 0.156);

  // マウス位置でインタラクティブに変化させる
  if (mouseX > 0 && mouseY > 0) {
    let ratioX = (0.5 - mouseX/ScreenWidth) * 2.0;
    let ratioY = (0.5 - mouseY/ScreenHeight) * 2.0;
    // 図形が出るのが大体-1.5~1.5の範囲のため制限
    if (-1.5 <= ratioX && ratioX <= 1.5
      && -1.5 <= ratioY && ratioY <= 1.5) {
      c = new Complex(ratioX, ratioY);
    }
  }

  for (let i = 0; i < 10; i++) {
    z = z.mul(z).add(c);
    if (z.sqlMagnitude() > arrowMaxLength) {
      return false;
    }
  }
  return true;
}

/**
 * ジュリア集合の描画
 */
function drawJulia() {
  fill(0);
  noStroke();
  const dx = MaxGridValue / 100;
  const dy = MaxGridValue / 100;
  const pointRadius = Math.max(MaxGridValue * 2.0, 2.5);

  // 画面表示領域のジュリア集合のチェックを行う
  for (let x = MinGridValueX; x <= MaxGridValueX; x+=dx) {
    for (let y = MinGridValueY; y <= MaxGridValueY; y+=dy) {
      if (!checkJulia(new Complex(x, y))) {
        continue;
      }
      drawPoint(x, y, pointRadius);
    }
  }
}

/**
 * UIコンポーネント
 */
let scaleInButton;
let scaleOutButton;
let scaleInMoreButton;
let scaleOutMoreButton;
let offsetLeftButton;
let offsetRightButton;
let offsetUpButton;
let offsetDownButton;

let drawSpiralButton;
let drawMandelbrotButton;
let drawJuliaButton;

/**
 * 初期化処理
 */
function setup() {
  createCanvas(ScreenWidth, ScreenHeight);

  const drawControlButton = (name, posX, posY, onPressed) => {
    button = createButton(name);
    button.mousePressed(onPressed);
    button.position(posX, posY);
    button.size(40, 40);
    button.style("font-size", "24px");
    button.style("padding", "0px");
    return button;
  }

  // スケールボタン
  const scaleValue = 0.05;
  const scaleMoreValue = 0.3;
  scaleInMoreButton  = drawControlButton("++", 20, 20, () => AddMaxGridValue(-scaleMoreValue));
  scaleInButton      = drawControlButton("+", 20, 72, () => AddMaxGridValue(-scaleValue));
  scaleOutButton     = drawControlButton("-", 20, 124, () => AddMaxGridValue(scaleValue));
  scaleOutMoreButton = drawControlButton("--", 20, 176, () => AddMaxGridValue(scaleMoreValue));

  // 移動ボタン
  const offsetValue = 0.1;
  offsetLeftButton  = drawControlButton("←", 20,  ScreenHeight - 80,  () => OffsetGridValue(-offsetValue, 0));
  offsetRightButton = drawControlButton("→", 100, ScreenHeight - 80,  () => OffsetGridValue(offsetValue, 0));
  offsetUpButton    = drawControlButton("↑", 60,  ScreenHeight - 120, () => OffsetGridValue(0, offsetValue));
  offsetDownButton  = drawControlButton("↓", 60,  ScreenHeight - 40,  () => OffsetGridValue(0, -offsetValue));

  const drawTypeButton = (name, posX, posY, onPressed) => {
    button = createButton(name);
    button.mousePressed(onPressed);
    button.position(posX, posY);
    button.size(100, 40);
    button.style("font-size", "14px");
    button.style("padding", "0px");
    return button;
  }

  // 描画する図形の切替ボタン
  drawSpiralButton     = drawTypeButton("渦巻き", ScreenWidth-104,  20,  () => changeDrawType(DrawType.Spiral));
  drawMandelbrotButton = drawTypeButton("マンデルブロ", ScreenWidth-104,  72,  () => changeDrawType(DrawType.Mandelbrot));
  drawJuliaButton      = drawTypeButton("ジュリア", ScreenWidth-104,  124,  () => changeDrawType(DrawType.Julia));
}

/**
 * 描画する図形の種類
 */
const DrawType = {
  Spiral: 0,
  Mandelbrot: 1,
  Julia: 2,
}
let currentDrawType = DrawType.Mandelbrot;

function changeDrawType(drawType) {
  currentDrawType = drawType;
}

/**
 * 描画処理
 */
function draw() {
  background(255);
  drawGrid();

  switch (currentDrawType) {
    case DrawType.Spiral:
      drawSpiral();
      break;
    case DrawType.Mandelbrot:
      drawMandelbrot();
      break;
    case DrawType.Julia:
      drawJulia();
      break;
  }
}