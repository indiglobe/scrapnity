import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/(existing-user)/partner/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi est
        expedita ut facere? Perferendis odio adipisci, asperiores laborum magnam
        soluta fugiat sit? Quis dolores praesentium nobis aliquid iure! Est,
        earum.
      </div>
    </>
  );
}
