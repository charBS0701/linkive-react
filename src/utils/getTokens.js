import Cookies from "js-cookie";

export const getTokens = () => {
    return {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
        "refresh-token": Cookies.get('refreshToken')
    };
}