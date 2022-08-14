import chalk from 'chalk';

class LoggerService {
  /**
   * @description 日志的打印级别,只有等于或高于此级别的日志才会被打印出来;0=debug;1=info;2=warn,success;3=error
   * @default 1
   * @private
   */
  private logLevel = 1;
  
  /**
   * @description 设置debug级别,设置后默认日志仅输出大于等于当前级别的日志信息
   * @param level 0=debug;1=info;2=warn,success;3=error
   */
  public setDebugLevel(level: 0 | 1 | 2 | 3) {
    this.logLevel = level;
  }
  
  /**
   * @param msg 消息内容
   * @param [print=true] 是否打印日志,为否的的话则不打印日志
   * @return {string} 返回被着色后的文本消息
   */
  public debug(msg: string, print = true) {
    const text = chalk.white(this.formatLog(msg, '🔧'));
    if (print && this.logLevel <= 0) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }
  
  public info(msg: string, print = true) {
    const text = chalk.cyan(this.formatLog(msg, '💡'));
    if (print && this.logLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }
  
  public success(msg: string, print = true) {
    const text = chalk.green(this.formatLog(msg, '✔️'));
    if (print && this.logLevel <= 2) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }
  
  public warning(msg: string, print = true) {
    const text = chalk.hex('#FFA500')(this.formatLog(msg, '‼️'));
    if (print && this.logLevel <= 2) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }
  
  public error(msg: string, print = true) {
    const text = chalk.red(this.formatLog(msg, '🚫'));
    if (print && this.logLevel <= 3) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }
  
  private formatLog(str: string, prefix?: string) {
    return `[${this.formatDate(new Date())}]:\t${prefix ? `${prefix}  ` : ''}${str}`;
  }
  
  private formatDate(date: Date, format = 'YYYY-MM-DD hh:mm:ss') {
    let str = format;
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const h = date.getHours().toString();
    const m = date.getMinutes().toString();
    const s = date.getSeconds().toString();
    str = str.replace('YYYY', year);
    str = str.replace('MM', month.length > 1 ? month : `0${month}`);
    str = str.replace('DD', day.length > 1 ? day : `0${day}`);
    str = str.replace('hh', h.length > 1 ? h : `0${h}`);
    str = str.replace('mm', m.length > 1 ? m : `0${m}`);
    str = str.replace('ss', s.length > 1 ? s : `0${s}`);
    return str;
  }
}

export default new LoggerService()
