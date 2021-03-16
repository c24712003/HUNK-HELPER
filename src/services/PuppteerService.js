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
const request = require("request");
const cheerio = require("cheerio");
const MODEL_1 = require("../template/myfitnesspal/MODEL");
const LineMessage_1 = require("../models/LineMessage");
const firebase_1 = require("../loaders/firebase");
const URL = 'https://www.myfitnesspal.com';
class PuppteerService {
    getDateDietaryRecord(userId, date) {
        const query = firebase_1.default.collection('nutrition').doc(userId).collection(date);
        console.log('');
        return new Promise((res, rej) => {
            query.get().then(docs => {
                if (docs.size === 0) {
                    res(null);
                }
                else {
                    docs.forEach(doc => res(doc.data()));
                }
            });
        });
    }
    recordDietary(userId, nurt, date) {
        const query = firebase_1.default.collection('nutrition').doc(userId).collection(date);
        let data = JSON.parse(nurt);
        return new Promise((res, rej) => {
            query.get().then(docs => {
                if (docs.size === 0) {
                    data.dateFoodList = [data.name];
                    data.id = "";
                    data.name = "";
                    data.unit = "";
                    query.doc('dietary').set(data).then(() => {
                        console.log("Set Data Successful");
                        res(data);
                    }).catch(e => {
                        console.log(e);
                    });
                }
                else {
                    docs.forEach(doc => {
                        let d = doc.data();
                        d.calories += data.calories;
                        d.dateFoodList.push(data.name);
                        d.ingredients.forEach(i => {
                            i["value"] += data.ingredients[d.ingredients.indexOf(i)]["value"];
                        });
                        d.unit = "";
                        d.name = "";
                        d.id = "";
                        query.doc('dietary').update(d).then(() => {
                            console.log("Update Data Successful");
                            res(d);
                        }).catch(e => {
                            console.log(e);
                        });
                    });
                }
            });
        });
    }
    getMyFitnessPalFoodInfo(food) {
        return new Promise((res, rej) => {
            this.getSearchResultFirstItem(`${URL}/food/search?page=1&search=${encodeURI(food)}`).then(url => {
                const foodId = url.split('/')[3];
                this.existFoodData(foodId).then(docs => {
                    if (docs !== null) {
                        docs.forEach(doc => {
                            let d = doc.data();
                            res(d);
                        });
                    }
                    else {
                        this.getFoodInfoInUrl(url, foodId, food).then(data => {
                            res(data);
                        });
                    }
                });
            });
        });
    }
    replaceTemplate(nurt, haveFoodList = false) {
        const leftArr = nurt.ingredients.slice(0, 8);
        const rightArr = nurt.ingredients.slice(8, 16);
        let lts = "";
        let rts = "";
        leftArr.forEach(e => lts += this.replaceItem(e, (leftArr.length - 1) === leftArr.indexOf(e) ? true : false));
        rightArr.forEach(e => rts += this.replaceItem(e, (rightArr.length - 1) === rightArr.indexOf(e) ? true : false));
        let items = MODEL_1.box()
            .replace('{~FoodName~}', haveFoodList ? nurt.dateFoodList.join(',') : nurt.name)
            .replace('{~NameSize~}', haveFoodList ? 'xs' : 'md')
            .replace('{~Calories~}', haveFoodList ? `${nurt.calories} cal` : `${nurt.calories} cal / ${nurt.unit}`)
            .replace('{~LeftItems~}', lts)
            .replace('{~RightItems~}', rts);
        return new Promise((res, rej) => {
            let result = {
                type: LineMessage_1.messageType.flexMessage,
                altText: `${nurt.name} Nurtrition`,
                contents: JSON.parse(items)
            };
            res(result);
        });
    }
    save(input) {
        firebase_1.default.collection('food').doc(input.food).set(input.value).then(() => console.log('set data successful'));
    }
    getSearchResultFirstItem(url) {
        return new Promise((res, rej) => {
            request(url, (err, ress, body) => {
                const $ = cheerio.load(body);
                res($('.jss60').first().find('.jss64')[0].children[0]['attribs']['href']);
            });
        });
    }
    existFoodData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = firebase_1.default.collection('food');
            const doc = yield ref.where('id', '==', id).get();
            return new Promise((res, rej) => {
                !doc.empty ? res(doc) : res(null);
            });
        });
    }
    getFoodInfoInUrl(url, foodId, food) {
        return new Promise((res, rej) => {
            request(`${URL}/zh-TW${url}`, (err, re, body) => {
                const $ = cheerio.load(body);
                let map = new Map();
                let result = {
                    id: foodId,
                    name: "",
                    unit: "",
                    ingredients: null,
                    calories: 0
                };
                $('#app > div > div > div > div > div > div.jss3 > h1').each((i, e) => result.name = e.children[0]['data']);
                $('#app > div > div > div > div > div > div.jss3 > div.jss60 > div > div > div').each((i, e) => result.unit = e.children[0]['data']);
                $('#app > div > div > div > div > div > section.jss11 > p.MuiTypography-root.MuiTypography-h1.MuiTypography-colorTextPrimary.MuiTypography-paragraph.MuiTypography-alignCenter')
                    .each((i, e) => {
                    result.calories = e.children[0]['data'];
                });
                $('.jss95').each((i, e) => map.set(e.children[0]['data'].toString(), e.children[0].next['children'][0]['data']));
                result.ingredients = Array.from(map, ([name, value]) => ({ name, value }));
                this.save({ food: food, value: result });
                res(result);
            });
        });
    }
    replaceItem(e, isLast) {
        let t = MODEL_1.item()
            .replace('{~Name~}', e.name)
            .replace('{~Value~}', e.value);
        t += isLast ? '' : ',';
        return t;
    }
}
exports.default = PuppteerService;
//# sourceMappingURL=PuppteerService.js.map