import Client from './Client'

class LiniarRegression {

  constructor () {
    this.client = new Client()
    this.t0     = 1
    this.t1     = 1
    this.set    = []
    this.step   = 0.3
    this.m      = 0 // training set length
  }

  hypotesis(x) {
    return this.t0 + this.t1 * x;
  }
k
  async compute() {
    this.set = await this.setTrainingSet()
    this.set = this.set.data
    this.m   = this.set.length

    while(true) {
      let _t0 = this.t0
      let _t1 = this.t1
      let _sum = this.calculateDerivedError(this.set)
      this.t0 = _t0 - this.step * _sum.sum0
      this.t1 = _t1 - this.step * _sum.sum1

      if ( this.t0 === _t0 && this.t1 === _t1 ) return this; // Convergence reached
    }
  }

  calculateDerivedError(items) {
    let _sum0 = 0;
    let _sum1 = 0;

    for ( let i = 0; i < this.m; i++ ) {
      _sum0 += this.hypotesis(items[i].size) - items[i].val
      _sum1 += (this.hypotesis(items[i].size) - items[i].val) * items[i].size
    }

    return {
      sum0: _sum0/this.m,
      sum1: _sum1/this.m
    };
  }

  async setTrainingSet () {
    return await this.client.getTrainingSet()
  }


}

export default LiniarRegression