import * as request from 'request';
import * as cheerio from 'cheerio';
import { Nurtrition } from '../models/INutrition';
import { box, item } from '../template/myfitnesspal/MODEL';
import { LineFlexBubbleMessage, messageType } from '../models/LineMessage';
import { IService } from '../interfaces/IService';
import db from '../loaders/firebase';

const URL = 'https://www.myfitnesspal.com'
const BMR = 2025;
const TBMR = 3139;
const DietaryFiber = 30;
const Portein = 186;
const Carb = 512;
const FAT = 133;
const Sodium = 2400;
const Sugar = 200;

export default class PuppteerService implements IService {
    getDateDietaryRecord(userId: string, date: string): Promise<Nurtrition> {
        const query = db.collection('nutrition').doc(userId).collection(date);
        return new Promise((res, rej) => {
            query.get().then(docs => {
                if (docs.size === 0) {
                    res(null);
                } else {
                    docs.forEach(doc => res(doc.data() as Nurtrition));
                }
            })
        })
    }

    recordDietary(userId: string, nurt: string, date: string): Promise<Nurtrition> {
        const query = db.collection('nutrition').doc(userId).collection(date);
        let data = JSON.parse(nurt) as Nurtrition;

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
                    })
                } else {
                    docs.forEach(doc => {
                        let d = doc.data() as Nurtrition;
                        d.calories += data.calories;
                        d.dateFoodList.push(data.name);
                        d.ingredients.forEach(i => {
                            i["value"] = (parseInt(i["value"]) + parseInt(data.ingredients[d.ingredients.indexOf(i)]["value"])).toString();
                        });
                        d.unit = "";
                        d.name = "";
                        d.id = "";

                        query.doc('dietary').update(d).then(() => {
                            console.log("Update Data Successful");
                            res(d);
                        }).catch(e => {
                            console.log(e);
                        })
                    });
                }
            })
        })
    }

    getMyFitnessPalFoodInfo(food: string): Promise<Nurtrition> {
        return new Promise((res, rej) => {
            this.getSearchResultFirstItem(`${URL}/food/search?page=1&search=${encodeURI(food)}`).then(url => {
                const foodId = url.split('/')[3];

                this.existFoodData(foodId).then(docs => {
                    if (docs !== null) {
                        docs.forEach(doc => {
                            let d = doc.data() as Nurtrition;
                            res(d);
                        });
                    } else {
                        this.getFoodInfoInUrl(url, foodId, food).then(data => {
                            res(data);
                        });
                    }
                });
            });
        })
    }

    calcNurtrition(nurt: Nurtrition): Promise<string> {
        const arr = new Map([["碳水化合", 512 ], [ "膳食纖維", 30], [ "糖", 200], [ "蛋白質", 186 ], [ "脂肪", 133], [ "鈉", 2400]])
        let str = ""

        return new Promise((res, rej) => {
            let c = TBMR - nurt.calories;
            str += c < 0 ? `今日熱量已過量` : `熱量赤字: ${c}卡`+ "%0D%0A";

            nurt.ingredients.forEach(i => {
                if (arr.has(i.name)) {
                    let n = arr.get[i.name] - parseInt(i.value);
                    str += n < 0 ? `今日${i.name}已過量`+"%0D%0A" : `${i.name}還需要: ${n}克or毫克` +"%0D%0A";
                }
            });

            res(str)
        })
    }

    replaceTemplate(nurt: Nurtrition, haveFoodList: boolean = false): Promise<LineFlexBubbleMessage> {
        const leftArr = nurt.ingredients.slice(0, 8);
        const rightArr = nurt.ingredients.slice(8, 16);
        let lts = "";
        let rts = "";

        leftArr.forEach(e => lts += this.replaceItem(e, (leftArr.length - 1) === leftArr.indexOf(e) ? true : false));

        rightArr.forEach(e => rts += this.replaceItem(e, (rightArr.length - 1) === rightArr.indexOf(e) ? true : false));

        let items = box()
            .replace('{~FoodName~}', haveFoodList ? nurt.dateFoodList.join(',') : nurt.name)
            .replace('{~NameSize~}', haveFoodList ? 'xs' : 'md')
            .replace('{~Calories~}', haveFoodList ? `${nurt.calories} cal` : `${nurt.calories} cal / ${nurt.unit}`)
            .replace('{~LeftItems~}', lts)
            .replace('{~RightItems~}', rts);

        return new Promise((res, rej) => {
            let result: LineFlexBubbleMessage = {
                type: messageType.flexMessage,
                altText: `${nurt.name} Nurtrition`,
                contents: JSON.parse(items)
            }

            res(result);
        });
    }

    save(input: { food: string, value: unknown }) {
        db.collection('food').doc(input.food).set(input.value as Nurtrition).then(() => console.log('set data successful'));
    }

    private getSearchResultFirstItem(url: string): Promise<string> {
        return new Promise((res, rej) => {
            request(url, (err, ress, body) => {
                const $ = cheerio.load(body);
                res($('.jss60').first().find('.jss64')[0].children[0]['attribs']['href']);
            })
        })
    }

    private async existFoodData(id: string): Promise<any> {
        const ref = db.collection('food');

        const doc = await ref.where('id', '==', id).get();
        return new Promise((res, rej) => {
            !doc.empty ? res(doc) : res(null);
        });
    }

    private getFoodInfoInUrl(url: string, foodId: string, food: string): Promise<Nurtrition> {
        return new Promise((res, rej) => {
            request(`${URL}/zh-TW${url}`, (err, re, body) => {
                const $ = cheerio.load(body);
                let map = new Map();
                let result: Nurtrition = {
                    id: foodId,
                    name: "",
                    unit: "",
                    ingredients: null,
                    calories: 0
                }

                $('#app > div > div > div > div > div > div.jss3 > h1').each((i, e) => result.name = e.children[0]['data'])
                $('#app > div > div > div > div > div > div.jss3 > div.jss60 > div > div > div').each((i, e) => result.unit = e.children[0]['data'])
                $('#app > div > div > div > div > div > section.jss11 > p.MuiTypography-root.MuiTypography-h1.MuiTypography-colorTextPrimary.MuiTypography-paragraph.MuiTypography-alignCenter')
                    .each((i, e) => {
                        result.calories = e.children[0]['data'];
                    })
                $('.jss95').each((i, e) => map.set(e.children[0]['data'].toString(), e.children[0].next['children'][0]['data']))
                result.ingredients = Array.from(map, ([name, value]) => ({ name, value }));
                this.save({ food: food, value: result });
                res(result);
            });
        });
    }

    private replaceItem(e: { name: string, value: string }, isLast: boolean): string {
        let t = item()
            .replace('{~Name~}', e.name)
            .replace('{~Value~}', e.value);

        t += isLast ? '' : ','

        return t;
    }
}