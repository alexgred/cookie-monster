(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var CookieMonster = /** @class */ (function () {
    function CookieMonster() {
    }
    CookieMonster.get = function (name) {
        var value = '; ' + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    };
    CookieMonster.set = function (name, value, options) {
        options = __assign({ path: '/' }, options);
        var cookie = name + '=' + value;
        Object.keys(options).forEach(function (key) {
            cookie += '; ' + key;
            if (options[key] !== true) {
                cookie += '=' + options[key];
            }
        });
        document.cookie = cookie;
    };
    CookieMonster.delete = function (name) {
        this.set(name, '', {
            'max-age': -1
        });
    };
    return CookieMonster;
}());
exports.default = CookieMonster;

},{}]},{},[1]);
