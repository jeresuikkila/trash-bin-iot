const GetTrashbinData = async () => {

    const response = await fetch('http://18.216.94.3:3001/trashbins');
    const body = await response.json();
    return body.express;
  }
  
  export default GetTrashbinData;