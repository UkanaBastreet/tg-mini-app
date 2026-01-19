import Counter from "@/widgets/Counter";
import { neon } from "@neondatabase/serverless";

export default function Home() {
  async function create(id: string) {
    "use server";
    const sql = neon(`${process.env.DATABASE_URL}`);
  }
  return (
    <div className="home">
      <Counter />
    </div>
  );
}
