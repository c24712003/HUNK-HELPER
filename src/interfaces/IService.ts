import { LineFlexBubbleMessage } from "../models/LineMessage";

export interface IService {
    save(arg: { id?: string, date?: string, food?: string, value?: unknown });
    replaceTemplate(arg: any): Promise<LineFlexBubbleMessage>;
}