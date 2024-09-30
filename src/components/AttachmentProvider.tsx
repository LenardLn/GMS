import { ReactNode, useReducer } from "react";
import { Attachment } from "../entities/Attachment";
import AttachmentContext from "./AttachmentContextType";

interface AddAttachment {
  type: "ADD";
  attachmentFamily: string;
  attachment: Attachment;
}

interface ResetAttachments {
  type: "RESET";
  attachments: Attachment[];
}

export type AttachmentAction = AddAttachment | ResetAttachments;

const attachmentReducer = (
  attachments: Attachment[],
  action: AttachmentAction
): Attachment[] => {
  switch (action.type) {
    case "ADD": {
      const filteredAttachments = attachments.filter(
        (a) => a.family !== action.attachmentFamily
      );
      return [action.attachment, ...filteredAttachments];
    }
    case "RESET":
      return [];
    default:
      return attachments;
  }
};

interface Props {
  children: ReactNode;
}

function AttachmentProvider({ children }: Props) {
  const [attachments, dispatch] = useReducer(attachmentReducer, []);

  return (
    <AttachmentContext.Provider value={{ attachments, dispatch: dispatch }}>
      {children}
    </AttachmentContext.Provider>
  );
}

export default AttachmentProvider;
