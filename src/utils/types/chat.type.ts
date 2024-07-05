export type TChatProps = {
  message: string;
  isLastAIChat?: any;
  audioUrl?: string;
  idUser?: string;
  loading?: boolean;
};
export type TChatDataProps = {
  star: string;
  model: string;
  is_rag?: string;
  message: string;
  id: string;
};

export type THistoryChatAdmin = {
  id: string;
  star: string;
};

export type TResetChat = {
  star: string;
  id: any;
};
