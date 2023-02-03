import '../helpers/dotenv-init.js';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

let statStart: dayjs.Dayjs = dayjs();
let statEnd: dayjs.Dayjs = dayjs();

const axiosInstance = axios.create({
  baseURL: 'https://proxy.webshare.io/api/v2',
  headers: {
    Authorization: `Token ${process.env.WEBSHARE_API}`,
  },
});

export function statSetStartTime() {
  statStart = dayjs();
}

export function statSetFinishTime() {
  statEnd = dayjs();
}

export async function calcStatData() {
  const timestamp__lte = statEnd.utc().format();
  const timestamp__gte = statStart.utc().format();
  console.log('timestamp__lte : ', timestamp__lte, ' timestamp__gte : ', timestamp__gte);
  const params = new URLSearchParams();
  params.append('timestamp__lte', timestamp__lte);
  params.append('timestamp__gte', timestamp__gte);
  const res = await axiosInstance.get('stats/aggregate/', { params });

  // return res.data.bandwidth_total - res.data.bandwidth_projected;
  return res.data;
}

export async function calcStatDataIntervalBefore(secBefore: number) {
  const now = dayjs();
  const timestamp__lte = now.utc().format(),
    timestamp__gte = now.subtract(secBefore, 'seconds').utc().format();
  const params = new URLSearchParams();
  params.append('timestamp__lte', timestamp__lte);
  params.append('timestamp__gte', timestamp__gte);
  const res = await axiosInstance.get('stats/aggregate/', { params });
  console.log(timestamp__lte, timestamp__gte);

  // return res.data.bandwidth_total - res.data.bandwidth_projected;
  return res.data;
}

export async function showStatData(timestamp__lte: string, timestamp__gte: string) {
  // данные профиля
  // const res = await axiosInstance.get('stats/', {
  //   params: { timestamp__lte: '2023-01-01T23:34:00.095501-07:00', timestamp__gte: '2023-01-26T23:34:00.095501-07:00' },
  // });
  const params = new URLSearchParams();
  params.append('timestamp__lte', timestamp__lte);
  params.append('timestamp__gte', timestamp__gte);
  const res = await axiosInstance.get('stats/aggregate/', { params });
  console.log(timestamp__lte, timestamp__gte);

  // return res.data.bandwidth_total - res.data.bandwidth_projected;
  return res.data;
}

export async function showProfile() {
  const res = await axiosInstance.get('profile');
  return res.data;
}
