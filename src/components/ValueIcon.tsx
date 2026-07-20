import { FunctionComponent } from "react";
import {
  ArchiveBoxIcon,
  AtSymbolIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  Squares2X2Icon,
  SwatchIcon,
  CreditCardIcon,
  CubeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  FaceSmileIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  GlobeAmericasIcon,
  HashtagIcon,
  IdentificationIcon,
  KeyIcon,
  PhoneIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { JSONValueType } from "@jsonhero/json-infer-types";
import { colorForTypeName } from "../utilities/colors";
import { StringIcon } from "./Icons/StringIcon";

type ValueIconProps = {
  type: JSONValueType;
  size?: ValueIconSize;
  monochrome?: boolean;
};

export enum ValueIconSize {
  Small,
  Medium,
}

export const ValueIcon: FunctionComponent<ValueIconProps> = ({
  type,
  size = ValueIconSize.Small,
  monochrome = false,
}) => {
  let classes = monochrome ? `text-slate-300` : colorForTypeName(type.name);
  switch (size) {
    case ValueIconSize.Small:
      classes += " h-4 w-4";
      break;
    case ValueIconSize.Medium:
      classes += " h-6 w-6";
      break;
  }

  switch (type.name) {
    case "object": {
      return <CubeIcon className={classes} />;
    }
    case "array": {
      return <Squares2X2Icon className={classes} />;
    }
    case "null": {
      return <EyeSlashIcon className={classes} />;
    }
    case "bool": {
      return <CheckCircleIcon className={classes} />;
    }
    case "int": {
      if (type.format == null) {
        return <HashtagIcon className={classes} />;
      }
      switch (type.format.name) {
        case "timestamp": {
          return <CalendarIcon className={classes} />;
        }
      }
    }
    case "float": {
      return <HashtagIcon className={classes} />;
    }
    case "string": {
      if (type.format == null) {
        return <StringIcon className={classes} />;
      }

      switch (type.format.name) {
        case "timestamp": {
          return <CalendarIcon className={classes} />;
        }
        case "datetime": {
          switch (type.format.parts) {
            case "time":
              return <ClockIcon className={classes} />;
          }
          return <CalendarIcon className={classes} />;
        }
        case "email": {
          return <AtSymbolIcon className={classes} />;
        }
        case "hostname":
        case "tld":
        case "ip": {
          return <GlobeAltIcon className={classes} />;
        }
        case "uri": {
          switch (type.format.contentType) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
            case "image/webm":
              return <PhotoIcon className={classes} />;
            case "application/json":
              return <CodeBracketIcon className={classes} />;
            default:
              return <GlobeAltIcon className={classes} />;
          }
        }
        case "phoneNumber": {
          return <PhoneIcon className={classes} />;
        }
        case "currency": {
          return <CurrencyDollarIcon className={classes} />;
        }
        case "country": {
          return <GlobeAmericasIcon className={classes} />;
        }
        case "emoji": {
          return <FaceSmileIcon className={classes} />;
        }
        case "language": {
          return <ChatBubbleLeftRightIcon className={classes} />;
        }
        case "filesize": {
          return <ArchiveBoxIcon className={classes} />;
        }
        case "uuid": {
          return <IdentificationIcon className={classes} />;
        }
        case "json":
        case "jsonPointer": {
          return <CodeBracketIcon className={classes} />;
        }
        case "jwt": {
          return <KeyIcon className={classes} />;
        }
        case "semver": {
          return <DocumentTextIcon className={classes} />;
        }
        case "color": {
          return <SwatchIcon className={classes} />;
        }
        case "creditcard": {
          switch (type.format.variant) {
            case "visa": {
              return <CreditCardIcon className={classes} />;
            }
            case "mastercard": {
              return <CreditCardIcon className={classes} />;
            }
            case "amex": {
              return <CreditCardIcon className={classes} />;
            }
            case "discover": {
              return <CreditCardIcon className={classes} />;
            }
            case "dinersclub": {
              return <CreditCardIcon className={classes} />;
            }
            default:
              return <CreditCardIcon className={classes} />;
          }
        }
      }
    }
  }

  return <></>;
};
