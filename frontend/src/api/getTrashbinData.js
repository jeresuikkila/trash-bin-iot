const GetTrashbinData = async () => {

    const response = await fetch('http://localhost:3001/trashbins');
    const body = await response.json();
    return body.express;
  }
  
  export default GetTrashbinData;