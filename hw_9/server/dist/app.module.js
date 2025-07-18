"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const redis_module_1 = require("./redis/redis.module");
const users_module_1 = require("./users/users.module");
const chats_module_1 = require("./chats/chats.module");
const messages_module_1 = require("./messages/messages.module");
const ws_module_1 = require("./ws/ws.module");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({ storage: (0, multer_1.memoryStorage)() }),
            redis_module_1.RedisModule.forRoot({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' }),
            users_module_1.UsersModule,
            chats_module_1.ChatsModule,
            messages_module_1.MessagesModule,
            ws_module_1.WsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map