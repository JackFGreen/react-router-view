# react-router-view

全局路由组件，配置化路由，所有 Switch/Route 的地方都可以替换

## 使用

### webpack loader 包含本组件

```
exclude: /node_modules(?!\/react-router-view)/
```

### 引入

```tsx
import { BrowserRouter } from 'react-router-dom'
import RouterView, { RouteConfig } from 'react-router-view'

// 路由配置
const routes: RouteConfig[] = [
  { path: '/single', component: Single },
  {
    path: `/multi`,
    component: Multi,
    childRoutes: [
      {
        path: '/multi/child1',
        component: Child1
      },
      {
        path: '/multi/child2',
        component: Child2
      }
    ]
  }
]

function App(props) {
  return (
    <div>
      <BrowserRouter>
        // 一级路由需要在 router 组件中，透传 props，并且传入 routes
        <RouterView {...props} routes={routes} />
      </BrowserRouter>
    </div>
  )
}

function Multi(props) {
  return (
    <div>
      // 二级路由开始，只需要透传 props
      <RouterView {...props} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```

## RouteConfig 配置

继承 `RouteProps`

```tsx
import { RouteProps } from 'react-router'

export interface RouteConfig extends RouteProps {
  path: string
  component: React.ComponentType<any>
  childRoutes?: RouteConfig[]
}
```

### RouteProps.path

路由访问 url

### RouteProps.component

react 组件

### RouteProps.childRoutes

子路由

## 问题

`Swtich Route Link` 等路由组件必须要在 `Router` 组件中使用，只能以源码的方式引入，在项目中 babel 配置包含 `node_modules/react-router-view`，随着项目一起打包。

```js
// 打包后的部分代码
// 直接使用 Swtich 会报错
// You should not use <Switch> outside a <Router>
function ReactRouterView(props) {
  var routes = props.routes
  return React.createElement(reactRouterDom.Switch)
}
```

## 参考

- [react route config](https://reacttraining.com/react-router/web/example/route-config)

- [vue-router](https://router.vuejs.org/zh/)
