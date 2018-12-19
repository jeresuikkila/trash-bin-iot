const GetEventsByTrashbin = async (id) => {

    const response = await fetch('http://18.216.94.3:3001/trashbins/'+id+'/events');
    const body = await response.json();
    return body.express;
  }
  
  export default GetEventsByTrashbin;