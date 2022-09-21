const api = {
    harbor: {
        all(callback){
            const harbors = [
                {
                    seq: 1,
                    place: "라벨짐",
                    addr: "여기는 기구가 뭐가 있을까?",
                    lat: 35.1544453, 
                    lng: 129.0606460,
                },
                {
                    seq: 2,
                    place: "진리트레이너엔터테인먼트",
                    addr: "여긴 아무리봐도 헬스장은 아닌 듯",
                    lat: 35.15332106667591, 
                    lng: 129.05975064530568,
                }
            ];
            callback({success: true, harbors});
        }
    }
}

export default api;