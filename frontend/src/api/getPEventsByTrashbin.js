const url = process.env.REACT_APP_DATAURL;

const GetPEventsByTrashbin = async (id) => {

    try {
        const response = await fetch(url+'trashbins/' + id + '/pevents');
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

export default GetPEventsByTrashbin;