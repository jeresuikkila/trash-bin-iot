# How to decode touchTag payload

In order to decode the touchTag payload you need to install and use Google's Protocol Buffers which are basically a method of serializing structured data. Everynet provides a touchtag.proto text file, which contains the different message types of the sensors.
The touchtag.proto file needs to be compiled and when it's compiled for example in Python, it generates a touchtag_pb2.py file. This file holds the access to the encrypted payload and it needs to be in the same folder as the Python script.
We used an example Python script (decoder.py) to do all this. The script first base64-decoded the payload and then fetched the data from the touchtag_pb2.py file.

Everynet has the step-by-step directions here:
https://everynet.zendesk.com/hc/en-us/articles/360011410074-How-to-decode-TouchTag-payload

This link also includes the required files and scripts (touchtag.proto).

Other useful links:
https://developers.google.com/protocol-buffers/docs/pythontutorial


## Installation

### Protobuf compiler
Installation instructions for Ubuntu.

Prerequisites
`sudo apt-get install autoconf automake libtool curl make g++ unzip`

Installation
From this page, download the protobuf-all-[VERSION].tar.gz. Extract the contents and go to the directory

```sh
./configure
make
make check
sudo make install
sudo ldconfig # refresh shared library cache.
```

Check that the compiler works with `protoc --version` returning the same version as downloaded.

## Creating an AWS Lambda function

https://docs.aws.amazon.com/lambda/latest/dg/lambda-python-how-to-create-deployment-package.html#python-package-dependencies

```sh
pip3 install -r requirements --system --target ./package
cd package
zip -r9 lambda.zip .
cd ..
zip -g lambda.zip lambda.py decoder.py
```
Then upload the created zip to AWS.
