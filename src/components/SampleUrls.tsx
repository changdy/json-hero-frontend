import { Link } from "react-router-dom";

export function SampleUrls() {
  const samples = [
    { url: "https://raw.githubusercontent.com/jsonhero-web/jsonhero-web/main/examples/tweet.json", title: "Tweet JSON" },
    { url: "https://api.github.com/repos/jsonhero-web/jsonhero-web", title: "Github API" },
    { url: "https://raw.githubusercontent.com/jsonhero-web/jsonhero-web/main/examples/airtable.json", title: "Airtable API" },
    { url: "https://raw.githubusercontent.com/jsonhero-web/jsonhero-web/main/examples/unsplash.json", title: "Unsplash API" },
  ];

  return (
    <div className="flex justify-start flex-wrap gap-2">
      {samples.map((sample) => (
        <Link
          key={sample.title}
          to={`/new?url=${encodeURIComponent(sample.url)}`}
          className="bg-slate-900 px-4 py-2 rounded-md whitespace-nowrap text-lime-300 transition hover:text-lime-500"
        >
          {sample.title}
        </Link>
      ))}
    </div>
  );
}
