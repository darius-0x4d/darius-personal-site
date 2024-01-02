import type { NextApiRequest, NextApiResponse } from "next";
import { queryBuilder } from "lib/planetscale";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).send(JSON.stringify("Unauthorized"));
  }

  const { email, name } = session.user;

  if (req.method === "POST") {
    await queryBuilder
      .insertInto("guestbook")
      .values({
        email,
        body: (req.body.body || "").slice(0, 500),
        created_by: name,
      })
      .execute();

    return res.status(200).json({ error: null });
  }

  if (req.method === "DELETE") {
    await queryBuilder
      .deleteFrom("guestbook")
      .where("id", "=", req.body.id)
      .where("email", "=", email)
      .execute();

    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
