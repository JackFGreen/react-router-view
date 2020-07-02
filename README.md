# react-router-view

全局路由组件，配置化路由，所有 Switch/Route 的地方都可以替换

## 使用

[examples](https://codesandbox.io/s/react-router-view-example-rmf0o?fontsize=14&hidenavigation=1&theme=dark)

```sh
npm i @jackgreen/react-router-view
```

```js
const routes: RouteConfig[] = [
  {
    path: '/single',
    component: Single
  },
  {
    path: '/multi',
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

function Multi(props) {
  return (
    <div>
      <Link to='/multi/child1'>child1</Link>
      <Link to='/multi/child2'>child2</Link>
      // 二级路由 // 必须透传 props // props 中 routes，所以不需要单独传 routes
      <ReactRouterView {...props} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Link to='/single'>single</Link>
      <Link to='/multi'>multi</Link>
      // 一级路由 // 必须在 Router 中 // 并且传入 routes // 透传 props 看需求
      <ReactRouterView {...props} routes={routes} />
    </BrowserRouter>
  )
}
```

## RouteConfig 配置

继承 `RouteProps`

```tsx
import { RouteProps } from 'react-router'

export interface RouteConfig extends RouteProps {
  // 路由访问 url
  path: string
  // react 组件
  component: React.ComponentType<any>
  // 子路由，需要在本组件引入 ReactRouterView，用来渲染 Route 组件
  childRoutes?: RouteConfig[]
}
```

## 参考

- [react route config](https://reacttraining.com/react-router/web/example/route-config)

- [vue-router](https://router.vuejs.org/zh/)
