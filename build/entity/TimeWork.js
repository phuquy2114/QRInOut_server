"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeInOut = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let TimeInOut = class TimeInOut extends typeorm_1.BaseEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], TimeInOut.prototype, "uid", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], TimeInOut.prototype, "checkInOut", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: "double" }),
    tslib_1.__metadata("design:type", Number)
], TimeInOut.prototype, "long", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: "double" }),
    tslib_1.__metadata("design:type", Number)
], TimeInOut.prototype, "lat", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], TimeInOut.prototype, "dateTime", void 0);
TimeInOut = tslib_1.__decorate([
    typeorm_1.Entity({ name: "time_work" })
], TimeInOut);
exports.TimeInOut = TimeInOut;
//# sourceMappingURL=TimeWork.js.map