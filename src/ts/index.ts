interface IOptions {
  path?: string;
  domain?: string;
  'max-age'?: number;
  expire?: string;
  secure?: boolean;
  samesite?: string;
}

export default class CookieMonster {

  static get(name: string): string {
    const value: string = '; ' + document.cookie;
    const parts: string[] = value.split("; " + name + "=");

    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    }
  }

  static set(name: string, value: string, options?: IOptions): void {
    options = {
      path: '/',
      ...options
    };

    let cookie: string = name + '=' + value;

    Object.keys(options).forEach((key: keyof IOptions) => {
      cookie += '; ' + key;

      if(options[key] !== true) {
        cookie += '=' + options[key];
      }
    });

    document.cookie = cookie;
  }

  static delete(name: string): void {
    this.set(name, '', {
      'max-age': -1
    });
  }
}
