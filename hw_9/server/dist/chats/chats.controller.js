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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const store_1 = require("../store/store");
let ChatsController = class ChatsController {
    store;
    redis;
    constructor(store, redis) {
        this.store = store;
        this.redis = redis;
    }
    async create(creator, body) {
        throw new common_1.ForbiddenException('Not implemented yet');
    }
    list(user) {
        throw new common_1.ForbiddenException('Not implemented yet');
    }
    async patch(actor, id, dto) {
        throw new common_1.ForbiddenException('Not implemented yet');
    }
    delete(admin, id) {
        throw new common_1.ForbiddenException('Not implemented yet');
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('X-User')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('X-User')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':id/members'),
    __param(0, (0, common_1.Headers)('X-User')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)('X-User')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "delete", null);
exports.ChatsController = ChatsController = __decorate([
    (0, common_1.Controller)('/api/chats'),
    __metadata("design:paramtypes", [store_1.Store,
        ioredis_1.default])
], ChatsController);
//# sourceMappingURL=chats.controller.js.map