module.exports = {
    login: async function(clientId,cb) {
        await fetch('https://api.instagram.com/oauth/authorize/?client_id='+clientId+'&redirect_uri=http://localhost/&response_type=code')
            .then((response) => alert(JSON.stringify(response)))
            .then((jsonRes) => cb(null,jsonRes))
            .catch((error) => {
                console.log('error!!-> ',error)
                cb(error,null)
            });
    },
    getSelfInfo: async function(clientId,cb){
        await fetch('https://api.instagram.com/v1/users/self/?access_token='+clientId)
            .then((response) => response.json())
            .then((jsonRes) => cb(null,jsonRes))
            .catch((error) =>{
                console.log(error);
                cb(error,null)
            });
    }
};