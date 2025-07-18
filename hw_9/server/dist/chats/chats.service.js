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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
const CHATS_FILE = path.join(__dirname, '../../store/chats.json');
let ChatsService = class ChatsService {
    chats = [];
    constructor() {
        this.load();
    }
    load() {
        if (fs.existsSync(CHATS_FILE)) {
            this.chats = JSON.parse(fs.readFileSync(CHATS_FILE, 'utf-8'));
        }
        else {
            this.chats = [];
        }
    }
    save() {
        fs.writeFileSync(CHATS_FILE, JSON.stringify(this.chats, null, 2));
    }
    findAll() {
        return this.chats;
    }
    findById(id) {
        const chat = this.chats.find(c => c.id === id);
        if (!chat)
            throw new common_1.NotFoundException('Chat not found');
        return chat;
    }
    create(name, creatorId) {
        const chat = {
            id: (0, uuid_1.v4)(),
            name,
            members: [creatorId],
            updatedAt: new Date().toISOString(),
        };
        this.chats.push(chat);
        this.save();
        return chat;
    }
    addMember(chatId, userId) {
        const chat = this.findById(chatId);
        if (!chat.members.includes(userId)) {
            chat.members.push(userId);
            chat.updatedAt = new Date().toISOString();
            this.save();
        }
        return chat;
    }
    removeMember(chatId, userId) {
        const chat = this.findById(chatId);
        chat.members = chat.members.filter(id => id !== userId);
        chat.updatedAt = new Date().toISOString();
        this.save();
        return chat;
    }
    update(chatId, name, userId) {
        const chat = this.findById(chatId);
        if (chat.members[0] !== userId)
            throw new common_1.ForbiddenException('Only admin can update');
        chat.name = name;
        chat.updatedAt = new Date().toISOString();
        this.save();
        return chat;
    }
    remove(chatId, userId) {
        const idx = this.chats.findIndex(c => c.id === chatId);
        if (idx === -1)
            throw new common_1.NotFoundException('Chat not found');
        if (this.chats[idx].members[0] !== userId)
            throw new common_1.ForbiddenException('Only admin can delete');
        this.chats.splice(idx, 1);
        this.save();
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChatsService);
//# sourceMappingURL=chats.service.js.map