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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
const USERS_FILE = path.join(__dirname, '../../store/users.json');
const ICONS_DIR = path.join(__dirname, '../../public/icons');
const DEFAULT_ICON = '/api/public/icons/default.png';
let UsersService = class UsersService {
    users = [];
    constructor() {
        this.load();
    }
    load() {
        if (fs.existsSync(USERS_FILE)) {
            this.users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
        }
        else {
            this.users = [];
        }
    }
    save() {
        fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2));
    }
    findAll() {
        return this.users;
    }
    findById(id) {
        const user = this.users.find(u => u.id === id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    findByName(name) {
        return this.users.find(u => u.name === name);
    }
    create(name, iconUrl) {
        if (this.users.find(u => u.name === name)) {
            throw new common_1.ForbiddenException('User already exists');
        }
        const user = {
            id: (0, uuid_1.v4)(),
            name,
            iconUrl: iconUrl || DEFAULT_ICON,
        };
        this.users.push(user);
        this.save();
        return user;
    }
    updateIcon(id, iconUrl) {
        const user = this.findById(id);
        user.iconUrl = iconUrl;
        this.save();
        return user;
    }
    remove(id) {
        const idx = this.users.findIndex(u => u.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('User not found');
        this.users.splice(idx, 1);
        this.save();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map