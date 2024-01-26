export type VendorAlbumModel = {
  id: number;
  name: string;
  theme: string;
  type: string | null;
  createdAt: string;
  updatedAt: string;
  vendorId: number;
  documents: Array<{
    link: string;
    id: number;
    name: string;
    key: string;
    createdAt: string;
    updatedAt: string;
    partyId: null | number;
    vendorId: null | number;
    albumId: number;
    messageId: null | number;
  }>;
};
