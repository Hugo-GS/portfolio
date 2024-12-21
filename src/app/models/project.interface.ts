import { Technology } from '../components/label-technology/enums/technology.enum';

export interface Project {
  title: string;
  shortDescription?: string;
  imgSrc: string;
  langs: Technology[];
  frameworks: Technology[];
  libraries: Technology[];
  descriptionContent: string;
}

export interface ProjectJSON {
  Title: string;
  ImgSrc: string;
  Langs: string[];
  Frameworks: string[];
  Libraries: string[];
  DescripcionContent: string;
}
