export type StockApiResponse = {
  success: boolean;
  statusCode: number;
  timestamp: string;
  message: string;
  data: StockData;
  meta: {
    companyName: string;
  };
};

export type StockData = {
  ipoDate: string;
  ipoPrice: string;
  distrubitionMethod: string;
  shares: string;
  broker: string;
  sharesActual?: string;
  sharesActualPercentage?: string;
  bistCode: string;
  market: string;
  firstTradingDate: string;
  image: string;
  code: string;
  name: string;
  companyInfo: {
    descriptionHTML: string,
    foundCity: string;
    foundYear: string;
  };
  id: string;
};
