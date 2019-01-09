trashbins
{
    id: int //primarykey
    bintype: string 
    owner: string
    address: string
}

touchtags
{
    dev_eui: string //primarykey
    app_eui: string
    dev_addr: string
    nwkskey: string
    appskey: string
}

sensorbins
{
    id: int //primarykey
    default_pitch: int
    default_roll: int
    location: string
    taglocation: string //like lid/bottom etc
    touchtagDevEui: string //foreign key touchtags
    trashbinId: int //foreign key trashbins
}

events
{
    packet_hash: string //primarykey
    payload: string
    original_message: json
    event_time: date
    temperature: int
    trigged_code: string
    trigger_counter: int
    pitch: int
    roll: int
    touchtagDevEui: string //foreign key touchtags
}

processedevents
{
    packet_hash: string //primarykey
    event_type: string
    event_time: date
    trashbinId: int //foreign key trashbins
}

