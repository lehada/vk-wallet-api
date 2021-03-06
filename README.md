# vk-wallet-api
#### Библиотека для легкого использования API Wallet

## Установка

```js
$ npm i vk-wallet-api
```

### Использование

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);
```  
token - токен от кошелька

## Примеры

### Получение баланса  
- Параметры не требуются

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.getBalance());
})()
```  
На выходе вы получите свой баланс (если вы получили false - вы ошиблись в передаче параметров)

---

### Создания ссылки для оплаты 
- Параметр - payload (необяз.) - Полезная нагрузка

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.createPayUrl('Payload'));
})()
```  
На выходе вы получите ссылку для оплаты (если вы получили false - вы ошиблись в передаче параметров)  

---

### Создания ссылки для оплаты 
- Параметр - payload (необяз.) - Полезная нагрузка

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.createPayUrl('Payload'));
})()
```  
На выходе вы получите ссылку для оплаты (если вы получили false - вы ошиблись в передаче параметров)  

---

### Создания ссылки для оплаты 
- Параметр - type (необяз.) - Тип перевода (in, out, all) (по умолчанию all)  
- Параметр - offset (необяз.) - Смещение (по умолчанию 0)  
- Параметр - limit (необяз.) - Лимит отобращения (по умолчанию 20)  

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.getTransHistory({
        type: 'in',
        offset: 10,
        limit: 5
    }));
})()
```  
На выходе вы получите массив с последними транзакциями (если вы получили false - вы ошиблись в передаче параметров)  

---

### Проверка на регистрацию пользователя в сервисе
- Параметр - userId (обяз.) - Айди пользователя

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.checkUser(655037535));
})()
```  
На выходе вы получите true (если пользователь зарегистрирован) или false (если пользователь незарегистрирован)  

---

### Создание нового перевода
- Параметр - toId (обяз.) - Кому переводим
- Параметр - amount (обяз.) - Сумма перевода
- Параметр - payload (необяз.) - Полезная нагрузка

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.createTransfer(655037535, 100));
})()
```  
На выходе вы получите информацию о переводе (если вы получили false - вы ошиблись в передаче параметров)  

---

### Создание callback-сервера
- Параметр - url (обяз.) - Ссылка на ваш новый callback-сервер

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.createCallBackServer('http://127.0.0.1'));
})()
```  
На выходе вы получите секретный токен callback-сервера (если вы получили false - вы ошиблись в передаче параметров)  

---

### Удаление callback-сервера
- Параметры не требуются

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.deleteCallBackServer());
})()
```  
На выходе вы получите "ok" - callback-сервер удален (если вы получили false - вы ошиблись в передаче параметров)  

---  

### Валидация callback-данных
- Параметр - event (обяз.) - Данные callback
- Параметр - secret (обяз.) - Секретный ключ callback-сервера

```js
const { Wallet } = require('vk-wallet-api');
const wallet = new Wallet(token);

(async () => {
    console.log(await wallet.validateCallBack(event, secret));
})()
```  
На выходе вы получите секретный токен callback-сервера (если вы получили false - вы ошиблись в передаче параметров) 

---  

### Контакты:
- Разработчик API - https://vk.com/ymenaidtopa.json
- Группа Wallet - https://vk.com/official_wallet
- GitHub Репозиторий - https://github.com/lehada/vk-wallet-api
- NpmJs ссылка - https://npmjs.com/package/vk-wallet-api