const url = process.env.REACT_APP_DATAURL;

const GetTrashbinData = async () => {

  try {
    const response = await fetch(url+'trashbins');
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

export default GetTrashbinData;