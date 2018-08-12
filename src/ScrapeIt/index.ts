import { Options } from './models/Options';
import * as request from 'request-promise';

const cheerio = require('cheerio');
const download = require('download');
const fs = require('fs');

let writeStream = fs.createWriteStream('downloads.txt');

export enum Categories {
	Audio,
	Video,
	Image,
	Text
}

/**
 * Scrapper is a utility class designed
 * to allow you to scrape content from
 * a website.
 *
 * @export
 * @class Scrapper
 * @extends {Object}
 */
export class Scrapper extends Object {
	
	/**
	 * Url Parameter used in making
	 * the scrapper request.
	 *
	 * @type {string}
	 * @memberof Scrapper
	 */
	public url: string;
	private _opts: Options;

	/**
	 * Creates an instance of Scrapper.
	 * @param {Options} [opts]
	 * @memberof Scrapper
	 */
	constructor(opts?: Options) {
		super();

		if(opts){
			Object.assign(this._opts, opts);
		}

		writeStream.write('');
		writeStream.end();
	}

	/**
	 * Returns an object array of the
	 * requested element tag that was
	 * given.
	 *
	 * @param {string} html
	 * @param {string} tag
	 * @returns {Array<object>}
	 * @memberof Scrapper
	 */
	public ByTag(html: string, tag: string): Array<object> {
		let $ = cheerio.load(html);
		return $(tag).toArray();
	}

	/**
	 *
	 *
	 * @param {Categories} category
	 * @returns {*}
	 * @memberof Scrapper
	 */
	public Search(category: Categories): any {

	}

	/**
	 * Collects the html document from the 
	 * provided host.
	 *
	 * @param {string} host
	 * @param {string} path
	 * @returns {Promise<string>}
	 * @memberof Scrapper
	 */
	public async Collect(host: string, path: string): Promise<string> {
		try {
			let html = await request.get(`${host}${path}`);
			return html;
		} catch (ex) {
			console.error(ex);
			return '';
		}
	}

	/**
	 * Downloads the content from the
	 * url string that was scraped.
	 *
	 * @param {string} url
	 * @param {string} dest
	 * @returns {Promise<boolean>}
	 * @memberof Scrapper
	 */
	public async Download(url: string, dest: string): Promise<boolean>{
		try {
			let r = await download(url, dest);
			if(r){

			}
			return true;
		} catch(ex) {
			return false;
		}
	}

	/**
	 * Overrides the default toString()
	 * method so as to return a specialized
	 * stringed version of the object.
	 *
	 * @returns {string}
	 * @memberof Scrapper
	 */
	public toString(): string{
		return '';
	}
	
	private UniqueArray(arrArg) {
		return arrArg.filter(function(elem, pos, arr) {
			return arr.indexOf(elem) == pos;
		});
	};
	
	private EliminateDuplicates(data: Array<string>): Array<string> {
	
		let result = new Array<string>();
	
		data.forEach(function(element, index) {
			
			// Find if there is a duplicate or not
			if (data.indexOf(element, index + 1) > -1) {
				
				// Find if the element is already in the result array or not
				if (result.indexOf(element,0) === -1) {
					result.push(element);
				}
			}
		});
	
		return result;
	}
}