export function GET() {
  return Response.json({
    status: "ok",
    service: "dso-web",
    domain: "web.duxorientis.com",
  });
}
