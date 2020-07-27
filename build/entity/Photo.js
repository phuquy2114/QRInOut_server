"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Photo = class Photo {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column("text"),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "filename", void 0);
tslib_1.__decorate([
    typeorm_1.Column("decimal"),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "views", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], Photo.prototype, "isPublished", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "address", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "phone", void 0);
Photo = tslib_1.__decorate([
    typeorm_1.Entity({ name: "photos" })
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map