import { createFileRoute, redirect } from "@tanstack/react-router";

// Old URL of the Stobot HR page; kept as a permanent redirect.
export const Route = createFileRoute("/rabotnitsi-ot-chuzhbina")({
  beforeLoad: () => {
    throw redirect({ to: "/stobot-hr", statusCode: 301 });
  },
});
