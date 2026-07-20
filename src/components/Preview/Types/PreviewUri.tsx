import { JSONStringType } from "@jsonhero/json-infer-types/lib/@types";
import { useState } from "react";
import { Body } from "~/components/Primitives/Body";
import { useLoadWhenOnline } from "~/hooks/useLoadWhenOnline";
import { PreviewBox } from "../PreviewBox";
import { PreviewResult } from "./preview.types";
import { PreviewUriElement } from "./PreviewUriElement";
import { getUriPreview } from "~/api/preview";

export type PreviewUriProps = {
  value: string;
  type: JSONStringType;
};

export function PreviewUri(props: PreviewUriProps) {
  const [data, setData] = useState<PreviewResult | null>(null);
  const [loading, setLoading] = useState(true);
  const encodedUri = encodeURIComponent(props.value);

  const load = async () => {
    setLoading(true);
    try {
      const result = await getUriPreview(props.value);
      setData(result as any as PreviewResult);
    } catch {
      setData({ error: "Unable to preview this URL" } as any);
    } finally {
      setLoading(false);
    }
  };

  useLoadWhenOnline(load, [encodedUri]);

  return (
    <div>
      {!loading && data ? (
        <>
          {typeof data == "string" ? (
            <PreviewBox>
              <Body>
                <span
                  dangerouslySetInnerHTML={{ __html: data as any }}
                ></span>
              </Body>
            </PreviewBox>
          ) : "error" in data ? (
            <PreviewBox>
              <Body>{(data as any).error}</Body>
            </PreviewBox>
          ) : (
            <PreviewUriElement info={data} />
          )}
        </>
      ) : (
        <PreviewBox>
          <Body className="h-96 animate-pulse bg-slate-300 dark:text-slate-300 dark:bg-slate-500 flex justify-center items-center">
            Loading…
          </Body>
        </PreviewBox>
      )}
    </div>
  );
}
