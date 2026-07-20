import { useNavigate } from "react-router-dom";
import { createFromUrl } from "~/api/create";

export function ExampleUrl({
  url,
  title,
  displayTitle,
}: {
  url: string;
  title: string;
  displayTitle?: string;
}) {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createFromUrl(url, title);
      if (result.id) {
        navigate(`/j/${result.id}`);
      }
    } catch {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="bg-slate-900 px-4 py-2 rounded-md whitespace-nowrap text-lime-300 transition hover:text-lime-500"
      >
        {displayTitle ?? title}
      </button>
    </form>
  );
}
