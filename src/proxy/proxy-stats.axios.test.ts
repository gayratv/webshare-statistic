import '../helpers/dotenv-init.js';
import axios, { AxiosError } from 'axios';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

import { calcStatData, showProfile, showStatData, statSetFinishTime, statSetStartTime } from './proxy-stats.js';

async function getStats() {
  const dEnd = dayjs();
  console.log(dEnd.format());
  const dStart = dEnd.subtract(1, 'minute');
  // console.log(await showStatData(dEnd.format(), dStart.format()));
  console.log('bandwidth_total ', await showStatData(dEnd.utc().format(), dStart.utc().format()));
}
// timezone: 'Europe/Moscow'
// console.log(await showProfile());

async function getQuery(url: string) {
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Token ${process.env.WEBSHARE_API}`,
    },
    proxy: {
      protocol: 'http',
      host: process.env.PROXY_IP,
      port: parseInt(process.env.PROXY_PORT),
      auth: {
        username: process.env.PROXY_USERNAME,
        password: process.env.PROXY_PASSWORD,
      },
    },
  });

  console.log('-------------- Result -------------');
  console.log((await axiosInstance.get(url)).data);
  console.log('----------------------------------');
}

async function main() {
  statSetStartTime();
  await getQuery('https://lumtest.com/myip.json');
  statSetFinishTime();
  console.log('------- Statistic ---------');
  console.log(await calcStatData());
  console.log('------- Profile -----------');
  console.log(await showProfile());
}
await main();
