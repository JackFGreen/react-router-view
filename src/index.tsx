/**
 * 参考
 * react route config
 * https://reacttraining.com/react-router/web/example/route-config
 * vue-router
 * https://router.vuejs.org/zh/
 */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

export interface RouteConfig extends RouteProps {
  path: string
  // tslint:disable-next-line
  component?: any
  childRoutes?: RouteConfig[]
  redirect?: string
}

// tslint:disable-next-line
export default function ReactRouterView(props: any): JSX.Element {
  const { routes } = props

  return (
    <Switch>
      {routes.map((route: RouteConfig) => {
        const { component, childRoutes, redirect, ...config } = route

        const isRedirect = typeof redirect === 'string'
        const isComponent = typeof component !== 'undefined'

        const redirectComponent = isRedirect ? (
          <Redirect key={route.path} {...config} to={redirect as string} />
        ) : null

        if (isComponent && isRedirect) {
          route.childRoutes = route.childRoutes?.concat({
            ...config,
            redirect
          })
        }

        const routeComponent = isComponent ? (
          <Route
            key={route.path}
            {...config}
            // tslint:disable-next-line
            render={(props: any) => <route.component {...props} routes={route.childRoutes} />}
          />
        ) : null

        const C = isRedirect && !isComponent ? redirectComponent : routeComponent

        return C
      })}
    </Switch>
  )
}
