/**
 * 参考
 * react route config
 * https://reacttraining.com/react-router/web/example/route-config
 * vue-router
 * https://router.vuejs.org/zh/
 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RouteProps } from 'react-router'

export interface RouteConfig extends RouteProps {
  path: string
  // tslint:disable-next-line
  component: React.ComponentType<any>
  childRoutes?: RouteConfig[]
}

// tslint:disable-next-line
export default function ReactRouterView(props: any): JSX.Element {
  const { routes } = props

  return (
    <Switch>
      {routes.map((route: RouteConfig) => {
        const { component, childRoutes, ...config } = route
        return (
          <Route
            key={route.path}
            {...config}
            // tslint:disable-next-line
            render={(props: any) => <route.component {...props} routes={route.childRoutes} />}
          />
        )
      })}
    </Switch>
  )
}
