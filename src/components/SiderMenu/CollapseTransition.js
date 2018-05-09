import { Component } from 'react';

const ANIMATION_DURATION = 300;

export default class CollapseTransition extends Component {
  
  constructor(props) {
  	super()
  	this.enterTimer = ''
  	this.leaveTimer = ''
  }

  componentDidMount() {
    this.beforeEnter();
    if (this.props.isSpread) {
      this.enter();
    }
  }

  componentWillUnmount() {
    this.beforeLeave();
    this.leave();
  }

  componentWillReceiveProps(nextProps){
    if (this.props.isSpread !== nextProps.isSpread) this.triggerChange(nextProps.isSpread);
  }

  triggerChange(isSpread) {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    if (isSpread) {
      this.beforeEnter();
      this.enter();
    } else {
      this.beforeLeave();
      this.leave();
    }
  }

  beforeEnter() {
    const el = this.selfRef;
    //prepare
    el.dataset.oldOverflow = el.style.overflow;
    el.style.height = '0';
  }

  enter() {
    const el = this.selfRef;
    //start
    el.style.display = 'block';
    console.log(el.scrollHeight)
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = '';
    }

    el.style.overflow = 'hidden';

    this.enterTimer = setTimeout(() => this.afterEnter(), ANIMATION_DURATION);
  }

  afterEnter() {
    const el = this.selfRef;
    el.style.display = 'block';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  }

  beforeLeave() {
    const el = this.selfRef;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
    el.style.overflow = 'hidden';
  }

  leave() {
    const el = this.selfRef;
    if (el.scrollHeight !== 0) {
      el.style.height = 0;
    }
    this.leaveTimer = setTimeout(() => this.afterLeave(), ANIMATION_DURATION);
  }

  afterLeave() {
    const el = this.selfRef;
    if (!el) return ;

    el.style.display = 'none';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  }

  render() {
    return (
      <div
        className="collapse-transition"
        style={{ overflow: 'hidden' }}
        ref={el => this.selfRef = el}
      >
        {this.props.children}
      </div>
    );
  }
}
