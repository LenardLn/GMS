import { ReactNode, useReducer } from "react";
import { Attachment } from "../entities/Attachment";
import AttachmentContext from "./AttachmentContextType";

interface AddAttachment {
  type: "ADD";
  loadout: "loadout1" | "loadout2";
  attachmentFamily: string;
  attachment: Attachment;
}

interface ResetAttachments {
  type: "RESET";
  loadout: "loadout1" | "loadout2";
}

export type AttachmentAction = AddAttachment | ResetAttachments;

export interface AttachmentState {
  loadout1: Attachment[];
  loadout2: Attachment[];
  [key: string]: Attachment[];
}

const initialState: AttachmentState = {
  loadout1: [],
  loadout2: [],
};

const attachmentReducer = (
  state: AttachmentState,
  action: AttachmentAction
): AttachmentState => {
  switch (action.type) {
    case "ADD": {
      const updatedLoadout = state[action.loadout].filter(
        (a) => a.family !== action.attachmentFamily
      );
      return {
        ...state,
        [action.loadout]: [action.attachment, ...updatedLoadout],
      };
    }
    case "RESET":
      return {
        ...state,
        [action.loadout]: [],
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

function AttachmentProvider({ children }: Props) {
  const [attachments, dispatch] = useReducer(attachmentReducer, initialState);

  return (
    <AttachmentContext.Provider value={{ attachments, dispatch }}>
      {children}
    </AttachmentContext.Provider>
  );
}

export default AttachmentProvider;
