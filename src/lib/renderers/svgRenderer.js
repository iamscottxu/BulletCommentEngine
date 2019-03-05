import { BaseRenderer } from './baseRenderer'
import { BrowserNotSupportError } from '../../browserNotSupportError'
import { Helper } from '../helper'

/**
 * SVG 渲染器类
 */
class SVGRenderer extends BaseRenderer {
    /**
     * 实例化一个 SVG 渲染器类
     * @param {object} element - Element 元素
     * @param {openBSE~Options} options - 全局选项
     * @param {object} elementSize - 元素大小
     * @param {Event} eventTrigger - 事件引发方法
     * @throws {openBSE.BrowserNotSupportError} 浏览器不支持特定渲染模式时引发错误
     */
    constructor(element, options, elementSize, eventTrigger) {
        supportCheck(); //浏览器支持检测
        let _svg;
        let _defsSvg;
        super(init(), options, elementSize);

        /**
         * 清除屏幕内容
         * @override
         */
        this.cleanScreen = function () {
            Helper.cleanElement(_svg);
            _defsSvg = createElementSVG('defs'); //defs
            _svg.appendChild(_defsSvg);
        }

        /**
         * 绘制函数
         * @override
         */
        this.draw = function () {
            for (let textSvg of _svg.getElementsByTagName('text')) {
                let bulletScreenOnScreen = textSvg.bulletScreenOnScreen;
                for (let key in bulletScreenOnScreen.svg) {
                    let item = bulletScreenOnScreen.svg[key];
                    if (this.checkWhetherHide(bulletScreenOnScreen)) item.setAttribute('opacity', '0');
                    else item.setAttribute('opacity', '1');
                    item.setAttribute('transform', `translate(${Math.round(bulletScreenOnScreen.x - 4)},${Math.round(bulletScreenOnScreen.actualY - 4)})`);
                }
            }
        }

        /**
         * 创建弹幕元素
         * @override
         * @param {object} bulletScreenOnScreen - 屏幕弹幕对象
         */
        this.creatAndgetWidth = function (bulletScreenOnScreen) {
            let bulletScreen = bulletScreenOnScreen.bulletScreen;
            bulletScreenOnScreen.svg = typeof bulletScreenOnScreen.svg === 'object' ? bulletScreenOnScreen.svg : {};

            let textSvg = typeof bulletScreenOnScreen.svg.text === 'object' ? bulletScreenOnScreen.svg.text : createElementSVG('text');
            textSvg.setAttribute('x', 0);
            textSvg.setAttribute('y', bulletScreenOnScreen.size * 0.8);
            textSvg.setAttribute('font-family', bulletScreen.style.fontFamily);
            textSvg.setAttribute('font-size', bulletScreenOnScreen.size);
            textSvg.setAttribute('font-weight', bulletScreen.style.fontWeight);
            textSvg.setAttribute('fill', bulletScreen.style.color);
            Helper.cleanElement(textSvg);
            textSvg.appendChild(document.createTextNode(bulletScreen.text));
            if (bulletScreen.style.borderColor != null) {
                textSvg.setAttribute('stroke', bulletScreen.borderColor);
                textSvg.setAttribute('stroke-width', 0.5);
            }

            if (bulletScreen.style.shadowBlur != null) {
                let filterId = `bulletScreenEngine_svgFilter_shadow_${bulletScreen.style.shadowBlur}`;
                let filterSvg = document.getElementById(filterId);
                if (filterSvg === null) {
                    filterSvg = createElementSVG('filter');
                    filterSvg.id = filterId;
                    filterSvg.setAttribute('x', '-100%');
                    filterSvg.setAttribute('y', '-100%');
                    filterSvg.setAttribute('width', '300%');
                    filterSvg.setAttribute('height', '300%');
                    let feOffsetSvg = createElementSVG('feOffset');
                    feOffsetSvg.setAttribute('result', 'offOut');
                    feOffsetSvg.setAttribute('in', 'SourceAlpha');
                    filterSvg.appendChild(feOffsetSvg);
                    let feGaussianBlurSvg = createElementSVG('feGaussianBlur');
                    feGaussianBlurSvg.setAttribute('result', 'blurOut');
                    feGaussianBlurSvg.setAttribute('in', 'offOut');
                    feGaussianBlurSvg.setAttribute('stdDeviation', bulletScreen.style.shadowBlur);
                    filterSvg.appendChild(feGaussianBlurSvg);
                    let feBlendSvg = createElementSVG('feBlend');
                    feBlendSvg.setAttribute('in', 'SourceGraphic');
                    feBlendSvg.setAttribute('in2', 'blurOut');
                    feBlendSvg.setAttribute('mode', 'normal');
                    filterSvg.appendChild(feBlendSvg);
                    filterSvg.bulletScreenCount = 0;
                    _defsSvg.appendChild(filterSvg);
                }
                filterSvg.bulletScreenCount++;
                textSvg.setAttribute('filter', `url(#${filterId})`);
                bulletScreenOnScreen.filterId = filterId;
            }

            bulletScreenOnScreen.svg.text = textSvg;
            textSvg.bulletScreenOnScreen = bulletScreenOnScreen;
            insertElement(textSvg);
            bulletScreenOnScreen.width = textSvg.getComputedTextLength(); //弹幕的宽度：像素

            if (bulletScreen.style.boxColor != null) {
                let rectSvg = typeof bulletScreenOnScreen.svg.rect === 'object' ? bulletScreenOnScreen.svg.rect : createElementSVG('rect');
                rectSvg.setAttribute('x', -3);
                rectSvg.setAttribute('y', -3);
                rectSvg.setAttribute('fill', 'none');
                rectSvg.setAttribute('height', bulletScreenOnScreen.height + 7);
                rectSvg.setAttribute('width', bulletScreenOnScreen.width + 7);
                rectSvg.setAttribute('stroke', bulletScreen.style.boxColor);
                rectSvg.setAttribute('stroke-width', 1);
                bulletScreenOnScreen.svg.rect = rectSvg;
                rectSvg.bulletScreenOnScreen = bulletScreenOnScreen;
                _svg.insertBefore(rectSvg, textSvg);
            }
        }

        /**
        * 删除弹幕元素
        * @override
        * @param {object} bulletScreenOnScreen - 屏幕弹幕对象
        */
        this.delete = function (bulletScreenOnScreen) {
            if (typeof bulletScreenOnScreen.filterId != 'undefined') {
                let filterSvg = document.getElementById(bulletScreenOnScreen.filterId);
                if (filterSvg != null && --filterSvg.bulletScreenCount === 0)
                    _defsSvg.removeChild(filterSvg);
            }
            for (let index in bulletScreenOnScreen.svg) {
                _svg.removeChild(bulletScreenOnScreen.svg[index]);
            }
        }

        /**
         * 重新添加弹幕
         * @override
         * @param {object} bulletScreenOnScreen - 屏幕弹幕对象
         */
        this.reCreatAndgetWidth = function (bulletScreenOnScreen) {
            this.delete(bulletScreenOnScreen);
            this.creatAndgetWidth(bulletScreenOnScreen);
        }

        let _setSize = this.setSize;
        /**
         * 设置尺寸
         * @override
         */
        this.setSize = function () {
            _setSize();
            _svg.setAttribute('height', elementSize.height);
            _svg.setAttribute('width', elementSize.width);
        }

        /**
         * 添加Div
         * @private
         * @returns {Element} Div
         */
        function init() {
            let div = document.createElement('div'); //DIV
            Helper.cleanElement(element);
            element.appendChild(div);
            div.style.padding = '0';
            div.style.margin = '0';
            _svg = createElementSVG('svg'); //SVG
            _defsSvg = createElementSVG('defs'); //defs
            _svg.appendChild(_defsSvg);
            _svg.setAttribute('height', elementSize.height);
            _svg.setAttribute('width', elementSize.width);
            div.appendChild(_svg);
            let eventDiv = document.createElement('div'); //DIV
            eventDiv.style.position = 'absolute';
            eventDiv.style.top =
                eventDiv.style.right =
                eventDiv.style.bottom =
                eventDiv.style.left = '0';
            div.appendChild(eventDiv);
            registerEvent(eventDiv); //注册事件响应程序
            return div;
        }

        /**
         * 浏览器支持检测
         * @private
         * @throws {openBSE.BrowserNotSupportError} 浏览器不支持特定渲染模式时引发错误
         */
        function supportCheck() {
            if (typeof document.createElementNS != 'function') throw new BrowserNotSupportError('createElementNS Function');
            if (typeof createElementSVG('svg').createSVGRect != 'function') throw new BrowserNotSupportError('SVG');
        }

        let _checkWhetherHide = this.checkWhetherHide;
        /**
         * 注册事件响应程序
         * @private
         * @param {Element} element - 元素
         */
        function registerEvent(element) {
            function getBulletScreenOnScreenByLocation(location) {
                let textSvgs = _svg.getElementsByTagName('text');
                for (let index = textSvgs.length - 1; index > 0; index--) {
                    let bulletScreenOnScreen = textSvgs[index].bulletScreenOnScreen;
                    if (_checkWhetherHide(bulletScreenOnScreen)) return;
                    let x1 = bulletScreenOnScreen.x - 4;
                    let x2 = x1 + bulletScreenOnScreen.width + 8;
                    let y1 = bulletScreenOnScreen.actualY - 4;
                    let y2 = y1 + bulletScreenOnScreen.height + 8;
                    if (location.x >= x1 && location.x <= x2 && location.y >= y1 && location.y <= y2)
                        return bulletScreenOnScreen;
                }
                return null;
            }
            function getLocation(e) {
                function getOffsetTop(element) {
                    let offsetTop = 0;
                    do {
                        offsetTop += element.offsetTop;
                    } while ((element = element.offsetParent) != null);
                    return offsetTop;
                }
                function getOffsetLeft(element) {
                    let offsetLeft = 0;
                    do {
                        offsetLeft += element.offsetLeft;
                    } while ((element = element.offsetParent) != null);
                    return offsetLeft;
                }
                if (typeof e.offsetX === 'undefined' || e.offsetX === null) {
                    if (typeof e.layerX === 'undefined' || e.layerX === null) {
                        if (typeof e.pageX === 'undefined' || e.pageX === null) {
                            let doc = document.documentElement, body = document.body;
                            e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                            e.pageY = e.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                        }
                        e.layerX = e.pageX - getOffsetLeft(e.target);
                        e.layerY = e.pageY - getOffsetTop(e.target);
                    }
                    e.offsetX = e.layerX - e.target.clientLeft;
                    e.offsetY = e.layerY - e.target.clientTop;
                }
                return {
                    x: e.offsetX,
                    y: e.offsetY
                };
            }

            //上下文菜单
            element.oncontextmenu = function (e) {
                let bulletScreenOnScreen = getBulletScreenOnScreenByLocation(getLocation(e));
                if (bulletScreenOnScreen)
                    eventTrigger('contextmenu', bulletScreenOnScreen, e);
                return false;
            };
            //单击
            element.onclick = function (e) {
                let bulletScreenOnScreen = getBulletScreenOnScreenByLocation(getLocation(e));
                if (bulletScreenOnScreen)
                    eventTrigger('click', bulletScreenOnScreen, e);
                return false;
            };
            //鼠标移动
            element.onmousemove = function (e) {
                let bulletScreenOnScreen = getBulletScreenOnScreenByLocation(getLocation(e));
                for (let textSvg of _svg.getElementsByTagName('text')) {
                    let _bulletScreenOnScreen = textSvg.bulletScreenOnScreen;
                    if (_bulletScreenOnScreen != bulletScreenOnScreen && _bulletScreenOnScreen.mousein) {
                        _bulletScreenOnScreen.mousein = false;
                        element.style.cursor = '';
                        eventTrigger('mouseleave', _bulletScreenOnScreen, e);
                    }
                }
                if (bulletScreenOnScreen === null || bulletScreenOnScreen.mousein) return false;
                bulletScreenOnScreen.mousein = true;
                element.style.cursor = options.cursorOnMouseOver;
                eventTrigger('mouseenter', bulletScreenOnScreen, e);
                return false;
            }
            //鼠标离开
            element.onmouseout = function (e) {
                for (let textSvg of _svg.getElementsByTagName('text')) {
                    let _bulletScreenOnScreen = textSvg.bulletScreenOnScreen;
                    if (_bulletScreenOnScreen.mousein) {
                        _bulletScreenOnScreen.mousein = false;
                        element.style.cursor = '';
                        eventTrigger('mouseleave', _bulletScreenOnScreen, e);
                    }
                }
            }
        }

        /**
         * 创建 SVG 元素
         * @private
         * @param {string} qualifiedName - Element 名称
         * @param {object} options - 选项
         */
        function createElementSVG(qualifiedName, options) {
            return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName, options);
        }

        /**
         * 按 layer 插入元素
         * @param {Element} element - 元素
         */
        function insertElement(element) {
            let elements = _svg.getElementsByTagName(element.tagName);
            if (elements.length === 0) _svg.appendChild(element);
            let index;
            for (index = elements.length - 1; index > 0; index--) {
                let _layer = elements[index].bulletScreenOnScreen.bulletScreen.layer;
                if (_layer <= element.bulletScreenOnScreen.bulletScreen.layer) break;
            }
            if (++index === elements.length) _svg.appendChild(element);
            else _svg.insertBefore(element, elements[index]);
        }
    }
}

export { SVGRenderer };