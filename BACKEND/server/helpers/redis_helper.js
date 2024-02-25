(redisHelper => {
"use strict";
const redis = require("redis");
const HTTPStatus = require("http-status");
const Promise = require("bluebird");
const path = require("path");
let client;
require("dotenv").config({
    path: path.join(__dirname, "../../.env"),
});

redisHelper.init = () => {
    client = redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        // auth_pass: process.env.REDIS_PASSWORD,
        no_ready_check: true,
        return_buffers: true,
    });

    client.on("ready", () => {
        console.log("Ready to connect to Redis database...");
    });

    client.on("connect", () => {
        console.log(
            {
                REDIS_PORT: process.env.REDIS_PORT,
                REDIS_HOST: process.env.REDIS_HOST,
            },
            "Connected to Redis database..."
        );
        return client;
    });

    client.on("error", function (err) {
        throw err;
    });
};

redisHelper.getCachedObjectData = _keyData => {
    return new Promise((resolve, reject) => {
        client.get(_keyData, (err, data) => {
            if (!err && data !== null) {
                return resolve({
                    status: HTTPStatus.OK,
                    data: JSON.parse(data),
                });
            }
            return reject({
                status: HTTPStatus.NOT_FOUND,
                data: null,
            });
        });
    });
};

redisHelper.getCachedStringDataPromise = _keyData => {
    return new Promise((resolve, reject) => {
        client.get(_keyData, (err, data) => {
            if (!err && data !== null) {
                return resolve({
                    status: HTTPStatus.OK,
                    data: data,
                });
            }
            return reject({
                status: HTTPStatus.NOT_FOUND,
                data: null,
            });
        });
    });
};

redisHelper.getCachedStringData = _keyData => {
    client.get(_keyData, (err, data) => {
        if (!err && data !== null) {
            return {data: data, status: HTTPStatus.OK};
        } else {
            return {data: null, status: HTTPStatus.NOT_FOUND};
        }
    });
};

redisHelper.setDataForCatch = (key, data) => {
    const storeData = typeof data === "string" ? data : JSON.stringify(data);
    client.setex(key, parseInt(process.env.REDIS_CACHE_EXPIRES) * 60, storeData);
};

redisHelper.getCachedForObjectData = key => {
    return new Promise((resolve, reject) => {
        client.get(key, async (err, data) => {
            if (!err && data !== null) {
                return resolve(JSON.parse(data));
            } else {
                return resolve(null);
            }
        });
    });
};

redisHelper.setDataToCache = (_keyData, data, ttl = false) => {
    return new Promise((resolve, reject) => {
        const storeData = typeof data === "string" ? data : JSON.stringify(data);

        client.setex(
            _keyData,
            parseInt((ttl ? parseFloat(ttl) : parseFloat(process.env.REDIS_CACHE_EXPIRES)) * 60),
            storeData,
            (err, data) => {
                if (!err && data !== null) {
                    return resolve(data);
                } else {
                    console.log({err});
                    return reject(err);
                }
            }
        );
    });
};

redisHelper.scanRedisKeys = (key, cursor, returnKeys, debugId) => {
    client.scan(cursor, "MATCH", `${key}*`, "COUNT", "1", (err, res) => {
        if (!err) {
            cursor = res[0];
            const cacheKeys = res[1];
            cacheKeys.forEach(key => {
                returnKeys.push(key);
            });
            if (cacheKeys.length > 0) {
                console.log("Array of matching keys", cacheKeys);
            }
            if (cursor === "0") {
                return redisHelper.clearCacheKeys(returnKeys, debugId);
            }
        } else {
            return Promise.resolve([]);
        }
        return redisHelper.scanRedisKeys(key, cursor, returnKeys, debugId);
    });
};

redisHelper.clearDataCache = async (key, debugId) => {
    try {
        let cursor = "0";
        let returnKeys = [];
        redisHelper.scanRedisKeys(key, cursor, returnKeys, debugId);
    } catch (err) {
        throw new Error(err);
    }
};

redisHelper.clearCacheKeys = keys => {
    if (keys.length > 0 && client) {
        client.del(keys, (err, data) => {
            if (!err && data) {
                console.log("keys cleared from the redis db...");
            }
            if (err) {
                throw new Error(err);
            }
        });
    } else {
        console.log("no keys found");
    }
};

redisHelper.clearKeys = keys => {
    return new Promise(async (resolve, reject) => {
        try {
            if (keys.length > 0) {
                const getData = await redisHelper.getCachedForObjectData(keys);
                if (!getData || Object.keys(getData).length < 1) {
                    return resolve(true);
                }

                client.del(keys, (err, data) => {
                    if (!err && data) {
                        console.log("keys cleared from the redis db...");
                        return resolve(true);
                    }
                    if (err) {
                        return reject(err);
                    }
                });
            } else {
                console.log("no keys found");
            }
        } catch (error) {
            reject(error);
        }
    });
};

redisHelper.getValue = key => {
    return new Promise((resolve, reject) => {
        client.get(key, async (err, data) => {
            if (!err && data !== null) {
                resolve(data);
            } else {
                resolve(null);
            }
        });
    });
};

redisHelper.setPersistKey = (_keyData, data) => {
    return new Promise((resolve, reject) => {
        client.set(_keyData, data, (err, response) => {
            if (!err && response !== null) {
                return resolve(response);
            } else {
                console.log({err});
                return reject(err);
            }
        });
    });
};

redisHelper.getPersistKey = _keyData => {
    return new Promise((resolve, reject) => {
        client.get(_keyData, async (err, data) => {
            if (!err && data !== null) {
                return resolve(data);
            } else {
                return resolve(null);
            }
        });
    });
};

redisHelper.checkKey = key => {
    return new Promise(async (resolve, reject) => {
        client.exists(key, (err, response) => {
            if (err) {
                return reject(err);
            }
            return resolve(response);
        });
    });
};

redisHelper.checkFeild = (set, key) => {
    return new Promise((resolve, reject) => {
        client.hexists(set, key, async (err, data) => {
            if (!err && data !== null) {
                return resolve(parseInt(data));
            } else {
                console.log(err);
            }
        });
    });
};

redisHelper.decreaseValue = key => {
    return new Promise((resolve, reject) => {
        client.decr(key, async (err, data) => {
            if (!err && data !== null) {
                resolve(data);
            } else {
                resolve(null);
            }
        });
    });
};

redisHelper.checkTtl = key => {
    return new Promise((resolve, reject) => {
        client.ttl(key, async (err, data) => {
            if (!err && data !== null) {
                return resolve(parseInt(data));
            } else {
                return resolve(parseInt(data));
            }
        });
    });
};

redisHelper.setFeildSet = command => {
    // first value should be key of set and other are feild and value.
    client.hmset(...command);
};

redisHelper.getFieldValue = (set, key) => {
    return new Promise((resolve, reject) => {
        client.hget(set, key, async (err, data) => {
            if (!err && data !== null) {
                return resolve(data);
            } else {
                return reject(null);
            }
        });
    });
};
redisHelper.getAllHashKeysValue = set => {
    return new Promise((resolve, reject) => {
        client.hgetall(set, async (err, data) => {
            if (!err && data !== null) {
                return resolve(data);
            } else {
                return resolve(null);
            }
        });
    });
};

redisHelper.removeKeyFromHash = (hash, key) => {
    return new Promise((resolve, reject) => {
        client.hdel(hash, key, (err, data) => {
            if (!err && data !== null) {
                return resolve(data);
            } else {
                return resolve(null);
            }
        });
    });
};
})(module.exports);
