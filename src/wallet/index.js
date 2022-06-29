const axios = require('axios');
const md5 = require('md5');

class Wallet {
    /**
     * @param {string} access_token Токен
     */
    constructor(token) {
        if(!token) return new Error(`Вы не указали токен авторизации!`);
        this.config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    }

    /**
     * @param {String} methodTag
     * @param {String} method
     * @param {any} requestData
     * @return {Object}
     * Отправка запроса
     */
    async call(methodTag, method, requestData = {}) {
        const data = await axios({
            method: methodTag,
            url: `http://188.120.237.213/payment_system/api/${method}`,
            ...this.config,
            data: requestData,
            params: requestData
        }).then((data) => {
            return data.data;
        }).catch((e) => {
            return false;
        });
        return data;
    };

    /**
     * @description Метод получения баланса
     * @returns {Number} Ваш баланс
     */
    async getBalance() {
        const data = await this.call('get', 'balance');
        return Number(data.balance);
    };

    /**
     * @description Метод создания ссылки для оплаты
     * @param {String} payload - Payload ссылки-оплаты
     * @returns {String} Ссылка на оплату с payload
     */
    async createPayUrl(payload) {
        const data = await this.call('get', 'payment_url', {
            payload: payload
        });
        return data.url;
    };

    /**
     * @description Метод получения списка транзакций
     * @param {any} params - Параметры
     * @returns {Array} Массив со списком транзакций
     */
    async getTransHistory(params = {}) {
        const data = await this.call('get', 'transactions', {
            type: params.type ? params.type : 'all',
            offset: params.offset ? params.offset : 0,
            limit: params.limit ? params.limit : 20
        });
        return data;
    };
    
    /**
     * @description Метод проверки регистрации пользователя в сервисе
     * @param {Number} userId - Айди пользователя
     * @returns {Boolean} True - зарегистрирован, false - незарегистрирован
     */
    async checkUser(userId) {
        const data = await this.call('get', 'checks_user_exists', {
            check_id: userId
        });
        return data.exists;
    };

    /**
     * @description Метод создания новой транзакции
     * @param {Number} toId - Кому переводим
     * @param {Number} amount - Сколько переводим
     * @param {String} payload - Payload перевода
     * @returns {Object} Информация о переводе
     */
    async createTransfer(toId, amount, payload = 'this_sender_pidaras') {
        const data = await this.call('post', 'send_coins', {
            recipient_id: toId,
            amount: amount,
            payload: payload
        });
        return data;
    };

    /**
     * @description Метод создания callback-сервера
     * @param {String} url - Ссылка на ваш сервер (должно начинаться с http(s):// )
     * @returns {String} Секретный токен callback-сервера
     */
    async createCallBackServer(url) {
        const data = await this.call('post', 'callback', {
            url: url
        });
        return data.callback_secret;
    };

    /**
     * @description Метод удаления callback-сервера
     * @returns {String} Ok - callback-сервер удален
     */
    async deleteCallBackServer() {
        const data = await this.call('delete', 'callback');
        return data.response;
    };

    /**
     * @description Метод валидации callback
     * @param {*} event Event callback
     * @param {*} secret Секретный ключ callback-сервера
     * @returns {Boolean} True - заебись, false - не заебись
     */
    async validateCallBack(event, secret) {
        let source_sign = event.sign;
        delete event.sign;
     
        let params = [];
        let sortedKeys = Object.keys(event).sort((a, b) => a.localeCompare(b));
        sortedKeys.forEach(key => {
            params.push(`${key}=${event[key]}`);
        });
     
        let toEncode = params.join('&') + `&${secret}`;
        let calculated_sign = md5(toEncode).toString();
        return calculated_sign == source_sign;
    };
};

module.exports = {
    Wallet
};
