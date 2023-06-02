import Cookies from "js-cookie";

export const getTokens = () => {
    return {
        Authorization: `JWT ${Cookies.get('accessToken')}`,
        "refresh-token": Cookies.get('refreshToken')
    };
}