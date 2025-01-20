import { IconType } from "@components/Icon/Icon";
import { StockData } from "./StockResponse";

declare global {
    type IconPropType = {
        name: string;
        size?: number;
        color?: string;
        type?: IconType;
    };
    type RootStackParamList = {
        Login: {email: string};
        Register: undefined;
        ForgotPassword: undefined;
        Home: undefined;
        Favorites: undefined;
        StockDetail: { stockCode: string, stockSubLink: string, stockName: string; };
        StockChat: { stock: StockData };
        Profile: undefined;
        ChangePassword: undefined;
        Exchange: undefined;
        ExchangeConvert: { currency: any };
    }
}