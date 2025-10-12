export function userNameGenerate(names: string, lastName: string, motherLastName: string): string {
    let userName: string = '';
    userName += names.charAt(0).toLowerCase();
    userName += lastName.toLowerCase();
    userName += motherLastName.toLowerCase();
    return userName;
}
