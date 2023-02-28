type Entry = {
  immutable: boolean;
  inputs: {
    body: string;
    featuredImage: {
      publicKey: string;
      url: string;
    };
    headline: string;
    stage: 'published';
  }[];
  owner: string;
  private: boolean;
  publicKey: string;
  taxonomy: string[];
  template: string;
  version: number;
};

type CreateEntryPayload = {
  immutable: boolean;
  inputs: {
    label: string;
    value: any;
  }[];
  private: boolean;
  taxonomy: string[];
  template: string;
};

export type { Entry, CreateEntryPayload };
