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
                    place: "바로 크로스핏",
                    addr: "크로스핏 개 힘듬",
                    lat: 35.1546, 
                    lng: 129.0613,
                },
                {
                    seq: 3,
                    place: "마카라멀티짐",
                    addr: "여기 바꿈",
                    lat: 35.156, 
                    lng: 129.0582,
                },
                {
                    seq: 4,
                    place: "미라클짐",
                    addr: "기적이 일어나나?",
                    lat: 35.1546, 
                    lng: 129.0567,
                }
            ];
            callback({success: true, harbors});
        }
    }
}

export default api;