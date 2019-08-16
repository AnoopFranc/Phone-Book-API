# Phone-Book-API
Phone Book Api

git clone https://github.com/AnoopFranc/Phone-Book-API.git

npm install

create an .env file in the root folder with following values
:
PORT = 3000
SECRET = <any string you like>
DB_CONNECTION = mongodb://mongodb0.example.com:27017/admin || copy the uri string after login in mongodb and creating a cluster

npm run dev

fire you request in postman with end point:
http://localhost:3000/user/register, 
http://localhost:3000/user/login with header Authorization key and Bearer <token> for auth

Crud Endpoints For contacts (All require auth middleware mentioned above)
Post :http://localhost:3000/contact, 
Get : http://localhost:3000/contacts, 
Patch: http://localhost:3000/contact/:id parameter
