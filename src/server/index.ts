import { Scrapper } from '../ScrapeIt/index';
import { Options } from '../ScrapeIt/models/Options';

async function run() {
	const opts = new Options();
	const scrapeIt = new Scrapper(opts);
	
 
}

run();