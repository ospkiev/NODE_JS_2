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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
const MESSAGES_FILE = path.join(__dirname, '../../store/messages.json');
let MessagesService = class MessagesService {
    messages = [];
    constructor() {
        this.load();
    }
    load() {
        if (fs.existsSync(MESSAGES_FILE)) {
            this.messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
        }
        else {
            this.messages = [];
        }
    }
    save() {
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(this.messages, null, 2));
    }
    findByChat(chatId, limit, cursor) {
        let msgs = this.messages.filter(m => m.chatId === chatId);
        msgs = msgs.sort((a, b) => b.sentAt.localeCompare(a.sentAt));
        if (cursor) {
            msgs = msgs.filter(m => m.sentAt < cursor);
        }
        const result = msgs.slice(0, limit);
        const nextCursor = msgs.length > limit ? result[result.length - 1].sentAt : null;
        return { messages: result, nextCursor };
    }
    create(chatId, author, text) {
        const msg = {
            id: (0, uuid_1.v4)(),
            chatId,
            author,
            text,
            sentAt: new Date().toISOString(),
        };
        this.messages.push(msg);
        this.save();
        return msg;
    }
    remove(id) {
        const idx = this.messages.findIndex(m => m.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('Message not found');
        this.messages.splice(idx, 1);
        this.save();
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MessagesService);
//# sourceMappingURL=messages.service.js.map