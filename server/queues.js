import Queue from 'bull';
import Request from 'request';
import chalk from 'chalk';

import Earthquakes from '../imports/collections/earthquakes';
import { parseBody, getFields, sliceList } from '../imports/utils/shortcuts';

const log = console.log;

// RedİS
const REDIS_URL = 'redis://127.0.0.1:32774';
const KOERI_API_URL = 'http://koeri.boun.edu.tr/scripts/lst7.asp';

// Queues
EarthquakesQueue = Queue('earthquakes', REDIS_URL);

// Process
EarthquakesQueue.process(
	Meteor.bindEnvironment((job, done) => {

    log(chalk.blue('EarthquakesQueue - ÇALIŞTI'))

		Request(
			KOERI_API_URL,
			Meteor.bindEnvironment((err, res, body) => {
        if (err) {
          return log(chalk.red('Request - ULAŞAMADI!'))
        }

        // parse body.
        const list = parseBody(body);

				sliceList(list).map(
					Meteor.bindEnvironment((doc) => {
						const data = getFields(doc);
            const earthquake = Earthquakes.findOne({ hash: data.hash });
            
						if (_.isUndefined(earthquake)) {
							return Earthquakes.insert(data);
            }            
					})
				);
			})
		)
	})
);

// add process
EarthquakesQueue.add({}, { repeat: { cron: '*/1 * * * *' } });
