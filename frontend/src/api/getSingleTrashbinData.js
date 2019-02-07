const url = process.env.REACT_APP_DATAURL;

const GetSingleTrashbinData = async (id) => {

  try {
    const response = await fetch(url+'trashbins/' + id);
    if (!response.ok) {
      throw Error(response.status);
    }
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e);
    return {};
  }
}

export default GetSingleTrashbinData;