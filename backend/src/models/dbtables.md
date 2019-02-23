locations
    string address
    string lat
    string lng

trashbins
    string bintype
    string owner
    int size
    date latestEmptied
    int fillStatus
    int locationId references locations

sensors
    int default_pitch
    int default_roll
    string taglocation
    float battery
    string lat
    string lng
    int trashbinId references trashbins

events
    string event_type
    date event_time
    int sensorId references sensors