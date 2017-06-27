### 小程序项目开发

    在时隔半年以后，又开始了小程序之旅。
    在它刚开始出现的时候，只是简单的做了 技术预研的工作。
    现在 又回到 原点，发现变化已经很大了

    之前的开发过程的体验不是很友好，在写完 代码之后依然需要手动刷新，
    文件夹中 存放的文件 繁杂、容易让新手混乱。

    现在，为了满足开发环境的需要 wepy 这个框架就出现了。

    现在，我们对于 wepy 这个框架进行一系列的深入了解，
    
    并同原生的 小程序开发做一个对比。

    看看 新框架开发体验如何？ 


#### 变化一、 项目的 文件 以及目录结构的变化。

    1. 在原生的小程序的开发过程中，它的目录结构是这样的

    project
    ├── pages
    |   ├── index
    |   |   ├── index.json  index 页面配置
    |   |   ├── index.js    index 页面逻辑
    |   |   ├── index.wxml  index 页面结构
    |   |   └── index.wxss  index 页面样式表
    |   └── log
    |       ├── log.json    log 页面配置
    |       ├── log.wxml    log 页面逻辑
    |       ├── log.js      log 页面结构
    |       └── log.wxss    log 页面样式表
    ├── app.js              小程序逻辑
    ├── app.json            小程序公共设置
    └── app.wxss            小程序公共样式表


    在 wepy 这个框架中的 目录结构，是这样的

    project
    └── src
        ├── pages
        |   ├── index.wpy    index 页面配置、结构、样式、逻辑
        |   └── log.wpy      log 页面配置、结构、样式、逻辑
        └──app.wpy           小程序配置项（全局样式配置、声明钩子等）

    
    是不是 很类似于 vue 的 .vue 文件？ 意不意外？


#### 变化二、 默认使用 babel编译， 那么就是支持 ES6/7 的新特性。

    app.wpy 文件

```javascript

import wepy form 'wepy'

export default class extends wepy.app {
    config = {
        pages: [
            'pages/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    }

    async testAsync () {
        const data = await this.sleep(3)
        console.log(data)
    }
}

```



####  三、支持组件化开发。

    组件的代码同 页面的代码

    components.wpy

```html

<template>
    <view>
        <panel>test</panel>
    </view>
</template>

<script>

    import wepy from 'wepy'

    export default class Components extends wepy.component {
        components = {
            child: Child
        }
    }
</script>

```
    这里需要强调一点，这个同 vuejs 的开发模式太像了。

    建议，如果没有 vuejs 开发经验的同学，先去使用下 vuejs 来开发

    再回来看这个框架你会非常爽的。




#### 四、 关于 wepy.config.js 配置说明

    看到 这个 文件的 命名方式，内心一惊，这不就是 webpack.config.js 嘛

    然后带着这个疑问 回到 查看 wepy.config.js 文件内容

```javascript    

    module.exports = {
        'output': 'dist',
        'source': 'src'
         ...
    }

```

     这简直就是 webpack 的翻版嘛，搞定这个配置。 我们继续往下看



五、为什么能实现这么一个功能？

    我们先来看一个图

![](https://cloud.githubusercontent.com/assets/2182004/22774706/422375b0-eee3-11e6-9046-04d9cd3aa429.png)

    我觉得 这个框架的作者是讲 webpack 的构建工具 理解的很透彻，拆分， 合并。

    组装，压缩等等。 最后成为 小程序官方规定的样子。




六、API 以及相关 入口问题


    一、程序入口文件 app.wpy


```html

<style lang="less">
/** less **/
</style>
<script>
import wepy from 'wepy';
export default class extends wepy.app {
    config = {
            "pages":[
            "pages/index/index"
        ],
        "window":{
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#fff",
            "navigationBarTitleText": "WeChat",
            "navigationBarTextStyle": "black"
        }
    };
    onLaunch() {
        console.log(this);
    }
}
</script>

```

    入口文件中的 config 对象，对应着 原生小程序中的  app.json 文件的功能一模一样。

    然后 app.wpy 继承自 wepy.app




    二、页面 文件 index.wpy

```html

<style lang="less">
/** less **/
</style>
<template lang="wxml">
    <view>
    </view>
    <counter1></counter1>
</template>
<script>
import wepy form 'wepy';
import Counter from '../components/counter';
export default class Index extends wepy.page {

    config = {};
    components = {counter1: Counter};

    data = {};
    methods = {};

    events = {};
    onLoad() {};
    // Other properties
}
</script>

```

    这个是 页面的 具体文件， 其中  index.wpy 继承自 wepy.page 这个对象

    
    那这个页面中的 属性 （钩子） api 具体有哪些？


| 属性           | 说明           |
| -------------  |:-------------:|
| config         | 页面config，相当于原来的index.json，同app.wpy中的config |
| components     | 页面引入的组件列表      |
| data           | 页面需要渲染的数据      |
| methods        | wmxl的事件捕捉，如bindtap，bindchange      |
| events         | 组件之间通过broadcast，emit传递的事件      |
| 其它           | 如onLoad，onReady等小程序事件以及其它自定义方法与属性      |


    
    三、组件文件  components.wpy

```html

<style lang="less">
/** less **/
</style>
<template lang="wxml">
    <view>  </view>
</template>
<script>
import wepy form 'wepy';
export default class Com extends wepy.component {

    components = {};

    data = {};
    methods = {};

    events = {};
    // Other properties
}
</script>

```

    组件的 页面入口是 继承自  wepy.component， 其 属性和页面属性是 一样的，除了不要 config 对象， 和 页面特有的 一些小程序 事件等。



七、接下来就是 踩坑阶段啦~ ， 先踩为敬！！！
