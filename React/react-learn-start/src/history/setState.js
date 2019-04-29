// 实际上是一个异步队列的问题

// 默认批量更新
let isBatchingUpdate = true;

let transcation = component => {
  component.state = component.pendingState;
  component.render();
  isBatchingUpdate = false;
};

class My {
  constructor() {
    this.state = {number: 0};
    this.pendingState = {...this.state};
  }

  setState(obj) {
    if (isBatchingUpdate) {
      this.pendingState = {...this.pendingState, ...obj};
    } else {
      this.pendingState = {...this.pendingState, ...obj};
      transcation(this);
    }

  }

  update() {
    setTimeout(() => {
      this.setState({number: this.state.number + 1});
      this.setState({number: this.state.number + 2});
      this.setState({number: this.state.number + 3});
    });
    transcation(this);
  }

  render() {
    console.log(this.state.number);
  }

}

let my = new My();
my.update();

/***
 没有 setTimeout 的输出
 1: 0 1
 2: 0 2
 3: 0 3
 component.state:  { number: 3 }
 component.pendingState:  { number: 3 }
 3
 **/
