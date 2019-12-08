declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

import { assert } from 'chai';
import { JSDOM } from 'jsdom';
import CookieMonster from '../src/ts/index';


const { window } = (new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>'));
global.document = window.document;
global.window = window;

let setAllTestData = () => {
  CookieMonster.set('test1', 'ok');

  CookieMonster.set('test2', 'ok', {
    path: '/',
  });

  CookieMonster.set('test3', 'ok', {
    'max-age': 3600
  });

  CookieMonster.set('test4', 'ok', {
    path: '/',
    'max-age': 60
  });

  CookieMonster.set('test5', 'ok', {
    expire: 'Sun Dec 08 2019 20:23:02 GMT+0300'
  });

  CookieMonster.set('test6', 'ok', {
    path: '/',
    expire: 'Sun Dec 08 2019 20:23:02 GMT+0300'
  });

  CookieMonster.set('test7', 'ok', {
    secure: true
  });

  CookieMonster.set('test8', 'ok', {
    path: '/test/'
  });

  CookieMonster.set('test9', 'ok');
  CookieMonster.delete('test9');

  CookieMonster.set('test10', 'ok', {
    path: '/',
    expire: 'Sun Dec 08 2019 20:23:02 GMT+0300'
  });
  CookieMonster.delete('test10');
};

describe('CookieMonster', () => {
  setAllTestData();

  describe('Testing get cookie:', () => {

    it('default', () => {
      assert.equal(CookieMonster.get('test1'), 'ok');
    });

    it('path', () => {
      assert.equal(CookieMonster.get('test2'), 'ok');
    });

    it('max-age', () => {
      assert.equal(CookieMonster.get('test3'), 'ok');
    });

    it('max-age + path', () => {
      assert.equal(CookieMonster.get('test4'), 'ok');
    });

    it('expire', () => {
      assert.equal(CookieMonster.get('test5'), 'ok');
    });

    it('expire + path', () => {
      assert.equal(CookieMonster.get('test6'), 'ok');
    });

    it('secure', () => {
      assert.equal(CookieMonster.get('test7'), undefined);
    });

    it('path is /test/', () => {
      assert.equal(CookieMonster.get('test8'), undefined);
    });
  });


  describe('Testing delete cookie:', () => {

    it('default', () => {
      assert.equal(CookieMonster.get('test9'), undefined);
    });

    it('path + expire', () => {
      assert.equal(CookieMonster.get('test10'), undefined);
    });
  });
});


