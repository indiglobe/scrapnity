import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(authenticated-routes)/(existing-user)/partner/vendor/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/(authenticated-routes)/(existing-user)/partner/vendor/"!</div>
  )
}
