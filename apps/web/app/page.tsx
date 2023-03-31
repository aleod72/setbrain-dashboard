'use client';

import { useRouter } from "next/navigation";
import { createClient } from "utils/supabase-browser";

async function HomePage() {
  const router = useRouter();
  const supabase = createClient();
  const { data } = await supabase.from('projects').select('*');

  if(!data) return null;

  router.push('/' + data[0].id);

  return null;
}

export default HomePage;