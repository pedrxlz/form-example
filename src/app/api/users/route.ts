import { sleep } from "@/utils/sleep";

export async function GET(request: Request) {
  const users = [
    {
      id: 1,
      name: "Carlos Silva Lima",
    },
    {
      id: 2,
      name: "Carlito Ramos Junior",
    },
    {
      id: 3,
      name: "Paulo Felipe Castro",
    },
  ];

  await sleep(500);

  return Response.json(users);
}
