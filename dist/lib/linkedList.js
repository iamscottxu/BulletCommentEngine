"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedList = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 双向链表类
 */
var LinkedList =
/**
 * 创建一个双向链表。
 */
function LinkedList() {
  _classCallCheck(this, LinkedList);

  /**
   * 双向链表节点
   * @private
  */
  var node = function node(element) {
    _classCallCheck(this, node);

    this.element = element;
    this.next = null;
    this.previous = null;
  };

  var topNode = new node(null);
  var bottomNode = new node(null);
  var length = 0;
  topNode.next = bottomNode;
  bottomNode.previous = topNode;
  /**
   * 获取元素个数
   * @returns {number} 元素个数
   */

  this.getLength = function (l) {
    return length;
  };
  /**
   * 插入元素
   * @param {*} element - 元素
   * @param {boolean} top - true: 插入到顶部 false: 插入到底部
   */


  this.push = function (element, top) {
    var thisNode = new node(element);

    if (top) {
      thisNode.next = topNode.next;
      thisNode.previous = topNode;
      topNode.next = topNode.next.previous = thisNode;
    } else {
      thisNode.previous = bottomNode.previous;
      thisNode.next = bottomNode;
      bottomNode.previous = bottomNode.previous.next = thisNode;
    }

    length++;
  };
  /**
   * 读取元素
   * @param {boolean} remove - 读取后是否删除
   * @param {boolean} top - true: 读取顶部 false: 读取底部
   * @returns {*} 元素
   */


  this.pop = function (remove, top) {
    var thisNode;

    if (top) {
      thisNode = topNode.next;

      if (topNode.next != bottomNode && remove) {
        thisNode.next.previous = topNode;
        topNode.next = thisNode.next;
      }
    } else {
      thisNode = bottomNode.previous;

      if (bottomNode.previous != topNode && remove) {
        thisNode.previous.next = bottomNode;
        bottomNode.previous = thisNode.previous;
      }
    }

    if (remove) length--;
    return thisNode.element;
  };
  /**
   * 清空链表
   */


  this.clean = function () {
    topNode = new node(null);
    bottomNode = new node(null);
    topNode.next = bottomNode;
    bottomNode.previous = topNode;
    length = 0;
  };
  /**
   * 遍历链表
   * @param {function} fun - 遍历回调函数
   * 回调函数（参数：元素，返回：{remove：删除此元素，add:插入元素(add.addToUp:插入到上方, add.element:元素), stop：停止遍历}）
   * @param {boolean} topToBottom - true: 从顶到底 false: 从底到顶
   */


  this.forEach = function (fun, topToBottom) {
    var thisNode = topToBottom ? topNode : bottomNode;

    while (topToBottom ? (thisNode = thisNode.next) != bottomNode : (thisNode = thisNode.previous) != topNode) {
      var _return = fun(thisNode.element);

      if (_return) {
        if (_return.add) {
          var newNode = new node(_return.add.element);

          if (_return.add.addToUp) {
            newNode.previous = thisNode.previous;
            newNode.next = thisNode;
            thisNode.previous.next = newNode;
            thisNode.previous = newNode;
          } else {
            newNode.previous = thisNode;
            newNode.next = thisNode.next;
            thisNode.next.previous = newNode;
            thisNode.next = newNode;
          }

          length++;
        }

        if (_return.remove) {
          thisNode.previous.next = thisNode.next;
          thisNode.next.previous = thisNode.previous;
          length--;
        }

        if (_return.stop) {
          return;
        }
      }
    }
  };
};

exports.LinkedList = LinkedList;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9saW5rZWRMaXN0LmpzIl0sIm5hbWVzIjpbIkxpbmtlZExpc3QiLCJub2RlIiwiZWxlbWVudCIsIm5leHQiLCJwcmV2aW91cyIsInRvcE5vZGUiLCJib3R0b21Ob2RlIiwibGVuZ3RoIiwiZ2V0TGVuZ3RoIiwibCIsInB1c2giLCJ0b3AiLCJ0aGlzTm9kZSIsInBvcCIsInJlbW92ZSIsImNsZWFuIiwiZm9yRWFjaCIsImZ1biIsInRvcFRvQm90dG9tIiwiX3JldHVybiIsImFkZCIsIm5ld05vZGUiLCJhZGRUb1VwIiwic3RvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7O0lBR01BLFU7QUFDRjs7O0FBR0Esc0JBQWM7QUFBQTs7QUFDVjs7OztBQURVLE1BS0pDLElBTEksR0FNTixjQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLFNBQUtBLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNILEdBVks7O0FBYVYsTUFBSUMsT0FBTyxHQUFHLElBQUlKLElBQUosQ0FBUyxJQUFULENBQWQ7QUFDQSxNQUFJSyxVQUFVLEdBQUcsSUFBSUwsSUFBSixDQUFTLElBQVQsQ0FBakI7QUFDQSxNQUFJTSxNQUFNLEdBQUcsQ0FBYjtBQUNBRixFQUFBQSxPQUFPLENBQUNGLElBQVIsR0FBZUcsVUFBZjtBQUNBQSxFQUFBQSxVQUFVLENBQUNGLFFBQVgsR0FBc0JDLE9BQXRCO0FBRUE7Ozs7O0FBSUEsT0FBS0csU0FBTCxHQUFpQixVQUFBQyxDQUFDO0FBQUEsV0FBSUYsTUFBSjtBQUFBLEdBQWxCO0FBQ0E7Ozs7Ozs7QUFLQSxPQUFLRyxJQUFMLEdBQVksVUFBVVIsT0FBVixFQUFtQlMsR0FBbkIsRUFBd0I7QUFDaEMsUUFBSUMsUUFBUSxHQUFHLElBQUlYLElBQUosQ0FBU0MsT0FBVCxDQUFmOztBQUNBLFFBQUlTLEdBQUosRUFBUztBQUNMQyxNQUFBQSxRQUFRLENB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WUFBQUEsUUFBUSxDQUFDUixRQUFULENBQWtCRCxJQUFsQixHQUF5QmtCLE9BQXpCO0FBQ0FULFlBQUFBLFFBQVEsQ0FBQ1IsUUFBVCxHQUFvQmlCLE9BQXBCO0FBQ0gsV0FMRCxNQU1LO0FBQ0RBLFlBQUFBLE9BQU8sQ0FBQ2pCLFFBQVIsR0FBbUJRLFFBQW5CO0FBQ0FTLFlBQUFBLE9BQU8sQ0FBQ2xCLElBQVIsR0FBZVMsUUFBUSxDQUFDVCxJQUF4QjtBQUNBUyxZQUFBQSxRQUFRLENBQUNULElBQVQsQ0FBY0MsUUFBZCxHQUF5QmlCLE9BQXpCO0FBQ0FULFlBQUFBLFFBQVEsQ0FBQ1QsSUFBVCxHQUFnQmtCLE9BQWhCO0FBQ0g7O0FBQ0RkLFVBQUFBLE1BQU07QUFDVDs7QUFDRCxZQUFJWSxPQUFPLENBQUNMLE1BQVosRUFBb0I7QUFDaEJGLFVBQUFBLFFBQVEsQ0FBQ1IsUUFBVCxDQUFrQkQsSUFBbEIsR0FBeUJTLFFBQVEsQ0FBQ1QsSUFBbEM7QUFDQVMsVUFBQUEsUUFBUSxDQUFDVCxJQUFULENBQWNDLFFBQWQsR0FBeUJRLFFBQVEsQ0FBQ1IsUUFBbEM7QUFDQUcsVUFBQUEsTUFBTTtBQUNUOztBQUNELFlBQUlZLE9BQU8sQ0FBQ0ksSUFBWixFQUFrQjtBQUNkO0FBQ0g7QUFDSjtBQUNKO0FBQ0osR0FoQ0Q7QUFpQ0gsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlj4zlkJHpk77ooajnsbtcclxuICovXHJcbmNsYXNzIExpbmtlZExpc3Qge1xyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrlj4zlkJHpk77ooajjgIJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Y+M5ZCR6ZO+6KGo6IqC54K5XHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzIG5vZGUge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yid5aeL5YyWXHJcbiAgICAgICAgbGV0IHRvcE5vZGUgPSBuZXcgbm9kZShudWxsKTtcclxuICAgICAgICBsZXQgYm90dG9tTm9kZSA9IG5ldyBub2RlKG51bGwpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSAwO1xyXG4gICAgICAgIHRvcE5vZGUubmV4dCA9IGJvdHRvbU5vZGU7XHJcbiAgICAgICAgYm90dG9tTm9kZS5wcmV2aW91cyA9IHRvcE5vZGU7XHJcbiAgICAgICAgLy/lhazlhbHlh73mlbBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blhYPntKDkuKrmlbBcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSDlhYPntKDkuKrmlbBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmdldExlbmd0aCA9IGwgPT4gbGVuZ3RoO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaPkuWFpeWFg+e0oFxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudCAtIOWFg+e0oFxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdG9wIC0gdHJ1ZTog5o+S5YWl5Yiw6aG26YOoIGZhbHNlOiDmj5LlhaXliLDlupXpg6hcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnB1c2ggPSBmdW5jdGlvbiAoZWxlbWVudCwgdG9wKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGlzTm9kZSA9IG5ldyBub2RlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAodG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzTm9kZS5uZXh0ID0gdG9wTm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpc05vZGUucHJldmlvdXMgPSB0b3BOb2RlO1xyXG4gICAgICAgICAgICAgICAgdG9wTm9kZS5uZXh0ID0gdG9wTm9kZS5uZXh0LnByZXZpb3VzID0gdGhpc05vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzTm9kZS5wcmV2aW91cyA9IGJvdHRvbU5vZGUucHJldmlvdXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzTm9kZS5uZXh0ID0gYm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJvdHRvbU5vZGUucHJldmlvdXMgPSBib3R0b21Ob2RlLnByZXZpb3VzLm5leHQgPSB0aGlzTm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGgrKztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOivu+WPluWFg+e0oFxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVtb3ZlIC0g6K+75Y+W5ZCO5piv5ZCm5Yig6ZmkXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB0b3AgLSB0cnVlOiDor7vlj5bpobbpg6ggZmFsc2U6IOivu+WPluW6lemDqFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfSDlhYPntKBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBvcCA9IGZ1bmN0aW9uIChyZW1vdmUsIHRvcCkge1xyXG4gICAgICAgICAgICBsZXQgdGhpc05vZGU7XHJcbiAgICAgICAgICAgIGlmICh0b3ApIHtcclxuICAgICAgICAgICAgICAgIHRoaXNOb2RlID0gdG9wTm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvcE5vZGUubmV4dCAhPSBib3R0b21Ob2RlICYmIHJlbW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNOb2RlLm5leHQucHJldmlvdXMgPSB0b3BOb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcE5vZGUubmV4dCA9IHRoaXNOb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzTm9kZSA9IGJvdHRvbU5vZGUucHJldmlvdXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm90dG9tTm9kZS5wcmV2aW91cyAhPSB0b3BOb2RlICYmIHJlbW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNOb2RlLnByZXZpb3VzLm5leHQgPSBib3R0b21Ob2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbU5vZGUucHJldmlvdXMgPSB0aGlzTm9kZS5wcmV2aW91cztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVtb3ZlKVxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoLS07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzTm9kZS5lbGVtZW50O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5riF56m66ZO+6KGoXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jbGVhbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdG9wTm9kZSA9IG5ldyBub2RlKG51bGwpO1xyXG4gICAgICAgICAgICBib3R0b21Ob2RlID0gbmV3IG5vZGUobnVsbCk7XHJcbiAgICAgICAgICAgIHRvcE5vZGUubmV4dCA9IGJvdHRvbU5vZGU7XHJcbiAgICAgICAgICAgIGJvdHRvbU5vZGUucHJldmlvdXMgPSB0b3BOb2RlO1xyXG4gICAgICAgICAgICBsZW5ndGggPSAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6YGN5Y6G6ZO+6KGoXHJcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuIC0g6YGN5Y6G5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICog5Zue6LCD5Ye95pWw77yI5Y+C5pWw77ya5YWD57Sg77yM6L+U5Zue77yae3JlbW92Ze+8muWIoOmZpOatpOWFg+e0oO+8jGFkZDrmj5LlhaXlhYPntKAoYWRkLmFkZFRvVXA65o+S5YWl5Yiw5LiK5pa5LCBhZGQuZWxlbWVudDrlhYPntKApLCBzdG9w77ya5YGc5q2i6YGN5Y6Gfe+8iVxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdG9wVG9Cb3R0b20gLSB0cnVlOiDku47pobbliLDlupUgZmFsc2U6IOS7juW6leWIsOmhtlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaCA9IGZ1bmN0aW9uIChmdW4sIHRvcFRvQm90dG9tKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGlzTm9kZSA9IHRvcFRvQm90dG9tID8gdG9wTm9kZSA6IGJvdHRvbU5vZGU7XHJcbiAgICAgICAgICAgIHdoaWxlICh0b3BUb0JvdHRvbSA/XHJcbiAgICAgICAgICAgICAgICAodGhpc05vZGUgPSB0aGlzTm9kZS5uZXh0KSAhPSBib3R0b21Ob2RlIDogKHRoaXNOb2RlID0gdGhpc05vZGUucHJldmlvdXMpICE9IHRvcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfcmV0dXJuID0gZnVuKHRoaXNOb2RlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9yZXR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3JldHVybi5hZGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBuZXcgbm9kZShfcmV0dXJuLmFkZC5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9yZXR1cm4uYWRkLmFkZFRvVXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld05vZGUucHJldmlvdXMgPSB0aGlzTm9kZS5wcmV2aW91cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHRoaXNOb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc05vZGUucHJldmlvdXMubmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzTm9kZS5wcmV2aW91cyA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlLnByZXZpb3VzID0gdGhpc05vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzTm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc05vZGUubmV4dC5wcmV2aW91cyA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzTm9kZS5uZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGgrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZXR1cm4ucmVtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNOb2RlLnByZXZpb3VzLm5leHQgPSB0aGlzTm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzTm9kZS5uZXh0LnByZXZpb3VzID0gdGhpc05vZGUucHJldmlvdXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3JldHVybi5zdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7TGlua2VkTGlzdH0iXSwiZmlsZSI6ImxpYi9saW5rZWRMaXN0LmpzIn0=