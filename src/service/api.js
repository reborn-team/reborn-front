const api = {
    harbor: {
        all(callback){
            const harbors = [
                {
                    seq: 398,
                    place: "헬스보이짐",
                    lat: 35.153650836298304, 
                    lng: 129.05985990659252,
                },
                {
                    seq: 399,
                    place: "라벨짐",
                    lat: 35.153650836298304, 
                    lng: 129.05985990659252,
                },
                {
                    seq: 400,
                    place: "진리트레이너엔터테인먼트",
                    lat: 35.15332106667591, 
                    lng: 129.05975064530568,
                }
            ];
            callback({success: true, harbors});
        }
    }
}

export default api;