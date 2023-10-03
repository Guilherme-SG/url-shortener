import http from 'k6/http';
import { sleep, check, fail } from 'k6';
import { Trend, Rate } from 'k6/metrics';

export const PostUrlDuration = new Trend('PostUrlDuration');
export const PostUrlFailRate = new Rate('PostUrlFailRate');
export const PostUrlSuccessRate = new Rate('PostUrlSuccessRate');
export const PostUrlReqs = new Rate('PostUrlReqs');

// export default function () {
//     const baseUrl = "http://localhost:3000/";
//     const code = "vune9p"
//     http.get(baseUrl + code);
//     sleep(1);
// }

export const options = {
    // Key configurations for breakpoint in this section
    executor: 'ramping-arrival-rate', //Assure load increase if the system slows
    stages: [
        { duration: '2h', target: 10000 }, // just slowly ramp-up to a HUGE load
    ],
    thresholds: {
        http_req_failed: [
            {
                threshold: 'rate<0.01',
                abortOnFail: true
            }
        ]
    }
};

export default function () {
    const url = "http://localhost:3000/";

    const payload = JSON.stringify({
        url: `https://www.google.com/search?client=firefox-b-d&q=amado`
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    PostUrlDuration.add(response.timings.duration);
    PostUrlFailRate.add(response.status !== 201);
    PostUrlSuccessRate.add(response.status === 201);

    if (!check(response, {
        "max duration": (r) => r.timings.duration < 1000
    })) {
        fail("max duration failed");
    }
    sleep(1);
}