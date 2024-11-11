import * as Keychain from 'react-native-keychain';

const setItem = async ( token: string) => {
    try {
        await Keychain.setGenericPassword('user_token', token);
        console.log('Token securely stored');
    } catch (error) {
        console.error('Error storing token:', error);
    }
}

const getItem = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            // console.log('Retrieved token:', credentials.password);
            return credentials.password;
        } else {
            console.log('No token found');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
}

const deleteItem = async () => {
    try {
        await Keychain.resetGenericPassword();
        console.log('Token deleted');
    } catch (error) {
        console.error('Error deleting token:', error);
    }
}

export { setItem, getItem, deleteItem };