import SupabaseSeeder from "@/components/supabase-seeder"

export default function SupabaseSeedPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Supabase Database Setup</h1>
      <SupabaseSeeder />
    </div>
  )
}

