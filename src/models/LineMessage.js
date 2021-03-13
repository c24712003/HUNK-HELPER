"use strict";
//How to use: https://developers.line.biz/en/reference/messaging-api
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageType = void 0;
var messageType;
(function (messageType) {
    messageType["text"] = "text";
    messageType["stick"] = "sticker";
    messageType["image"] = "image";
    messageType["video"] = "video";
    messageType["audio"] = "audio";
    messageType["location"] = "location";
    messageType["flexMessage"] = "flex";
    messageType["flexCarousel"] = "carousel";
    messageType["flexBubble"] = "bubble";
})(messageType = exports.messageType || (exports.messageType = {}));
//# sourceMappingURL=LineMessage.js.map