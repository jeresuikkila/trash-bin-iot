const GetData = async () => {

    // return [
    //     {
    //         id: 1,
    //         owner: "Aalto",
    //         address: "Otakaari 5",
    //         bintype: "Large Bio Waste",
    //         latestEvent: "Opened yesterday",
    //         status: "OK"
    //     },
    //     {
    //         id: 2,
    //         owner: "Aalto",
    //         address: "Otakaari 7",
    //         bintype: "Small Bio Waste",
    //         latestEvent: "Opened today",
    //         status: "FULL"
    //     },
    // ]

    const url = 'http://localhost:3001/trashbins';
    
    const response = await fetch(url);
    const body = await response.json();
    return body.express;
  }
  
  export default GetData;