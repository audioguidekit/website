import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { NextRequest } from "next/server";

// Deployments built via player-react's `scripts/deployments` tooling and
// copied into public/demo/<name>/. Static assets under that folder (JS, CSS,
// images) are served directly by Next's public-file handling and never reach
// this route — this only fires for client-side router paths inside the SPA
// (e.g. /demo/barcelona/tour/1), which all need the same index.html.
const DEPLOYMENTS = ["barcelona", "new-york"];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ deployment: string }> }
) {
  const { deployment } = await params;

  if (!DEPLOYMENTS.includes(deployment)) {
    return new Response("Not found", { status: 404 });
  }

  const indexPath = path.join(process.cwd(), "public", "demo", deployment, "index.html");
  if (!existsSync(indexPath)) {
    return new Response("Not found", { status: 404 });
  }

  const html = await readFile(indexPath, "utf-8");
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
