export interface Attachment {
  id: number;
  family: string;
  vrec: string;
  hrec: string;
  pros?: string[] | string;
  cons?: string[] | string;
  img: string;
}

export interface AttachmentType {
  [key: string]: Attachment;
}

export interface AttachmentData {
  ammo: AttachmentType;
  muzzles: AttachmentType;
  grips: AttachmentType;
  stocks: AttachmentType;
}
