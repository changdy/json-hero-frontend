import { useParams, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc } from "~/api/docs";
import { JsonDocProvider } from "../hooks/useJsonDoc";
import { JsonProvider } from "../hooks/useJson";
import { JsonSchemaProvider } from "../hooks/useJsonSchema";
import { JsonColumnViewProvider } from "../hooks/useJsonColumnView";
import { JsonSearchProvider } from "../hooks/useJsonSearch";
import { JsonTreeViewProvider } from "../hooks/useJsonTree";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InfoPanel } from "../components/InfoPanel";
import Resizable from "../components/Resizable";
import { SideBar } from "../components/SideBar";
import { JsonView } from "../components/JsonView";
import { LargeTitle } from "../components/Primitives/LargeTitle";
import { Body } from "../components/Primitives/Body";
import { Logo } from "../components/Icons/Logo";
import { ExtraLargeTitle } from "../components/Primitives/ExtraLargeTitle";
import { PageNotFoundTitle } from "../components/Primitives/PageNotFoundTitle";
import { SmallSubtitle } from "../components/Primitives/SmallSubtitle";
import type { JsonDocument } from "../api/docs";
import type { JSONDocument } from "../types/jsonDoc";

type LoaderData = {
  doc: JsonDocument;
  json: unknown;
  path?: string;
  minimal?: boolean;
};

export default function JsonDocPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [data, setData] = useState<LoaderData | null>(null);
  const [error, setError] = useState<{ status: number; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const pathParam = new URLSearchParams(location.search).get("path");
    const minimalParam = new URLSearchParams(location.search).get("minimal");
    const path = pathParam ? (pathParam.startsWith("$.") ? pathParam : `$.${pathParam}`) : undefined;
    const minimal = minimalParam === "true" ? true : undefined;

    getDoc(id, path, minimal)
      .then((result) => {
        setData({ ...result, path: result.path ?? undefined });
      })
      .catch((err) => {
        setError({ status: 404, message: err.message || "Document not found" });
      })
      .finally(() => setLoading(false));
  }, [id, location.search]);

  // Clear ?path= from URL
  useEffect(() => {
    if (data?.path) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [data?.path, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-[rgb(56,52,139)]">
        <div className="w-2/3 text-center">
          <div className="text-lime-300">
            <Logo />
          </div>
          <PageNotFoundTitle className="text-center leading-tight">
            {error.status}
          </PageNotFoundTitle>
          <div className="text-center leading-snug text-white">
            <ExtraLargeTitle className="text-slate-200 mb-8">
              <b>Sorry</b>! Something went wrong...
            </ExtraLargeTitle>
            <SmallSubtitle className="text-slate-200 mb-8">
              {error.message || "Unknown error occurred."}
            </SmallSubtitle>
            <a
              href="/"
              className="mx-auto w-24 bg-lime-500 text-slate-900 text-lg font-bold px-5 py-1 rounded-sm uppercase whitespace-nowrap cursor-pointer opacity-90 hover:opacity-100 transition"
            >
              HOME
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <JsonDocProvider
      doc={data.doc as JSONDocument}
      path={data.path}
      key={data.doc.id}
      minimal={data.minimal}
    >
      <JsonProvider initialJson={data.json}>
        <JsonSchemaProvider>
          <JsonColumnViewProvider>
            <JsonSearchProvider>
              <JsonTreeViewProvider overscan={25}>
                <div>
                  <div className="block md:hidden fixed bg-black/80 h-screen w-screen z-50 text-white">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <LargeTitle>JSON Hero only works on desktop</LargeTitle>
                      <LargeTitle>👇</LargeTitle>
                      <Body>(For now!)</Body>
                      <a
                        href="/"
                        className="mt-8 text-white bg-lime-500 rounded-sm px-4 py-2"
                      >
                        Back to Home
                      </a>
                    </div>
                  </div>
                  <div className="h-screen flex flex-col sm:overflow-hidden">
                    {!data.minimal && <Header />}
                    <div className="bg-slate-50 flex-grow transition dark:bg-slate-900 overflow-y-auto">
                      <div className="main-container flex justify-items-stretch h-full">
                        <SideBar />
                        <JsonView>
                          <Outlet />
                        </JsonView>

                        <Resizable
                          isHorizontal={true}
                          initialSize={500}
                          minimumSize={280}
                          maximumSize={900}
                        >
                          <div className="info-panel flex-grow h-full">
                            <InfoPanel />
                          </div>
                        </Resizable>
                      </div>
                    </div>

                    <Footer></Footer>
                  </div>
                </div>
              </JsonTreeViewProvider>
            </JsonSearchProvider>
          </JsonColumnViewProvider>
        </JsonSchemaProvider>
      </JsonProvider>
    </JsonDocProvider>
  );
}
