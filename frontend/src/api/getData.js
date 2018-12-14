const GetData = () => {

    return [
        {
            id: 1,
            owner: "Aalto",
            address: "Otakaari 5",
            type: "Large Bio Waste",
            latestEvent: "Opened yesterday",
            status: "OK"
        },
        {
            id: 2,
            owner: "Aalto",
            address: "Otakaari 7",
            type: "Small Bio Waste",
            latestEvent: "Opened today",
            status: "FULL"
        },
    ]

    // const url = 'http://localhost:3001/testapi';
    
    // return fetch(url,{
    //   method: "GET",
    // })
    // .then((response) => response.json())
    // .then((responseData) => {
    //   return responseData;
    // })
    // .catch(error => console.warn(error));
  }
  
  export default GetData;