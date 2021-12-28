import { IFile } from './base.interafaces';

interface ICriterion {
  isGood: boolean;
  key: string;
}

export interface IManager {
  roleTitle: string;
}

export interface ICompany {
  image: IFile;
}
export interface IInstitution {
  id: number;
  name: string;
  manager: IManager;
  company: ICompany;
  isActive: boolean;
  expiredTime: string;
  criterions: ICriterion[];
}

export type IGetInstitutionAPIResponse = IInstitution;

export interface ISendFeedbackRequest {
  message: string;
  institutionId: string;
  filesKeys?: string[];
  criterions: string[];
  isGood: boolean;
}

export type ISendFeedbackImagesRequest = FormData

export interface ISendFeedbackImagesResponse {
  imagesKeys: string[];
}

export interface ISendFeedbackResponse {
  status: 'ok'
}
