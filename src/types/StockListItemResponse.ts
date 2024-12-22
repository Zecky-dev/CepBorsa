export type Stock = {
    code: string;
    image: string;
    isNew: boolean;
    isResulted: boolean;
    link: string;
    name: string;
    subLink: string;
}

export type StockListResponse = {
  data: Stock[];
  total: number;
  page: number;
}
