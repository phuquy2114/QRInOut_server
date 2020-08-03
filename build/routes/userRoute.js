"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const BaseResponse_1 = require("../entity/BaseResponse");
const User_1 = require("../entity/User");
const userDAO_1 = tslib_1.__importDefault(require("../dao/userDAO"));
const constants_1 = require("../shared/constants");
const TimeWork_1 = require("../entity/TimeWork");
const TimeInOutDAO_1 = tslib_1.__importDefault(require("../dao/TimeInOutDAO"));
const timeDAO = new TimeInOutDAO_1.default();
const dataResponse = new BaseResponse_1.BaseResponse();
const userDAO = new userDAO_1.default();
const router = express_1.Router();
router.get('/all', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const insertValue = yield userDAO.getAll();
    dataResponse.ResponseCode = "OK";
    dataResponse.data = insertValue;
    dataResponse.ResponseMessage = 'Successfull';
    return res.status(http_status_codes_1.OK).json(dataResponse);
}));
router.post('/register', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log('ubhiuhui', req.body);
    if (!req.body) {
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    const users = new User_1.User();
    users.id = makeid(10);
    users.name = req.body.name;
    users.phone = req.body.phone.split(' ').join('');
    users.uniqueAppID = "com.primarynet.qrinout";
    users.password = req.body.password;
    users.deviceToken = req.body.deviceToken;
    try {
        const insertValue = yield userDAO.insert(users);
    }
    catch (error) {
        dataResponse.ResponseCode = "OK";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'Email đã được sử dụng';
        return res.status(http_status_codes_1.OK).json(dataResponse);
    }
    dataResponse.ResponseCode = "OK";
    dataResponse.data = users;
    dataResponse.ResponseMessage = 'Successfull';
    return res.status(http_status_codes_1.CREATED).json(dataResponse);
}));
router.get('/', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!req.query) {
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    var CryptoJS = require("crypto-js");
    var hash = CryptoJS.HmacSHA256("infra9112003", "infra9112003").toString();
    console.log(hash);
    var prmHash = req.query.prmHash;
    if (hash !== prmHash) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.ResponseMessage = 'ERROR HASH NOT MATCHING';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    var prmCmd = req.query.prmCmd;
    var id = req.query.prmEmployeeID;
    var getInfor;
    try {
        getInfor = (yield userDAO.getUserByID(id));
    }
    catch (error) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR ID EMPLOYEE NOT FOUND';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    if (getInfor === undefined) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR ID EMPLOYEE NOT FOUND';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    var prmName = req.query.prmName;
    if (getInfor.name !== prmName) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR NAME';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    var prmUniqueAppID = req.query.prmUniqueAppID;
    if (!prmUniqueAppID) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR IMEI';
        return res.status(http_status_codes_1.OK).send(dataResponse);
    }
    var prmTel = req.query.prmTel;
    var employeeTel = getInfor.phone.split(' ').join('');
    var employeePrmTel = prmTel.split(' ').join('');
    if (employeeTel !== employeePrmTel) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR PHONE';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    if (prmCmd === "EmployeeRegistration") {
        var prmUniqueAppID = req.query.prmUniqueAppID;
        if (!prmUniqueAppID) {
            dataResponse.ResponseCode = "FAIL";
            dataResponse.data = {};
            dataResponse.ResponseMessage = 'ERROR IMEI';
            return res.status(http_status_codes_1.OK).send(dataResponse);
        }
        getInfor.uniqueAppID = prmUniqueAppID;
        try {
            const insertValue = yield userDAO.save(getInfor);
        }
        catch (_a) {
            dataResponse.ResponseCode = "FAIL";
            dataResponse.data = {};
            dataResponse.ResponseMessage = 'ERROR NO UPDATE ';
            return res.status(http_status_codes_1.OK).send(dataResponse);
        }
        dataResponse.ResponseCode = "OK";
        dataResponse.data = getInfor;
        dataResponse.ResponseMessage = 'Successfull';
        return res.status(http_status_codes_1.OK).json(dataResponse);
    }
    if (prmCmd === "EmployeeWorkOn") {
        const timeInOut = new TimeWork_1.TimeInOut();
        var prmGPSLongitude = req.query.prmGPSLongitude;
        var prmGPSLatitude = req.query.prmGPSLatitude;
        var prmDateTime = req.query.prmDateTime;
        timeInOut.lat = Number(prmGPSLatitude);
        timeInOut.long = Number(prmGPSLongitude);
        timeInOut.dateTime = prmDateTime;
        timeInOut.checkInOut = true;
        if (timeInOut.lat === 0 || timeInOut.long === 0) {
            dataResponse.ResponseCode = "FAIL";
            dataResponse.data = {};
            dataResponse.ResponseMessage = 'ERROR LOCATION AND TIME DATE ';
            return res.status(http_status_codes_1.OK).send(dataResponse);
            ;
        }
        if (getInfor.checkInOut === null) {
            getInfor.checkInOut = [];
        }
        getInfor.checkInOut = [yield timeDAO.insert(timeInOut)];
        const saveFriend = yield getInfor.save();
        dataResponse.ResponseCode = "OK";
        dataResponse.data = getInfor;
        dataResponse.ResponseMessage = 'Successfull';
        return res.status(http_status_codes_1.OK).json(dataResponse);
    }
    if (prmCmd === "EmployeeWorkOff") {
        const timeInOut = new TimeWork_1.TimeInOut();
        var prmGPSLongitude = req.query.prmGPSLongitude;
        var prmGPSLatitude = req.query.prmGPSLatitude;
        var prmDateTime = req.query.prmDateTime;
        timeInOut.lat = Number(prmGPSLatitude);
        timeInOut.long = Number(prmGPSLongitude);
        timeInOut.dateTime = prmDateTime;
        timeInOut.checkInOut = false;
        if (timeInOut.lat === 0 || timeInOut.long === 0) {
            dataResponse.ResponseCode = "FAIL";
            dataResponse.data = {};
            dataResponse.ResponseMessage = 'ERROR LOCATION AND TIME DATE ';
            return res.status(http_status_codes_1.OK).send(dataResponse);
            ;
        }
        if (getInfor.checkInOut === null) {
            getInfor.checkInOut = [];
        }
        getInfor.checkInOut = [yield timeDAO.insert(timeInOut)];
        const saveFriend = yield getInfor.save();
        dataResponse.ResponseCode = "OK";
        dataResponse.data = getInfor;
        dataResponse.ResponseMessage = 'Successfull';
        return res.status(http_status_codes_1.OK).json(dataResponse);
    }
}));
router.post('/', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!req.query) {
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    var CryptoJS = require("crypto-js");
    var hash = CryptoJS.HmacSHA256("infra9112003", "infra9112003").toString();
    console.log(hash);
    var prmHash = req.query.prmHash;
    if (hash !== prmHash) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.ResponseMessage = 'ERROR HASH NOT MATCHING';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    var prmCmd = req.query.prmCmd;
    var id = req.query.prmEmployeeID;
    var getInfor;
    try {
        getInfor = (yield userDAO.getUserByID(id));
    }
    catch (error) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR NOT FOUND';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    if (getInfor === undefined) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR ID EMPLOYEE NOT FOUND';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    var prmName = req.query.prmName;
    if (getInfor.name !== prmName) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR NAME';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    var prmUniqueAppID = req.query.prmUniqueAppID;
    if (!prmUniqueAppID) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR IMEI';
        return res.status(http_status_codes_1.OK).send(dataResponse);
    }
    var prmTel = req.query.prmTel;
    var employeeTel = getInfor.phone.split(' ').join('');
    var employeePrmTel = prmTel.split(' ').join('');
    if (employeeTel !== employeePrmTel) {
        dataResponse.ResponseCode = "FAIL";
        dataResponse.data = {};
        dataResponse.ResponseMessage = 'ERROR PHONE';
        return res.status(http_status_codes_1.OK).send(dataResponse);
        ;
    }
    if (prmCmd === "EmployeeRegistration") {
        var prmUniqueAppID = req.query.prmUniqueAppID;
        if (!prmUniqueAppID) {
            dataResponse.ResponseCode = "FAIL";
            dataResponse.data = {};
            dataResponse.ResponseMessage = 'ERROR IMEI';
            return res.status(http_status_codes_1.OK).send(dataResponse);
        }
        getInfor.uniqueAppID = prmUniqueAppID;
        try {
            const insertValue = yield userDAO.save(getInfor);
        }
        catch (_b) {
            dataResponse.ResponseCode = "FAIL";
            dataResponse.data = {};
            dataResponse.ResponseMessage = 'ERROR NO UPDATE ';
            return res.status(http_status_codes_1.OK).send(dataResponse);
        }
        dataResponse.ResponseCode = "OK";
        dataResponse.data = getInfor;
        dataResponse.ResponseMessage = 'Successfull';
        return res.status(http_status_codes_1.OK).json(dataResponse);
    }
    if (prmCmd === "EmployeeWorkOn") {
        const timeInOut = new TimeWork_1.TimeInOut();
        var prmGPSLongitude = req.query.prmGPSLongitude;
        var prmGPSLatitude = req.query.prmGPSLatitude;
        var prmDateTime = req.query.prmDateTime;
        timeInOut.lat = Number(prmGPSLatitude);
        timeInOut.long = Number(prmGPSLongitude);
        timeInOut.dateTime = prmDateTime;
        timeInOut.checkInOut = true;
        if (timeInOut.lat === 0 || timeInOut.long === 0) {
            dataResponse.ResponseCode = "FAIL";
            dataResponse.data = {};
            dataResponse.ResponseMessage = 'ERROR LOCATION AND TIME DATE ';
            return res.status(http_status_codes_1.OK).send(dataResponse);
            ;
        }
        getInfor.checkInOut = [yield timeDAO.insert(timeInOut)];
        const saveFriend = yield getInfor.save();
        dataResponse.ResponseCode = "OK";
        dataResponse.data = getInfor;
        dataResponse.ResponseMessage = 'Successfull';
        return res.status(http_status_codes_1.OK).json(dataResponse);
    }
    if (prmCmd === "EmployeeWorkOff") {
        const timeInOut = new TimeWork_1.TimeInOut();
        var prmGPSLongitude = req.query.prmGPSLongitude;
        var prmGPSLatitude = req.query.prmGPSLatitude;
        var prmDateTime = req.query.prmDateTime;
        timeInOut.lat = Number(prmGPSLatitude);
        timeInOut.long = Number(prmGPSLongitude);
        timeInOut.dateTime = prmDateTime;
        timeInOut.checkInOut = false;
        if (timeInOut.lat === 0 || timeInOut.long === 0) {
            dataResponse.ResponseCode = "FAIL";
            dataResponse.data = {};
            dataResponse.ResponseMessage = 'ERROR LOCATION AND TIME DATE ';
            return res.status(http_status_codes_1.OK).send(dataResponse);
            ;
        }
        getInfor.checkInOut = [yield timeDAO.insert(timeInOut)];
        const saveFriend = yield getInfor.save();
        dataResponse.ResponseCode = "OK";
        dataResponse.data = getInfor;
        dataResponse.ResponseMessage = 'Successfull';
        return res.status(http_status_codes_1.OK).json(dataResponse);
    }
}));
router.post('/add', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    if (!user) {
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    return res.status(http_status_codes_1.CREATED).end();
}));
router.put('/update', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    if (!user) {
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    user.id = Number(user.id);
    return res.status(http_status_codes_1.OK).end();
}));
router.delete('/delete/:id', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    return res.status(http_status_codes_1.OK).end();
}));
exports.default = router;
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
//# sourceMappingURL=userRoute.js.map