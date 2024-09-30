import { Dispatch } from "react";
import { Attachment } from "../entities/Attachment";
import { AttachmentAction } from "./AttachmentProvider";
import React from "react";

export interface AttachmentContextType {
  attachments: Attachment[];
  dispatch: Dispatch<AttachmentAction>;
}

const AttachmentContext = React.createContext<AttachmentContextType>(
  {} as AttachmentContextType
);

export default AttachmentContext;
