'use client';

import { useRouter } from "next/navigation";
import { createClient } from "utils/supabase-browser";

function HomePage() {
  const router = useRouter();
  const supabase = createClient();
  supabase.from('projects').select('id').then((res) => {
    if(!res.data) return null;
    router.push('/project/' + res.data[0].id);
  });

  return null;
}

export default HomePage;