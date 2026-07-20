declare module "@js-temporal/polyfill" {
  export namespace Temporal {
    interface Instant {
      toLocaleString(locales?: string | string[], options?: object): string;
    }
    interface ZonedDateTime {
      toLocaleString(locales?: string | string[], options?: object): string;
    }
    interface PlainDateTime {
      toLocaleString(locales?: string | string[], options?: object): string;
    }
    interface PlainDate {
      toLocaleString(locales?: string | string[], options?: object): string;
    }
    interface PlainTime {
      toLocaleString(locales?: string | string[], options?: object): string;
    }

    export const Instant: {
      from(value: string): Instant;
    };
    export const ZonedDateTime: {
      from(value: string): ZonedDateTime;
    };
    export const PlainDateTime: {
      from(value: string): PlainDateTime;
    };
    export const PlainDate: {
      from(value: string): PlainDate;
    };
    export const PlainTime: {
      from(value: string): PlainTime;
    };
  }

  export const Temporal: typeof Temporal;
}
