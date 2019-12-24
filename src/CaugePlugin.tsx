import React, { Component, ReactNode } from 'react';

let padding = 10;
interface optsProps {
  width: number;
  labelSize: number;
  defaultTemp: number;
  maxTemp: number;
  minTemp: number;
  borderWidth: number;
  showLabel: string;
  borderColor: string;
  fillColor: string;
  value?:number
}
interface CaugePluginProps {
  width?: number;
  labelSize?: number;
  defaultTemp?: number;
  maxTemp?: number;
  minTemp?: number;
  borderWidth?: number;
  showLabel?: string;
  borderColor?: string;
  fillColor?: string;
  value?: number;
}

class CaugePlugin extends Component<CaugePluginProps> {
  static defaultProps = {
    width: 50,
    labelSize: 20,
    defaultTemp: 10,
    maxTemp: 20,
    minTemp: 10,
    borderWidth: 2,
    showLabel: '10',
    borderColor: 'red',
    fillColor: 'red',
  };

  state={
    canvas:''
  }

  componentDidMount() {
    const opts: optsProps = {
      ...this.props,
    } as optsProps;
    setTimeout(()=>{
      this.createTempGauge(opts, '16');
    },100)
    
  }

  componentWillReceiveProps(nextProps:optsProps) {
    const { value } = nextProps;
    const opts: optsProps = {
      ...this.props,
      ...nextProps
    } as optsProps;
    if (value != null) {
      this.createTempGauge(opts, value);
    }
  }

  createTempGauge = (opts: optsProps, text: string) => {
    var canvas: HTMLCanvasElement =this.refs.canvas, 
      ctx = canvas.getContext('2d'),
      currentTempText = text,
      currentTemp = parseFloat(currentTempText) || opts.defaultTemp;

    canvas.width = opts.width;
    canvas.height = opts.width * 2 + opts.labelSize;

    // $(gauge).replaceWith(canvas);

    var length = opts.maxTemp - opts.minTemp;
    var percentage = this.calculatePercentage(
      currentTemp,
      opts.minTemp,
      length,
    );

    this.fillTempGauge(ctx, 0, 0, opts.width, opts.width * 2, percentage, opts);
    this.strokeTempGauge(
      ctx,
      0,
      0,
      opts.width,
      opts.width * 2,
      opts.borderWidth,
      opts,
    );
    if (opts.showLabel) {
      this.drawLabel(
        ctx,
        canvas.width / 2,
        canvas.height - opts.labelSize / 3,
        currentTempText,
        opts,
      );
    }
    return ctx;
  };

  calculatePercentage = (temp: number, mintemp: number, length: number) => {
    var percentage = (temp - mintemp) / length;
    percentage = percentage > 1 ? 1 : percentage;
    percentage = percentage < 0 ? 0 : percentage;
    return percentage;
  };

  strokeTempGauge = (
    ctx,
    x: number,
    y: number,
    width: number,
    height: number,
    borderWidth: number,
    opts: optsProps,
  ) => {
    y += padding / 2;
    height -= padding;

    var wholeCircle = Math.PI * 2;
    var smallRadius = width / 3 / 2;
    var xSmall = x + width / 2;
    var ySmall = y + smallRadius;

    var bigRadius = height / 6;
    var xBig = x + width / 2;
    var yBig = y + (height / 6) * 5;

    var offSet = Math.sqrt(
      Math.pow(bigRadius, 2) - Math.pow(smallRadius / 2, 2),
    );

    ctx.beginPath();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = opts.borderColor;
    ctx.arc(xSmall, ySmall, smallRadius, wholeCircle / -2, 0, false);
    ctx.moveTo(xSmall - smallRadius, ySmall);
    ctx.lineTo(xSmall - smallRadius, yBig - offSet + borderWidth);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xSmall + smallRadius, ySmall);
    ctx.lineTo(xSmall + smallRadius, yBig - offSet + borderWidth);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      xBig,
      yBig,
      bigRadius,
      wholeCircle / -6,
      (wholeCircle * -2) / 6,
      false,
    );
    ctx.stroke();
  };

  fillTempGauge = (
    ctx,
    x: number,
    y: number,
    width: number,
    height: number,
    percent: number,
    opts: optsProps,
  ) => {
    var wholeCircle = Math.PI * 2;

    y += padding / 2;
    height -= padding;

    var bigRadius = height / 6 - opts.borderWidth;
    var xBig = x + width / 2;
    var yBig = y + (height / 6) * 5;

    var smallRadius = width / 3 / 2 - opts.borderWidth;
    var xSmall = x + width / 2;
    var ySmall = y + smallRadius + opts.borderWidth;

    var offSet = Math.sqrt(
      Math.pow(bigRadius, 2) - Math.pow(smallRadius / 2, 2),
      2,
    );

    var twoThirdsLength = (height / 6) * 5 - offSet - width / 3 / 2;

    var gauge = twoThirdsLength * percent;

    var yBox = yBig - offSet - gauge;
    var xBox = xBig - width / 6 + opts.borderWidth;

    ctx.fillStyle = opts.fillColor;

    if (percent == 1) {
      ctx.arc(xSmall, ySmall, smallRadius, wholeCircle / -2, 0, false);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillRect(
      xBox,
      yBox - 1,
      width / 3 - opts.borderWidth * 2,
      gauge + padding,
    );

    ctx.beginPath();
    ctx.arc(
      xBig,
      yBig,
      bigRadius,
      wholeCircle / -6,
      (wholeCircle * -2) / 6,
      false,
    );
    ctx.closePath();
    ctx.fill();
  };

  drawLabel = (ctx, x: number, y: number, text: string, opts: optsProps) => {
    ctx.font = 'bold ' + opts.labelSize + 'px Arial ';
    ctx.textAlign = 'center';
    ctx.fillStyle = opts.borderColor;
    ctx.fillText(text, x, y);
  };

  render(): React.ReactNode {
    return (
      <div>
        <canvas ref={'canvas'}></canvas>
      </div>
    );
  }
}
export default CaugePlugin;
