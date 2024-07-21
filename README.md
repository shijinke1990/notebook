# 斐波拉契数列

```js
function fibonacci(n) {
  const fn = [0, 1];
  if(n <= 1) {
    return fn[n];
    }
    for (let i = 2; i <= n; i++) {
        fn[i] = fn[i - 1] + fn[i - 2];
    }
    return fn[n];
}
```

## 防抖节流

函数防抖 方法是一个函数，它的执行被延迟了 t 毫秒，如果在这个时间窗口内再次调用它，它的执行将被取消。你编写的防抖函数也应该接收传递的参数。

防抖-输入框-回城
节流-滚动加载-普通技能

## 快速排序

```js
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[0]; // 选择第一个元素作为基准值
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // 递归排序左右子数组，然后与基准值合并
    return quickSort(left).concat([pivot], quickSort(right));
}

console.time('quickSort');
console.log(quickSort([3, 6, 8, 10, 1, 2, 1])); // [1, 1, 2, 3, 6, 8, 10]
console.timeEnd('quickSort');

```

## defer 和 async 的区别

无: HTML暂停解析，下载JS文件，执行JS文件，继续解析HTML

defer: HTML继续解析，并行下载JS，HTML解析完毕后，执行JS文件

async: HTML继续解析，并行下载下载JS文件，下载完毕后暂停解析，执行JS文件

## preLoad 和 preFetch

preLoad: 资源在当前页面使用，优先加载资源

 preFetch: 资源在未来页面使用，浏览器空闲时加载资源

## 事件循环

## 如何理解JS的异步

JS是一门单线程语言，**这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个**。渲染主线程承担着诸多的工作，渲染页面、执行JS代码、处理用户交互等等。
如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白空耗资源，另一方面也会导致页面无法及时响应用户的操作，用户体验会大打折扣。
所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将**事先传递的回调函数包装成任务**，放入消息队列排队，等待主线程调度执行。
在这种异步模式下，浏览器的主线程不会被阻塞，从而保证了页面的流畅性和用户体验。

## JS任务优先级

任务没有优先级，在消息队列中，先进先出
但消息队列是有优先级的
根据W3C的最新解释
每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。在一次事件循环中，浏览器可以根据实际情况从不同队列中取出任务执行。
浏览器必须准备一个微队列，微队列中的任务优先于所有其他任务执行

在目前chrome浏览器中，至少包含下面的队列：
微队列：Promise、MutationObserver，用于存放异步任务，优先级【最高】
交互队列：用户交互事件，用于存放用户交互任务，优先级【高】
延时队列：setTimeout、setInterval，用于存放定时任务，优先级【最低】

## 阐述一下JS的事件循环机制

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式
在Chrome的源码中，它开启一个不会结束的for循环，每次循环从消息队列中取出一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。
过去把消息队列简单分为宏队列和微队列，但是在最新的HTML标准中，消息队列被分为了多个队列，每个队列有自己的优先级，浏览器可以根据实际情况从不同队列中取出任务执行。
根据W3C的最新解释，每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。在一次事件循环中，浏览器可以根据实际情况从不同队列中取出任务执行。但浏览器必须准备一个微队列，微任务队列的任务具有最高的优先级，必须优先调度执行。

## JS单线程和异步的关系

单线程是异步产生的原因
异步是单线程的解决方案

## 浏览器是如何渲染页面的

当浏览器的网络线程收到html文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程

整个渲染流程分为多个阶段，分别是：html解析、css解析、布局、分层、绘制、分块、合成、显示。每个阶段都有明确的输入输出，上一个阶段的输出是下一个阶段的输入，这样就形成了一个流水线式的渲染流程。

渲染的第一步是解析HTML。

解析过程中遇到css解析css，遇到js执行js。为了提高解析效率，浏览器在开始解析前，会启动一个预解析线程，率先下载html文档中的css和js文件，这样在解析到css和js时，就可以直接使用预解析线程下载好的文件，而不用等待网络线程下载。

如果主线程解析到link位置，此时外部的css文件还没下载解析好，主线程不会等待，继续解析后续的HTML。这是因为下载和解析css的工作是由预解析线程完成的。这就是Css不会阻塞HTML解析的原因。

如果主线程解析到script位置，此时外部的js文件还没下载解析好，主线程会停下来，等待js文件下载解析完成，再继续解析后续的HTML。这是因为js代码的执行可能会改变DOM结构，所以DOM树的生成必须暂停，这就是JS会阻塞HTML解析的原因。

第一步完成后，会得到DOM树和CSSOM树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在CSSOM树中。

## 输入url浏览器发生了什么

解析URL：浏览器解析URL以确定要访问的协议（如HTTP或HTTPS）、服务器的域名和路径。

DNS查询：浏览器需要将域名转换为IP地址，这通常涉及到查询DNS服务器。

建立连接：浏览器与服务器的IP地址上的端口建立TCP连接（如果是HTTPS，则还需要建立TLS连接以确保加密）。

发送HTTP请求：浏览器构建HTTP请求（对于HTTPS，请求在发送前会被加密），并通过建立的连接发送给服务器。

服务器处理请求：服务器接收到请求后，根据请求的路径和方法处理请求，然后生成一个HTTP响应。

发送HTTP响应：服务器将响应数据发送回浏览器，如果是HTTPS，数据在发送前会被加密。

浏览器处理响应：浏览器接收到响应数据后，首先解析响应（对于HTTPS，先解密），然后根据响应的内容类型决定如何处理。如果是HTML文档，浏览器会解析HTML内容并构建DOM树。

加载资源：HTML文档中可能包含CSS、JavaScript、图片等资源的链接，浏览器会发起额外的请求来加载这些资源。

渲染页面：浏览器根据HTML构建的DOM树和加载的CSS样式信息构建渲染树，然后根据渲染树来布局和绘制页面。

执行JavaScript：如果页面包含JavaScript，浏览器会执行脚本，这可能会修改DOM树和渲染树，导致页面重新渲染。

## 浏览器reflow和repaint的区别

在浏览器中，reflow（重排）和repaint（重绘）是两种与渲染相关的操作，它们对性能有重要影响。

Repaint（重绘）
定义：当页面中元素的外观（颜色、边框样式等）发生变化，但没有影响到布局（如位置、大小等），浏览器会进行重绘操作，即重新绘制元素的这些外观变化。
触发条件：改变元素的视觉外观，但不影响布局的属性变化，如color、background-color、visibility等。
Reflow（重排）
定义：当元素的大小、位置、或内容发生变化，导致布局变化时，浏览器需要重新计算元素的位置和大小。这个过程称为重排。重排的成本比重绘高，因为它可能涉及到当前元素及其子元素、父元素和可能的同级元素的布局更新。
触发条件：添加或删除可见的DOM元素、元素位置改变、元素尺寸改变（例如，宽度、高度等的变化）、页面初次渲染、浏览器窗口尺寸改变等。
区别
性能影响：重排是一个更昂贵的操作，因为它涉及到布局的计算和更新。每次重排都会影响到更多的渲染流程环节。而重绘则仅仅涉及到视觉变化，不涉及到布局的变化，因此开销较小。
触发条件：重排通常由于布局或者几何属性的变化触发，而重绘则是由于视觉属性的变化触发。
优化建议
最小化重排和重绘：通过减少和优化DOM的操作，可以减少重排和重绘的次数。例如，使用cssText、className来集中更新样式，或者使用documentFragment来批量更新DOM。
批量读写DOM：读操作后立即进行写操作会导致浏览器强制布局，尽量避免布局抖动，可以通过分离读写操作来优化。
**使用will-change或transform**：对于动画效果，使用transform和opacity属性可以减少重排的影响，因为浏览器可以对这些变化进行优化处理。

## 浏览器不同标签页通信

**使用localStorage或sessionStorage**：

当一个标签页改变了localStorage或sessionStorage中的数据时，它会触发一个storage事件，其他标签页可以监听这个事件来获取更新。
限制：仅适用于同源标签页。
使用BroadcastChannel API：

BroadcastChannel API允许同源的不同标签页、iframe或者worker之间进行简单的通信。
创建一个BroadcastChannel对象，并通过它发送和接收消息。
限制：仅支持现代浏览器。
**使用Window.postMessage**：

通过postMessage方法可以安全地实现跨源通信。
需要获取其他标签页的window对象的引用，这通常通过用户在两个标签页之间进行某种形式的交互来实现（例如，通过window.open打开新标签页或iframe）。
**使用WebSockets或Server-Sent Events (SSE)**：

两个标签页可以独立地与服务器建立连接，服务器可以作为中介来转发消息。
这种方式不受同源策略的限制，但需要服务器端支持。
使用SharedWorker：

SharedWorker是一种特殊类型的Web Worker，它可以被多个脚本（即使是不同标签页、iframe或浏览器窗口）共享。
通过SharedWorker，不同的标签页可以共享同一个后台线程，并通过它进行通信。
限制：SharedWorker的支持并不是在所有浏览器中都很好。

## 网页与iframe之间通信

网页向iframe发送消息

获取iframe的contentWindow属性。

使用contentWindow.postMessage发送消息。

## uri与url的区别

URI（统一资源标识符）和URL（统一资源定位符）是互联网上标识资源的两种方式，它们之间有细微但重要的区别：

### URI（Uniform Resource Identifier，统一资源标识符）

- **定义**：URI是一个用于标识某一互联网资源名称的字符串。它主要用于标识抽象和物理资源，可以是页面、书籍、文档等。
- **作用**：URI的目的是唯一标识一个资源。
- **类型**：URI有两种形式：URL和URN（统一资源名称）。
  - **URL**（统一资源定位符）是URI的一种，指向资源的位置。
  - **URN**（统一资源名称）是另一种形式的URI，通过名字来标识资源，与资源所处的位置无关。

### URL（Uniform Resource Locator，统一资源定位符）

- **定义**：URL是一种特定的URI，它不仅能标识资源，还提供了找到该资源的方法。它通常由协议类型、存储位置和资源的访问路径组成。
- **作用**：URL的目的是描述资源的位置或访问方法，以便用户或应用程序能够直接访问到这些资源。

### 区别

- **范围**：URI是一个更广泛的概念，包括URL和URN。所有的URL都是URI，但不是所有的URI都是URL。
- **功能**：URL侧重于如何找到资源，包含了访问资源的具体地址。而URI则是资源的广泛标识，可能只告诉你资源是什么，不告诉你如何直接访问它。
- **用途**：如果你需要获取资源，你会使用URL，因为它指定了资源的位置和访问方法。如果你需要标识资源，但不需要定位资源，你可能会使用URI。

简而言之，URI是一个更为通用的术语，用于标识资源，而URL是URI的一个子集，不仅标识资源，还提供了如何定位和访问这些资源的信息。

## If-Modified-Since和Last-Modified

If-Modified-Since和Last-Modified是HTTP协议中用于实现协商缓存的两个头部字段，它们配合使用，以减少不必要的网络传输，提高网页加载速度。

#### 工作原理

1.首次请求：客户端（如浏览器）首次请求一个资源时，服务器会在响应中包含一个Last-Modified头部，表示这个资源最后一次被修改的时间。

```shell
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
```

2.再次请求：当客户端需要再次请求相同的资源时，它会在请求中包含一个If-Modified-Since头部，其值为之前服务器发送的Last-Modified值。这告诉服务器，客户端拥有该日期后的资源版本。

```shell
If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT
```

3.服务器判断：服务器收到带有If-Modified-Since头部的请求后，会检查目标资源自该日期以来是否被修改。

如果资源没有被修改，服务器会返回一个304 Not Modified状态码，告诉客户端它可以安全地使用缓存的版本，这次不会传输资源的实际数据。
如果资源已被修改，服务器会返回200 OK状态码，并发送更新后的资源及其新的Last-Modified日期。

#### 使用场景

If-Modified-Since和Last-Modified机制适用于那些不经常变化的资源，如网站的logo、CSS文件和JavaScript库等。对于频繁更新的资源，可能需要使用更复杂的缓存策略，如结合ETag和If-None-Match头部进行更精确的控制。

## ETag和If-None-Match

ETag和If-None-Match是HTTP协议中用于实现协商缓存的另一对头部字段，它们提供了一种与Last-Modified和If-Modified-Since相比更为精确的缓存验证机制。

#### 工作原理

首次响应：当服务器响应一个资源请求时，它会在响应头中包含一个ETag字段，这个字段的值是一个对资源的唯一标识符（通常是一个哈希值），反映了资源的当前状态。即使资源的最后修改时间没有变，但只要内容发生变化，ETag的值也会改变。

```shell
ETag: "33a64df551425fcc55e4d42a"
```

2.再次请求：客户端在再次请求相同资源时，会在请求头中包含一个If-None-Match字段，其值为之前服务器发送的ETag值。这样，客户端告诉服务器：“我有一个版本的资源，其ETag是这个值，如果现在的版本与我有的相同，请不要发送数据，只需告诉我可以使用缓存。”

```shell
If-None-Match: "686897696a7c876b7e"
```

服务器判断：服务器收到带有If-None-Match头部的请求后，会比较请求中的ETag值与当前资源的ETag值。

如果两者相同，说明客户端拥有的资源是最新的，服务器会返回304 Not Modified状态码，不会传输资源的实际数据。
如果两者不同，说明资源已更新，服务器会返回200 OK状态码，并发送更新后的资源及其新的ETag值。

## 设计原则

对扩展开放，对修改封闭

## JSX不要定义函数

BAD

```jsx
<button onClick={()=>{console.log(111)}} />
```

GOOD

```jsx
function handleClick() {
  console.log(111)
}
<button onClick={handleClick} />
```

## react函数式组件中使用shouldComponentUpdate

在 React 函数式组件中，shouldComponentUpdate 生命周期方法不可用，因为它是类组件的一部分。但是，你可以通过使用 React 的 React.memo 高阶组件以及 useMemo 和 useCallback 钩子来达到类似的性能优化效果。

#### 使用 React.memo 优化渲染

React.memo 是一个高阶组件，它仅仅会在组件的 props 发生变化时才重新渲染组件。这与类组件中的 shouldComponentUpdate 方法有相似的效果，但用于函数式组件。

#### 使用 useMemo 和 useCallback 避免不必要的计算和渲染

useMemo 用于缓存复杂计算的结果。

useCallback 用于缓存函数，避免因为函数在每次渲染时都被重新创建而导致子组件不必要的重新渲染。

## NodeList 和 HTMLCollection

NodeList 和 HTMLCollection 是两种常见的 DOM 集合类型，它们都可以用来存储和操作 DOM 节点的集合。尽管它们在某些方面相似，但也有一些关键的区别：

#### NodeList

1.NodeList 对象是节点的集合，通常由 document.querySelectorAll 方法返回。
2.NodeList 可以包含任何类型的节点，例如元素节点、文本节点或注释节点。
3.NodeList 不一定是实时的。例如，document.querySelectorAll 返回的 NodeList 是静态的，而 document.childNodes 返回的 NodeList 是实时的，即如果 DOM 结构发生变化，实时 NodeList 也会相应更新。
4.NodeList 有 forEach 方法可以直接遍历，从 ES6 开始支持。

#### HTMLCollection

1.HTMLCollection 对象是元素节点的集合，通常由诸如 document.getElementsByClassName 或 document.getElementsByTagName 方法返回。
2.HTMLCollection 仅包含元素节点（即 HTML 元素），不包含其他类型的节点。
3.HTMLCollection 总是实时的，即集合会自动更新以反映 DOM 的当前状态。
4.HTMLCollection 没有 forEach 方法，但可以通过转换为数组或使用传统的 for 循环来遍历。

## 使用 new 关键字创建一个对象时会经历什么

使用 new 关键字创建一个对象时，JavaScript 引擎会执行以下步骤：
1.创建一个新的空对象。
2.将这个空对象的原型（**proto**）指向构造函数的 prototype 属性。
3.将这个空对象作为 this 上下文，传递给构造函数。
4.执行构造函数内部的代码，为这个对象添加属性。
5.如果构造函数返回一个对象，则返回这个对象；否则，返回第一步创建的对象。

```js
function Person(name) {
  this.name = name;
}

const person = new Person('Alice');
```

在这个例子中，new Person('Alice') 的过程如下：
1.创建一个新的空对象 person。
2.将 person 的原型指向 Person.prototype。
3.将 person 作为 this 上下文，传递给 Person 构造函数。
4.执行构造函数内部的代码，为 person 添加 name 属性。
5.返回 person 对象。

## 什么是事件代理

事件代理（Event Delegation）是一种常见的 JavaScript 编程技巧，它利用事件冒泡机制，将事件处理程序添加到父元素，而不是将事件处理程序添加到每个子元素。这样可以减少内存消耗，提高性能，并且可以处理动态添加的子元素。

## 什么是事件冒泡和事件捕获

事件冒泡（Event Bubbling）是指事件在 DOM 树中向上传播的过程。当一个元素上的事件被触发时，该事件会从该元素开始向上冒泡，直到到达根元素或停止冒泡。在冒泡过程中，事件会依次触发每个祖先元素上的事件处理程序。

事件捕获（Event Capturing）是指事件从根元素向下传播到目标元素的过程。当一个元素上的事件被触发时，该事件会从根元素开始向下捕获，直到到达目标元素或停止捕获。在捕获过程中，事件会依次触发每个祖先元素上的事件处理程序。

事件冒泡和事件捕获是 DOM 事件流的两个阶段。在事件冒泡阶段，事件从目标元素向上传播；在事件捕获阶段，事件从根元素向下传播。

## 什么是事件委托

事件委托（Event Delegation）是一种常见的 JavaScript 编程技巧，它利用事件冒泡机制，将事件处理程序添加到父元素，而不是将事件处理程序添加到每个子元素。这样可以减少内存消耗，提高性能，并且可以处理动态添加的子元素。

## instanceof原理是什么

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。其工作原理如下：

1.获取右侧构造函数的 prototype。
2.获取左侧实例对象的原型。
3.比较两者是否严格相等。
4.如果不相等，继续获取左侧实例对象原型的原型，重复步骤3。
5.如果在原型链上找到了右侧构造函数的 prototype，返回 true。
6.如果遍历完整个原型链都没有找到，返回 false。

#### 以下是一个简化的 instanceof 实现

```js
function customInstanceOf(left, right) {
  let proto = Object.getPrototypeOf(left); // 获取对象的原型
  const prototype = right.prototype; // 获取构造函数的prototype对象

  while (proto) {
    if (proto === prototype) return true; // 找到相同的原型对象
    proto = Object.getPrototypeOf(proto); // 继续向上寻找原型链
  }

  return false; // 遍历完整个原型链都没有找到
}
```


## 为何在v-for中使用key

1.必须用key，且不能用index和random
2.diff算法中通过tag和key来判断是否是sameNode（同一个节点）
3.减少渲染次数，提升渲染性能

## 考虑父子组件的vue生命周期
1.加载渲染过程
beforeCreate（父）-> created（父）-> beforeMount（父）-> beforeCreate（子）-> created（子）-> beforeMount（子）-> mounted（子）-> mounted（父）

在加载渲染过程中，Vue首先从父组件开始，经历beforeCreate和created生命周期钩子。然后，父组件进入beforeMount阶段，此时，Vue开始处理子组件，子组件依次经历beforeCreate、created、beforeMount和mounted。最后，控制权回到父组件，完成父组件的mounted阶段。

2.子组件更新过程

beforeUpdate（子）-> updated（子）
当子组件发生变化时，只有子组件本身经历更新过程，从beforeUpdate到updated。


3.父组件更新过程：

beforeUpdate（父）-> updated（父）
当父组件发生变化时，如果变化不影响子组件，则只有父组件本身经历更新过程。

4.销毁过程

beforeDestroy（父）-> beforeDestroy（子）-> destroyed（子）-> destroyed（父）

在销毁过程中，Vue首先调用父组件的beforeDestroy钩子，然后调用每个子组件的beforeDestroy钩子。之后，子组件的destroyed钩子被调用，最后是父组件的destroyed钩子。


## 如何将组件所有的props传递给子组件

`v-bind`+`$props`

```html
<template>
  <ChildComponent v-bind="$props" />
</template>
```

## vue2实现自定义组件v-model

```html
<template>
  <input :value="text" @input="$emit('change',$event.target.value)" />
</template>

<script>
export default {
    model:{
        props:'text',
        event:'change'
    },
    props: {
        value: String
    },
};
</script>
```


## 何时需要使用beforeDestroy

清理定时器：如果你在组件中设置了定时器（例如使用 setInterval 或 setTimeout），应该在 beforeDestroy 钩子中清除这些定时器，以避免定时器在组件销毁后继续运行，可能导致内存泄漏。

移除事件监听器：如果你向 DOM 元素或全局对象（如 window 或 document）添加了事件监听器，应该在 beforeDestroy 中移除这些监听器，以防止内存泄漏。

取消订阅：如果你的组件订阅了某些自定义事件或是 Vuex 状态管理中的变化，应该在组件销毁前取消这些订阅，避免不必要的回调执行或状态更新。

销毁第三方库的实例：如果你在组件中使用了第三方库（如图表库、地图库等）并创建了实例，可能需要在组件销毁前手动调用这些实例的销毁方法，以释放资源。
