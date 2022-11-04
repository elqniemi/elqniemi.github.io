import { feature } from 'json';
import { tsv, json } from 'd3';
export const loadAndProcessData = () =>
    Promise
        .all([
            tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
            json('/gem_2019.geojson')
        ])
        .then(([tsvData, topoJSONdata]) => {
            const rowById = tsvData.reduce((accumulator, d) => {
                accumulator[d.iso_n3] = d;
                return accumulator;
            }, {});

            const countries = feature(topoJSONdata, topoJSONdata.features.gemeentenaam);

            countries.features.forEach(d => {
                Object.assign(d.properties, rowById[d.id]);
            });

            return countries;
        });