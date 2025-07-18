"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
const rxjs_1 = require("rxjs");
let RedisService = class RedisService {
    pubClient;
    subClient;
    events$ = new rxjs_1.Subject();
    async onModuleInit() {
        this.pubClient = (0, redis_1.createClient)();
        this.subClient = (0, redis_1.createClient)();
        await this.pubClient.connect();
        await this.subClient.connect();
        this.subClient.pSubscribe('*', (message, channel) => {
            this.events$.next({ channel, message });
        });
    }
    async onModuleDestroy() {
        await this.pubClient.quit();
        await this.subClient.quit();
    }
    async publish(channel, message) {
        await this.pubClient.publish(channel, message);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map