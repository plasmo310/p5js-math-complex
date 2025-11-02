/**
 * 複素数（固定値）
 */
const fixComplex = new Complex(3, 3);

/**
 * 複素数（移動対象）
 */
let moveComplex = new Complex(1, 1);

/**
 * 複素数の計算結果の描画
 */
function drawCalcComplex() {
  fill(0);
  noStroke();

  // マウスカーソルに合わせてmoveComplexを移動させる
  let movePosX = 1.0;
  let movePosY = 1.0;
  if (0 < mouseX && mouseX < ScreenWidth
      && 0 < mouseY && mouseY < ScreenHeight) {
    movePosX = (2.0 * mouseX / ScreenWidth - 1.0) * MaxGridValue;
    movePosY = (-2.0 * mouseY / ScreenHeight + 1.0) * MaxGridValue;
  }
  moveComplex = new Complex(movePosX, movePosY);

  // 複素数の計算
  const addComplex = fixComplex.add(moveComplex);
  const subComplex = fixComplex.sub(moveComplex);
  const mulComplex = fixComplex.mul(moveComplex);
  const divComplex = fixComplex.div(moveComplex);

  // 計算結果の描画
  const mainPointRadius = 20;
  const calcPointRadius = 12;
  fill(0);
  drawPoint(fixComplex.re, fixComplex.im, mainPointRadius);
  circle(24, 23, mainPointRadius);
  fill(0, 180, 0);
  drawPoint(moveComplex.re, moveComplex.im, mainPointRadius);
  circle(24, 48, mainPointRadius);
  fill(255, 0, 0);
  drawPoint(addComplex.re, addComplex.im, calcPointRadius);
  circle(24, 76, calcPointRadius);
  fill(0, 0, 255);
  drawPoint(subComplex.re, subComplex.im, calcPointRadius);
  circle(24, 102, calcPointRadius);
  fill(255, 0, 255);
  drawPoint(mulComplex.re, mulComplex.im, calcPointRadius);
  circle(24, 128, calcPointRadius);
  fill(0, 255, 255);
  drawPoint(divComplex.re, divComplex.im, calcPointRadius);
  circle(24, 154, calcPointRadius);
}

/**
 * 初期化処理
 */
function setup() {
  createCanvas(ScreenWidth, ScreenHeight);
}

/**
 * 描画処理
 */
function draw() {
  background(255);
  drawGrid();
  drawCalcComplex();

  // テキスト描画
  noStroke();
  fill(0, 0, 0);
  textSize(18);
  text(`複素数A（固定）`, 40, 30);
  text(`複素数B（マウス移動）`, 40, 56);
  text(`A + B`, 40, 82);
  text(`A - B`, 40, 108);
  text(`A × B`, 40, 134);
  text(`A / B`, 40, 160);
}