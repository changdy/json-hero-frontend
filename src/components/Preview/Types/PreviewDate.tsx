import { JSONDateTimeFormat } from "@jsonhero/json-infer-types";
import { inferTemporal } from "~/utilities/inferredTemporal";
import { CalendarMonth } from "../CalendarMonth";

export type PreviewDateProps = {
  value: string;
  format: JSONDateTimeFormat;
};

export function PreviewDate({ value, format }: PreviewDateProps) {
  const temporal = inferTemporal(value, format);

  if (!temporal) {
    return <></>;
  }

  const t = temporal as any;

  // Can only convert to the legacy Date class if temporal is either a ZonedDateTime or an Instant
  if ("epochMilliseconds" in temporal) {
    const date = new Date(t.epochMilliseconds);

    return <CalendarMonth date={date} />;
  } else if ("year" in temporal && "hour" in temporal) {
    const date = new Date(
      t.year,
      t.month - 1,
      t.day,
      t.hour,
      t.minute,
      t.second,
      t.millisecond
    );

    return <CalendarMonth date={date} />;
  } else if ("year" in temporal) {
    const date = new Date(t.year, t.month - 1, t.day);

    return <CalendarMonth date={date} />;
  } else {
    return <></>;
  }
}
