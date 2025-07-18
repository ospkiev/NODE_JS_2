"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const ioredis_1 = require("ioredis");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const store_1 = require("../store/store");
const INSTANCE_ID = (0, uuid_1.v4)();
let ChatGateway = class ChatGateway {
    store;
    redis;
    sub;
    event$ = new rxjs_1.Subject();
    constructor(store, redis) {
        this.store = store;
        this.redis = redis;
        this.sub = this.redis.duplicate();
        this.sub.subscribe('chat-events');
        this.sub.on('message', (_, raw) => {
            const parsed = JSON.parse(raw);
            if (parsed.src === INSTANCE_ID)
                return;
            console.log('Received event:', parsed);
            this.event$.next(parsed);
        });
        this.event$
            .pipe((0, operators_1.filter)((e) => e.meta?.local))
            .subscribe((e) => this.redis.publish('chat-events', JSON.stringify({ ...e, meta: undefined, src: INSTANCE_ID })));
    }
    onModuleDestroy() {
        this.sub.disconnect();
        this.redis.disconnect();
    }
    handleConnection(client) {
        const user = client.handshake.auth?.user;
        if (!user)
            return client.disconnect(true);
        client.data.user = user;
    }
    onJoin(client, body) {
        throw new common_1.ForbiddenException('Not implemented yet');
    }
    onLeave(client, body) {
        throw new common_1.ForbiddenException('Not implemented yet');
    }
    onSend(client, body) {
        throw new common_1.ForbiddenException('Not implemented yet');
    }
    onTyping(client, body) {
        throw new common_1.ForbiddenException('Not implemented yet');
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "onJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "onLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "onSend", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "onTyping", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ path: '/ws', cors: true }),
    __metadata("design:paramtypes", [store_1.Store, ioredis_1.default])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map