import { IconType } from "@components/Icon/Icon";

declare global {
    type IconPropType = {
        name: string;
        size?: number;
        color?: string;
        type?: IconType;
    };
}