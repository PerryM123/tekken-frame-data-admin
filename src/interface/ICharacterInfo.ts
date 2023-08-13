export type ICharacterInfoData = {
  name: string;
  isComplete: boolean;
  description: string;
};

export type ICharacterInfoListApi = {
  data: ICharacterInfoData[];
};

export type ICharacterInfoApi = {
  name: string;
  is_completed: boolean;
  description: string;
};
