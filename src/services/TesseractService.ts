import { createWorker, ImageLike } from 'tesseract.js';

export default class TesseractService {
    private worker = createWorker();

    async processOCR(lan: string, image: ImageLike): Promise<boolean> {
        await this.worker.load();
        await this.worker.loadLanguage(lan);
        await this.worker.initialize(lan);
        await this.worker.recognize(image).then(r => {
            console.log(r.data.words[0].line.words[0].text);
        }).catch(e => {
            console.log(e);
            return false;
        })
        await this.worker.terminate();

        return true;
    }
}