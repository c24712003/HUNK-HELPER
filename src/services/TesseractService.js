"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tesseract_js_1 = require("tesseract.js");
class TesseractService {
    constructor() {
        this.worker = tesseract_js_1.createWorker();
    }
    processOCR(lan, image) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.worker.load();
            yield this.worker.loadLanguage(lan);
            yield this.worker.initialize(lan);
            yield this.worker.recognize(image).then(r => {
                console.log(r.data.words[0].line.words[0].text);
            }).catch(e => {
                console.log(e);
                return false;
            });
            yield this.worker.terminate();
            return true;
        });
    }
}
exports.default = TesseractService;
//# sourceMappingURL=TesseractService.js.map