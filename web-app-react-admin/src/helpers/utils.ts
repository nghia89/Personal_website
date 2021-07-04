
import { PATH } from '@/constants/paths'
import moment from 'moment'
import { ValidateVm } from '@/models/index';
import { getProfile } from './httpCommon'
import { IconSetting, IconShoppingCart, IconUser, IconMonitor } from './svg';
import { ImageSize } from '@/constants/utilConstant';


export function renderIconSlideBar(icon) {
    switch (icon) {
        case "IconShoppingCart":
            return IconShoppingCart()
        case "IconSetting":
            return IconSetting()
        case "IconUsers":
            return IconUser()
        case "IconMonitor":
            return IconMonitor()
        default:
            return null;
    }
}

export function checkPermission(funcId: string, commandId: string) {
    let profile = getProfile();
    if (profile && profile.permissions) {
        let permissions = JSON.parse(profile.permissions);
        if (permissions.find(a => a === (`${funcId}_${commandId}`))) return true;
    };
    return false;
}

export function checkValueObject(obj, value) {
    if (!obj || !value) return false;
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]] === value) {
            return true;
        }
    }
    return false;
}

export function checkPath(pathname) {
    var objKeys = Object.keys(PATH);
    for (var i = 0; i < objKeys.length - 1; i++) {
        if (PATH[objKeys[i]] === pathname) return true
        else {
            if (pathname.includes(PATH.PRODUCT_VARIANT)) return true;
            let split = pathname.split("/");
            if (split.length > 3) {
                split.splice(3, 1);
                split.push("")
                if (split.join("/") === PATH[objKeys[i]]) return true
            }
        }
    }
    return false;
}
export function SerializeParam(ObjParam) {
    var str = "";
    for (var key in ObjParam) {
        if (!ObjParam[key]) continue;
        if (str === "") {
            str += "?";
        } else { str += "&"; }
        str += key + "=" + encodeURIComponent(ObjParam[key]);
    }
    return str;
}

export const IsNullOrEmpty = (value) => {
    if (value === undefined || value === null || (value === '' && value !== false) || (value.trim && value.trim() === '')) {
        return true;
    }

    return false;
}

export function formatDate(date, format) {
    if (!format) format = "DD/MM/YYYY";
    if (!date) return null;
    return moment(date).format(format)
}

export function validateField(arrayField: Array<ValidateVm>, refs) {
    //const dispatch = UseNotification();
    if (!refs) return;
    let messError = "";
    let valid = false;
    var validLength = false;
    if (arrayField) {
        let arrayLength = arrayField.length;
        for (let index = 0; index < arrayLength; index++) {
            if (refs[arrayField[index].name] == null) continue;
            let value: any = null;
            if (refs[arrayField[index].name].props) {
                value = refs[arrayField[index].name]?.select?.getValue()[0]?.value
            }
            else value = refs[arrayField[index].name]?.value
            const item = arrayField[index];
            switch (item.name) {
                case 'email':
                    if (IsNullOrEmpty(value)) {
                        valid = true;
                        messError = `Vui lòng nhập ${item.mess}.`;
                        break;
                    }
                    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    valid = !pattern.test(value);
                    messError = valid ? '' : 'email không đúng định dạn.';
                    break;
                case 'password':
                    if (IsNullOrEmpty(value)) {
                        valid = true;
                        messError = `Vui lòng nhập ${item.mess}.`;
                        break;
                    }
                    valid = value.length >= 6;
                    messError = valid ? '' : ' Mật khẩu phải lớn hơn 6';
                    break;
                case ('phoneNumber' || 'phone'):
                    if (IsNullOrEmpty(value)) {
                        valid = true;
                        messError = `Vui lòng nhập ${item.mess}.`;
                        break;
                    }
                    let patternNumber = new RegExp(/^[0-9\b]+$/);
                    valid = !patternNumber.test(value);
                    validLength = value.length <= 10 && value.length <= 11;
                    if (!valid) messError = 'Số điện thoại không đúng định dạn.';
                    else if (!validLength) { valid = true; messError = 'Số điện thoại phải lớn 10 và nhỏ hơn 11.'; }
                    break;
                default:
                    if (IsNullOrEmpty(value)) {
                        valid = true;
                        messError = `Vui lòng nhập ${item.mess}.`;
                        break;
                    }
                    break;
            }
            if (valid) {
                // let dispatch = useNotification();
                // dispatch('ERROR', messError)
                refs[item.name]?.focus();
                // return true;
                return messError;
            }
        }
    }

    return null;
}

export function randomUId() {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    return rand
}


export function groupBy(key, array) {
    return array.reduce(
        (objectsByKeyValue, obj) => ({
            ...objectsByKeyValue,
            [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
        }),
        {}
    );
}

export function formatPrice(value) {
    if (value) {
        let newValue = value.toString().replaceAll(',', '')
        var regex = new RegExp("^-?[0-9][0-9,\.]+$");
        if (!regex.test(newValue))
            newValue = newValue.replace(/\D+/g, '');
        return newValue.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
}

export function replaceImgUrl(url, key) {
    if (IsNullOrEmpty(url)) return ''
    if (IsNullOrEmpty(key)) key = ImageSize.medium
    return url.replace(/.([^.]*)$/, `_${key}.$1`)
}