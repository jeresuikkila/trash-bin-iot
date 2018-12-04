CREATE TABLE public.touchtag (
	dev_eui varchar(255) not null unique,
	app_eui varchar(255) NULL,
	dev_addr varchar(50) not null,
	nwkskey varchar(50) NULL,
	appskey varchar(50) NULL,
	touchtag_id varchar(50) null unique,
	CONSTRAINT touchtag_pk PRIMARY KEY (dev_eui)
);
CREATE TABLE public.event (
	packet_hash varchar(255) not null,
	encrypted_payload varchar(255) NULL,
	payload varchar(255) NULL,
	params JSON NULL,
	meta JSON NULL,
	type varchar(32) NULL,
	dev_eui varchar(255) references touchtag(dev_eui),
	CONSTRAINT event_pk PRIMARY KEY (packet_hash)
);


CREATE TABLE public.trashbin (
	trashbin_id varchar(255) not null,
	owner varchar(255) NULL,
	location varchar(255) NULL,
	address varchar(150) NULL,
	dev_eui varchar(255) NULL,
	bintype varchar(50) NULL,
	CONSTRAINT trashbin_pk PRIMARY KEY (trashbin_id)
);

CREATE TABLE public.sensor_bin (
	sensor_id varchar(100) not null unique references sensor_bin(sensor_id),
	trashbin_id varchar(255) not null references trashbin(trashbin_id),
	orientation varchar(255) NULL,
	event_type varchar(255) NULL,
	pitch varchar(50) NULL,
	roll varchar(50) NULL,
	temperature varchar(50) NULL,
	trigger_code varchar(50) NULL,
	CONSTRAINT sensor_pk PRIMARY KEY (sensor_id)
);