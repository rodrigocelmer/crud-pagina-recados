CREATE TABLE users
( 
 id uuid NOT NULL,  
 username VARCHAR(25) NOT NULL,  
 email VARCHAR(50) NOT NULL,  
 "password" VARCHAR(50) NOT NULL,
 time_created timestamp not null default now(),
 time_updated timestamp,
 UNIQUE (username,email),
 constraint pk_user primary key (id)
); 

CREATE TABLE messages 
( 
 id uuid NOT NULL,  
 description VARCHAR(25) NOT NULL, 
 detail VARCHAR(200) NOT NULL,   
 archieved boolean not null default false,
 time_created timestamp not null default now(),
 time_updated timestamp,
 id_user uuid NOT NULL,
 constraint pk_messages primary key (id),
 constraint fk_user foreign key (id_user) references users(id)
); 

insert into users (id, username, email, "password")
values
	(uuid_generate_v4(), 'rodrigo', 'rodrigo@rodrigo.com', 'rodrigo123456'),
	(uuid_generate_v4(), 'pedro', 'pedro@pedro.com', 'pedro123456'),
	(uuid_generate_v4(), 'maria', 'maria@maria.com', 'maria123456'),
	(uuid_generate_v4(), 'joana', 'joana@joana.com', 'joana123456'),
	(uuid_generate_v4(), 'marcos', 'marcos@marcos.com', 'marcos123456');

insert into messages (id, description, detail, id_user)
values
	(uuid_generate_v4(), 'teste', 'recado de rodrigo',  'ce5b739a-c642-4de9-bb44-b1edfe028424'),
	(uuid_generate_v4(), 'teste', 'recado de pedro', '72dd54f3-b740-4faa-bf3a-8372320bbd8d'),
	(uuid_generate_v4(), 'teste', 'recado de maria', 'dc0e726e-fd23-4ff7-bcab-cbfd10601c24'),
	(uuid_generate_v4(), 'teste', 'recado de joana', '9a7f38ef-a38b-4767-8861-bccc0a8b5e90'),
	(uuid_generate_v4(), 'teste', 'recado de marcos', '2ad8eb06-735a-4997-b445-65f05ba70c69'),
	(uuid_generate_v4(), 'teste', 'mais um recado de rodrigo', 'ce5b739a-c642-4de9-bb44-b1edfe028424'),
	(uuid_generate_v4(), 'teste', 'recado de rodrigo para ser excluido', 'ce5b739a-c642-4de9-bb44-b1edfe028424'),
	(uuid_generate_v4(), 'teste', 'recado de rodrigo para ser atualizado', 'ce5b739a-c642-4de9-bb44-b1edfe028424');

select * from users ;
select * from messages ;

alter table messages 
	add column archieved boolean;