import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authed/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/about"!</div>
}
