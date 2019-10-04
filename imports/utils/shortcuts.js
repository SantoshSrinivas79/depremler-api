import Cheerio from 'cheerio';
import moment from 'moment';

const isEmpty = (d, ok, not) => {
  const empty = _.isEqual(d, '-.-');
  return empty ? not : ok;
}

const generateHash = (data) => {
	return new Buffer(JSON.stringify(data)).toString('base64');
};

export const parseBody = (body) => {
	const $ = Cheerio.load(body);
	return $('pre').html().split('\n');
};

export const getFields = (data) => {
	const rows = data.split(' ').filter((i) => !!i);
	const [ date, hour, lat, lon, depth, miss, force, updatedForce, town, city ] = rows;
	const isIlksel = _.isEqual(city, '&#xFFFD;lksel');
	const doc = {
		lat: parseFloat(lat),
		lon: parseFloat(lon),
		depth: parseFloat(depth),
    force: isEmpty(force, parseFloat(force), 0),
    updatedForce: isEmpty(updatedForce, parseFloat(updatedForce), 0),
    location: `${town} ${isIlksel ? 'ILKSEL' : city}`,
    town: isEmpty(town, town, null),
    date: moment(`${date}-${hour}`, 'YYYY.MM.DD-hh:mm:ss').toDate()
  };
  
  return {
    hash: generateHash(doc),
    ...doc
  }
};

export const sliceList = (list) => {
	return list.slice(6, list.length - 2);
};