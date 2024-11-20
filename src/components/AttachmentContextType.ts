import { Dispatch } from "react";
import { Attachment } from "../entities/Attachment";
import { AttachmentAction } from "./AttachmentProvider";
import React from "react";

export interface AttachmentState {
  loadout1: Attachment[];
  loadout2: Attachment[];
}

export interface AttachmentContextType {
  attachments: AttachmentState;
  dispatch: Dispatch<AttachmentAction>;
}

const AttachmentContext = React.createContext<AttachmentContextType>(
  {} as AttachmentContextType
);

export default AttachmentContext;
