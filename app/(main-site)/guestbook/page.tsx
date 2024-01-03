import { queryBuilder } from "lib/planetscale";
import { SignIn, SignOut } from "./actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import GuestbookForm from "./guestbook-form";

async function getGuestbook() {
  const data = await queryBuilder
    .selectFrom("guestbook")
    .select(["id", "body", "created_by", "updated_at"])
    .orderBy("created_by", "desc")
    .limit(100)
    .execute();

  return data;
}

export const metadata = {
  title: "Guestbook",
  description: "Leave your message for everyone in the guestbook!",
};

export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  let entries: any[] = [];
  let session;

  try {
    const [guestbookRes, sessionRes] = await Promise.allSettled([
      getGuestbook(),
      getServerSession(authOptions),
    ]);

    if (guestbookRes.status === "fulfilled" && guestbookRes.value[0]) {
      entries = guestbookRes.value;
    } else {
      console.error(guestbookRes);
    }

    if (sessionRes.status === "fulfilled") {
      session = sessionRes.value;
    } else {
      console.error(sessionRes);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <div className="flex flex-row">
        <h1 className="font-bold text-3xl mb-5 text-sky-500 dark:text-cyan-500 flex-auto">
          Guestbook
        </h1>
        {session?.user ? <SignOut /> : null}
      </div>

      {session?.user ? <GuestbookForm /> : <SignIn />}
      {entries.map((entry) => (
        <div key={entry.id} className="flex flex-col space-y-1 mb-4">
          <div className="w-full">
            <span className="text-muted-foreground mr-1 font-bold">
              {entry.created_by}:
            </span>
            {entry.body}
          </div>
        </div>
      ))}
    </section>
  );
}
