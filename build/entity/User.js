"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const TimeWork_1 = require("../entity/TimeWork");
let User = class User extends typeorm_1.BaseEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "uid", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ length: 10 }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ length: 50 }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "uniqueAppID", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phone", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "deviceToken", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(type => TimeWork_1.TimeInOut, { cascade: true }),
    typeorm_1.JoinTable(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "checkInOut", void 0);
User = tslib_1.__decorate([
    typeorm_1.Entity({ name: "user" })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map