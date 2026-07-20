import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createFromUrl, createFromFile } from "~/api/create";

export default function NewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const url = searchParams.get("url");
    const j = searchParams.get("j");
    const title = searchParams.get("title") || undefined;

    if (!url && !j) {
      navigate("/");
      return;
    }

    async function create() {
      try {
        if (url) {
          const result = await createFromUrl(url, title);
          if (result.id) {
            navigate(`/j/${result.id}`);
            return;
          }
        }

        if (j) {
          const contents = atob(j);
          const result = await createFromFile(title || "Untitled", contents);
          if (result.id) {
            navigate(`/j/${result.id}`);
            return;
          }
        }

        navigate("/");
      } catch {
        navigate("/");
      }
    }

    create();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <p className="text-slate-600 dark:text-slate-300">Creating document...</p>
    </div>
  );
}
