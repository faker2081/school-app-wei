import pinia from "@/store";

export function globalDirective(value){
    const permissions = pinia.store().userStore.permissions;
    if(permissions.includes(value))return true
    return false
}