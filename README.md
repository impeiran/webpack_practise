## 使用webpack从零配置一个react SPA的脚手架

> 本repo旨在学习webpack配置，以及项目应用，截至目前webpack版本为`v4.39.1`
>
> webpack 官方教程文档地址
>
> EN: [英文文档](https://webpack.js.org/concepts/)
>
> ZH-CN: [中文文档](https://www.webpackjs.com/guides/)

#### 初始化项目

```bash
npm init -y
npm install -D webpack webpack-cli
```

webpack 4.0 以上开始使用 webpack-cli 这个包来使用命令进行打包，安装之余构建一下项目目录。

> --

* src目录存放项目主要源代码
* config目录存放项目打包以及其他的配置信息
* build目录存放webpack配置文件

其次生成个git仓库，便于管理代码

```bash
git init
touch .gitignore
// 这里要注意将/node_modules放入ignore
```

#### 初始化打包配置

* 在`/src`目录下新建两个文件
  * `index.html`用于后续注入的html模板
  * `main.js`用于webpack打包的入口文件，由于这里是搭建一个SPA应用，所以入口就只有一个，文件也只有一个 

* 在`/build`文件夹下新建`webpack.config.js`打包的配置文件

在`webpack.config.js`里编写基本配置，包括入口文件、输出配置

```javascript
const path = require('path');

module.exports = {
  // 项目的根目录上下文
  context: path.resolve(__dirname, '../'),
  // 暂时使用开发模式
  mode: 'development',

  entry: '/src/main.js',

  output: {
    path: path.resolve(__dirname, '../dist')
  }
};
```

* 修改`package.json`的脚本命令，增加build命令

```json
"scripts": {
   "build": "webpack --config ./build/webpack.config.js",
   "test": "echo \"Error: no test specified\" && exit 1"
}
```

* 修改`index.html`，就增加个dom节点用于react挂载

```html
<div id="app">
</div>
```

#### 引入React

```bash
npm install -S react react-dom
```

在src下新建一个`App.js`,代码如下

```react
import React from 'react'

const App = props => {
  return (
    <h1>hello react</h1>
  )
}

export default App
```

修改入口文件`main.js`

```react
import React from 'react'
import reactDom from 'react-dom'
import App from './App'

reactDom.render(<App />, document.getElementById('app'))
```

#### 引入HtmlWebpackPlugin插件

该插件可以将打包后的bundle文件自动注入到html模板里，并输出

```bash
npm install -D html-webpack-plugin
```

增加`webpack.config.js`配置选项，记得此处要**import**那个插件

```javascript
module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'production',

  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, '../dist')
  },

  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
      minify: true
    })
  ]
}
```

#### 引入Babel

此时打包还是会出错的，因为少了loader对react的JSX语法进行编译，因此引入以下babel包（顺便也把es6的语法一同编译）：

```bash
npm install -D babel-loader @babel/core @babel/preset-react @babel/preset-env
```

配置项增加`modules`选项：

```javascript
module: {
  rules: [
    {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [
          '@babel/preset-react', 
          ['@babel/preset-env', {
            "targets": {
              "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
            }
          }]
        ]
      }
    }
  ]
}
```

到此，运行打包命令可以看到根目录下出现dist文件夹，双击打开index.html也可以看到相应的信息

#### 

