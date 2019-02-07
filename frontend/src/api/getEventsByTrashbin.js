const url = process.env.REACT_APP_DATAURL;

const GetEventsByTrashbin = async (id) => {

  try {
    const response = await fetch(url+'trashbins/' + id + '/events');
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