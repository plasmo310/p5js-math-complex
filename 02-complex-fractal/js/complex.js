
/**
 * 複素数クラス
 */
class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  static add(z0, z1) {
    return new Complex(
      z0.re + z1.re,
      z0.im + z1.im 
    );
  }

  static mul(z0, z1) {
    return new Complex(
      z0.re*z1.re - z0.im*z1.im,
      z0.re*z1.im + z0.im*z1.re
    );
  }

  add(z1) {
    return Complex.add(this, z1);
  }

  mul(z1) {
    return Complex.mul(this, z1);
  }

  sqlMagnitude() {
    return this.re**2 + this.im**2;
  }
}
