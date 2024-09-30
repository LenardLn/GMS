import { useQuery } from "@tanstack/react-query";
import { AttachmentData } from "../entities/Attachment";
import APIClient from "../services/api-client";

const apiClient = new APIClient<AttachmentData>();

const useAttachments = () => {
  return useQuery({
    queryKey: ["attachments"],
    queryFn: () => apiClient.getAll(),
  });
};

export default useAttachments;
