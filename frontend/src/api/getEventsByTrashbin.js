const GetEventsByTrashbin = async (id) => {

  try {
    const response = await fetch('http://18.216.94.3:3001/trashbins/' + id + '/events');
    if (!response.ok) {
      throw Error(response.status);
    }
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default GetEventsByTrashbin;