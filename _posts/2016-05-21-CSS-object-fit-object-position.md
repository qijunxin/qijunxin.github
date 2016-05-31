---
layout: post
title:  "使用CSS的 object-fit 和object-position属性"
date:   2016-05-21 21:43:27
categories: CSS
---

* 文章目录
{:toc}

原文作者[Asha Laxmi](https://www.sitepoint.com/author/alaxmi/)在文章[Using CSS’s object-fit and object-position Properties](https://www.sitepoint.com/using-css-object-fit-object-position-properties/)中介绍了两个CSS属性：`object-fit`和`object-position`，有助于我们解决images和videos这类可置换元素在布局时遇到的尺寸和宽高比问题。在原来的工作中我也遇到过这种情况，如果图像作为内容出现，考虑到前端倡导的内容和样式分离，那么把图片设置成一个div的背景是不合适的。看了这篇文章才知道，利用`object-fit`和`object-position`为`img`标签书写css样式，可以起到类似于`background-size`和`background-position`的作用，很好地解决了这个问题。翻译出来和大家共享。

------------
以下是正文：

在给一个网站布局时，视频和图像很容易出现问题。

假设你在CSS里明确指定了一个图像的宽度。如果这个宽度是使用百分比或者视口单位（viewport units）指定的，同时图像的宽度设置成了`auto`，那么调整浏览器窗口的时候图像的宽高比不变。

然而有时候，可能你可用的空间有限，需要限制图像的高度。这种情况下调整浏览器窗口肯定会破坏图像的宽高比。

很多关于图像尺寸和宽高比的问题，包括我刚才提到的，可以使用CSS的 [object-fit](https://www.w3.org/TR/css3-images/#object-fit) 和 [object-position](https://www.w3.org/TR/css3-images/#object-position) 属性来解决。

这两个属性和我们熟悉的`background-size`和`background-position`属性比较类似。所以，即使你从没听说过，理解起来也不会很困难。

这两个属性都对可置换元素（replaced elements）起作用。然而，为了简洁起见，在这篇文章中，我们用images举例说明。

## 为什么使用 `object-fit` 和 `object-position`?

你可能想知道明明可以使用`background-size` 和 `background-position`，为什么还要用这两个属性。事实上,至少有两个很好的理由。

首先，考虑这样一个场景，你有一张图片，它是一篇文章的一部分。如果图片的尺寸像之前描述的那样进行设置，调整浏览器窗口将会破坏它的宽高比。这种情况下，仅使用一个`img`标签是不够的，你需要使用一个带有`background-size` 和 `background-position`属性的div。

这种解决方案的问题就是你必须始终保证内容和表现分离，而background属性用于表现的。当你的图像实际上是内容的一部分时，使用`object-fit`和`object-position`以及`img`标签来实现相同的结果会更有意义。

另外一个理由是background属性不能应用于videos，但是`object-fit`和`object-position`可以。因此，当显示视频的时候，`object-fit`和`object-position`是你唯一的选择。

## `object-fit` 属性

这个属性决定了像images和videos这样的可替换内容占据其content box空间的方式。它有5个可能的值：

-   `fill`

-    `contain`

-    `cover`

-    `none`

-    `scale-down`

使用这个属性的语法如下：

```
.fit-image {
  object-fit: fill|contain|cover|none|scale-down;
}
```

当设置成`fill`时，图像的大小会正好填满content box。这种情况下的图片高度等于content box本身的高度。这也是`object-fit`属性的初始值。

##### 在[CodePen](http://codepen.io)上查看SitePoint ([@SitePoint](http://codepen.io/SitePoint)) 的笔记[Object Fit: Fill](http://codepen.io/SitePoint/pen/BKbGZz/)。

`contain`重设图像的尺寸，在保持宽高比的情况下使其填充到content box中。这有两个目的，既避免了图像失真，又能保证图像在content box里。如果图片不能完全覆盖content box，背景色会填满剩余的空间。

##### 在[CodePen](http://codepen.io)上查看SitePoint ([@SitePoint](http://codepen.io/SitePoint)) 的笔记[Object Fit: Contain](http://codepen.io/SitePoint/pen/zqbMzL/)。

`contain`适用的场景是，当你不知道图像的尺寸却仍想把它放到一个已知宽度的容器内时。

如果你想要在保证宽高比的情况下让图像完全填满它的content box，你应该用 `cover`属性。这种情况下，图片会缩放到较短边恰好适合containing box。溢出盒子的图像部分会被裁掉。

##### 在[CodePen](http://codepen.io)上查看SitePoint ([@SitePoint](http://codepen.io/SitePoint)) 的笔记[Object Fit: Cover](http://codepen.io/SitePoint/pen/GZewvJ/)。

要使用图像本身的尺寸显示，忽略containing box设置的宽高值，你可以使用`none`。这种情况下的图像不会被重新设置大小。然而，如果图像的任何部分超出了它的containing box就会被裁掉。

##### 在[CodePen](http://codepen.io)上查看SitePoint ([@SitePoint](http://codepen.io/SitePoint)) 的笔记[Object Fit: None](http://codepen.io/SitePoint/pen/yOwQoP/)。

`object-fit`属性的最后一个值是`scale-down`。顾名思义，即按比例缩小图像，就像被设置成`none`或者`contain`，得到一个较小的图像。换句话说，如果我们图像的尺寸都小于其各自的containing box的尺寸，那么就会设置成`none`。

##### 在[CodePen](http://codepen.io)上查看SitePoint ([@SitePoint](http://codepen.io/SitePoint)) 的笔记[Object Fit: scale-down](http://codepen.io/SitePoint/pen/aNMQyR/)。

## `object-position`属性

正如前面看到的，`cover`属性会填满containing box的所有空间，并保持图像原有的宽高比。图像也会默认居中显示。这适用于聚焦点在中心的情况。但是，如果图像的聚焦点不在中心怎么办？

`object-position`属性便可以帮上忙。它的工作原理就像`background-position`。下面的代码段将图像的位置设成了左上角：

```
.zero-zero {
  object-position: 0px 0px;
}
```

定义时可以用像素，也可以用百分比。例如，`object-position: 0% 0%`是左上角，`object-position: 100% 100%`是右下角。当你不知道图像的尺寸时，这样写很方便。

当图像的宽高比和containing box的宽高比很接近时，设置`object-position`似乎不会产生多大影响。然而，当宽高比差别很显著时，结果就会变得明显。下面的CodePen demo说明了我的观点。

##### 在[CodePen](http://codepen.io)上查看SitePoint ([@SitePoint](http://codepen.io/SitePoint)) 的笔记[GZewMJ](http://codepen.io/SitePoint/pen/GZewMJ/)。

在第二个例子中设置位置为左上角，可以聚焦到太阳上。

值得一提的是，`object-position`属性是可写入动画的，运用得当的话可以产生惊人的效果。考虑下面的代码：

```
img {
  /* other CSS here... */
  object-fit: cover;
  object-position: 0% 0%;
  animation: ltr 5s alternate infinite;
}  

@keyframes ltr {
  0% {
    object-position: 0% 0%;
  }
  25% {
    object-position: 20% 0%;
  }
  100% {
    object-position: 100% 100%;
  }
}
```

这段代码里，我使用keyframe为图像位置做动画，如你所见，最终结果看起来很棒。

##### 在[CodePen](http://codepen.io)上查看SitePoint ([@SitePoint](http://codepen.io/SitePoint)) 的笔记[Animating the object-position Property](http://codepen.io/SitePoint/pen/MyxzEr/)。

这也可以应用到videos中，当焦点从一个人移到另一个人上时。

## 跨浏览器支持和兼容性

尽管这些属性经证明是非常有用的，但你是否能真正使用它们取决于[你的浏览器是否支持](http://caniuse.com/#feat=object-fit)。`object-fit`可以被除了IE/Edge以外的所有主流浏览器支持，`object-position`可以被除了IE/Edge和Safari以外的所有主流浏览器支持。

一般来说，你可能恰好需要`object-fit`属性。如果你愿意牺牲一部分人的用户体验，那么你可以应用这个属性。如果你需要兼容旧的浏览器，可以试一试[the polyfill by Federico Brigante](https://github.com/bfred-it/object-fit-images)。

## 结论

希望你们喜欢这篇教程和附带的演示。如果我遗漏了什么或者你想要补充些什么，可以给我留言。