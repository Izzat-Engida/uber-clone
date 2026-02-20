import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON!);

export async function POST(req: Request) {
  try {
    const { name, email, clerkId } = await req.json();

    if (!name || !email || !clerkId) {
      return new Response("Missing fields", { status: 400 });
    }

    const res = await sql`
      INSERT INTO users(name, email, clerk_id)
      VALUES(${name}, ${email}, ${clerkId})
    `;

    return new Response(JSON.stringify({ data: res }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong", { status: 500 });
  }
}
