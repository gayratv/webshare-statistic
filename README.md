# problem with Webshare aggregate stats

https://proxy.webshare.io/docs/api/#aggregate-stats

I work alone at this time (develop my app)

I expect to see 4rb transferred data after one fetch - but I don't recieved expected result

## Problem:

I do this:

0. set GMT 0 at my webshare settings 
1. write date/time 
2. fetch small data using proxy
3. take finish time
4. call Aggregate stats

I pass date/time in this format: 2023-02-03T21:37:42Z

## Install & run

please run
```bash
npm i
npm start
```


## Expect

I expect bandwidth_total is about 4kb, but result is 0 (bandwidth_total - bandwidth_projected)

```
{
    bandwidth_total: 48285,
    bandwidth_average: 6897,
    requests_total: 7,
    countries_used: { DE: 7 },
    number_of_proxies_used: 1,
    bandwidth_projected: 48285
}
```
