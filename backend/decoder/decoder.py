# Script to decode the encrypted payload, uses example payload

import base64
import logging
import sys

import touchtag_pb2 as tracker  # generated file

schemes = {
    0x00: tracker.sample,   # 0000 0000 0000 0000
    0x80: tracker.set_config,   # 0000 0000 1000 0000
    0x81: tracker.get_debug_data    # 0000 0000 1000 0001
}


# Unpacks the payload, base64encoding & protocol buffers
def unpack(payload):

    payload = bytes(base64.b64decode(payload))

    if payload[0] != 0x01:
        msg = 'Invalid Serialization Format: {:02x}'.format(payload[0])
        logging.error(msg)
        raise Exception(msg)

    scheme_id = payload[1]

    try:
        data = schemes[scheme_id].FromString(payload[2:])
    except Exception as e:
        msg = 'Deserialization error: %s' % repr(e)
        logging.error(msg)
        raise Exception(msg)

    return data

# Unpack the payload in to json format
def unpack_to_json(payload):

    sample = unpack(payload)

    data = {}
    data['config_version'] = sample.config_version
    data['temperature'] = sample.temperature
    data['fw_version'] = sample.fw_version
    data['trigger_code'] = sample.trigger_code
    data['trigger_counter'] = sample.trigger_counter
    data['pitch'] = sample.pitch
    data['roll'] = sample.roll
    data['data'] = {
        'debug_var_1': sample.data.debug_var_1,
        'debug_var_2': sample.data.debug_var_2
    }

    return data


def main():
    
    if (len(sys.argv) == 1):
        testidata = unpack_to_json("AQAIABA4GG4gCSgDMJ4BOABCBRABGIEe")
        print("Example data:\n", testidata)

    if (len(sys.argv) == 2):
        print("Unpacked:\n", unpack(sys.argv[1]))

main()
