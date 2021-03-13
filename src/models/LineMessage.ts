//How to use: https://developers.line.biz/en/reference/messaging-api

export interface LineFlexMessage {
    type: string
    altText: string 
    contents: LineMessageItems
}

export interface LineMessageItems {
    type: string
    contents: any
}

export interface LineFlexBubbleMessage {
    type: string
    altText: string 
    contents: any
}

export enum messageType {
    text = 'text',
    stick = 'sticker',
    image = 'image',
    video = 'video',
    audio = 'audio',
    location = 'location',
    flexMessage = 'flex',
    flexCarousel = 'carousel',
    flexBubble = 'bubble'
}