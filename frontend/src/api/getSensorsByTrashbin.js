const GetSensorsByTrashbin = async(id) => {

    try {
        const response = await fetch('localhost:3001/trashbins/' + id + '/sensors');
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

export default GetSensorsByTrashbin;